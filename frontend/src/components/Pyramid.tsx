import React from 'react';
import { Box, Paper } from '@mui/material';
import { PlacedCard, Position } from '../types/game';
import { Card } from './Card';

interface PyramidProps {
  pyramid: (PlacedCard | null)[][];
  highlightedPositions: Position[];
  onPositionClick: (position: Position) => void;
}

export const Pyramid: React.FC<PyramidProps> = ({
  pyramid,
  highlightedPositions,
  onPositionClick
}) => {
  const isPositionHighlighted = (row: number, col: number): boolean => {
    return highlightedPositions.some(pos => pos.row === row && pos.col === col);
  };

  // Reverse the pyramid display to show bottom row at the bottom
  // pyramid[0] is the bottom row (widest), should appear at the bottom of the screen
  const reversedPyramid = [...pyramid].reverse();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 0.5,
        p: 2,
        backgroundColor: '#f5f5f5',
        borderRadius: 2
      }}
    >
      {reversedPyramid.map((row, visualRowIndex) => {
        // Calculate the actual row index in the original pyramid array
        const actualRowIndex = pyramid.length - 1 - visualRowIndex;

        return (
          <Box
            key={actualRowIndex}
            sx={{
              display: 'flex',
              gap: 0.5,
              justifyContent: 'center'
            }}
          >
            {row.map((placedCard, colIndex) => (
              <Box
                key={`${actualRowIndex}-${colIndex}`}
                onClick={() => onPositionClick({ row: actualRowIndex, col: colIndex })}
                sx={{
                  position: 'relative',
                  cursor: isPositionHighlighted(actualRowIndex, colIndex) ? 'pointer' : 'default'
                }}
              >
                {isPositionHighlighted(actualRowIndex, colIndex) && (
                  <Paper
                    sx={{
                      position: 'absolute',
                      top: -4,
                      left: -4,
                      right: -4,
                      bottom: -4,
                      backgroundColor: 'rgba(76, 175, 80, 0.3)',
                      border: '2px solid #4caf50',
                      borderRadius: 1,
                      animation: 'pulse 1.5s infinite',
                      '@keyframes pulse': {
                        '0%': {
                          opacity: 0.5,
                          transform: 'scale(1)'
                        },
                        '50%': {
                          opacity: 0.8,
                          transform: 'scale(1.05)'
                        },
                        '100%': {
                          opacity: 0.5,
                          transform: 'scale(1)'
                        }
                      }
                    }}
                  />
                )}
                <Card
                  card={placedCard?.card || null}
                  small={true}
                />
              </Box>
            ))}
          </Box>
        );
      })}
    </Box>
  );
};