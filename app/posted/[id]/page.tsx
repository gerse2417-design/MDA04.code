import Image from 'next/image';
import { ArrowLeft, Share2, ThumbsUp, Bookmark, MoreHorizontal, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createClient } from '@/utils/supabase/server';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PostDetailsParams {
    params: Promise<{ id: string }>;
}

export default async function PostDetails({ params }: PostDetailsParams) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !post) {
        notFound();
    }

    // Format date if created_at exists, else fallback
    const dateStr = post.created_at
        ? new Date(post.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
        : 'Oct 24, 2023';

    return (
        <div className="flex min-h-screen flex-col bg-[#0b1120] font-sans text-gray-200">
            {/* Detail Navbar */}
            <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between bg-[#0b1120] bg-opacity-95 px-4 backdrop-blur-sm sm:px-6 md:px-8">
                <Link href="/" className="rounded-full p-2 transition-colors hover:bg-gray-800">
                    <ArrowLeft className="h-5 w-5 text-white" />
                </Link>
                <span className="text-sm font-bold tracking-wider text-blue-600">ARTICLE</span>
                <button className="rounded-full p-2 transition-colors hover:bg-gray-800">
                    <Share2 className="h-5 w-5 text-white" />
                </button>
            </nav>

            <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-6 sm:px-6 md:px-8 pb-32">
                {/* Post Title & Header */}
                <h1 className="mb-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
                    {post.title}
                </h1>

                <div className="mb-8 flex items-center gap-4">
                    <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-transparent">
                        {post.author_avatar ? (
                            <Image src={post.author_avatar} alt={post.author_name} fill className="object-cover" />
                        ) : (
                            <div className="h-full w-full bg-gray-600"></div>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-white">{post.author_name}</span>
                        <span className="text-sm text-gray-400">
                            {dateStr} <span className="mx-1">•</span> {post.reading_time}
                        </span>
                    </div>
                </div>

                {/* Thumbnail Image */}
                {post.image_url && (
                    <div className="relative mb-10 h-64 w-full overflow-hidden rounded-xl sm:h-80 md:h-96">
                        <Image src={post.image_url} alt={post.title} fill className="object-cover" priority />
                    </div>
                )}

                {/* Article Content */}
                <article className="prose prose-invert prose-blue max-w-none prose-img:rounded-xl">
                    {post.content ? (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {post.content}
                        </ReactMarkdown>
                    ) : (
                        <p>{post.excerpt}</p>
                    )}
                </article>

                {/* Bottom Interaction Bar */}
                <div className="my-10 flex items-center justify-between border-t border-b border-gray-800 py-4">
                    <button
                        className="flex items-center gap-2 rounded-full px-5 py-2.5 font-bold transition-colors bg-[#1e293b] text-gray-300 hover:bg-gray-800 hover:text-white"
                    >
                        <ThumbsUp className="h-5 w-5" />
                        <span>Like</span>
                        <span className="ml-1 opacity-80">{post.likes_count || 0}</span>
                    </button>

                    <div className="flex items-center gap-4">
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <Bookmark className="h-6 w-6" />
                        </button>
                        <button className="text-gray-400 hover:text-white transition-colors">
                            <MoreHorizontal className="h-6 w-6" />
                        </button>
                    </div>
                </div>

                {/* Comments Section */}
                <section className="mt-8">
                    <h2 className="mb-6 text-xl font-bold text-white">Comments (1)</h2>

                    <div className="mb-8 flex gap-4 rounded-xl bg-[#1e293b] p-5">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                            <Image src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah Chen" fill className="object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <div className="mb-1 flex items-center gap-3">
                                <span className="font-bold text-white">Sarah Chen</span>
                                <span className="text-xs text-gray-500">2h ago</span>
                            </div>
                            <p className="text-sm leading-relaxed text-gray-300">
                                This guide helped me fix my blog's layout issues. The typography tips are spot on!
                            </p>
                        </div>
                    </div>

                    <div className="relative mt-6 flex items-start">
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="w-full rounded-xl bg-[#1e293b] py-4 pl-5 pr-14 text-sm text-gray-200 placeholder-gray-500 shadow-sm focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 transition-colors hover:text-blue-400 focus:outline-none">
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
