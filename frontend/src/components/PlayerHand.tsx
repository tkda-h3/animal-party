import React from 'react';
import { Box, Typography, Paper, Chip } from '@mui/material';
import { Player, Card as CardType } from '../types/game';
import { Card } from './Card';

interface PlayerHandProps {
  player: Player;
  isCurrentPlayer: boolean;
  onCardSelect?: (card: CardType) => void;
  selectedCard: CardType | null;
}

export const PlayerHand: React.FC<PlayerHandProps> = ({
  player,
  isCurrentPlayer,
  onCardSelect,
  selectedCard
}) => {
  return (
    <Paper
      elevation={isCurrentPlayer ? 6 : 2}
      sx={{
        p: 2,
        backgroundColor: isCurrentPlayer ? '#e3f2fd' : '#f5f5f5',
        border: isCurrentPlayer ? '2px solid #2196f3' : 'none'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6" component="div">
          {player.name} {player.isAI && <Chip label="AI" size="small" color="secondary" />}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {isCurrentPlayer && <Chip label="Your Turn" color="primary" size="small" />}
          {player.isEliminated && <Chip label="Eliminated" color="error" size="small" />}
          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
            Points: {player.points}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', minHeight: 120 }}>
        {player.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={isCurrentPlayer && !player.isEliminated ? () => onCardSelect?.(card) : undefined}
            selected={selectedCard?.id === card.id}
          />
        ))}
        {player.cards.length === 0 && !player.isEliminated && (
          <Typography variant="body2" color="text.secondary">
            No cards in hand
          </Typography>
        )}
      </Box>
    </Paper>
  );
};