'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export function PasswordInput() {
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="relative">
            <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                required
                className="w-full bg-slate-900/50 border border-slate-800 rounded-lg px-4 py-3 pr-10 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors placeholder:text-slate-600 text-slate-200"
            />
            <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400 transition-colors"
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
            >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    )
}
