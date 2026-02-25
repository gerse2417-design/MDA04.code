import Image from 'next/image';
import Link from 'next/link';

interface PostCardProps {
    post: {
        id: string;
        title: string;
        excerpt: string;
        category: string;
        author_name: string;
        author_avatar: string;
        reading_time: string;
        image_url: string;
        is_trending: boolean;
    };
}

export default function PostCard({ post }: PostCardProps) {
    if (post.is_trending) {
        return (
            <Link href={`/posted/${post.id}`} className="group relative block w-full overflow-hidden rounded-xl bg-gray-900 shadow-md transition-all hover:ring-2 hover:ring-blue-500">
                <div className="relative h-[240px] w-full sm:h-[320px]">
                    <Image
                        src={post.image_url}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                    <div className="mb-3 flex items-center gap-3">
                        <span className="rounded bg-blue-600 px-2 py-1 text-xs font-bold text-white">
                            SPECIAL
                        </span>
                        <span className="text-xs font-medium uppercase tracking-wider text-gray-300">
                            {post.reading_time}
                        </span>
                    </div>
                    <h2 className="mb-2 line-clamp-2 text-2xl font-bold leading-tight text-white sm:text-3xl">
                        {post.title}
                    </h2>
                </div>
            </Link>
        );
    }

    // Regular Card
    return (
        <Link href={`/posted/${post.id}`} className="group flex flex-col overflow-hidden rounded-xl bg-[#1e293b] shadow-md transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50">
            <div className="relative h-48 w-full overflow-hidden sm:h-56">
                <Image
                    src={post.image_url}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                        {post.category}
                    </span>
                    <span className="text-gray-500">•</span>
                    <span className="text-xs text-gray-400">{post.reading_time}</span>
                </div>
                <h3 className="mb-4 line-clamp-2 text-lg font-bold leading-snug text-white">
                    {post.title}
                </h3>
                <div className="mt-auto flex items-center gap-3">
                    <div className="relative h-6 w-6 overflow-hidden rounded-full bg-gray-600">
                        {post.author_avatar && (
                            <Image
                                src={post.author_avatar}
                                alt={post.author_name}
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>
                    <span className="text-sm font-medium text-gray-300">{post.author_name}</span>
                </div>
            </div>
        </Link>
    );
}
