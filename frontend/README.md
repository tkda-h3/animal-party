# Animal Party Frontend

## Overview

Animal Party is a web-based implementation of the Penguin Party board game. This frontend is built with React, TypeScript, and Redux Toolkit.

## Features

- 2-6 player support (human or AI)
- Interactive pyramid-based card placement
- Real-time game state management
- AI opponent logic
- Beautiful Material UI design

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager

## Installation

```bash
# Install pnpm if not already installed
npm install -g pnpm

# Install dependencies
pnpm install

# Generate API client from OpenAPI spec
npx openapi-typescript ../openapi.yaml -o ./src/api/types.ts
```

## Development

```bash
# Start development server
pnpm run dev

# The app will be available at http://localhost:5173
```

## Production Build

```bash
# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Using Make

```bash
# Install dependencies
make install

# Start development server
make dev

# Build for production
make build

# Run all (install + dev)
make all
```

## Project Structure

```
frontend/
├── src/
│   ├── api/          # Generated API client
│   ├── components/   # React components
│   ├── store/        # Redux store and slices
│   ├── types/        # TypeScript type definitions
│   ├── utils/        # Game logic utilities
│   └── App.tsx       # Main application component
├── public/           # Static assets
├── Makefile         # Build automation
├── package.json
└── README.md
```

## Game Rules

### Setup
- Choose 2-6 players
- Each player can be human or AI
- Cards are distributed equally among players

### Gameplay
- Build a pyramid with 8 rows (8 cards at base, decreasing to 1 at top)
- First row: Place any card
- Higher rows: Card must match color of at least one supporting card
- Players who cannot play are eliminated with penalty points
- Game continues for rounds equal to number of players

### Winning
- Player with fewest penalty points wins

## API Integration

The frontend is designed to work with a backend API defined in `openapi.yaml`. The API client is automatically generated from the OpenAPI specification.

## Technologies

- **React 19**: UI framework
- **TypeScript**: Type safety
- **Redux Toolkit**: State management
- **Material-UI**: Component library
- **Vite**: Build tool
- **Axios**: HTTP client
- **pnpm**: Package manager
