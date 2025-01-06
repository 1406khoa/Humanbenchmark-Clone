import React from 'react';
import { Brain, Heart } from 'lucide-react';

interface GameStatusProps {
  level: number;
  numbersShown: number;
  lives: number;
}

export function GameStatus({ level, numbersShown, lives }: GameStatusProps) {
  return (
    <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
      <div>
        <div className="text-sm text-gray-600">Level</div>
        <div className="text-2xl font-bold text-gray-900">{level}</div>
      </div>

      <div>
        <div className="text-sm text-gray-600">Numbers</div>
        <div className="text-2xl font-bold text-indigo-600">{numbersShown}</div>
      </div>

      <div>
        <div className="text-sm text-gray-600">Lives</div>
        <div className="flex space-x-1">
          {Array.from({ length: 3 }, (_, i) => (
            <Heart
              key={i}
              className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}