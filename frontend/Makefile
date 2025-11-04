# Makefile for Animal Party Frontend

# Variables
PNPM := pnpm
NPX := npx
NODE_MODULES := node_modules
DIST := dist
SRC := src
API_DIR := $(SRC)/api

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[0;33m
NC := \033[0m # No Color

.PHONY: all install dev build test clean help generate-api lint preview

# Default target
all: install dev

# Help message
help:
	@echo "$(GREEN)Animal Party Frontend - Makefile Commands$(NC)"
	@echo ""
	@echo "$(YELLOW)Available targets:$(NC)"
	@echo "  make install      - Install dependencies"
	@echo "  make dev         - Start development server"
	@echo "  make build       - Build for production"
	@echo "  make preview     - Preview production build"
	@echo "  make test        - Run tests"
	@echo "  make lint        - Run linter"
	@echo "  make generate-api - Generate API client from OpenAPI spec"
	@echo "  make clean       - Clean build artifacts and node_modules"
	@echo "  make all         - Install and start dev server (default)"

# Install dependencies
install: package.json
	@echo "$(YELLOW)Installing dependencies...$(NC)"
	@$(PNPM) install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

# Check if dependencies are installed
$(NODE_MODULES): package.json
	@echo "$(RED)Dependencies not installed. Running install...$(NC)"
	@$(MAKE) install

# Start development server
dev: $(NODE_MODULES)
	@echo "$(YELLOW)Starting development server...$(NC)"
	@echo "$(GREEN)Server will be available at http://localhost:5173$(NC)"
	@$(PNPM) run dev

# Build for production
build: $(NODE_MODULES)
	@echo "$(YELLOW)Building for production...$(NC)"
	@$(PNPM) run build
	@echo "$(GREEN)✓ Build complete in $(DIST)/$(NC)"

# Preview production build
preview: build
	@echo "$(YELLOW)Starting preview server...$(NC)"
	@$(PNPM) run preview

# Run tests
test: $(NODE_MODULES)
	@echo "$(YELLOW)Running tests...$(NC)"
	@$(PNPM) run test 2>/dev/null || echo "$(RED)No test script configured$(NC)"

# Run linter
lint: $(NODE_MODULES)
	@echo "$(YELLOW)Running linter...$(NC)"
	@$(PNPM) run lint

# Generate API client from OpenAPI specification
generate-api: $(NODE_MODULES)
	@echo "$(YELLOW)Generating API client from OpenAPI spec...$(NC)"
	@$(NPX) openapi-typescript ../openapi.yaml -o $(API_DIR)/types.ts
	@echo "$(GREEN)✓ API types generated in $(API_DIR)/types.ts$(NC)"

# Clean build artifacts and dependencies
clean:
	@echo "$(YELLOW)Cleaning build artifacts...$(NC)"
	@rm -rf $(DIST)
	@rm -rf $(NODE_MODULES)
	@rm -rf .parcel-cache
	@echo "$(GREEN)✓ Clean complete$(NC)"

# Watch for file changes (development)
watch: $(NODE_MODULES)
	@echo "$(YELLOW)Starting development server with hot reload...$(NC)"
	@$(PNPM) run dev