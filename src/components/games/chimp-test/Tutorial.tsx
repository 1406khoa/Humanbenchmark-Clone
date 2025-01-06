import React from 'react';
import { Play, Brain, Eye, Mouse } from 'lucide-react';

interface TutorialProps {
  onStart: () => void;
}

export function Tutorial({ onStart }: TutorialProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md space-y-6">
      <h2 className="text-xl font-bold text-gray-900">How to Play</h2>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center">
            <Eye className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Remember the Numbers</h3>
            <p className="text-gray-600">Numbers will appear briefly on the grid. Memorize their positions!</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-green-100 flex items-center justify-center">
            <Mouse className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Click in Order</h3>
            <p className="text-gray-600">After the numbers disappear, click them in ascending order (1, 2, 3...).</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-yellow-100 flex items-center justify-center">
            <Brain className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Level Up</h3>
            <p className="text-gray-600">Each level adds one more number to remember. How far can you go?</p>
          </div>
        </div>
      </div>

      <button
        onClick={onStart}
        className="w-full py-3 flex items-center justify-center space-x-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
      >
        <Play className="w-5 h-5" />
        <span>Start Game</span>
      </button>
    </div>
  );
}