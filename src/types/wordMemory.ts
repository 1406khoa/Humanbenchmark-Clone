export type GameState = 'initial' | 'playing' | 'feedback' | 'gameover';

export interface WordResult {
  word: string;
  isNew: boolean;
  correct: boolean;
}

export interface GameStats {
  score: number;
  streak: number;
  lives: number;
  seen: Set<string>;
  results: WordResult[];
}