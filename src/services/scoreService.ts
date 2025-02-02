import { authorizedApi } from '../lib/api';

export interface Score {
  id: string;
  user_id: string;
  game_id: string;
  score: number;
  created_at: string;
}

// Lưu Điểm
export const saveScore = async (gameId: string, score: number): Promise<void> => {
  const res = await authorizedApi().post('/scores/save', { game_id: gameId, score });
  return res.data;
};

// Lấy Điểm Của Người Dùng
export const getUserScores = async (): Promise<Score[]> => {
  const res = await authorizedApi().get('/scores/user');
  return res.data.scores;
};

// Lấy Bảng Xếp Hạng Của Một Trò Chơi
export const getGameScores = async (gameId: string): Promise<Score[]> => {
  const res = await authorizedApi().get(`/scores/game/${gameId}`);
  return res.data.scores;
};
