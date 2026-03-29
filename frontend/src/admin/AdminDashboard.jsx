import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAdminStats } from '../api'

export function AdminDashboard() {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        getAdminStats().then((r) => setStats(r.data))
    }, [])

    const cards = stats
        ? [
            { label: 'Total Jobs', value: stats.total_jobs, color: 'text-earth-300' },
            { label: 'Active Jobs', value: stats.active_jobs, color: 'text-green-400' },
            { label: 'Total Applications', value: stats.total_applications, color: 'text-blue-400' },
            { label: 'Pending Review', value: stats.pending_applications, color: 'text-yellow-400' },
        ]
        : []

    return (
        <div className="p-8">
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-[#f5f0e8]">Dashboard</h1>
                <p className="font-body text-[#a09890] mt-1">Overview of TerraNova careers portal</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {cards.map((c) => (
                    <div key={c.label} className="bg-[#141210] border border-earth-800/30 rounded-lg p-6">
                        <div className={`font-display text-4xl font-bold mb-1 ${c.color}`}>{c.value}</div>
                        <div className="font-body text-sm text-[#a09890]">{c.label}</div>
                    </div>
                ))}
            </div>

            <div className="flex gap-4">
                <Link
                    to="/admin/jobs/new"
                    className=" border border-earth-700 bg-earth-500 hover:bg-earth-400 text-[#EFBF04] font-body font-semibold px-6 py-3 rounded transition-colors"
                >
                    + Post New Job
                </Link>
                <Link
                    to="/admin/applications"
                    className="border border-earth-700 hover:border-earth-500 text-[#f5f0e8] font-body px-6 py-3 rounded transition-colors"
                >
                    View Applications
                </Link>
            </div>
        </div>
    )
}
