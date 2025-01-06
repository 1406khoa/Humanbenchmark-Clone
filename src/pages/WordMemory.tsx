import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Type } from 'lucide-react';
import { useWordMemoryGame } from '../hooks/useWordMemoryGame';
import { Tutorial } from '../components/games/word-memory/Tutorial';
import { GameCard } from '../components/games/word-memory/GameCard';
import { GameOver } from '../components/games/word-memory/GameOver';
import { GameStatus } from '../components/games/word-memory/GameStatus';

function WordMemory() {
  const {
    gameState,
    stats,
    currentWord,
    maxScore,
    startGame,
    handleAnswer
  } = useWordMemoryGame();

  // Reset game state when component mounts
  useEffect(() => {
    if (gameState === 'playing' && !currentWord) {
      startGame();
    }
  }, [gameState, currentWord, startGame]);

  if (!stats) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Games</span>
        </Link>
        <div className="flex items-center space-x-2 text-gray-600">
          <Type className="w-5 h-5" />
          <span>Word Memory Test</span>
        </div>
      </div>

      {gameState !== 'initial' && gameState !== 'gameover' && (
        <GameStatus 
          score={stats.score} 
          streak={stats.streak} 
          lives={stats.lives} 
        />
      )}

      {gameState === 'initial' && (
        <Tutorial onStart={startGame} />
      )}

      {gameState === 'playing' && currentWord && (
        <GameCard
          word={currentWord}
          onNewWord={() => handleAnswer(true)}
          onSeenWord={() => handleAnswer(false)}
        />
      )}

      {gameState === 'gameover' && (
        <GameOver 
          score={stats.score} 
          maxScore={maxScore} 
          onRestart={startGame} 
        />
      )}
    </div>
  );
}

export default WordMemory;