-- Add user_id column to posts table
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) DEFAULT auth.uid();

-- Drop existing insecure policy if it exists
DROP POLICY IF EXISTS "Public can insert posts." ON public.posts;

-- Create policy to allow authenticated users to insert posts
CREATE POLICY "Authenticated users can insert posts."
  ON public.posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own posts
CREATE POLICY "Users can update their own posts."
  ON public.posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to delete their own posts
CREATE POLICY "Users can delete their own posts."
  ON public.posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);
