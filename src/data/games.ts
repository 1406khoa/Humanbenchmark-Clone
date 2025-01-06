import { Game } from '../types';

export const games: Game[] = [
  {
    id: 'reaction-time',
    title: 'Reaction Time',
    description: 'Test your reaction speed. Click when the color changes to green.',
    icon: 'zap',
    path: '/reaction-time'
  },
  {
    id: 'visual-memory',
    title: 'Visual Memory',
    description: 'Remember an increasingly complex pattern of squares.',
    icon: 'grid',
    path: '/visual-memory'
  },
  {
    id: 'number-memory',
    title: 'Number Memory',
    description: 'Remember the longest number sequence possible.',
    icon: 'hash',
    path: '/number-memory'
  },
  {
    id: 'word-memory',
    title: 'Word Memory',
    description: "Remember if you've seen a word before in the sequence.",
    icon: 'type',
    path: '/word-memory'
  },
  {
    id: 'typing-speed',
    title: 'Typing Speed',
    description: 'Test your typing speed and accuracy with random text.',
    icon: 'keyboard',
    path: '/typing-speed'
  },
  {
    id: 'chimp-test',
    title: 'Chimp Test',
    description: 'Are you smarter than a chimpanzee? Test your memory!',
    icon: 'brain',
    path: '/chimp-test'
  }
];