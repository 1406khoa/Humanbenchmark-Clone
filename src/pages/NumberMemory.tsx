import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Hash } from 'lucide-react';
import { useNumberMemoryGame } from '../hooks/useNumberMemoryGame';
import { NumberDisplay } from '../components/games/number-memory/NumberDisplay';
import { NumberInput } from '../components/games/number-memory/NumberInput';
import { ResultFeedback } from '../components/games/number-memory/ResultFeedback';
import { SuccessFeedback } from '../components/games/number-memory/SuccessFeedback';
import { Tutorial } from '../components/games/number-memory/Tutorial';
import { getDisplayDuration } from '../utils/numberUtils';

function NumberMemory() {
  const {
    level,
    maxLevel,
    gameState,
    currentNumber,
    result,
    startGame,
    handleSubmit,
    handleNextLevel,
    retry
  } = useNumberMemoryGame();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Games</span>
        </Link>
        <div className="flex items-center space-x-2 text-gray-600">
          <Hash className="w-5 h-5" />
          <span>Number Memory Test</span>
        </div>
      </div>

      {gameState !== 'initial' && (
        <div className="text-center mb-4">
          <div className="text-2xl font-bold text-gray-900">Level {level}</div>
          <div className="text-gray-600">{level + 2} digits</div>
        </div>
      )}

      {gameState === 'initial' && (
        <Tutorial onStart={startGame} />
      )}

      {gameState === 'showing' && (
        <NumberDisplay 
          number={currentNumber} 
          duration={getDisplayDuration(level)} 
        />
      )}

      {gameState === 'input' && (
        <NumberInput 
          level={level} 
          onSubmit={handleSubmit} 
        />
      )}

      {gameState === 'success' && (
        <SuccessFeedback 
          digits={level + 2}
          onNext={handleNextLevel}
        />
      )}

      {gameState === 'feedback' && result && (
        <ResultFeedback 
          result={result}
          maxDigits={maxLevel + 2}
          onRetry={retry} 
        />
      )}
    </div>
  );
}

export default NumberMemory;