export type GameState = 'initial' | 'showing' | 'playing' | 'gameover';

export interface ChimpStats {
  level: number;
  maxLevel: number;
  numbersShown: number;
  correctClicks: number;
  lives: number;
  highestNumber: number;
}

export interface GridCell {
  number: number;
  isRevealed: boolean;
  isClicked: boolean;
  isWrong: boolean;
}