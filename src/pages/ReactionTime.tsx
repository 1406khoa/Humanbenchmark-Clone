import React from 'react';
import { Link } from 'react-router-dom';
import { Timer, ArrowLeft, RotateCcw } from 'lucide-react';
import { ReactionTimeChart } from '../components/charts/ReactionTimeChart';
import { ReactionTimeTutorial } from '../components/tutorials/ReactionTimeTutorial';
import { useReactionGame } from '../hooks/useReactionGame';
import { SaveScoreButton } from '../components/SaveScoreButton';

function ReactionTime() {
  const { 
    handleClick, 
    reset, 
    getAverageTime,
    getBackgroundColor,
    getMessage,
    isComplete 
  } = useReactionGame();

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Games</span>
        </Link>
        <div className="flex items-center space-x-2 text-gray-600">
          <Timer className="w-5 h-5" />
          <span>Reaction Time Test</span>
        </div>
      </div>

      <button
        onClick={handleClick}
        className={`w-full h-96 rounded-xl transition-colors duration-200 flex items-center justify-center ${getBackgroundColor()}`}
      >
        <span className="text-2xl font-bold text-white">{getMessage()}</span>
      </button>

      {isComplete && getAverageTime() !== null && (
        <div className="space-y-4">
          <ReactionTimeChart averageTime={getAverageTime()!} />
          <div className="flex space-x-4">
            <button
              onClick={reset}
              className="flex-1 py-3 flex items-center justify-center space-x-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
            <SaveScoreButton 
              gameId="reaction-time" 
              score={getAverageTime()!}
              className="flex-1"
            />
          </div>
        </div>
      )}

      <ReactionTimeTutorial />
    </div>
  );
}

export default ReactionTime;