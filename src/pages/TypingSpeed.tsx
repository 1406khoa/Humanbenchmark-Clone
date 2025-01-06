import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Keyboard } from 'lucide-react';
import { useTypingGame } from '../hooks/useTypingGame';
import { TextDisplay } from '../components/games/typing-speed/TextDisplay';
import { Timer } from '../components/games/typing-speed/Timer';
import { Stats } from '../components/games/typing-speed/Stats';
import { GameOver } from '../components/games/typing-speed/GameOver';
import { VirtualKeyboard } from '../components/games/typing-speed/VirtualKeyboard';
import { useDeviceType } from '../hooks/useDeviceType';
import { MobileKeyboard } from '../components/games/typing-speed/MobileKeyboard';

function TypingSpeed() {
  const {
    text,
    userInput,
    timeLeft,
    isComplete,
    wpm,
    accuracy,
    charactersTyped,
    pressedKeys,
    handleKeyPress,
    restart
  } = useTypingGame();

  const { isMobile } = useDeviceType();

  useEffect(() => {
    if (!isMobile) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isComplete) {
          handleKeyPress(e.key);
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyPress, isComplete, isMobile]);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Games</span>
        </Link>
        <div className="flex items-center space-x-2 text-gray-600">
          <Keyboard className="w-5 h-5" />
          <span>Typing Speed Test</span>
        </div>
      </div>

      {!isComplete && (
        <>
          <Timer timeLeft={timeLeft} totalTime={60} />

          <Stats
            wpm={wpm}
            accuracy={accuracy}
            charactersTyped={charactersTyped}
          />

          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-gray-600 mb-4">
              {isMobile ? 'Tap below to start typing...' : 'Start typing to begin...'}
            </p>
            <TextDisplay
              text={text}
              userInput={userInput}
              isComplete={isComplete}
            />
          </div>

          {isMobile ? (
            <MobileKeyboard onInput={handleKeyPress} />
          ) : (
            <VirtualKeyboard pressedKeys={pressedKeys} />
          )}
        </>
      )}

      {isComplete && (
        <GameOver
          wpm={wpm}
          accuracy={accuracy}
          onRestart={restart}
        />
      )}
    </div>
  );
}

export default TypingSpeed;