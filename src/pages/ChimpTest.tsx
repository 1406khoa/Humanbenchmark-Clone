import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain } from 'lucide-react';
import { useChimpTest } from '../hooks/useChimpTest';
import { Tutorial } from '../components/games/chimp-test/Tutorial';
import { GameGrid } from '../components/games/chimp-test/GameGrid';
import { GameStatus } from '../components/games/chimp-test/GameStatus';
import { GameOver } from '../components/games/chimp-test/GameOver';

function ChimpTest() {
  const {
    gameState,
    stats,
    grid,
    startGame,
    handleCellClick,
  } = useChimpTest();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Games</span>
        </Link>
        <div className="flex items-center space-x-2 text-gray-600">
          <Brain className="w-5 h-5" />
          <span>Chimp Test</span>
        </div>
      </div>

      {gameState !== 'initial' && gameState !== 'gameover' && (
        <GameStatus 
          level={stats.level}
          numbersShown={stats.numbersShown}
          lives={stats.lives}
        />
      )}

      {gameState === 'initial' && (
        <Tutorial onStart={startGame} />
      )}

      {(gameState === 'showing' || gameState === 'playing') && (
        <div className="flex justify-center">
          <GameGrid
            grid={grid}
            onCellClick={handleCellClick}
          />
        </div>
      )}

      {gameState === 'gameover' && (
        <GameOver 
          maxNumbers={stats.numbersShown}
          highestNumber={stats.highestNumber}
          onRestart={startGame}
        />
      )}
    </div>
  );
}

export default ChimpTest;