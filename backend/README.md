# Animal Party Backend

WebSocket-based multiplayer game server for Animal Party (Penguin Party) game.

## Features

- Real-time multiplayer gameplay using Socket.IO
- Room-based game sessions with password protection
- AI players with configurable difficulty levels
- Authoritative server architecture to prevent cheating
- Automatic reconnection handling
- TDD (Test-Driven Development) approach

## Tech Stack

- **Runtime**: Node.js 20+
- **Language**: TypeScript
- **Framework**: Express.js
- **WebSocket**: Socket.IO
- **Testing**: Jest
- **Validation**: Zod
- **Logging**: Winston

## Prerequisites

- Node.js 20 or higher
- npm or yarn
- Docker (optional)

## Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
```

## Development

```bash
# Run in development mode with hot reload
npm run dev

# Run tests in watch mode
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Check code quality
npm run lint
npm run format
```

## Building

```bash
# Build for production
npm run build

# Run production build
npm start
```

## Docker

```bash
# Build Docker image
docker build -t animal-party-backend .

# Run with Docker
docker run -p 3001:3001 animal-party-backend

# Or use docker-compose from root directory
docker-compose up backend
```

## Project Structure

```
backend/
├── src/
│   ├── server.ts           # Application entry point
│   ├── config/             # Configuration files
│   ├── socket/             # WebSocket event handlers
│   │   ├── roomHandlers.ts
│   │   └── gameHandlers.ts
│   ├── room/               # Room management
│   │   └── RoomManager.ts
│   ├── game/               # Game logic
│   │   ├── GameSession.ts
│   │   ├── gameLogic.ts
│   │   └── AIPlayer.ts
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── tests/
│   ├── unit/               # Unit tests
│   ├── integration/        # Integration tests
│   └── e2e/                # End-to-end tests
└── dist/                   # Compiled JavaScript (generated)
```

## API Documentation

### WebSocket Events

#### Client → Server

- `room:create` - Create a new room
- `room:join` - Join an existing room
- `room:leave` - Leave current room
- `room:ready` - Mark player as ready
- `game:start` - Start the game
- `game:placeCard` - Place a card on the pyramid
- `game:pass` - Pass turn (when no valid moves)

#### Server → Client

- `room:created` - Room successfully created
- `room:joined` - Successfully joined room
- `room:playerUpdate` - Player list updated
- `game:stateUpdate` - Game state changed
- `game:cardPlaced` - Card was placed
- `game:turnChanged` - Active player changed
- `game:roundEnd` - Round completed
- `game:end` - Game finished

### REST Endpoints

- `GET /health` - Health check
- `POST /api/rooms` - Create a new room
- `GET /api/rooms/:id` - Get room information

## Environment Variables

See `.env.example` for all available configuration options.

Key variables:
- `PORT` - Server port (default: 3001)
- `CORS_ORIGIN` - Allowed CORS origin
- `NODE_ENV` - Environment (development/production)
- `LOG_LEVEL` - Logging level (debug/info/warn/error)

## Testing Strategy

We follow TDD (Test-Driven Development) principles:

1. **Write failing tests first** - Define expected behavior
2. **Implement minimal code** - Make tests pass
3. **Refactor** - Improve code quality

### Test Categories

- **Unit Tests**: Test individual functions and classes
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete game scenarios

### Running Tests

```bash
# Run all tests with coverage
npm run test:ci

# Run tests in watch mode
npm test

# Run specific test file
npm test -- RoomManager.test.ts
```

## Security

- Password-protected rooms (6-digit numeric passwords)
- Rate limiting on all endpoints
- Input validation using Zod schemas
- Authoritative server prevents cheating
- Session timeout for idle rooms

## Performance

- In-memory storage for low latency
- Efficient state synchronization
- Automatic cleanup of inactive rooms
- Optimized for 100+ concurrent rooms

## License

MIT