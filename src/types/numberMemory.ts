export type GameState = 'initial' | 'showing' | 'input' | 'success' | 'feedback' | 'gameover';

export interface GameResult {
  input: string;
  correct: string;
  incorrectIndices: number[];
}