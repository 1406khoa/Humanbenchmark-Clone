import { useState, useCallback } from 'react';
import { GameState, ChimpStats, GridCell } from '../types/chimpTest';
import { playSound } from '../utils/sounds';

const GRID_SIZE = 5;
const INITIAL_LIVES = 3;

export function useChimpTest() {
  const [gameState, setGameState] = useState<GameState>('initial');
  const [stats, setStats] = useState<ChimpStats>({
    level: 1,
    maxLevel: 1,
    numbersShown: 4,
    correctClicks: 0,
    lives: INITIAL_LIVES,
    highestNumber: 4
  });
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const createGrid = useCallback((numbersToShow: number) => {
    const newGrid: GridCell[][] = Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        number: 0,
        isRevealed: false,
        isClicked: false,
        isWrong: false
      }))
    );

    const positions = new Set<string>();
    let currentNumber = 1;

    while (currentNumber <= numbersToShow) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      const pos = `${row}-${col}`;

      if (!positions.has(pos)) {
        positions.add(pos);
        newGrid[row][col].number = currentNumber;
        newGrid[row][col].isRevealed = true;
        currentNumber++;
      }
    }

    return newGrid;
  }, []);

  const startGame = useCallback(() => {
    setStats({
      level: 1,
      maxLevel: 1,
      numbersShown: 4,
      correctClicks: 0,
      lives: INITIAL_LIVES,
      highestNumber: 4
    });
    const newGrid = createGrid(4);
    setGrid(newGrid);
    setNextNumber(1);
    setGameState('showing');
    setIsProcessing(false);
  }, [createGrid]);

  const handleCellClick = useCallback((row: number, col: number) => {
    if (gameState !== 'showing' && gameState !== 'playing') return;
    if (isProcessing) return; // Prevent clicks while processing

    const cell = grid[row][col];
    
    if (cell.isClicked || cell.number === 0) return;

    if (cell.number === nextNumber) {
      playSound.correct();
      
      if (gameState === 'showing') {
        setGrid(prev => prev.map(row =>
          row.map(cell => ({
            ...cell,
            isRevealed: false
          }))
        ));
        setGameState('playing');
      }

      setGrid(prev => {
        const newGrid = [...prev];
        newGrid[row][col] = {
          ...cell,
          isRevealed: true,
          isClicked: true
        };
        return newGrid;
      });
      
      const newNextNumber = nextNumber + 1;
      setNextNumber(newNextNumber);

      if (newNextNumber > stats.numbersShown) {
        setIsProcessing(true);
        const newNumbersShown = stats.numbersShown + 1;
        setStats(prev => ({
          ...prev,
          level: prev.level + 1,
          maxLevel: Math.max(prev.level + 1, prev.maxLevel),
          numbersShown: newNumbersShown,
          correctClicks: prev.correctClicks + 1,
          highestNumber: Math.max(prev.highestNumber, newNumbersShown)
        }));
        
        setTimeout(() => {
          const newGrid = createGrid(stats.numbersShown + 1);
          setGrid(newGrid);
          setNextNumber(1);
          setGameState('showing');
          setIsProcessing(false);
        }, 1000);
      }
    } else {
      playSound.wrong();
      setIsProcessing(true);
      
      setGrid(prev => {
        const newGrid = [...prev];
        newGrid[row][col] = {
          ...cell,
          isWrong: true
        };
        return newGrid;
      });

      const newLives = stats.lives - 1;
      setStats(prev => ({
        ...prev,
        lives: newLives
      }));

      if (newLives <= 0) {
        setGameState('gameover');
        setIsProcessing(false);
      } else {
        setTimeout(() => {
          const newGrid = createGrid(stats.numbersShown);
          setGrid(newGrid);
          setNextNumber(1);
          setGameState('showing');
          setIsProcessing(false);
        }, 1000);
      }
    }
  }, [gameState, grid, nextNumber, stats, createGrid, isProcessing]);

  return {
    gameState,
    stats,
    grid,
    nextNumber,
    isProcessing,
    startGame,
    handleCellClick
  };
}