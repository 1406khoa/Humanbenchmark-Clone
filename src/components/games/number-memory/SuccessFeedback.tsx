import React from 'react';
import { Trophy, ArrowRight } from 'lucide-react';

interface SuccessFeedbackProps {
  digits: number;
  onNext: () => void;
}

export function SuccessFeedback({ digits, onNext }: SuccessFeedbackProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md space-y-4 text-center">
      <Trophy className="w-12 h-12 text-yellow-500 mx-auto" />
      <div>
        <h3 className="text-xl font-bold text-green-600 mb-2">Correct!</h3>
        <p className="text-gray-600">
          You successfully remembered {digits} digits
        </p>
      </div>

      <button
        onClick={onNext}
        className="w-full py-3 flex items-center justify-center space-x-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
      >
        <span>Next Level</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}