import { useState, useCallback } from 'react';
import { GameState, GridSquare } from '../types/visualMemory';
import { createGrid, getGridSize, getNumHighlightedSquares } from '../utils/gridUtils';

const MAX_MISTAKES = 3;
const INITIAL_LIVES = 3;
const NOTIFICATION_DURATION = 1500;
const SHOW_PATTERN_DURATION = 2000;

export function useVisualMemoryGame() {
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [mistakes, setMistakes] = useState(0);
  const [maxLevel, setMaxLevel] = useState(1);
  const [gameState, setGameState] = useState<GameState>('initial');
  const [grid, setGrid] = useState<GridSquare[][]>([]);
  const [highlightedSquares, setHighlightedSquares] = useState<Set<string>>(new Set());
  const [remainingSquares, setRemainingSquares] = useState<Set<string>>(new Set());
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [showRetryNotification, setShowRetryNotification] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const initializeLevel = useCallback((currentLevel: number) => {
    const gridSize = getGridSize(currentLevel);
    const numSquares = getNumHighlightedSquares(currentLevel);
    const newGrid = createGrid(gridSize, numSquares);
    
    setGrid(newGrid.grid);
    setHighlightedSquares(newGrid.highlighted);
    setRemainingSquares(new Set(newGrid.highlighted));
    setGameState('showing');
    setIsResetting(false);
    
    setTimeout(() => {
      if (gameState !== 'gameover') {
        setGameState('playing');
      }
    }, SHOW_PATTERN_DURATION);
  }, [gameState]);

  const handleLevelReset = useCallback(() => {
    if (isResetting) return;
    
    setIsResetting(true);
    setShowRetryNotification(true);
    setGameState('showing');
    setLives(prev => prev - 1);
    setMistakes(0);

    // Clear wrong clicks from grid
    setGrid(prev => prev.map(row => 
      row.map(square => ({
        ...square,
        isWrongClick: false,
        isClicked: false // Reset clicked state for new pattern
      }))
    ));

    setTimeout(() => {
      setShowRetryNotification(false);
      if (lives > 1) {
        // Reset the current level with a new pattern instead of going back to level 1
        initializeLevel(level);
      } else {
        // Clear all markings when game is over
        setGrid(prev => prev.map(row => 
          row.map(square => ({
            ...square,
            isClicked: false,
            isWrongClick: false
          }))
        ));
        setGameState('gameover');
      }
    }, NOTIFICATION_DURATION);
  }, [lives, level, initializeLevel, isResetting]);

  const handleSquareClick = useCallback((row: number, col: number) => {
    if (gameState !== 'playing' || isResetting) return;

    const squareId = `${row}-${col}`;
    const newGrid = grid.map(row => row.map(square => ({ ...square })));
    
    if (highlightedSquares.has(squareId)) {
      playSound.correct();
      newGrid[row][col].isClicked = true;
      setGrid(newGrid);
      
      const newRemaining = new Set(remainingSquares);
      newRemaining.delete(squareId);
      setRemainingSquares(newRemaining);

      if (newRemaining.size === 0) {
        setShowLevelComplete(true);
        setGameState('showing');
        setIsResetting(true);
        
        setTimeout(() => {
          setShowLevelComplete(false);
          const nextLevel = level + 1;
          setLevel(nextLevel);
          setMaxLevel(prev => Math.max(prev, nextLevel));
          setMistakes(0);
          initializeLevel(nextLevel);
        }, NOTIFICATION_DURATION);
      }
    } else if (!newGrid[row][col].isWrongClick && !isResetting) {
      playSound.wrong();
      newGrid[row][col].isWrongClick = true;
      setGrid(newGrid);
      
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      
      if (newMistakes >= MAX_MISTAKES) {
        handleLevelReset();
      }
    }
  }, [gameState, grid, highlightedSquares, remainingSquares, mistakes, level, handleLevelReset, initializeLevel, isResetting]);

  const startGame = useCallback(() => {
    setLevel(1);
    setLives(INITIAL_LIVES);
    setMistakes(0);
    setMaxLevel(1);
    setShowLevelComplete(false);
    setShowRetryNotification(false);
    setIsResetting(false);
    initializeLevel(1);
  }, [initializeLevel]);

  const restartGame = useCallback(() => {
    setGameState('initial');
    setGrid([]);
    setHighlightedSquares(new Set());
    setRemainingSquares(new Set());
    setLevel(1);
    setLives(INITIAL_LIVES);
    setMistakes(0);
    setIsResetting(false);
  }, []);

  return {
    grid,
    level,
    lives,
    mistakes,
    gameState,
    isGameOver: gameState === 'gameover',
    maxLevel,
    showLevelComplete,
    showRetryNotification,
    handleSquareClick,
    startGame,
    restartGame,
  };
}