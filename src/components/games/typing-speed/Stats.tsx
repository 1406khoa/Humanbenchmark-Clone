import React from 'react';
import { Type, Target, Zap } from 'lucide-react';

interface StatsProps {
  wpm: number;
  accuracy: number;
  charactersTyped: number;
}

export function Stats({ wpm, accuracy, charactersTyped }: StatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center space-x-2 text-gray-600 mb-1">
          <Zap className="w-4 h-4" />
          <span className="text-sm">WPM</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{wpm}</div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center space-x-2 text-gray-600 mb-1">
          <Target className="w-4 h-4" />
          <span className="text-sm">Accuracy</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{accuracy}%</div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center space-x-2 text-gray-600 mb-1">
          <Type className="w-4 h-4" />
          <span className="text-sm">Characters</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">{charactersTyped}</div>
      </div>
    </div>
  );
}