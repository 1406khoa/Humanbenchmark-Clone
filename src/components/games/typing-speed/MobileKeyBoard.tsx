import React from 'react';
interface MobileKeyboardProps {
  onInput: (key: string) => void;
}

export function MobileKeyboard({ onInput }: MobileKeyboardProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t border-gray-200">
      <textarea
        className="w-full h-32 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Tap here to start typing..."
        onChange={(e) => {
          const lastChar = e.target.value.slice(-1);
          if (lastChar) {
            onInput(lastChar);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Backspace') {
            onInput('Backspace');
          }
        }}
        value=""
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect="off"
      />
    </div>
  );
}