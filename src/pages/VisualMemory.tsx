import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain } from 'lucide-react';
import { useVisualMemoryGame } from '../hooks/useVisualMemoryGame';
import { MemoryGrid } from '../components/games/visual-memory/MemoryGrid';
import { GameStatus } from '../components/games/visual-memory/GameStatus';
import { GameOver } from '../components/games/visual-memory/GameOver';
import { Tutorial } from '../components/games/visual-memory/Tutorial';
import { GameNotification } from '../components/games/visual-memory/GameNotification';

function VisualMemory() {
  const {
    grid,
    level,
    lives,
    mistakes,
    gameState,
    isGameOver,
    maxLevel,
    showLevelComplete,
    showRetryNotification,
    handleSquareClick,
    startGame,
    restartGame,
  } = useVisualMemoryGame();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Games</span>
        </Link>
        <div className="flex items-center space-x-2 text-gray-600">
          <Brain className="w-5 h-5" />
          <span>Visual Memory Test</span>
        </div>
      </div>

      {gameState !== 'initial' && gameState !== 'gameover' && (
        <GameStatus level={level} lives={lives} mistakes={mistakes} />
      )}
      
      <div className="relative flex justify-center">
        {gameState !== 'initial' && gameState !== 'gameover' && (
          <MemoryGrid
            grid={grid}
            gameState={gameState}
            onSquareClick={handleSquareClick}
          />
        )}
        {showLevelComplete && (
          <GameNotification type="success" level={level} />
        )}
        {showRetryNotification && (
          <GameNotification type="retry" lives={lives} />
        )}
      </div>

      {gameState === 'initial' && (
        <Tutorial onStart={startGame} />
      )}

      {isGameOver && (
        <GameOver maxLevel={maxLevel} onRestart={restartGame} />
      )}
    </div>
  );
}

export default VisualMemory;