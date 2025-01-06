import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { VisualMemoryChart } from '../../charts/VisualMemoryChart';
import { SaveScoreButton } from '../../SaveScoreButton';

interface GameOverProps {
  maxLevel: number;
  onRestart: () => void;
}

export function GameOver({ maxLevel, onRestart }: GameOverProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-md text-center space-y-4">
        <Trophy className="w-12 h-12 text-yellow-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900">Game Over!</h2>
        <p className="text-gray-600">
          You reached level <span className="font-semibold text-gray-900">{maxLevel}</span>
        </p>
        <div className="flex space-x-4">
          <button
            onClick={onRestart}
            className="flex-1 py-3 flex items-center justify-center space-x-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play Again</span>
          </button>
          <SaveScoreButton 
            gameId="visual-memory" 
            score={maxLevel}
            className="flex-1"
          />
        </div>
      </div>

      <VisualMemoryChart maxLevel={maxLevel} />
    </div>
  );
}