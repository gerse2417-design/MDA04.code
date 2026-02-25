-- Insert seed data for categories
INSERT INTO public.categories (name)
VALUES
  ('JavaScript'),
  ('Rust'),
  ('UI DESIGN'),
  ('DEVOPS'),
  ('NEXTJS'),
  ('TYPESCRIPT')
ON CONFLICT (name) DO NOTHING;

-- Insert seed data for the developer blog
INSERT INTO public.posts (title, excerpt, category, author_name, author_avatar, reading_time, image_url, is_trending, likes_count, content)
VALUES
  -- Trending post
  (
    'Mastering Low-Level Systems with Rust: A Deep Dive',
    'Explore the intricacies of low-level system programming using Rust, focusing on safety without sacrificing performance.',
    'Rust',
    'System Eng',
    '/default-avatar.png',
    '12 MIN READ',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop',
    true,
    0,
    ''
  ),
  -- Regular posts
  (
    'Better State Management in React',
    'A comprehensive guide to managing complex state in modern React applications using Context, Redux, and Zustand.',
    'TYPESCRIPT',
    'Alex Rivers',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    '5 min',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop',
    false,
    0,
    ''
  ),
  (
    'The Future of Server Components',
    'How React Server Components are changing the way we build web applications and what it means for performance.',
    'NEXTJS',
    'Sara Chen',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Sara',
    '8 min',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    false,
    0,
    ''
  ),
  (
    'Why Consistency is Overrated',
    'A controversial look at UI design patterns and when breaking consistency can actually improve user experience.',
    'UI DESIGN',
    'Jordan Lee',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan',
    '4 min',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
    false,
    0,
    ''
  ),
  (
    'Kubernetes for Small Teams',
    'Demystifying Kubernetes deployment and finding the right balance of infrastructure for growing engineering teams.',
    'DEVOPS',
    'Marc Smith',
    'https://api.dicebear.com/7.x/avataaars/svg?seed=Marc',
    '10 min',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2668&auto=format&fit=crop',
    false,
    0,
    ''
  );
