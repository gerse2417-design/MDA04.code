-- Create policy to allow public insert access for the developer blog
CREATE POLICY "Public can insert posts."
  ON public.posts FOR INSERT
  WITH CHECK ( true );
