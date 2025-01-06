import React from 'react';
import { Check, X } from 'lucide-react';

interface GameCardProps {
  word: string;
  onNewWord: () => void;
  onSeenWord: () => void;
}

export function GameCard({ word, onNewWord, onSeenWord }: GameCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md space-y-6">
      <div className="text-center">
        <div className="text-4xl font-bold text-gray-900 mb-2">{word}</div>
        <p className="text-gray-600">Have you seen this word before?</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onNewWord}
          className="py-3 flex items-center justify-center space-x-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
        >
          <Check className="w-5 h-5" />
          <span>NEW</span>
        </button>

        <button
          onClick={onSeenWord}
          className="py-3 flex items-center justify-center space-x-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5" />
          <span>SEEN</span>
        </button>
      </div>
    </div>
  );
}