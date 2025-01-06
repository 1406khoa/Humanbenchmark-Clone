import React from 'react';
import { Trophy, RotateCcw } from 'lucide-react';
import { TypingSpeedChart } from '../../charts/TypingSpeedChart';
import { SaveScoreButton } from '../../SaveScoreButton';

interface GameOverProps {
  wpm: number;
  accuracy: number;
  onRestart: () => void;
}

export function GameOver({ wpm, accuracy, onRestart }: GameOverProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-md text-center space-y-4">
        <Trophy className="w-12 h-12 text-yellow-500 mx-auto" />
        <h2 className="text-2xl font-bold text-gray-900">Test Complete!</h2>
        
        <div className="space-y-2">
          <p className="text-gray-600">
            Speed: <span className="font-semibold text-gray-900">{wpm} WPM</span>
          </p>
          <p className="text-gray-600">
            Accuracy: <span className="font-semibold text-gray-900">{accuracy}%</span>
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
            gameId="typing-speed" 
            score={wpm}
            className="flex-1"
          />
        </div>
      </div>

      <TypingSpeedChart wpm={wpm} accuracy={accuracy} />
    </div>
  );
}