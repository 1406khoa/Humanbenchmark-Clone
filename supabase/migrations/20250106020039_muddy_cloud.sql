/*
  # Create scores table for storing game results

  1. New Tables
    - scores
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - game_id (text)
      - score (integer)
      - created_at (timestamp with timezone)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to:
      - Read their own scores
      - Create their own scores
*/

CREATE TABLE IF NOT EXISTS scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  game_id text NOT NULL,
  score integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can read own scores"
  ON scores
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own scores"
  ON scores
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS scores_user_game_idx ON scores(user_id, game_id);