import React from 'react';
import { Eye, Keyboard, AlertCircle, Play } from 'lucide-react';

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
            <h3 className="font-semibold text-gray-800">Remember the Number</h3>
            <p className="text-gray-600">A number will be shown briefly. Memorize it quickly!</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-gray-100 flex items-center justify-center">
            <Keyboard className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Type it Exactly</h3>
            <p className="text-gray-600">Enter the number exactly as you saw it.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-yellow-100 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Be Careful</h3>
            <p className="text-gray-600">One wrong digit and you'll have to try again!</p>
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