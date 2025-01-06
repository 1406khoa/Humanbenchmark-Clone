import React from 'react';
import { Heart, Trophy, Zap } from 'lucide-react';

interface GameStatusProps {
  score: number;
  streak: number;
  lives: number;
}

export function GameStatus({ score, streak, lives }: GameStatusProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center space-x-2 text-gray-600 mb-1">
          <Trophy className="w-4 h-4" />
          <span className="text-sm">Score</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{score}</div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center space-x-2 text-gray-600 mb-1">
          <Zap className="w-4 h-4" />
          <span className="text-sm">Streak</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{streak}</div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center space-x-2 text-gray-600 mb-1">
          <Heart className="w-4 h-4" />
          <span className="text-sm">Lives</span>
        </div>
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