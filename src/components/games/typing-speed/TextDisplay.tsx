import React from 'react';

interface TextDisplayProps {
  text: string;
  userInput: string;
  isComplete: boolean;
}

export function TextDisplay({ text, userInput, isComplete }: TextDisplayProps) {
  return (
    <div className="font-mono text-xl leading-relaxed tracking-wide">
      {text.split('').map((char, index) => {
        let displayClass = 'text-gray-500'; // Untyped characters
        
        if (index < userInput.length) {
          displayClass = userInput[index] === char ? 'text-indigo-600' : 'text-red-500';
        }

        return (
          <span
            key={index}
            className={`transition-colors duration-150 ${displayClass} ${
              index === userInput.length && !isComplete
                ? 'border-l-2 border-indigo-500 animate-pulse'
                : ''
            }`}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
}