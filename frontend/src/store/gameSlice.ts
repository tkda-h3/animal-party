import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GameState, GameSettings, Card, Position, Player, PlayerConfig } from '../types/game';
import {
  initializeRound,
  placeCard,
  canPlayerPlay,
  getNextPlayer,
  isRoundOver,
  calculatePenaltyPoints,
  getAIMove,
  getValidPositions
} from '../utils/gameLogic';

interface GameSliceState {
  gameSettings: GameSettings | null;
  gameState: GameState | null;
  selectedCard: Card | null;
  highlightedPositions: Position[];
}

const initialState: GameSliceState = {
  gameSettings: null,
  gameState: null,
  selectedCard: null,
  highlightedPositions: []
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGameSettings: (state, action: PayloadAction<GameSettings>) => {
      state.gameSettings = action.payload;
    },

    startGame: (state) => {
      if (!state.gameSettings) return;

      const players: Player[] = state.gameSettings.playerConfigs.map((config, index) => ({
        id: `player-${index}`,
        name: config.name,
        isAI: config.isAI,
        cards: [],
        points: 0,
        isEliminated: false
      }));

      state.gameState = initializeRound(players);
    },

    selectCard: (state, action: PayloadAction<Card | null>) => {
      state.selectedCard = action.payload;

      if (action.payload && state.gameState) {
        // Calculate valid positions for highlighting
        state.highlightedPositions = getValidPositions(state.gameState.pyramid, action.payload);
      } else {
        state.highlightedPositions = [];
      }
    },

    playCard: (state, action: PayloadAction<{ card: Card; position: Position }>) => {
      if (!state.gameState) return;

      const { card, position } = action.payload;
      const currentPlayer = state.gameState.players.find(
        p => p.id === state.gameState!.currentPlayerId
      );

      if (!currentPlayer) return;

      // Place the card
      state.gameState.pyramid = placeCard(
        state.gameState.pyramid,
        position,
        card,
        currentPlayer.id
      );

      // Remove card from player's hand
      currentPlayer.cards = currentPlayer.cards.filter(c => c.id !== card.id);

      // Check if current player can continue playing
      if (!canPlayerPlay(currentPlayer, state.gameState.pyramid)) {
        currentPlayer.isEliminated = true;
        currentPlayer.points += calculatePenaltyPoints(currentPlayer.cards.length);
        state.gameState.eliminatedPlayers.push(currentPlayer.id);
      }

      // Check if round is over
      if (isRoundOver(state.gameState)) {
        // Add penalty points for remaining cards
        state.gameState.players.forEach(player => {
          if (!player.isEliminated && player.cards.length > 0) {
            player.points += calculatePenaltyPoints(player.cards.length);
          }
        });

        // Check if game is over
        if (state.gameState.round >= state.gameState.totalRounds) {
          state.gameState.gameStatus = 'gameEnd';
        } else {
          state.gameState.gameStatus = 'roundEnd';
        }
      } else {
        // Get next player
        const nextPlayerId = getNextPlayer(state.gameState);
        if (nextPlayerId) {
          state.gameState.currentPlayerId = nextPlayerId;
        } else {
          // No player can play, end round
          state.gameState.gameStatus = 'roundEnd';
        }
      }

      // Clear selection
      state.selectedCard = null;
      state.highlightedPositions = [];
    },

    executeAIMove: (state) => {
      if (!state.gameState) return;

      const currentPlayer = state.gameState.players.find(
        p => p.id === state.gameState!.currentPlayerId
      );

      if (!currentPlayer || !currentPlayer.isAI) return;

      const move = getAIMove(currentPlayer, state.gameState.pyramid);

      if (move) {
        // Execute the AI move
        gameSlice.caseReducers.playCard(state, {
          payload: { card: move.card, position: move.position },
          type: 'playCard'
        });
      }
    },

    nextRound: (state) => {
      if (!state.gameState || state.gameState.gameStatus !== 'roundEnd') return;

      // Increment round
      state.gameState.round += 1;

      // Re-initialize for next round
      const players = state.gameState.players.map(p => ({
        ...p,
        cards: [],
        isEliminated: false
      }));

      const newRoundState = initializeRound(players);
      state.gameState = {
        ...newRoundState,
        round: state.gameState.round,
        players: state.gameState.players // Keep points
      };
    },

    resetGame: (state) => {
      state.gameState = null;
      state.selectedCard = null;
      state.highlightedPositions = [];
    }
  }
});

export const {
  setGameSettings,
  startGame,
  selectCard,
  playCard,
  executeAIMove,
  nextRound,
  resetGame
} = gameSlice.actions;

export default gameSlice.reducer;