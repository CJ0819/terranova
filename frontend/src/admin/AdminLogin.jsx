import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'
import toast from 'react-hot-toast'

export function AdminLogin() {
    const [form, setForm] = useState({ username: '', password: '' })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await login(form)
            localStorage.setItem('access_token', res.data.access)
            localStorage.setItem('refresh_token', res.data.refresh)
            navigate('/admin')
        } catch {
            toast.error('Invalid credentials')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#0f0e0c] flex items-center justify-center px-4">
            <div className="w-full max-w-sm">
                <div className="text-center mb-10">
                    <h1 className="font-display text-3xl font-bold text-earth-300">TERRANOVA</h1>
                    <p className="font-body text-sm text-[#a09890] mt-1">Admin Portal</p>
                </div>
                <form onSubmit={handleSubmit} className="bg-[#141210] border border-earth-800/30 rounded-xl p-8 flex flex-col gap-5">
                    <div>
                        <label className="font-body text-xs text-[#a09890] uppercase tracking-wider mb-2 block">Username</label>
                        <input
                            type="text"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            className="w-full bg-[#1a1815] border border-earth-800/40 text-[#f5f0e8] font-body px-4 py-3 rounded focus:outline-none focus:border-earth-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="font-body text-xs text-[#a09890] uppercase tracking-wider mb-2 block">Password</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full bg-[#1a1815] border border-earth-800/40 text-[#f5f0e8] font-body px-4 py-3 rounded focus:outline-none focus:border-earth-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-earth-500 hover:bg-earth-400 text-[#1a1002] font-body font-semibold py-3 rounded transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    )
}
