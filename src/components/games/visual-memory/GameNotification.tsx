import React from 'react';
import { Trophy, AlertCircle } from 'lucide-react';

interface GameNotificationProps {
  type: 'success' | 'retry';
  level?: number;
  lives?: number;
}

export function GameNotification({ type, level, lives }: GameNotificationProps) {
  const Icon = type === 'success' ? Trophy : AlertCircle;
  const title = type === 'success' ? 'Level Complete!' : 'Try Again!';
  const message = type === 'success' 
    ? `Great job! Proceeding to Level ${level! + 1}`
    : `Remaining Lives: ${lives}`;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 animate-fade-in">
      <div className="bg-white rounded-xl p-4 shadow-lg flex items-center space-x-3">
        <div className={`rounded-full p-2 ${
          type === 'success' ? 'bg-green-100' : 'bg-yellow-100'
        }`}>
          <Icon className={`w-6 h-6 ${
            type === 'success' ? 'text-green-600' : 'text-yellow-600'
          }`} />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </div>
    </div>
  );
}