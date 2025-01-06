import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Grid, Hash, Type, Keyboard, Brain, LucideIcon } from 'lucide-react';
import { Game } from '../types';

// Map of game IDs to their corresponding icons
const GAME_ICONS: Record<string, LucideIcon> = {
  'reaction-time': Zap,
  'visual-memory': Grid,
  'number-memory': Hash,
  'word-memory': Type,
  'typing-speed': Keyboard,
  'chimp-test': Brain,
};

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const navigate = useNavigate();
  const Icon = GAME_ICONS[game.id];

  if (!Icon) {
    console.warn(`No icon found for game: ${game.id}`);
    return null;
  }

  return (
    <button
      onClick={() => navigate(game.path)}
      className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-900">{game.title}</h3>
          <Icon className="w-6 h-6 text-indigo-600" />
        </div>
        <p className="text-gray-600">{game.description}</p>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </div>
    </button>
  );
}