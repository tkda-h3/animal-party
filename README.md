# Animal Party - Online Multiplayer Game

A web-based multiplayer implementation of the Penguin Party card game with real-time online gameplay, AI opponents, and room-based matchmaking.

## 🎮 Game Overview

Animal Party (based on Penguin Party) is a strategic card game where players build a pyramid with colored cards. The game features:
- **Online Multiplayer**: Play with friends using room codes
- **AI Opponents**: Challenge computer players with adjustable difficulty
- **Strategic Gameplay**: Plan your moves carefully to avoid penalties
- **Real-time Synchronization**: Seamless multiplayer experience

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/animal-party.git
cd animal-party

# Start both frontend and backend
docker-compose up

# Access the game at http://localhost:5173
```

### Manual Setup

```bash
# Backend setup
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend setup (in a new terminal)
cd frontend
npm install
cp .env.example .env
npm run dev

# Access the game at http://localhost:5173
```

## 🏗️ Architecture

```
animal-party/
├── frontend/           # React + TypeScript frontend
│   ├── src/           # Source code
│   ├── public/        # Static assets
│   └── Dockerfile     # Frontend container
├── backend/           # Node.js + Express backend
│   ├── src/           # Source code
│   ├── tests/         # Test files
│   └── Dockerfile     # Backend container
├── .tmp/              # Documentation and specifications
│   ├── specification/ # Technical specifications
│   └── sow/          # Work plans
└── docker-compose.yaml # Container orchestration
```

## 🎯 Features

### Core Game Features
- 2-6 player support
- Pyramid-based card placement
- Strategic color matching
- Round-based scoring system
- Penalty point calculation

### Multiplayer Features
- **Room System**: Create/join private rooms
- **Password Protection**: 6-digit secure rooms
- **AI Players**: Fill empty slots with AI
- **Difficulty Levels**: Easy, Normal, Hard AI
- **Auto-reconnection**: Rejoin after disconnection
- **Real-time Updates**: WebSocket synchronization

### Privacy & Security
- Only your cards are visible
- Opponent card counts displayed
- Authoritative server prevents cheating
- Rate limiting and input validation

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Redux Toolkit** - State management
- **Material-UI** - Component library
- **Socket.IO Client** - Real-time communication
- **Vite** - Build tool

### Backend
- **Node.js 20** - Runtime
- **Express.js** - Web framework
- **Socket.IO** - WebSocket server
- **TypeScript** - Type safety
- **Jest** - Testing framework
- **Winston** - Logging

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **Nginx** - Production web server

## 📖 How to Play

### Creating a Game
1. Click "Create Room"
2. Configure:
   - Number of players (2-6)
   - Number of AI players
   - AI difficulty level
3. Share Room ID and Password with friends

### Joining a Game
1. Click "Join Room"
2. Enter Room ID (e.g., ABC123)
3. Enter 6-digit password
4. Enter your name
5. Wait for host to start

### Game Rules
1. **Setup**: Cards distributed equally among players
2. **Building**: Create pyramid from bottom to top
   - First row: Place any card
   - Higher rows: Match color with support cards
3. **Elimination**: Can't play = penalty points
4. **Victory**: Least penalty points wins

## 🧪 Development

### Test-Driven Development (TDD)
We follow TDD principles for robust code:

```bash
# Backend testing
cd backend
npm test           # Watch mode
npm run test:ci    # Coverage report

# Frontend testing
cd frontend
npm test           # Interactive mode
npm run test:coverage
```

### Code Quality
```bash
# Linting
npm run lint

# Formatting
npm run format

# Type checking
npm run type-check
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)
```env
PORT=3001
CORS_ORIGIN=http://localhost:5173
LOG_LEVEL=debug
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3001
VITE_WS_URL=ws://localhost:3001
```

## 📚 Documentation

- **Architecture Specification**: `.tmp/specification/online-multiplayer/`
- **Implementation Plan**: `.tmp/sow/online-multiplayer/`
- **API Documentation**: See backend README
- **Component Documentation**: See frontend README

## 🚢 Deployment

### Production Build

```bash
# Build images
docker-compose build

# Run in production mode
docker-compose -f docker-compose.prod.yaml up
```

### Scaling Considerations
- In-memory storage (initial version)
- Supports ~100 concurrent rooms
- Redis adapter ready for horizontal scaling
- Database integration path available

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Write tests first (TDD)
4. Implement feature
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open Pull Request

## 📝 License

MIT License - see LICENSE file for details

## 🙏 Acknowledgments

- Original Penguin Party game by Reiner Knizia
- React and TypeScript communities
- Socket.IO for real-time capabilities

## 🔗 Links

- [Game Specification](/.tmp/specification/online-multiplayer/20251105-085051_architecture-and-requirements.md)
- [Work Plan](/.tmp/sow/online-multiplayer/20251105-085051_implementation-work-plan.md)
- [Frontend README](/frontend/README.md)
- [Backend README](/backend/README.md)

---

Built with ❤️ for board game enthusiasts