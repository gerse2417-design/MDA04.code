import { createClient } from '@/utils/supabase/server';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/PostCard';
import { Search, Plus } from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author_name: string;
  author_avatar: string;
  reading_time: string;
  image_url: string;
  is_trending: boolean;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
}

export default async function Home(props: {
  searchParams: Promise<{ category?: string }>
}) {
  const searchParams = await props.searchParams;
  const selectedCategory = searchParams.category || 'All';
  const supabase = await createClient();

  // Fetch categories
  const { data: catData } = await supabase
    .from('categories')
    .select('*')
    .order('name');
  const categories: Category[] = catData || [];

  // Fetch posts
  let query = supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (selectedCategory !== 'All') {
    query = query.ilike('category', `%${selectedCategory}%`);
  }

  const { data: postData } = await query;
  const posts: Post[] = postData || [];

  const trendingPost = posts.find(p => p.is_trending);
  const latestPosts = posts.filter(p => !p.is_trending);

  return (
    <div className="flex min-h-screen flex-col bg-[#0b1120] font-sans text-white">
      <Navbar />

      <main className="flex-1 px-4 py-6 sm:px-6 md:px-8 lg:px-12 mx-auto w-full max-w-5xl pb-24">
        {/* Title and Subtitle */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white sm:text-4xl mb-2 hover:text-blue-400 transition-colors">Developer Blog</h1>
          <p className="text-gray-400 text-lg">Insightful articles, tutorials, and more from the frontend to the backend.</p>
        </div>

        {/* Search Bar equivalent to styling in design */}
        <div className="relative mb-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full rounded-xl border-0 bg-[#1e293b] py-3 pl-11 pr-4 text-sm text-gray-200 placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Search articles, tags, authors..."
          />
        </div>

        {/* Category Filters */}
        <div className="mb-10 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Link
            href="/"
            className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${selectedCategory === 'All'
              ? 'bg-blue-600 text-white'
              : 'bg-[#1e293b] text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-700'
              }`}
          >
            All
          </Link>
          {categories.map(category => (
            <Link
              key={category.id}
              href={`/?category=${encodeURIComponent(category.name)}`}
              className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-colors ${selectedCategory === category.name
                ? 'bg-blue-600 text-white'
                : 'bg-[#1e293b] text-gray-400 hover:bg-gray-800 hover:text-white border border-gray-700'
                }`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Trending Section */}
        {trendingPost && (
          <div className="mb-12">
            <div className="mb-4 flex items-center gap-2">
              <span className="text-xl font-bold text-white flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                Trending Now
              </span>
            </div>
            <PostCard post={trendingPost} />
          </div>
        )}

        {/* Latest Posts */}
        <div>
          <h2 className="mb-6 text-xl font-bold text-white">Latest Posts</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8">
            {latestPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* Pagination placeholder (since we load all currently) */}
        {latestPosts.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button className="rounded-full border border-gray-700 bg-transparent px-6 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800">
              Load More
            </button>
          </div>
        )}
      </main>

      {/* Floating Action Button for writing a post */}
      <Link
        href="/write"
        className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition-transform hover:scale-105 hover:bg-blue-500 z-40"
      >
        <Plus className="h-6 w-6" />
      </Link>

      <Footer />
    </div>
  );
}
