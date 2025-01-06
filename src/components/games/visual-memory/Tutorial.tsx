import React from 'react';
import { Play } from 'lucide-react';

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
            <div className="w-6 h-6 bg-indigo-500 rounded" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Remember the Pattern</h3>
            <p className="text-gray-600">Squares will light up briefly. Memorize their positions.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
            <div className="w-6 h-6 bg-white rounded ring-2 ring-indigo-500" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Recreate the Pattern</h3>
            <p className="text-gray-600">Click the squares that were highlighted. Order doesn't matter.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-red-100 flex items-center justify-center">
            <div className="text-red-500 font-bold">3x</div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Be Careful</h3>
            <p className="text-gray-600">You have 3 lives. Each life allows 3 mistakes.</p>
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