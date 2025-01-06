import React from 'react';
import { GameState, GridSquare } from '../../../types/visualMemory';
import { MemorySquare } from './MemorySquare';

interface MemoryGridProps {
  grid: GridSquare[][];
  gameState: GameState;
  onSquareClick: (row: number, col: number) => void;
}

export function MemoryGrid({ grid, gameState, onSquareClick }: MemoryGridProps) {
  const gridSize = grid.length;
  
  return (
    <div className="w-full max-w-[400px] aspect-square p-4 bg-gray-100 rounded-xl shadow-lg">
      <div 
        className="grid h-full w-full gap-2"
        style={{
          gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
        }}
      >
        {grid.map((row, rowIndex) => (
          row.map((square, colIndex) => (
            <MemorySquare
              key={`${rowIndex}-${colIndex}`}
              isHighlighted={square.isHighlighted}
              isClicked={square.isClicked}
              isWrongClick={square.isWrongClick}
              gameState={gameState}
              onClick={() => onSquareClick(rowIndex, colIndex)}
            />
          ))
        ))}
      </div>
    </div>
  );
}