import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { WordMemoryChart } from '../../charts/WordMemoryChart';
import { SaveScoreButton } from '../../SaveScoreButton';

interface GameOverProps {
  score: number;
  maxScore: number;
  onRestart: () => void;
}

export function GameOver({ score, maxScore, onRestart }: GameOverProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-md text-center space-y-4">
        <Trophy className="w-12 h-12 text-yellow-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900">Game Over!</h2>
        
        <div className="space-y-2">
          <p className="text-gray-600">
            Final Score: <span className="font-semibold text-gray-900">{score}</span>
          </p>
          <p className="text-gray-600">
            Best Score: <span className="font-semibold text-gray-900">{maxScore}</span>
          </p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onRestart}
            className="flex-1 py-3 flex items-center justify-center space-x-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Play Again</span>
          </button>
          <SaveScoreButton 
            gameId="word-memory" 
            score={score}
            className="flex-1"
          />
        </div>
      </div>

      <WordMemoryChart score={score} />
    </div>
  );
}