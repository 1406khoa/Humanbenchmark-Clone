export type GameState = 'initial' | 'showing' | 'playing' | 'gameover';

export interface GridSquare {
  isHighlighted: boolean;
  isClicked: boolean;
  isWrongClick: boolean;
}

export interface GridConfig {
  grid: GridSquare[][];
  highlighted: Set<string>;
}