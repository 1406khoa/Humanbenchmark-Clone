import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface NumberInputProps {
  level: number;
  onSubmit: (input: string) => void;
}

export function NumberInput({ level, onSubmit }: NumberInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.length === level + 2) {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-md">
      <div className="text-center mb-4">
        <div className="text-gray-600">Enter the number you saw:</div>
      </div>
      
      <div className="flex space-x-2">
        <input
          type="number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder="Type the number..."
          autoFocus
        />
        <button
          type="submit"
          disabled={input.length !== level + 2}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}