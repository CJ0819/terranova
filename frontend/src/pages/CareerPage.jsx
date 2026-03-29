// src/pages/CareersPage.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getJobs, getDepartments } from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const typeLabel = {
    full_time: 'Full Time',
    part_time: 'Part Time',
    contract: 'Contract',
    internship: 'Internship',
}

export default function CareersPage() {
    const [jobs, setJobs] = useState([])
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(true)
    const [filters, setFilters] = useState({ department: '', job_type: '' })

    useEffect(() => {
        getDepartments().then((r) => setDepartments(r.data))
    }, [])

    useEffect(() => {
        setLoading(true)
        const params = {}
        if (filters.department) params.department = filters.department
        if (filters.job_type) params.job_type = filters.job_type
        getJobs(params)
            .then((r) => setJobs(r.data))
            .finally(() => setLoading(false))
    }, [filters])

    return (
        <div className="min-h-screen bg-[#0f0e0c] text-[#f5f0e8]">
            <Navbar />

            {/* Header */}
            <div className="pt-32 pb-16 px-6 bg-[#141210] border-b border-earth-800/30">
                <div className="max-w-4xl mx-auto">
                    <p className="text-earth-400 font-body text-sm tracking-widest uppercase mb-3">Join Our Team</p>
                    <h1 className="font-display text-5xl font-bold mb-4">Open Positions</h1>
                    <p className="font-body text-[#a09890] max-w-xl leading-relaxed">
                        We're looking for passionate people to help us mine responsibly and
                        build Africa's resource future.
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-4xl mx-auto px-6 py-8 flex flex-wrap gap-4">
                <select
                    value={filters.department}
                    onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                    className="bg-[#1a1815] border border-earth-800/40 text-[#f5f0e8] font-body text-sm px-4 py-2 rounded focus:outline-none focus:border-earth-500"
                >
                    <option value="">All Departments</option>
                    {departments.map((d) => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                </select>

                <select
                    value={filters.job_type}
                    onChange={(e) => setFilters({ ...filters, job_type: e.target.value })}
                    className="bg-[#1a1815] border border-earth-800/40 text-[#f5f0e8] font-body text-sm px-4 py-2 rounded focus:outline-none focus:border-earth-500"
                >
                    <option value="">All Types</option>
                    <option value="full_time">Full Time</option>
                    <option value="part_time">Part Time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
                </select>
            </div>

            {/* Job List */}
            <div className="max-w-4xl mx-auto px-6 pb-24">
                {loading ? (
                    <div className="text-center py-20 text-[#a09890]">Loading positions...</div>
                ) : jobs.length === 0 ? (
                    <div className="text-center py-20 text-[#a09890]">No open positions match your filters.</div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {jobs.map((job) => (
                            <Link
                                key={job.id}
                                to={`/careers/${job.id}`}
                                className="group bg-[#141210] border border-earth-800/30 hover:border-earth-600/50 rounded-lg p-6 transition-colors flex items-start justify-between"
                            >
                                <div>
                                    <h2 className="font-display text-xl font-semibold group-hover:text-earth-300 transition-colors mb-1">
                                        {job.title}
                                    </h2>
                                    <div className="flex flex-wrap gap-3 text-sm font-body text-[#a09890] mt-2">
                                        <span>{job.department_name}</span>
                                        <span>·</span>
                                        <span>{job.location}</span>
                                        <span>·</span>
                                        <span className="text-earth-400">{typeLabel[job.job_type]}</span>
                                    </div>
                                    {job.deadline && (
                                        <p className="font-body text-xs text-[#6b6560] mt-2">
                                            Closes: {new Date(job.deadline).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                                <span className="text-earth-500 group-hover:text-earth-300 transition-colors text-xl">→</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}
