import { Card, CardColor, CARD_COUNTS, Position, PlacedCard, Player, GameState, PYRAMID_ROWS, PYRAMID_BASE_WIDTH } from '../types/game';

// Initialize deck of cards
export function createDeck(): Card[] {
  const deck: Card[] = [];
  let cardId = 0;

  (Object.keys(CARD_COUNTS) as CardColor[]).forEach(color => {
    for (let i = 0; i < CARD_COUNTS[color]; i++) {
      deck.push({
        id: `card-${cardId++}`,
        color
      });
    }
  });

  return deck;
}

// Shuffle cards
export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Deal cards to players based on player count
export function dealCards(players: Player[], deck: Card[]): { players: Player[], remainingCard: Card | null } {
  const playerCount = players.length;
  let cardsPerPlayer: number;
  let usedDeck = deck;
  let remainingCard: Card | null = null;

  // Determine cards per player based on player count
  switch (playerCount) {
    case 2:
      cardsPerPlayer = 14;
      // Use only 28 cards for 2 players, keep 8 cards unused
      usedDeck = deck.slice(0, 28);
      break;
    case 3:
      cardsPerPlayer = 12;
      break;
    case 4:
      cardsPerPlayer = 9;
      break;
    case 5:
      cardsPerPlayer = 7;
      // 5 players: 7 cards each, 1 remaining for the board
      remainingCard = deck[35]; // The last card
      usedDeck = deck.slice(0, 35);
      break;
    case 6:
      cardsPerPlayer = 6;
      break;
    default:
      cardsPerPlayer = Math.floor(deck.length / playerCount);
  }

  const updatedPlayers = [...players];
  let cardIndex = 0;

  updatedPlayers.forEach(player => {
    player.cards = usedDeck.slice(cardIndex, cardIndex + cardsPerPlayer);
    cardIndex += cardsPerPlayer;
  });

  return { players: updatedPlayers, remainingCard };
}

// Initialize pyramid structure
export function initializePyramid(playerCount: number = 4): (PlacedCard | null)[][] {
  const pyramid: (PlacedCard | null)[][] = [];

  // 2 players use 7 rows, others use 8 rows
  const pyramidRows = playerCount === 2 ? 7 : 8;
  const baseWidth = playerCount === 2 ? 7 : 8;

  // Build pyramid from bottom (widest) to top (narrowest)
  // row 0 = bottom (baseWidth cards)
  // row pyramidRows-1 = top (1 card)
  for (let row = 0; row < pyramidRows; row++) {
    const width = baseWidth - row;
    pyramid.push(new Array(width).fill(null));
  }

  return pyramid;
}

// Check if a position is valid for placing a card
export function isValidPlacement(
  pyramid: (PlacedCard | null)[][],
  position: Position,
  card: Card
): boolean {
  const { row, col } = position;

  // Check bounds
  if (row < 0 || row >= pyramid.length || col < 0 || col >= pyramid[row].length) {
    return false;
  }

  // Check if position is already occupied
  if (pyramid[row][col] !== null) {
    return false;
  }

  // First row can be placed freely
  if (row === 0) {
    return true;
  }

  // For other rows, check if supporting cards exist
  const leftSupport = pyramid[row - 1][col];
  const rightSupport = pyramid[row - 1][col + 1];

  // Both supporting positions must have cards
  if (!leftSupport || !rightSupport) {
    return false;
  }

  // At least one supporting card must match the color
  return leftSupport.card.color === card.color || rightSupport.card.color === card.color;
}

// Get valid positions for a card
export function getValidPositions(
  pyramid: (PlacedCard | null)[][],
  card: Card
): Position[] {
  const validPositions: Position[] = [];

  pyramid.forEach((row, rowIndex) => {
    row.forEach((_, colIndex) => {
      if (isValidPlacement(pyramid, { row: rowIndex, col: colIndex }, card)) {
        validPositions.push({ row: rowIndex, col: colIndex });
      }
    });
  });

  return validPositions;
}

// Place a card on the pyramid
export function placeCard(
  pyramid: (PlacedCard | null)[][],
  position: Position,
  card: Card,
  playerId: string
): (PlacedCard | null)[][] {
  const newPyramid = pyramid.map(row => [...row]);
  newPyramid[position.row][position.col] = {
    card,
    position,
    playerId
  };
  return newPyramid;
}

// Check if a player can play any card
export function canPlayerPlay(
  player: Player,
  pyramid: (PlacedCard | null)[][]
): boolean {
  return player.cards.some(card =>
    getValidPositions(pyramid, card).length > 0
  );
}

// Check if the pyramid is complete
export function isPyramidComplete(pyramid: (PlacedCard | null)[][]): boolean {
  return pyramid[pyramid.length - 1][0] !== null;
}

// Calculate points for eliminated players
export function calculatePenaltyPoints(remainingCards: number): number {
  return remainingCards;
}

// Get next player who can play
export function getNextPlayer(
  gameState: GameState
): string | null {
  const currentIndex = gameState.players.findIndex(p => p.id === gameState.currentPlayerId);
  const playerCount = gameState.players.length;

  for (let i = 1; i <= playerCount; i++) {
    const nextIndex = (currentIndex + i) % playerCount;
    const nextPlayer = gameState.players[nextIndex];

    if (!nextPlayer.isEliminated && canPlayerPlay(nextPlayer, gameState.pyramid)) {
      return nextPlayer.id;
    }
  }

  return null;
}

// Check if round is over
export function isRoundOver(gameState: GameState): boolean {
  // Round is over if pyramid is complete
  if (isPyramidComplete(gameState.pyramid)) {
    return true;
  }

  // Or if no player can play
  const activePlayers = gameState.players.filter(p => !p.isEliminated);
  return !activePlayers.some(player => canPlayerPlay(player, gameState.pyramid));
}

// Initialize a new round
export function initializeRound(players: Player[]): GameState {
  const deck = shuffleDeck(createDeck());
  const { players: updatedPlayers, remainingCard } = dealCards(players, deck);

  const pyramid = initializePyramid(players.length);

  // For 5 players, place the remaining card in the bottom row
  if (players.length === 5 && remainingCard) {
    pyramid[0][0] = {
      card: remainingCard,
      position: { row: 0, col: 0 },
      playerId: 'initial'
    };
  }

  return {
    players: updatedPlayers.map(p => ({ ...p, isEliminated: false })),
    currentPlayerId: updatedPlayers[0].id,
    pyramid,
    round: 1,
    totalRounds: players.length,
    gameStatus: 'playing',
    eliminatedPlayers: []
  };
}

// AI Logic: Simple strategy for AI players
export function getAIMove(
  player: Player,
  pyramid: (PlacedCard | null)[][]
): { card: Card; position: Position } | null {
  // Try to play cards with fewer remaining options first
  const movesWithScores = player.cards.flatMap(card => {
    const positions = getValidPositions(pyramid, card);
    return positions.map(position => ({
      card,
      position,
      score: positions.length // Prefer cards with fewer placement options
    }));
  });

  if (movesWithScores.length === 0) {
    return null;
  }

  // Sort by score (fewer options = higher priority)
  movesWithScores.sort((a, b) => a.score - b.score);

  // Add some randomness to make AI less predictable
  const topMoves = movesWithScores.slice(0, Math.min(3, movesWithScores.length));
  const selectedMove = topMoves[Math.floor(Math.random() * topMoves.length)];

  return {
    card: selectedMove.card,
    position: selectedMove.position
  };
}