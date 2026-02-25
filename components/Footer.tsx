import Link from 'next/link';
import { Home, Search, Edit3, User } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t border-gray-800 bg-[#0f172a] sm:hidden">
            <Link href="/" className="flex flex-col items-center gap-1 text-blue-500">
                <Home className="h-6 w-6" />
                <span className="text-[10px] font-medium tracking-wider text-blue-500">HOME</span>
            </Link>
            <Link href="/search" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-300">
                <Search className="h-6 w-6" />
                <span className="text-[10px] font-medium tracking-wider">SEARCH</span>
            </Link>
            <Link href="/write" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-300">
                <Edit3 className="h-6 w-6" />
                <span className="text-[10px] font-medium tracking-wider">WRITE</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-300">
                <User className="h-6 w-6" />
                <span className="text-[10px] font-medium tracking-wider">PROFILE</span>
            </Link>
        </footer>
    );
}
