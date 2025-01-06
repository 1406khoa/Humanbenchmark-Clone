/*
  # Create scores table and security policies

  1. New Tables
    - `scores`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `game_id` (text)
      - `score` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on scores table
    - Add policies for authenticated users to:
      - Read their own scores
      - Create their own scores

  3. Performance
    - Add composite index on user_id and game_id
*/

-- Create scores table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS scores (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    game_id text NOT NULL,
    score integer NOT NULL,
    created_at timestamptz DEFAULT now()
  );

  -- Add foreign key if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints 
    WHERE constraint_name = 'scores_user_id_fkey'
  ) THEN
    ALTER TABLE scores
    ADD CONSTRAINT scores_user_id_fkey
    FOREIGN KEY (user_id) REFERENCES auth.users(id);
  END IF;
END $$;

-- Enable RLS
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

-- Create policies if they don't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'scores' AND policyname = 'Users can read own scores'
  ) THEN
    CREATE POLICY "Users can read own scores"
      ON scores
      FOR SELECT
      TO authenticated
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename = 'scores' AND policyname = 'Users can create own scores'
  ) THEN
    CREATE POLICY "Users can create own scores"
      ON scores
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;

-- Create index if it doesn't exist
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes WHERE indexname = 'scores_user_game_idx'
  ) THEN
    CREATE INDEX scores_user_game_idx ON scores(user_id, game_id);
  END IF;
END $$;