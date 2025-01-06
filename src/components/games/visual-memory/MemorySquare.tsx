import React from 'react';
import { GameState } from '../../../types/visualMemory';
import { Check, X } from 'lucide-react';

interface MemorySquareProps {
  isHighlighted: boolean;
  isClicked: boolean;
  isWrongClick: boolean;
  gameState: GameState;
  onClick: () => void;
}

export function MemorySquare({ 
  isHighlighted, 
  isClicked, 
  isWrongClick,
  gameState,
  onClick 
}: MemorySquareProps) {
  const isFlipped = (gameState === 'showing' && isHighlighted) || 
                   isClicked || 
                   isWrongClick;

  return (
    <div className="relative w-full h-full preserve-3d">
      <button
        onClick={onClick}
        disabled={gameState !== 'playing'}
        className={`
          w-full h-full transition-all duration-500 preserve-3d
          ${isFlipped ? 'rotate-y-180' : ''}
          disabled:cursor-not-allowed
        `}
      >
        {/* Front face (white) */}
        <div className="absolute inset-0 w-full h-full backface-hidden">
          <div className="w-full h-full bg-white rounded-lg shadow-md 
                        hover:scale-105 active:scale-95 
                        transition-transform duration-200" />
        </div>

        {/* Back face (colored) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
          <div className={`
            w-full h-full rounded-lg shadow-md flex items-center justify-center
            ${isWrongClick ? 'bg-red-500' : (isHighlighted || isClicked) ? 'bg-indigo-500' : 'bg-white'}
          `}>
            {isWrongClick ? (
              <X className="w-8 h-8 text-white" />
            ) : isClicked ? (
              <Check className="w-8 h-8 text-white" />
            ) : null}
          </div>
        </div>
      </button>
    </div>
  );
}