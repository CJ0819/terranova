import { Outlet, NavLink, useNavigate } from 'react-router-dom'

const navItems = [
    { to: '/admin', label: 'Dashboard', icon: '◈', end: true },
    { to: '/admin/jobs', label: 'Jobs', icon: '◉' },
    { to: '/admin/applications', label: 'Applications', icon: '◎' },
    { to: '/admin/contacts', label: 'Messages', icon: '◍' },
]

export function AdminLayout() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        navigate('/admin/login')
    }

    return (
        <div className="min-h-screen bg-[#0f0e0c] flex">
            {/* Sidebar */}
            <aside className="w-56 bg-[#0d0c0a] border-r border-earth-800/30 flex flex-col">
                <div className="p-6 border-b border-earth-800/30">
                    <p className="font-display text-lg font-bold text-earth-300">TERRA<span className="text-[#f5f0e8]">NOVA</span></p>
                    <p className="font-body text-xs text-[#6b6560] mt-1">Admin Portal</p>
                </div>
                <nav className="flex-1 p-4 flex flex-col gap-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded font-body text-sm transition-colors ${isActive
                                    ? 'bg-earth-700/30 text-earth-300'
                                    : 'text-[#a09890] hover:text-[#f5f0e8] hover:bg-earth-800/20'
                                }`
                            }
                        >
                            <span>{item.icon}</span>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="p-4 border-t border-earth-800/30">
                    <button
                        onClick={logout}
                        className="w-full text-left px-3 py-2 font-body text-sm text-[#a09890] hover:text-red-400 transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    )
}