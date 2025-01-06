import React from 'react';
import { Play, Brain, Heart, Trophy } from 'lucide-react';

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
            <Brain className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Remember Words</h3>
            <p className="text-gray-600">Words will appear one at a time. Remember if you've seen them before.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-green-100 flex items-center justify-center">
            <Trophy className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Choose Correctly</h3>
            <p className="text-gray-600">Select "NEW" for words you haven't seen, "SEEN" for words that appeared before.</p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 shrink-0 rounded-full bg-red-100 flex items-center justify-center">
            <Heart className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Three Lives</h3>
            <p className="text-gray-600">You have three lives. Each wrong answer costs one life.</p>
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