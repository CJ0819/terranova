// src/pages/HomePage.jsx
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const stats = [
    { value: '35+', label: 'Years of Operation' },
    { value: '12', label: 'Active Mine Sites' },
    { value: '4,200+', label: 'Employees Worldwide' },
    { value: '98%', label: 'Safety Record' },
]

const services = [
    {

        title: 'Surface Mining',
        desc: 'Open-pit and strip mining operations using state-of-the-art heavy machinery across West Africa.',
        image: '/surface-mining.jpg',
    },
    {

        title: 'Mineral Processing',
        desc: 'Advanced ore processing and refining facilities producing gold, bauxite, and manganese.',
        image: '/mineral-processing.jpg',
    },
    {

        title: 'Sustainable Reclamation',
        desc: 'Land reclamation and environmental restoration programs at all decommissioned sites.',
        image: '/reclamation.jpg',
    },
]
export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#0f0e0c] text-[#f5f0e8]">
            <Navbar />

            {/* Hero */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* Background image */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: `url('/mining.jpg')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                    }}
                />
                {/* Dark overlay so text stays readable */}
                <div className="absolute inset-0 z-0 bg-black/60" />


                <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                    <p className="text-earth-300 font-body text-sm tracking-[0.3em] uppercase mb-6">
                        Est. 1989 · Accra, Ghana
                    </p>
                    <h1 className="font-display text-6xl md:text-8xl font-bold leading-tight mb-6">
                        <span className="text-[#f5f0e8]">Forging the</span>
                        <br />
                        <span className="text-earth-300">Earth's Future</span>
                    </h1>
                    <p className="font-body text-lg text-[#c4bfb4] max-w-2xl mx-auto mb-10 leading-relaxed">
                        TerraNova Mining is West Africa's leading responsible mining company,
                        extracting critical minerals that power the modern world — sustainably.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/careers"
                            className="bg-white hover:bg-gray-100 text-[#1a1002] font-body font-semibold px-8 py-4 rounded transition-colors"
                        >
                            View Open Positions
                        </Link>
                        <Link
                            to="/about"
                            className="border border-earth-600 hover:border-earth-400 text-[#f5f0e8] font-body px-8 py-4 rounded transition-colors"
                        >
                            Our Story
                        </Link>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">

                    <div className="w-px h-12 bg-gradient-to-b from-earth-400 to-transparent" />
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-[#141210] border-y border-earth-800/30">
                <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((s) => (
                        <div key={s.label} className="text-center">
                            <div className="font-display text-4xl font-bold text-earth-300 mb-2">{s.value}</div>
                            <div className="font-body text-sm text-[#a09890] uppercase tracking-wider">{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Services */}
            <div className="grid md:grid-cols-3 gap-8">
                {services.map((s) => (
                    <div
                        key={s.title}
                        className="relative overflow-hidden "
                        style={{ minHeight: '280px' }}
                    >
                        {/* Background image */}
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `url('${s.image}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                            }}
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/60 hover:bg-black/50 transition-colors" />
                        {/* Content */}
                        <div className="relative z-10 p-8 flex flex-col justify-end h-full" style={{ minHeight: '280px' }}>
                            <h3 className="font-display text-xl font-semibold mb-3 text-white">{s.title}</h3>
                            <p className="font-body text-gray-300 leading-relaxed text-sm">{s.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <section className="py-24 bg-gradient-to-r from-earth-700 to-earth-600 mx-6 mb-12 rounded-2xl text-center">
                <h2 className="font-display text-4xl font-bold text-[#fdf8f0] mb-4">
                    Build Your Career With Us
                </h2>
                <p className="font-body text-earth-200 mb-8 max-w-xl mx-auto">
                    Join a team of 4,200+ professionals shaping the future of responsible mining in Africa.
                </p>
                <Link
                    to="/careers"
                    className="bg-[#fdf8f0] text-[#1a1002]  font-body font-semibold px-8 py-4 rounded hover:bg-white transition-colors"
                >
                    Explore Careers
                </Link>
            </section>

            <Footer />
        </div>
    )
}
