import { GridConfig, GridSquare } from '../types/visualMemory';

export function getGridSize(level: number): number {
  // Increase grid size every 3 levels (3x3 -> 4x4 -> 5x5, etc.)
  return Math.min(3 + Math.floor((level - 1) / 3), 7);
}

export function getNumHighlightedSquares(level: number): number {
  // Start with 3 squares at level 1, increase by 1 each level
  return 2 + level;
}

export function createGrid(size: number, numHighlighted: number): GridConfig {
  // Initialize empty grid
  const grid: GridSquare[][] = Array(size).fill(null).map(() =>
    Array(size).fill(null).map(() => ({
      isHighlighted: false,
      isClicked: false,
      isWrongClick: false,
    }))
  );

  // Randomly select squares to highlight
  const highlighted = new Set<string>();
  while (highlighted.size < numHighlighted) {
    const row = Math.floor(Math.random() * size);
    const col = Math.floor(Math.random() * size);
    const id = `${row}-${col}`;
    
    if (!highlighted.has(id)) {
      highlighted.add(id);
      grid[row][col].isHighlighted = true;
    }
  }

  return { grid, highlighted };
}