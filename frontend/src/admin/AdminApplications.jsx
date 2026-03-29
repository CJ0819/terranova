import { useState, useEffect } from 'react'
import { getApplications, updateApplication, deleteApplication } from '../api'
import toast from 'react-hot-toast'

const STATUS_OPTIONS = ['pending', 'reviewing', 'shortlisted', 'rejected', 'hired']

const statusStyle = {
    pending: 'bg-yellow-900/40 text-yellow-400',
    reviewing: 'bg-blue-900/40 text-blue-400',
    shortlisted: 'bg-green-900/40 text-green-400',
    rejected: 'bg-red-900/40 text-red-400',
    hired: 'bg-earth-700/40 text-earth-300',
}

export function AdminApplications() {
    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const [statusFilter, setStatusFilter] = useState('')

    const load = () => {
        setLoading(true)
        const params = statusFilter ? { status: statusFilter } : {}
        getApplications(params).then((r) => setApplications(r.data)).finally(() => setLoading(false))
    }

    useEffect(load, [statusFilter])

    const handleStatusChange = async (id, newStatus) => {
        await updateApplication(id, { status: newStatus })
        toast.success('Status updated')
        load()
    }

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this application?')) return
        try {
            await deleteApplication(id)
            toast.success('Application deleted')
            load()
        } catch {
            toast.error('Could not delete application')
        }
    }

    const getResumeUrl = (resume) => {
        if (!resume) return null
        if (resume.includes('res.cloudinary.com')) {
            return resume.replace('/upload/', '/upload/fl_attachment/')
        }
        return resume
    }

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="font-display text-3xl font-bold text-[#f5f0e8]">Applications</h1>
                    <p className="font-body text-[#a09890] mt-1">{applications.length} total applications</p>
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-[#1a1815] border border-earth-800/40 text-[#f5f0e8] font-body text-sm px-4 py-2 rounded focus:outline-none focus:border-earth-500"
                >
                    <option value="">All Statuses</option>
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p className="text-[#a09890]">Loading...</p>
            ) : (
                <div className="flex flex-col gap-4">
                    {applications.map((app) => (
                        <div key={app.id} className="bg-[#141210] border border-earth-800/30 rounded-xl p-6">
                            <div className="flex items-start justify-between gap-4 flex-wrap">
                                <div>
                                    <h2 className="font-body font-semibold text-[#f5f0e8] text-lg">
                                        {app.first_name} {app.last_name}
                                    </h2>
                                    <p className="font-body text-sm text-earth-400 mt-0.5">Applied for: {app.job_title}</p>
                                    <div className="flex gap-4 mt-2 text-sm font-body text-[#a09890]">
                                        <span>{app.email}</span>
                                        <span>·</span>
                                        <span>{app.phone}</span>
                                        <span>·</span>
                                        <span>{new Date(app.applied_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`font-body text-xs px-3 py-1 rounded-full capitalize ${statusStyle[app.status]}`}>
                                        {app.status}
                                    </span>
                                    <select
                                        value={app.status}
                                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                                        className="bg-[#1a1815] border border-earth-800/40 text-[#f5f0e8] font-body text-xs px-3 py-1.5 rounded focus:outline-none"
                                    >
                                        {STATUS_OPTIONS.map((s) => (
                                            <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={() => handleDelete(app.id)}
                                        className="font-body text-xs text-red-500 hover:text-red-400 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            {app.cover_letter && (
                                <div className="mt-4 pt-4 border-t border-earth-800/20">
                                    <p className="font-body text-xs text-[#6b6560] uppercase tracking-wider mb-2">Cover Letter</p>
                                    <p className="font-body text-sm text-[#c4bfb4] leading-relaxed line-clamp-3">{app.cover_letter}</p>
                                </div>
                            )}
                            {app.resume && (
                                <button
                                    onClick={() => {
                                        const url = getResumeUrl(app.resume)
                                        const link = document.createElement("a")
                                        link.href = url
                                        link.setAttribute("download", "resume.docx")
                                        document.body.appendChild(link)
                                        link.click()
                                        document.body.removeChild(link)
                                    }}
                                    className="inline-block mt-3 font-body text-xs text-earth-400 hover:text-earth-300 transition-colors"
                                >
                                    Download Resume →
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}