import React from 'react';
import { Card as CardType, CardColor } from '../types/game';
import { Box, Paper } from '@mui/material';

interface CardProps {
  card: CardType | null;
  onClick?: () => void;
  selected?: boolean;
  small?: boolean;
}

const colorMap: Record<CardColor, string> = {
  green: '#4caf50',
  yellow: '#ffeb3b',
  red: '#f44336',
  purple: '#9c27b0',
  blue: '#2196f3'
};

const animalEmojis: Record<CardColor, string> = {
  green: '🐧',
  yellow: '🦆',
  red: '🦩',
  purple: '🦜',
  blue: '🐦'
};

export const Card: React.FC<CardProps> = ({ card, onClick, selected = false, small = false }) => {
  if (!card) {
    return (
      <Box
        sx={{
          width: small ? 50 : 80,
          height: small ? 70 : 112,
          border: '2px dashed #ccc',
          borderRadius: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      />
    );
  }

  return (
    <Paper
      elevation={selected ? 8 : 3}
      onClick={onClick}
      sx={{
        width: small ? 50 : 80,
        height: small ? 70 : 112,
        backgroundColor: colorMap[card.color],
        border: selected ? '3px solid #000' : '1px solid #666',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s',
        '&:hover': onClick ? {
          transform: 'scale(1.05)',
          boxShadow: 6
        } : undefined
      }}
    >
      <Box sx={{ fontSize: small ? 24 : 36 }}>
        {animalEmojis[card.color]}
      </Box>
    </Paper>
  );
};