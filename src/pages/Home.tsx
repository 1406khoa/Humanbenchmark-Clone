import React from 'react';
import { GameCard } from '../components/GameCard';
import { games } from '../data/games';

export function Home() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Test Your Skills</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Challenge yourself with these cognitive games designed to measure your abilities.
          Track your progress and compete with others.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
}