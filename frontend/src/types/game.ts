// Game types for Animal Party (Penguin Party)

export type CardColor = 'green' | 'yellow' | 'red' | 'purple' | 'blue';

export interface Card {
  id: string;
  color: CardColor;
}

export interface Player {
  id: string;
  name: string;
  isAI: boolean;
  cards: Card[];
  points: number;
  isEliminated: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export interface PlacedCard {
  card: Card;
  position: Position;
  playerId: string;
}

export interface GameState {
  players: Player[];
  currentPlayerId: string;
  pyramid: (PlacedCard | null)[][];
  round: number;
  totalRounds: number;
  gameStatus: 'setup' | 'playing' | 'roundEnd' | 'gameEnd';
  eliminatedPlayers: string[];
}

export interface GameSettings {
  playerCount: number;
  playerConfigs: PlayerConfig[];
}

export interface PlayerConfig {
  name: string;
  isAI: boolean;
}

// Card distribution constants
export const CARD_COUNTS: Record<CardColor, number> = {
  green: 8,
  yellow: 7,
  red: 7,
  purple: 7,
  blue: 7,
};

export const PYRAMID_ROWS = 8;
export const PYRAMID_BASE_WIDTH = 8;