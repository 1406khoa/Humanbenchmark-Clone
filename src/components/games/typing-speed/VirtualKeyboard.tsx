import React, { useEffect } from 'react';

interface KeyProps {
  char: string;
  isPressed: boolean;
  width?: string;
}

function Key({ char, isPressed, width = 'w-10' }: KeyProps) {
  return (
    <div
      className={`
        ${width} h-10 rounded-lg flex items-center justify-center
        font-medium transition-all duration-100 select-none
        ${isPressed 
          ? 'bg-indigo-600 text-white shadow-inner transform scale-95' 
          : 'bg-white text-gray-700 shadow-md hover:bg-gray-50'
        }
      `}
    >
      {char}
    </div>
  );
}

interface VirtualKeyboardProps {
  pressedKeys: Set<string>;
}

export function VirtualKeyboard({ pressedKeys }: VirtualKeyboardProps) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <div className="bg-gray-100 p-4 rounded-xl shadow-inner space-y-2">
      {/* Top Row */}
      <div className="flex justify-center space-x-1">
        {rows[0].map(key => (
          <Key 
            key={key} 
            char={key} 
            isPressed={pressedKeys.has(key.toLowerCase())} 
          />
        ))}
      </div>

      {/* Middle Row */}
      <div className="flex justify-center space-x-1 ml-5">
        {rows[1].map(key => (
          <Key 
            key={key} 
            char={key} 
            isPressed={pressedKeys.has(key.toLowerCase())} 
          />
        ))}
      </div>

      {/* Bottom Row */}
      <div className="flex justify-center space-x-1">
        <Key char="⇧" width="w-14" isPressed={false} />
        {rows[2].map(key => (
          <Key 
            key={key} 
            char={key} 
            isPressed={pressedKeys.has(key.toLowerCase())} 
          />
        ))}
        <Key char="⌫" width="w-14" isPressed={pressedKeys.has('Backspace')} />
      </div>

      {/* Space Bar */}
      <div className="flex justify-center">
        <Key 
          char="Space" 
          width="w-64" 
          isPressed={pressedKeys.has(' ')} 
        />
      </div>
    </div>
  );
}