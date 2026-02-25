import { Terminal } from 'lucide-react'
import { login, signup } from './actions'
import Link from 'next/link'
import { PasswordInput } from './password-input'

export default async function LoginPage(props: {
    searchParams: Promise<{ mode?: string; error?: string; message?: string }>
}) {
    const searchParams = await props.searchParams
    const isSignup = searchParams.mode === 'signup'
    const error = searchParams.error
    const message = searchParams.message

    const action = isSignup ? signup : login

    return (
        <div className="min-h-screen bg-[#0B1120] flex flex-col items-center justify-center p-4 text-white font-sans overflow-hidden relative">
            <div className="w-full max-w-sm flex flex-col items-center mt-[-10vh]">
                <div className="text-sm font-semibold text-slate-400 mb-8 sm:mb-12">반가워요!</div>

                <div className="flex flex-col items-center justify-center w-12 h-12 bg-slate-900/80 border border-slate-800 rounded-xl mb-6 shadow-sm shadow-blue-500/10">
                    <Terminal size={24} className="text-blue-500" />
                </div>

                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-100">
                        DevBlog {isSignup ? '회원가입' : '로그인'}
                    </h1>
                    <p className="text-slate-400 text-sm">마크다운 기반 개발자를 위한 공간</p>
                </div>

                <form action={action} className="w-full space-y-5">
                    {error && (
                        <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20 text-center">
                            {error}
                        </div>
                    )}
                    {message && (
                        <div className="text-sm text-green-400 bg-green-500/10 p-3 rounded-lg border border-green-500/20 text-center">
                            {message}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm text-slate-400 font-medium block">
                            이메일
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@company.com"
                            required
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-slate-600 text-slate-200"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-sm text-slate-400 font-medium">
                                비밀번호
                            </label>
                            {!isSignup && (
                                <Link href="#" className="text-sm text-blue-500 hover:text-blue-400 transition-colors">
                                    비밀번호를 잊으셨나요?
                                </Link>
                            )}
                        </div>
                        <PasswordInput />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-3 transition-colors mt-2 text-sm shadow-lg shadow-blue-600/20"
                    >
                        {isSignup ? '회원가입' : '로그인'}
                    </button>
                </form>

                <div className="text-sm text-slate-400 mt-8">
                    {isSignup ? (
                        <>
                            이미 계정이 있으신가요?{' '}
                            <Link href="/login" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                                로그인
                            </Link>
                        </>
                    ) : (
                        <>
                            계정이 없으신가요?{' '}
                            <Link href="/login?mode=signup" className="text-blue-500 hover:text-blue-400 font-medium transition-colors">
                                회원가입
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
