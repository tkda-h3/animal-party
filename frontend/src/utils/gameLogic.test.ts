import { describe, it, expect } from 'vitest';
import {
  createDeck,
  shuffleDeck,
  dealCards,
  initializePyramid,
  isValidPlacement,
  placeCard,
  canPlayerPlay,
  isPyramidComplete,
  getValidPositions
} from './gameLogic';
import { Card, Player, PlacedCard } from '../types/game';

describe('gameLogic', () => {
  describe('createDeck', () => {
    it('should create a deck with 36 cards', () => {
      const deck = createDeck();
      expect(deck.length).toBe(36);
    });

    it('should have correct color distribution', () => {
      const deck = createDeck();
      const colorCounts = deck.reduce((acc, card) => {
        acc[card.color] = (acc[card.color] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      expect(colorCounts.green).toBe(8);
      expect(colorCounts.yellow).toBe(7);
      expect(colorCounts.red).toBe(7);
      expect(colorCounts.purple).toBe(7);
      expect(colorCounts.blue).toBe(7);
    });
  });

  describe('dealCards', () => {
    const deck = createDeck();

    it('should deal 14 cards to each player for 2 players', () => {
      const players: Player[] = [
        { id: '1', name: 'Player 1', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '2', name: 'Player 2', isAI: false, cards: [], points: 0, isEliminated: false }
      ];
      const { players: dealtPlayers, remainingCard } = dealCards(players, deck);

      expect(dealtPlayers[0].cards.length).toBe(14);
      expect(dealtPlayers[1].cards.length).toBe(14);
      expect(remainingCard).toBeNull();
    });

    it('should deal 12 cards to each player for 3 players', () => {
      const players: Player[] = [
        { id: '1', name: 'Player 1', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '2', name: 'Player 2', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '3', name: 'Player 3', isAI: false, cards: [], points: 0, isEliminated: false }
      ];
      const { players: dealtPlayers, remainingCard } = dealCards(players, deck);

      expect(dealtPlayers[0].cards.length).toBe(12);
      expect(dealtPlayers[1].cards.length).toBe(12);
      expect(dealtPlayers[2].cards.length).toBe(12);
      expect(remainingCard).toBeNull();
    });

    it('should deal 9 cards to each player for 4 players', () => {
      const players: Player[] = [
        { id: '1', name: 'Player 1', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '2', name: 'Player 2', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '3', name: 'Player 3', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '4', name: 'Player 4', isAI: false, cards: [], points: 0, isEliminated: false }
      ];
      const { players: dealtPlayers, remainingCard } = dealCards(players, deck);

      expect(dealtPlayers[0].cards.length).toBe(9);
      expect(dealtPlayers[1].cards.length).toBe(9);
      expect(dealtPlayers[2].cards.length).toBe(9);
      expect(dealtPlayers[3].cards.length).toBe(9);
      expect(remainingCard).toBeNull();
    });

    it('should deal 7 cards to each player for 5 players with 1 remaining card', () => {
      const players: Player[] = [
        { id: '1', name: 'Player 1', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '2', name: 'Player 2', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '3', name: 'Player 3', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '4', name: 'Player 4', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '5', name: 'Player 5', isAI: false, cards: [], points: 0, isEliminated: false }
      ];
      const { players: dealtPlayers, remainingCard } = dealCards(players, deck);

      expect(dealtPlayers[0].cards.length).toBe(7);
      expect(dealtPlayers[1].cards.length).toBe(7);
      expect(dealtPlayers[2].cards.length).toBe(7);
      expect(dealtPlayers[3].cards.length).toBe(7);
      expect(dealtPlayers[4].cards.length).toBe(7);
      expect(remainingCard).not.toBeNull();
    });

    it('should deal 6 cards to each player for 6 players', () => {
      const players: Player[] = [
        { id: '1', name: 'Player 1', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '2', name: 'Player 2', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '3', name: 'Player 3', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '4', name: 'Player 4', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '5', name: 'Player 5', isAI: false, cards: [], points: 0, isEliminated: false },
        { id: '6', name: 'Player 6', isAI: false, cards: [], points: 0, isEliminated: false }
      ];
      const { players: dealtPlayers, remainingCard } = dealCards(players, deck);

      expect(dealtPlayers[0].cards.length).toBe(6);
      expect(dealtPlayers[1].cards.length).toBe(6);
      expect(dealtPlayers[2].cards.length).toBe(6);
      expect(dealtPlayers[3].cards.length).toBe(6);
      expect(dealtPlayers[4].cards.length).toBe(6);
      expect(dealtPlayers[5].cards.length).toBe(6);
      expect(remainingCard).toBeNull();
    });
  });

  describe('initializePyramid', () => {
    it('should create 7 rows for 2 players', () => {
      const pyramid = initializePyramid(2);
      expect(pyramid.length).toBe(7);
      expect(pyramid[0].length).toBe(7); // Bottom row
      expect(pyramid[6].length).toBe(1); // Top row
    });

    it('should create 8 rows for 3-6 players', () => {
      [3, 4, 5, 6].forEach(playerCount => {
        const pyramid = initializePyramid(playerCount);
        expect(pyramid.length).toBe(8);
        expect(pyramid[0].length).toBe(8); // Bottom row
        expect(pyramid[7].length).toBe(1); // Top row
      });
    });

    it('should have correct pyramid structure', () => {
      const pyramid = initializePyramid(4);
      expect(pyramid[0].length).toBe(8); // Bottom
      expect(pyramid[1].length).toBe(7);
      expect(pyramid[2].length).toBe(6);
      expect(pyramid[3].length).toBe(5);
      expect(pyramid[4].length).toBe(4);
      expect(pyramid[5].length).toBe(3);
      expect(pyramid[6].length).toBe(2);
      expect(pyramid[7].length).toBe(1); // Top
    });
  });

  describe('isValidPlacement', () => {
    it('should allow any color on the bottom row', () => {
      const pyramid = initializePyramid(4);
      const greenCard: Card = { id: '1', color: 'green' };
      const redCard: Card = { id: '2', color: 'red' };

      expect(isValidPlacement(pyramid, { row: 0, col: 0 }, greenCard)).toBe(true);
      expect(isValidPlacement(pyramid, { row: 0, col: 3 }, redCard)).toBe(true);
    });

    it('should require supporting cards for upper rows', () => {
      const pyramid = initializePyramid(4);
      const greenCard: Card = { id: '1', color: 'green' };

      // Try to place on second row without support
      expect(isValidPlacement(pyramid, { row: 1, col: 0 }, greenCard)).toBe(false);

      // Place two cards on bottom row
      pyramid[0][0] = {
        card: { id: '2', color: 'green' },
        position: { row: 0, col: 0 },
        playerId: '1'
      };
      pyramid[0][1] = {
        card: { id: '3', color: 'blue' },
        position: { row: 0, col: 1 },
        playerId: '1'
      };

      // Now should be able to place green card (matches left support)
      expect(isValidPlacement(pyramid, { row: 1, col: 0 }, greenCard)).toBe(true);

      // Blue card should also be valid (matches right support)
      const blueCard: Card = { id: '4', color: 'blue' };
      expect(isValidPlacement(pyramid, { row: 1, col: 0 }, blueCard)).toBe(true);

      // Red card should not be valid (doesn't match either support)
      const redCard: Card = { id: '5', color: 'red' };
      expect(isValidPlacement(pyramid, { row: 1, col: 0 }, redCard)).toBe(false);
    });

    it('should check bounds correctly', () => {
      const pyramid = initializePyramid(4);
      const card: Card = { id: '1', color: 'green' };

      // Out of bounds positions
      expect(isValidPlacement(pyramid, { row: -1, col: 0 }, card)).toBe(false);
      expect(isValidPlacement(pyramid, { row: 8, col: 0 }, card)).toBe(false);
      expect(isValidPlacement(pyramid, { row: 0, col: -1 }, card)).toBe(false);
      expect(isValidPlacement(pyramid, { row: 0, col: 8 }, card)).toBe(false);
    });

    it('should not allow placement on occupied positions', () => {
      const pyramid = initializePyramid(4);
      const card: Card = { id: '1', color: 'green' };

      // Place a card
      pyramid[0][0] = {
        card: { id: '2', color: 'green' },
        position: { row: 0, col: 0 },
        playerId: '1'
      };

      // Should not be able to place on the same position
      expect(isValidPlacement(pyramid, { row: 0, col: 0 }, card)).toBe(false);
    });
  });

  describe('getValidPositions', () => {
    it('should return all empty positions on bottom row for any card', () => {
      const pyramid = initializePyramid(4);
      const card: Card = { id: '1', color: 'green' };

      const positions = getValidPositions(pyramid, card);
      expect(positions.length).toBe(8); // All 8 positions on bottom row
      expect(positions.every(p => p.row === 0)).toBe(true);
    });

    it('should return correct positions for upper rows based on color matching', () => {
      const pyramid = initializePyramid(4);

      // Set up bottom row with green and blue cards
      pyramid[0][0] = {
        card: { id: '1', color: 'green' },
        position: { row: 0, col: 0 },
        playerId: '1'
      };
      pyramid[0][1] = {
        card: { id: '2', color: 'blue' },
        position: { row: 0, col: 1 },
        playerId: '1'
      };
      pyramid[0][2] = {
        card: { id: '3', color: 'red' },
        position: { row: 0, col: 2 },
        playerId: '1'
      };

      // Green card should be valid above green-blue pair
      const greenCard: Card = { id: '4', color: 'green' };
      const greenPositions = getValidPositions(pyramid, greenCard);
      expect(greenPositions.some(p => p.row === 1 && p.col === 0)).toBe(true);

      // Purple card should not have valid positions on row 1
      const purpleCard: Card = { id: '5', color: 'purple' };
      const purplePositions = getValidPositions(pyramid, purpleCard);
      expect(purplePositions.every(p => p.row === 0)).toBe(true); // Only bottom row
    });
  });

  describe('complex pyramid scenarios', () => {
    it('should handle 5-player initial card placement', () => {
      const pyramid = initializePyramid(5);
      const remainingCard: Card = { id: 'initial', color: 'yellow' };

      // Place initial card for 5 players
      pyramid[0][0] = {
        card: remainingCard,
        position: { row: 0, col: 0 },
        playerId: 'initial'
      };

      // Next card can be placed at position [0][1]
      const nextCard: Card = { id: '1', color: 'green' };
      expect(isValidPlacement(pyramid, { row: 0, col: 1 }, nextCard)).toBe(true);

      // Cannot place on the already occupied position
      expect(isValidPlacement(pyramid, { row: 0, col: 0 }, nextCard)).toBe(false);
    });

    it('should correctly validate multi-level pyramid placement', () => {
      const pyramid = initializePyramid(4);

      // Build a partial pyramid
      // Bottom row: G B R P
      pyramid[0][0] = { card: { id: '1', color: 'green' }, position: { row: 0, col: 0 }, playerId: '1' };
      pyramid[0][1] = { card: { id: '2', color: 'blue' }, position: { row: 0, col: 1 }, playerId: '1' };
      pyramid[0][2] = { card: { id: '3', color: 'red' }, position: { row: 0, col: 2 }, playerId: '1' };
      pyramid[0][3] = { card: { id: '4', color: 'purple' }, position: { row: 0, col: 3 }, playerId: '1' };

      // Second row: G(valid), R(valid)
      const greenCard: Card = { id: '5', color: 'green' };
      const redCard: Card = { id: '6', color: 'red' };
      const yellowCard: Card = { id: '7', color: 'yellow' };

      // Green can go at [1][0] (supported by green-blue)
      expect(isValidPlacement(pyramid, { row: 1, col: 0 }, greenCard)).toBe(true);

      // Red can go at [1][1] (supported by blue-red) or [1][2] (supported by red-purple)
      expect(isValidPlacement(pyramid, { row: 1, col: 1 }, redCard)).toBe(true);
      expect(isValidPlacement(pyramid, { row: 1, col: 2 }, redCard)).toBe(true);

      // Yellow cannot go at [1][0] (not matching green or blue)
      expect(isValidPlacement(pyramid, { row: 1, col: 0 }, yellowCard)).toBe(false);
    });
  });
});