import React from 'react';
import { GridCell } from '../../../types/chimpTest';

interface GameGridProps {
  grid: GridCell[][];
  onCellClick: (row: number, col: number) => void;
}

export function GameGrid({ grid, onCellClick }: GameGridProps) {
  return (
    <div className="grid grid-cols-5 gap-2 w-full max-w-[500px] aspect-square">
      {grid.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <button
            key={`${rowIndex}-${colIndex}`}
            onClick={() => onCellClick(rowIndex, colIndex)}
            disabled={cell.number === 0 || cell.isClicked || cell.isWrong}
            className={`
              relative aspect-square rounded-lg text-2xl font-bold transition-all duration-200
              ${cell.number === 0 ? 'bg-gray-100 cursor-default' : 'bg-white shadow-md hover:shadow-lg active:scale-95 border-2 border-blue-500'}
              ${cell.isWrong ? 'bg-red-100 !shadow-none border-red-500' : ''}
              ${cell.isClicked ? 'bg-green-100 !shadow-none border-green-500' : ''}
              ${!cell.isRevealed && cell.number > 0 ? 'hover:bg-gray-50' : ''}
              disabled:cursor-not-allowed
            `}
          >
            {cell.isRevealed && cell.number > 0 && cell.number}
          </button>
        ))
      ))}
    </div>
  );
}