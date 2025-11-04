import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { store } from './store/store';
import { GameSetup } from './components/GameSetup';
import { GameBoard } from './components/GameBoard';
import { setGameSettings, startGame } from './store/gameSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store/store';
import { PlayerConfig } from './types/game';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff9800',
    },
  },
});

const GameApp: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const gameState = useSelector((state: RootState) => state.game.gameState);

  const handleStartGame = (playerCount: number, playerConfigs: PlayerConfig[]) => {
    dispatch(setGameSettings({ playerCount, playerConfigs }));
    dispatch(startGame());
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      {!gameState ? (
        <GameSetup onStartGame={handleStartGame} />
      ) : (
        <GameBoard />
      )}
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GameApp />
      </ThemeProvider>
    </Provider>
  );
}

export default App;