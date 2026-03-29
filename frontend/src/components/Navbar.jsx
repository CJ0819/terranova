// src/components/Navbar.jsx
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/careers', label: 'Careers' },
    { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f0e0c]/90 backdrop-blur-sm border-b border-earth-800/30">
            <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
                <Link to="/" className="font-display text-xl font-bold text-earth-300">
                    TERRA<span className="text-[#f5f0e8]">NOVA</span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-8">
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.to === '/'}
                            className={({ isActive }) =>
                                `font-body text-sm transition-colors ${isActive ? 'text-earth-300' : 'text-[#a09890] hover:text-[#f5f0e8]'
                                }`
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-[#f5f0e8]"
                    onClick={() => setOpen(!open)}
                >
                    {open ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile menu */}
            {open && (
                <div className="md:hidden bg-[#141210] border-t border-earth-800/30 px-6 py-4 flex flex-col gap-4">
                    {links.map((l) => (
                        <NavLink
                            key={l.to}
                            to={l.to}
                            end={l.to === '/'}
                            onClick={() => setOpen(false)}
                            className={({ isActive }) =>
                                `font-body text-sm py-2 ${isActive ? 'text-earth-300' : 'text-[#a09890]'
                                }`
                            }
                        >
                            {l.label}
                        </NavLink>
                    ))}
                </div>
            )}
        </nav>
    )
}


