import Link from 'next/link';
import { Terminal, LogOut, User } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { logout } from '@/app/login/actions';

export default async function Navbar() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <nav className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b border-gray-800 bg-[#0f172a] px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-600">
                    <Terminal className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">DevBlog</span>
            </Link>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-300">
                            <User className="h-4 w-4" />
                            <span className="hidden sm:inline">{user.email}</span>
                        </div>
                        <form action={logout}>
                            <button
                                type="submit"
                                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Log Out</span>
                            </button>
                        </form>
                    </div>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/login?mode=signup"
                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                        >
                            Join
                        </Link>
                    </>
                )}
            </div>
        </nav>
    );
}
