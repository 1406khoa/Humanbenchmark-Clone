import { useState, useCallback } from 'react';
import { GameState, GameResult } from '../types/numberMemory';
import { generateNumber, compareNumbers, getDisplayDuration } from '../utils/numberUtils';

export function useNumberMemoryGame() {
  const [level, setLevel] = useState(1);
  const [maxLevel, setMaxLevel] = useState(1);
  const [gameState, setGameState] = useState<GameState>('initial');
  const [currentNumber, setCurrentNumber] = useState('');
  const [result, setResult] = useState<GameResult | null>(null);

  const startNextLevel = useCallback(() => {
    setGameState('showing');
    const newNumber = generateNumber(level + 3); // Increase digits
    setCurrentNumber(newNumber);
    
    setTimeout(() => {
      setGameState('input');
    }, getDisplayDuration(level));
  }, [level]);

  const startGame = useCallback(() => {
    setLevel(1);
    setMaxLevel(1);
    setGameState('showing');
    const newNumber = generateNumber(3); // Start with 3 digits
    setCurrentNumber(newNumber);

    setTimeout(() => {
      setGameState('input');
    }, getDisplayDuration(1));
  }, []);

  const handleSubmit = useCallback((input: string) => {
    const incorrectIndices = compareNumbers(input, currentNumber);
    
    if (incorrectIndices.length === 0) {
      setMaxLevel(Math.max(maxLevel, level + 1));
      setGameState('success');
    } else {
      setResult({
        input,
        correct: currentNumber,
        incorrectIndices
      });
      setGameState('feedback');
    }
  }, [currentNumber, level, maxLevel]);

  const handleNextLevel = useCallback(() => {
    setLevel(prev => prev + 1);
    startNextLevel();
  }, [startNextLevel]);

  const retry = useCallback(() => {
    setLevel(1);
    setGameState('showing');
    const newNumber = generateNumber(3);
    setCurrentNumber(newNumber);
    setResult(null);
    
    setTimeout(() => {
      setGameState('input');
    }, getDisplayDuration(1));
  }, []);

  return {
    level,
    maxLevel,
    gameState,
    currentNumber,
    result,
    startGame,
    handleSubmit,
    handleNextLevel,
    retry
  };
};