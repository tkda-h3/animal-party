import React, { useEffect } from 'react';
import { Box, Typography, Button, Paper, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { Pyramid } from './Pyramid';
import { PlayerHand } from './PlayerHand';
import {
  selectCard,
  playCard,
  executeAIMove,
  nextRound,
  resetGame
} from '../store/gameSlice';
import { Position } from '../types/game';

export const GameBoard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gameState = useSelector((state: RootState) => state.game.gameState);
  const selectedCardState = useSelector((state: RootState) => state.game.selectedCard);
  const highlightedPositions = useSelector((state: RootState) => state.game.highlightedPositions);

  useEffect(() => {
    if (!gameState) return;

    const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayerId);

    // Execute AI move if current player is AI
    if (currentPlayer?.isAI && gameState.gameStatus === 'playing') {
      const timer = setTimeout(() => {
        dispatch(executeAIMove());
      }, 1500); // 1.5 second delay for AI moves

      return () => clearTimeout(timer);
    }
  }, [gameState?.currentPlayerId, gameState?.gameStatus, dispatch]);

  if (!gameState) {
    return <div>No game in progress</div>;
  }

  const handleCardSelect = (card: any) => {
    if (selectedCardState?.id === card.id) {
      dispatch(selectCard(null));
    } else {
      dispatch(selectCard(card));
    }
  };

  const handlePositionClick = (position: Position) => {
    if (selectedCardState && highlightedPositions.some(
      pos => pos.row === position.row && pos.col === position.col
    )) {
      dispatch(playCard({ card: selectedCardState, position }));
    }
  };

  const handleNextRound = () => {
    dispatch(nextRound());
  };

  const handleNewGame = () => {
    dispatch(resetGame());
  };

  const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayerId);

  return (
    <Box sx={{ p: 2 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4">
            Animal Party - Round {gameState.round}/{gameState.totalRounds}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            {gameState.gameStatus === 'roundEnd' && (
              <Button variant="contained" color="primary" onClick={handleNextRound}>
                Next Round
              </Button>
            )}
            {gameState.gameStatus === 'gameEnd' && (
              <Button variant="contained" color="success" onClick={handleNewGame}>
                New Game
              </Button>
            )}
          </Box>
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" gutterBottom>
            Game Board
          </Typography>
          <Pyramid
            pyramid={gameState.pyramid}
            highlightedPositions={highlightedPositions}
            onPositionClick={handlePositionClick}
          />
        </Box>

        <Paper sx={{ width: 300, p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Game Status
          </Typography>
          <Divider sx={{ mb: 1 }} />

          {gameState.gameStatus === 'playing' && (
            <Typography variant="body1" sx={{ mb: 1 }}>
              Current Turn: <strong>{currentPlayer?.name}</strong>
              {currentPlayer?.isAI && ' (AI is thinking...)'}
            </Typography>
          )}

          {gameState.gameStatus === 'roundEnd' && (
            <Box>
              <Typography variant="body1" color="primary" sx={{ mb: 1 }}>
                Round {gameState.round} Complete!
              </Typography>
              <Typography variant="body2">
                Click "Next Round" to continue.
              </Typography>
            </Box>
          )}

          {gameState.gameStatus === 'gameEnd' && (
            <Box>
              <Typography variant="h6" color="success.main" sx={{ mb: 2 }}>
                Game Over!
              </Typography>
              <Typography variant="h6" gutterBottom>
                Final Scores:
              </Typography>
              {[...gameState.players]
                .sort((a, b) => a.points - b.points)
                .map((player, index) => (
                  <Typography key={player.id} variant="body1">
                    {index + 1}. {player.name}: {player.points} points
                  </Typography>
                ))}
            </Box>
          )}

          <Divider sx={{ my: 2 }} />

          <Typography variant="body2" gutterBottom>
            <strong>Eliminated Players:</strong>
          </Typography>
          {gameState.eliminatedPlayers.length > 0 ? (
            gameState.eliminatedPlayers.map(playerId => {
              const player = gameState.players.find(p => p.id === playerId);
              return (
                <Typography key={playerId} variant="body2">
                  • {player?.name}
                </Typography>
              );
            })
          ) : (
            <Typography variant="body2" color="text.secondary">
              None
            </Typography>
          )}
        </Paper>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h6">Players</Typography>
        {gameState.players.map((player) => (
          <PlayerHand
            key={player.id}
            player={player}
            isCurrentPlayer={player.id === gameState.currentPlayerId && !player.isAI}
            onCardSelect={handleCardSelect}
            selectedCard={selectedCardState}
          />
        ))}
      </Box>
    </Box>
  );
};