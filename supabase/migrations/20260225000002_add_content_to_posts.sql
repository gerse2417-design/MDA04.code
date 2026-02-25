-- Add content and likes_count columns to the posts table
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS content text,
ADD COLUMN IF NOT EXISTS likes_count integer DEFAULT 0;
