import { supabase } from '../lib/supabase';

export interface Score {
  id: string;
  user_id: string;
  game_id: string;
  score: number;
  created_at: string;
}

export async function saveScore(gameId: string, score: number): Promise<Score> {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    throw new Error('Not authenticated');
  }

  const { data, error } = await supabase
    .from('scores')
    .insert([{ 
      game_id: gameId, 
      score,
      user_id: user.user.id 
    }])
    .select()
    .single();

  if (error) {
    console.error('Error saving score:', error);
    throw error;
  }

  return data;
}

export async function getUserScores(): Promise<Score[]> {
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) return [];

  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('user_id', user.user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getGameScores(gameId: string): Promise<Score[]> {
  const { data, error } = await supabase
    .from('scores')
    .select('*')
    .eq('game_id', gameId)
    .order('score', { ascending: false });

  if (error) throw error;
  return data || [];
}