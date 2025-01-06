export interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  path: string;
}

export interface GameScore {
  score: number;
  timestamp: number;
}