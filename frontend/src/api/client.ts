import axios, { AxiosInstance } from 'axios';
import { paths } from './types';

type GameResponse = paths['/games']['post']['responses']['201']['content']['application/json'];
type CreateGameRequest = paths['/games']['post']['requestBody']['content']['application/json'];
type MoveRequest = paths['/games/{gameId}/moves']['post']['requestBody']['content']['application/json'];
type GameSummary = paths['/games']['get']['responses']['200']['content']['application/json'][0];
type AISuggestionRequest = paths['/ai/suggest-move']['post']['requestBody']['content']['application/json'];
type AISuggestionResponse = paths['/ai/suggest-move']['post']['responses']['200']['content']['application/json'];

export class GameAPIClient {
  private client: AxiosInstance;

  constructor(baseURL: string = 'http://localhost:3001/api') {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // Games endpoints
  async createGame(data: CreateGameRequest): Promise<GameResponse> {
    const response = await this.client.post<GameResponse>('/games', data);
    return response.data;
  }

  async listGames(): Promise<GameSummary[]> {
    const response = await this.client.get<GameSummary[]>('/games');
    return response.data;
  }

  async getGame(gameId: string): Promise<GameResponse> {
    const response = await this.client.get<GameResponse>(`/games/${gameId}`);
    return response.data;
  }

  async deleteGame(gameId: string): Promise<void> {
    await this.client.delete(`/games/${gameId}`);
  }

  // Gameplay endpoints
  async makeMove(gameId: string, data: MoveRequest): Promise<GameResponse> {
    const response = await this.client.post<GameResponse>(`/games/${gameId}/moves`, data);
    return response.data;
  }

  async requestAIMove(gameId: string, playerId: string): Promise<GameResponse> {
    const response = await this.client.post<GameResponse>(`/games/${gameId}/ai-move`, { playerId });
    return response.data;
  }

  async nextRound(gameId: string): Promise<GameResponse> {
    const response = await this.client.post<GameResponse>(`/games/${gameId}/next-round`);
    return response.data;
  }

  // AI endpoints
  async suggestMove(data: AISuggestionRequest): Promise<AISuggestionResponse> {
    const response = await this.client.post<AISuggestionResponse>('/ai/suggest-move', data);
    return response.data;
  }
}

// Export singleton instance
export const apiClient = new GameAPIClient();