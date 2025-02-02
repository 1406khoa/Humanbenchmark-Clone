import { useState, useCallback, useEffect } from 'react';
import { GameState, GameStats } from '../types/wordMemory';
import { getRandomWord } from '../utils/wordUtils';

const INITIAL_LIVES = 3;

const createInitialStats = (): GameStats => ({
  score: 0,
  streak: 0,
  lives: INITIAL_LIVES,
  seen: new Set<string>(),
  results: []
});

export function useWordMemoryGame() {
  const [gameState, setGameState] = useState<GameState>('initial');
  const [stats, setStats] = useState<GameStats>(createInitialStats());
  const [currentWord, setCurrentWord] = useState<string>('');
  const [maxScore, setMaxScore] = useState<number>(0);

  const startGame = useCallback(() => {
    const firstWord = getRandomWord();
    setGameState('playing');
    setStats(createInitialStats());
    setCurrentWord(firstWord);
  }, []);

  const handleAnswer = useCallback((answeredNew: boolean) => {
    if (!currentWord) return;

    const isNew = !stats.seen.has(currentWord);
    const correct = answeredNew === isNew;
    
    if (correct) {
      playSound.correct();
      const nextWord = getRandomWord();
      setStats(prev => {
        const newSeen = new Set(prev.seen);
        newSeen.add(currentWord);
        const newScore = prev.score + 1;
        setMaxScore(current => Math.max(current, newScore));
        
        return {
          ...prev,
          score: newScore,
          streak: prev.streak + 1,
          seen: newSeen,
          results: [...prev.results, { word: currentWord, isNew, correct }]
        };
      });
      setCurrentWord(nextWord);
    } else {
      playSound.wrong();
      const newLives = stats.lives - 1;
      
      if (newLives <= 0) {
        setGameState('gameover');
        setCurrentWord('');
      } else {
        const nextWord = getRandomWord();
        setStats(prev => ({
          ...prev,
          streak: 0,
          lives: newLives,
          results: [...prev.results, { word: currentWord, isNew, correct }]
        }));
        setCurrentWord(nextWord);
      }
    }
  }, [currentWord, stats]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setGameState('initial');
      setStats(createInitialStats());
      setCurrentWord('');
      setMaxScore(0);
    };
  }, []);

  return {
    gameState,
    stats,
    currentWord,
    maxScore,
    startGame,
    handleAnswer
  };
}