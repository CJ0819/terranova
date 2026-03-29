import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { createJob, updateJob, getAdminJobs, getDepartments } from '../api'
import toast from 'react-hot-toast'

const emptyForm = {
    title: '', department: '', location: '', job_type: 'full_time',
    status: 'active', description: '', responsibilities: '', requirements: '',
    salary_min: '', salary_max: '', deadline: '',
}

export default function AdminJobForm() {
    const { id } = useParams()
    const navigate = useNavigate()
    const isEdit = Boolean(id)

    const [form, setForm] = useState(emptyForm)
    const [departments, setDepartments] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getDepartments().then((r) => setDepartments(r.data))
        if (isEdit) {
            // Fetch existing job to prefill form
            getAdminJobs().then((r) => {
                const job = r.data.find((j) => j.id === parseInt(id))
                if (job) setForm({ ...emptyForm, ...job, department: job.department || '' })
            })
        }
    }, [id])

    const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            if (isEdit) {
                await updateJob(id, form)
                toast.success('Job updated successfully')
            } else {
                await createJob(form)
                toast.success('Job posted successfully')
            }
            navigate('/admin/jobs')
        } catch (err) {
            toast.error('Something went wrong. Check all fields.')
        } finally {
            setLoading(false)
        }
    }

    const inputClass = "w-full bg-[#1a1815] border border-earth-800/40 text-[#f5f0e8] font-body px-4 py-3 rounded focus:outline-none focus:border-earth-500 placeholder-[#6b6560]"
    const labelClass = "font-body text-xs text-[#a09890] uppercase tracking-wider mb-2 block"

    return (
        <div className="p-8 max-w-3xl">
            <div className="mb-8">
                <h1 className="font-display text-3xl font-bold text-[#f5f0e8]">
                    {isEdit ? 'Edit Job' : 'Post New Job'}
                </h1>
                <p className="font-body text-[#a09890] mt-1">
                    {isEdit ? 'Update the job posting details' : 'Fill in the details for the new position'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClass}>Job Title *</label>
                        <input value={form.title} onChange={set('title')} className={inputClass} required placeholder="e.g. Senior Geologist" />
                    </div>
                    <div>
                        <label className={labelClass}>Department *</label>
                        <select value={form.department} onChange={set('department')} className={inputClass} required>
                            <option value="">Select department</option>
                            {departments.map((d) => (
                                <option key={d.id} value={d.id}>{d.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <label className={labelClass}>Location *</label>
                        <input value={form.location} onChange={set('location')} className={inputClass} required placeholder="e.g. Accra, Ghana" />
                    </div>
                    <div>
                        <label className={labelClass}>Job Type</label>
                        <select value={form.job_type} onChange={set('job_type')} className={inputClass}>
                            <option value="full_time">Full Time</option>
                            <option value="part_time">Part Time</option>
                            <option value="contract">Contract</option>
                            <option value="internship">Internship</option>
                        </select>
                    </div>
                    <div>
                        <label className={labelClass}>Status</label>
                        <select value={form.status} onChange={set('status')} className={inputClass}>
                            <option value="active">Active</option>
                            <option value="draft">Draft</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className={labelClass}>Job Description *</label>
                    <textarea value={form.description} onChange={set('description')} className={`${inputClass} min-h-[120px] resize-y`} required placeholder="Overview of the role..." />
                </div>

                <div>
                    <label className={labelClass}>Key Responsibilities *</label>
                    <textarea value={form.responsibilities} onChange={set('responsibilities')} className={`${inputClass} min-h-[120px] resize-y`} required placeholder="List responsibilities, one per line..." />
                </div>

                <div>
                    <label className={labelClass}>Requirements *</label>
                    <textarea value={form.requirements} onChange={set('requirements')} className={`${inputClass} min-h-[120px] resize-y`} required placeholder="Qualifications and skills required..." />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <label className={labelClass}>Min Salary (USD)</label>
                        <input type="number" value={form.salary_min} onChange={set('salary_min')} className={inputClass} placeholder="e.g. 40000" />
                    </div>
                    <div>
                        <label className={labelClass}>Max Salary (USD)</label>
                        <input type="number" value={form.salary_max} onChange={set('salary_max')} className={inputClass} placeholder="e.g. 60000" />
                    </div>
                    <div>
                        <label className={labelClass}>Application Deadline</label>
                        <input type="date" value={form.deadline} onChange={set('deadline')} className={inputClass} />
                    </div>
                </div>

                <div className="flex gap-4 pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="border border-earth-700 bg-earth-500 hover:bg-earth-400 text-[#EFBF04] font-body font-semibold px-8 py-3 rounded transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Post Job'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate('/admin/jobs')}
                        className="border border-earth-700 text-[#a09890] hover:text-[#f5f0e8] font-body px-6 py-3 rounded transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}


