# Animal Party Frontend

## Overview

Animal Party is a web-based implementation of the Penguin Party board game with online multiplayer support. This frontend is built with React, TypeScript, Redux Toolkit, and Socket.IO for real-time communication.

## Features

### Game Features
- 2-6 player support (human or AI)
- Interactive pyramid-based card placement
- Real-time game state management
- Beautiful Material UI design

### Online Multiplayer Features (New!)
- **Room System**: Create/join rooms with unique ID and password
- **Real-time Gameplay**: Synchronized game state via WebSocket
- **AI Players**: Configure AI opponents with difficulty levels
- **Privacy Control**: Only your hand is visible, opponents show card count
- **Automatic Reconnection**: Rejoin games after disconnection
- **Room Management**: Host controls game settings and start

## Prerequisites

- Node.js (v20 or higher)
- npm or pnpm package manager
- Docker (optional, for containerized deployment)

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Update .env with your backend URL:
# VITE_API_URL=http://localhost:3001
# VITE_WS_URL=ws://localhost:3001
```

## Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:5173

# Run with backend using Docker
docker-compose up
```

## Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Build and run with Docker
docker build -t animal-party-frontend .
docker run -p 80:80 animal-party-frontend
```

## Project Structure

```
frontend/
├── src/
│   ├── api/          # Backend API integration
│   ├── components/   # React components
│   │   ├── Card.tsx
│   │   ├── GameBoard.tsx
│   │   ├── GameSetup.tsx
│   │   ├── PlayerHand.tsx
│   │   ├── Pyramid.tsx
│   │   ├── RoomCreate.tsx    # (New) Room creation
│   │   ├── RoomJoin.tsx      # (New) Room joining
│   │   └── WaitingRoom.tsx   # (New) Pre-game lobby
│   ├── hooks/        # Custom React hooks
│   │   ├── useSocket.ts      # (New) WebSocket connection
│   │   └── useGameSync.ts    # (New) Game state sync
│   ├── store/        # Redux store and slices
│   │   ├── gameSlice.ts
│   │   ├── roomSlice.ts      # (New) Room state
│   │   └── store.ts
│   ├── types/        # TypeScript type definitions
│   ├── utils/        # Game logic utilities
│   └── App.tsx       # Main application component
├── public/           # Static assets
├── Dockerfile        # Docker configuration
├── nginx.conf        # Production server config
└── README.md
```

## Game Rules

### Setup
- Choose 2-6 total players
- Configure human players (1-6)
- Configure AI players (0-5)
- Set AI difficulty (Easy/Normal/Hard)
- Cards are distributed equally

### Gameplay
- Build a pyramid with cards
- First row: Place any card freely
- Higher rows: Card must match color of at least one supporting card
- Players who cannot play are eliminated with penalty points
- Only your cards are visible, others show card count

### Winning
- Complete rounds equal to number of players
- Player with fewest penalty points wins

## Online Multiplayer

### Creating a Room
1. Click "Create Room"
2. Set player count and AI configuration
3. Share Room ID and password with friends

### Joining a Room
1. Click "Join Room"
2. Enter Room ID and 6-digit password
3. Enter your player name
4. Wait for host to start game

### Room Features
- **Room ID**: 6-character alphanumeric code (e.g., ABC123)
- **Password**: 6-digit number for security
- **Host Controls**: Only room creator can modify settings and start
- **Ready System**: All players must be ready before game starts

## Environment Variables

```env
# Backend API URL
VITE_API_URL=http://localhost:3001

# WebSocket URL
VITE_WS_URL=ws://localhost:3001

# Other configurations
VITE_APP_NAME=Animal Party
VITE_APP_VERSION=2.0.0
```

## Technologies

### Core
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Redux Toolkit**: State management
- **Material-UI**: Component library
- **Vite**: Build tool

### Networking
- **Socket.IO Client**: Real-time WebSocket communication
- **Axios**: REST API client

### Development
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Jest**: Testing framework
- **Docker**: Containerization

## Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

## Docker Support

```bash
# Development with hot reload
docker-compose up frontend

# Production build
docker build -t animal-party-frontend .
docker run -p 80:80 animal-party-frontend
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT