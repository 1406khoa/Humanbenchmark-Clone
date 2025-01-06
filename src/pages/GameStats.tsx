import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play } from 'lucide-react';
import { ReactionTimeChart } from '../components/charts/ReactionTimeChart';
import { VisualMemoryChart } from '../components/charts/VisualMemoryChart';
import { NumberMemoryChart } from '../components/charts/NumberMemoryChart';
import { WordMemoryChart } from '../components/charts/WordMemoryChart';
import { TypingSpeedChart } from '../components/charts/TypingSpeedChart';
import { ChimpTestChart } from '../components/charts/ChimpTestChart';

function GameStats() {
  const { gameId } = useParams();
  const navigate = useNavigate();
  
  // Mock data - in a real app, this would come from your data store
  const mockStats = {
    'reaction-time': { averageTime: 250 },
    'visual-memory': { maxLevel: 8 },
    'number-memory': { maxDigits: 9 },
    'word-memory': { score: 15 },
    'typing-speed': { wpm: 65, accuracy: 98 },
    'chimp-test': { maxNumbers: 9 }
  };

  const getGameTitle = (id: string) => {
    const titles: Record<string, string> = {
      'reaction-time': 'Reaction Time',
      'visual-memory': 'Visual Memory',
      'number-memory': 'Number Memory',
      'word-memory': 'Word Memory',
      'typing-speed': 'Typing Speed',
      'chimp-test': 'Chimp Test'
    };
    return titles[id] || 'Game Stats';
  };

  const handlePlay = () => {
    if (gameId) {
      navigate(`/${gameId}`);
    }
  };

  const renderChart = () => {
    if (!gameId) return null;

    const stats = mockStats[gameId as keyof typeof mockStats];
    if (!stats) return null;

    switch (gameId) {
      case 'reaction-time':
        return <ReactionTimeChart averageTime={stats.averageTime} />;
      case 'visual-memory':
        return <VisualMemoryChart maxLevel={stats.maxLevel} />;
      case 'number-memory':
        return <NumberMemoryChart maxDigits={stats.maxDigits} />;
      case 'word-memory':
        return <WordMemoryChart score={stats.score} />;
      case 'typing-speed':
        return <TypingSpeedChart wpm={stats.wpm} accuracy={stats.accuracy} />;
      case 'chimp-test':
        return <ChimpTestChart maxNumbers={stats.maxNumbers} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </Link>
        <button
          onClick={handlePlay}
          className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700"
        >
          <Play className="w-5 h-5" />
          <span>Play {gameId && getGameTitle(gameId)}</span>
        </button>
      </div>

      {renderChart()}
    </div>
  );
}

export default GameStats;