import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAdminJobs, deleteJob } from '../api'
import toast from 'react-hot-toast'

export function AdminJobs() {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)

    const load = () => {
        setLoading(true)
        getAdminJobs().then((r) => setJobs(r.data)).finally(() => setLoading(false))
    }

    useEffect(load, [])

    const handleDelete = async (id, title) => {
        if (!window.confirm(`Delete "${title}"?`)) return
        await deleteJob(id)
        toast.success('Job deleted')
        load()
    }

    const statusColor = {
        active: 'text-green-400',
        closed: 'text-red-400',
        draft: 'text-yellow-400',
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-display text-3xl font-bold text-[#f5f0e8]">Jobs</h1>
                    <p className="font-body text-[#a09890] mt-1">Manage job postings</p>
                </div>
                <Link
                    to="/admin/jobs/new"
                    className="bg-earth-500 hover:bg-earth-400 text-[#1a1002] font-body font-semibold px-5 py-2.5 rounded transition-colors"
                >
                    + New Job
                </Link>
            </div>

            {loading ? (
                <p className="text-[#a09890]">Loading...</p>
            ) : (
                <div className="bg-[#141210] border border-earth-800/30 rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-earth-800/30">
                                <th className="text-left font-body text-xs text-[#6b6560] uppercase tracking-wider px-6 py-4">Title</th>
                                <th className="text-left font-body text-xs text-[#6b6560] uppercase tracking-wider px-4 py-4">Department</th>
                                <th className="text-left font-body text-xs text-[#6b6560] uppercase tracking-wider px-4 py-4">Status</th>
                                <th className="text-left font-body text-xs text-[#6b6560] uppercase tracking-wider px-4 py-4">Applications</th>
                                <th className="px-4 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job.id} className="border-b border-earth-800/20 hover:bg-earth-800/10 transition-colors">
                                    <td className="px-6 py-4 font-body text-[#f5f0e8] font-medium">{job.title}</td>
                                    <td className="px-4 py-4 font-body text-sm text-[#a09890]">{job.department_name}</td>
                                    <td className={`px-4 py-4 font-body text-sm capitalize ${statusColor[job.status]}`}>{job.status}</td>
                                    <td className="px-4 py-4 font-body text-sm text-[#a09890]">{job.application_count}</td>
                                    <td className="px-4 py-4 flex gap-3 justify-end">
                                        <Link
                                            to={`/admin/jobs/${job.id}/edit`}
                                            className="font-body text-sm text-earth-400 hover:text-earth-300 transition-colors"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(job.id, job.title)}
                                            className="font-body text-sm text-red-500 hover:text-red-400 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
