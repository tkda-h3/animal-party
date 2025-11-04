import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  Switch,
  FormControlLabel
} from '@mui/material';
import { PlayerConfig } from '../types/game';

interface GameSetupProps {
  onStartGame: (playerCount: number, playerConfigs: PlayerConfig[]) => void;
}

export const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [playerConfigs, setPlayerConfigs] = useState<PlayerConfig[]>([
    { name: 'Player 1', isAI: false },
    { name: 'Player 2', isAI: true }
  ]);

  const handlePlayerCountChange = (count: number) => {
    setPlayerCount(count);

    const newConfigs: PlayerConfig[] = [];
    for (let i = 0; i < count; i++) {
      if (i < playerConfigs.length) {
        newConfigs.push(playerConfigs[i]);
      } else {
        newConfigs.push({
          name: `Player ${i + 1}`,
          isAI: i > 0 // Default to AI for players other than the first
        });
      }
    }
    setPlayerConfigs(newConfigs.slice(0, count));
  };

  const handlePlayerConfigChange = (index: number, config: Partial<PlayerConfig>) => {
    const newConfigs = [...playerConfigs];
    newConfigs[index] = { ...newConfigs[index], ...config };
    setPlayerConfigs(newConfigs);
  };

  const handleStartGame = () => {
    onStartGame(playerCount, playerConfigs);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Animal Party Setup
      </Typography>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Number of Players</InputLabel>
          <Select
            value={playerCount}
            onChange={(e) => handlePlayerCountChange(e.target.value as number)}
            label="Number of Players"
          >
            {[2, 3, 4, 5, 6].map(num => (
              <MenuItem key={num} value={num}>{num} Players</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Typography variant="h6" gutterBottom>
        Player Configuration
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
        {playerConfigs.map((config, index) => (
          <Paper key={index} sx={{ p: 2 }} variant="outlined">
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                label="Name"
                value={config.name}
                onChange={(e) => handlePlayerConfigChange(index, { name: e.target.value })}
                sx={{ flex: 1 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={config.isAI}
                    onChange={(e) => handlePlayerConfigChange(index, { isAI: e.target.checked })}
                  />
                }
                label="AI Player"
              />
            </Box>
          </Paper>
        ))}
      </Box>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        onClick={handleStartGame}
        disabled={!playerConfigs.every(p => p.name.trim())}
      >
        Start Game
      </Button>
    </Paper>
  );
};