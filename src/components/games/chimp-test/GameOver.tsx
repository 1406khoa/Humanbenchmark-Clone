import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { ChimpTestChart } from '../../charts/ChimpTestChart';
import { SaveScoreButton } from '../../SaveScoreButton';

interface GameOverProps {
  maxNumbers: number;
  highestNumber: number;
  onRestart: () => void;
}

export function GameOver({ maxNumbers, highestNumber, onRestart }: GameOverProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-md text-center space-y-4">
        <Trophy className="w-12 h-12 text-yellow-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900">Game Over!</h2>
        <div className="space-y-2">
          <p className="text-gray-600">
            Current Run: <span className="font-semibold text-gray-900">{maxNumbers}</span> numbers
          </p>
          <p className="text-gray-600">
            Best Score: <span className="font-semibold text-indigo-600">{highestNumber}</span> numbers
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={onRestart}
            className="flex-1 py-3 flex items-center justify-center space-x-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          <SaveScoreButton 
            gameId="chimp-test" 
            score={highestNumber}
            className="flex-1"
          />
        </div>
      </div>

      <ChimpTestChart maxNumbers={highestNumber} />
    </div>
  );
}