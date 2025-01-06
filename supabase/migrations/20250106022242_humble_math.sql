/*
  # Update scores table and policies

  1. Changes
    - Add missing index for game scores
    - Add policy for reading all scores (for percentile calculation)
*/

-- Create index for game scores if it doesn't exist
CREATE INDEX IF NOT EXISTS scores_game_score_idx ON scores(game_id, score);

-- Drop existing policy if it exists and create new one
DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Users can read all scores for percentile" ON scores;
    
    CREATE POLICY "Users can read all scores for percentile"
        ON scores
        FOR SELECT
        TO authenticated
        USING (true);
EXCEPTION
    WHEN undefined_object THEN
        NULL;
END $$;