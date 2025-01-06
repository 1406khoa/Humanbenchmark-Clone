import { useState, useCallback } from 'react';

const MAX_ATTEMPTS = 5;

type GameState = 'waiting' | 'ready' | 'clicking' | 'finished';

export function useReactionGame() {
  const [gameState, setGameState] = useState<GameState>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  const getAverageTime = useCallback(() => {
    if (attempts.length === 0) return null;
    return Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length);
  }, [attempts]);

  const getBackgroundColor = useCallback(() => {
    switch (gameState) {
      case 'waiting':
        return 'bg-blue-500';
      case 'ready':
        return 'bg-red-500';
      case 'clicking':
        return 'bg-green-500';
      case 'finished':
        return 'bg-purple-500';
    }
  }, [gameState]);

  const getMessage = useCallback(() => {
    switch (gameState) {
      case 'waiting':
        return 'Click to start';
      case 'ready':
        return 'Wait for green...';
      case 'clicking':
        return 'Click now!';
      case 'finished':
        return attempts.length < MAX_ATTEMPTS 
          ? `${attempts[attempts.length - 1]}ms - Click to continue` 
          : `${getAverageTime()}ms - Average`;
    }
  }, [gameState, attempts, getAverageTime]);

  const startGame = useCallback(() => {
    setGameState('ready');
    const timeout = setTimeout(() => {
      setStartTime(Date.now());
      setGameState('clicking');
    }, Math.random() * 3000 + 2000);
    setTimeoutId(timeout);
  }, []);

  const handleClick = useCallback(() => {
    switch (gameState) {
      case 'waiting':
        startGame();
        break;
      case 'ready':
        if (timeoutId) clearTimeout(timeoutId);
        setGameState('waiting');
        break;
      case 'clicking':
        const reactionTime = Date.now() - startTime;
        const newAttempts = [...attempts, reactionTime];
        setAttempts(newAttempts);
        setGameState('finished');
        break;
      case 'finished':
        if (attempts.length < MAX_ATTEMPTS) {
          startGame();
        }
        break;
    }
  }, [gameState, startGame, startTime, timeoutId, attempts]);

  const reset = useCallback(() => {
    setAttempts([]);
    setGameState('waiting');
  }, []);

  return {
    gameState,
    attempts,
    handleClick,
    reset,
    getAverageTime,
    getBackgroundColor,
    getMessage,
    isComplete: attempts.length === MAX_ATTEMPTS
  };
}