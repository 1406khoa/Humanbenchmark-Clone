import React from 'react';
import { Trophy } from 'lucide-react';

interface LevelNotificationProps {
  show: boolean;
  level: number;
}

export function LevelNotification({ show, level }: LevelNotificationProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-white rounded-xl p-8 shadow-xl transform transition-all duration-300 scale-100 opacity-100">
        <Trophy className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center mb-2">Level Complete!</h2>
        <p className="text-gray-600 text-center">
          Great job! Proceeding to Level {level + 1}
        </p>
      </div>
    </div>
  );
}