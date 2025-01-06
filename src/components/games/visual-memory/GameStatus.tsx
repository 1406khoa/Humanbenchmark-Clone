import React from 'react';
import { Heart } from 'lucide-react';

interface GameStatusProps {
  level: number;
  lives: number;
  mistakes: number;
}

export function GameStatus({ level, lives, mistakes }: GameStatusProps) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
      <div>
        <div className="text-sm text-gray-600">Level</div>
        <div className="text-2xl font-bold text-gray-900">{level}</div>
      </div>
      
      <div className="flex space-x-1">
        {Array.from({ length: 3 }, (_, i) => (
          <Heart
            key={i}
            className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
          />
        ))}
      </div>

      <div>
        <div className="text-sm text-gray-600">Mistakes</div>
        <div className="flex space-x-1">
          {Array.from({ length: 3 }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < mistakes ? 'bg-yellow-500' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}