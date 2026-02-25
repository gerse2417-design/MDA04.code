-- Create the posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  excerpt text NOT NULL,
  category text NOT NULL,
  author_name text NOT NULL,
  author_avatar text NOT NULL,
  reading_time text NOT NULL,
  image_url text NOT NULL,
  is_trending boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.posts FOR SELECT
  USING ( true );
