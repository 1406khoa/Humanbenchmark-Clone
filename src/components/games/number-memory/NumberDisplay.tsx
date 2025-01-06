import React from 'react';
import { Timer } from 'lucide-react';

interface NumberDisplayProps {
  number: string;
  duration: number;
}

export function NumberDisplay({ number, duration }: NumberDisplayProps) {
  return (
    <div className="relative bg-white rounded-xl p-8 shadow-md text-center">
      <div className="absolute inset-x-0 top-0 h-1 bg-gray-200 rounded-t-xl overflow-hidden">
        <div 
          className="h-full bg-indigo-600"
          style={{
            animation: `progress ${duration}ms linear forwards`,
            width: '100%'
          }}
        />
      </div>
      
      <div className="text-6xl font-bold tracking-wider text-gray-900 font-mono">
        {number}
      </div>
      
      <div className="mt-4 flex items-center justify-center text-gray-500">
        <Timer className="w-4 h-4 mr-2" />
        <span>Memorize the number</span>
      </div>
    </div>
  );
}