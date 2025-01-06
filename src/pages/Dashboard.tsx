import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, BarChart2, LogIn } from 'lucide-react';
import { games } from '../data/games';
import { getUserScores, Score } from '../services/scoreService';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadScores();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadScores = async () => {
    try {
      const data = await getUserScores();
      setScores(data);
    } catch (error) {
      console.error('Failed to load scores:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
        {!user && (
          <button
            onClick={() => navigate('/auth')}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Sign In
          </button>
        )}
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
              {user && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Best Score</th>
              )}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {games.map((game) => (
              <tr key={game.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{game.title}</div>
                </td>
                {user && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {loading ? '...' : scores.find(s => s.game_id === game.id)?.score ?? '-'}
                    </div>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                  <button
                    onClick={() => navigate(game.path)}
                    className="text-indigo-600 hover:text-indigo-900 inline-flex items-center space-x-1"
                  >
                    <Play className="w-4 h-4" />
                    <span>Play</span>
                  </button>
                  {user && (
                    <button
                      onClick={() => navigate(`/stats/${game.id}`)}
                      className="text-gray-600 hover:text-gray-900 inline-flex items-center space-x-1"
                    >
                      <BarChart2 className="w-4 h-4" />
                      <span>Stats</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;