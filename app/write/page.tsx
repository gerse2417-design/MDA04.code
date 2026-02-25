'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Settings, Bold, Italic, Link as LinkIcon, Image as ImageIcon, Send, FileText } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { createPost } from './actions';

export default function WritePage() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isPublishing, setIsPublishing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) {
            alert('Please enter both title and content.');
            return;
        }

        setIsPublishing(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);

            const result = await createPost(formData);

            if (result?.error) {
                setError(result.error);
                alert(`Failed to publish post: ${result.error}`);
            }
        } catch (err) {
            console.error('Unexpected error:', err);
            // Redirect handled by server action usually, but catch errors here
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#0b1120] font-sans text-gray-200">
            {/* Top Navbar */}
            <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-800 bg-[#0b1120] px-4 md:px-8">
                <button onClick={() => router.back()} className="rounded-full p-2 transition-colors hover:bg-gray-800 text-white">
                    <X className="h-6 w-6" />
                </button>
                <span className="text-lg font-bold text-white">Create New Post</span>
                <button className="rounded-full p-2 transition-colors hover:bg-gray-800 text-blue-500">
                    <Settings className="h-6 w-6" />
                </button>
            </nav>

            <main className="flex-1 pb-24">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 mx-4 md:mx-8 mt-4 rounded-xl text-center text-sm">
                        {error}
                    </div>
                )}

                {/* Post Title Section */}
                <section className="px-4 py-6 md:px-8">
                    <label className="mb-2 block text-xs font-bold tracking-widest text-gray-400 uppercase">
                        Post Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Building with Tailwind CSS"
                        className="w-full rounded-xl border border-gray-700 bg-[#1e293b] px-4 py-4 text-lg font-bold text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                </section>

                {/* Markdown Editor Section */}
                <section className="border-t border-gray-800">
                    <div className="flex items-center justify-between px-4 py-3 md:px-8 border-b border-gray-800 bg-[#0f172a]">
                        <span className="text-xs font-bold tracking-widest text-blue-500 uppercase">
                            Markdown Editor
                        </span>
                        <div className="flex items-center gap-4 text-gray-400">
                            <button className="hover:text-white transition-colors"><Bold className="h-4 w-4" /></button>
                            <button className="hover:text-white transition-colors"><Italic className="h-4 w-4" /></button>
                            <button className="hover:text-white transition-colors"><LinkIcon className="h-4 w-4" /></button>
                            <button className="hover:text-white transition-colors"><ImageIcon className="h-4 w-4" /></button>
                        </div>
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="## Why I love Utility-first CSS..."
                        className="h-[300px] w-full resize-none bg-[#0b1120] px-4 py-4 font-mono text-sm leading-relaxed text-gray-300 placeholder-gray-600 focus:outline-none md:px-8"
                    />
                </section>

                {/* Live Preview Section */}
                <section className="border-t border-gray-800">
                    <div className="px-4 py-3 md:px-8 bg-[#1e293b] border-b border-gray-800">
                        <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                            Live Preview
                        </span>
                    </div>
                    <div className="px-4 py-6 md:px-8 bg-[#0b1120]">
                        <article className="prose prose-invert prose-blue max-w-none prose-img:rounded-xl">
                            {content ? (
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {content}
                                </ReactMarkdown>
                            ) : (
                                <p className="text-gray-500 italic">Preview will appear here...</p>
                            )}
                        </article>
                    </div>
                </section>
            </main>

            {/* Fixed Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 w-full flex items-center gap-4 border-t border-gray-800 bg-[#0f172a] px-4 py-4 md:px-8 shadow-[0_-10px_20px_rgba(0,0,0,0.3)] z-50">
                <button
                    className="flex-1 rounded-xl border border-gray-700 bg-transparent px-4 py-3.5 font-bold text-white transition-colors hover:bg-gray-800 flex items-center justify-center gap-2"
                >
                    <FileText className="h-5 w-5 opacity-80" />
                    Save Draft
                </button>
                <button
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3.5 font-bold text-white transition-colors hover:bg-blue-700 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(37,99,235,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    <Send className="h-5 w-5" />
                    {isPublishing ? 'Publishing...' : 'Publish Post'}
                </button>
            </div>
        </div>
    );
}
