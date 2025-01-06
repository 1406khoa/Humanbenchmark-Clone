import React from 'react';
import { GameResult } from '../../../types/numberMemory';
import { RotateCcw } from 'lucide-react';
import { NumberMemoryChart } from '../../charts/NumberMemoryChart';
import { SaveScoreButton } from '../../SaveScoreButton';

interface ResultFeedbackProps {
  result: GameResult;
  maxDigits: number;
  onRetry: () => void;
}

export function ResultFeedback({ result, maxDigits, onRetry }: ResultFeedbackProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-bold text-red-600 mb-2">Incorrect!</h3>
          <p className="text-gray-600">Here's what went wrong:</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Your input:</span>
            <div className="font-mono text-xl">
              {Array.from(result.input).map((digit, i) => (
                <span
                  key={i}
                  className={result.incorrectIndices.includes(i) ? 'line-through text-red-500' : ''}
                >
                  {digit}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-gray-600">Correct number:</span>
            <div className="font-mono text-xl text-green-600">{result.correct}</div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={onRetry}
            className="flex-1 py-3 flex items-center justify-center space-x-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Try Again</span>
          </button>
          <SaveScoreButton 
            gameId="number-memory" 
            score={maxDigits}
            className="flex-1"
          />
        </div>
      </div>

      <NumberMemoryChart maxDigits={maxDigits} />
    </div>
  );
}