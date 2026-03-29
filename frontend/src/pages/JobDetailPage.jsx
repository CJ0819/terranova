import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getJob, applyForJob } from '../api'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'

const typeLabel = {
  full_time: 'Full Time',
  part_time: 'Part Time',
  contract: 'Contract',
  internship: 'Internship',
}

const emptyForm = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  cover_letter: '',
  resume: null,
}

export default function JobDetailPage() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(emptyForm)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    getJob(id)
      .then((r) => setJob(r.data))
      .catch(() => toast.error('Job not found'))
      .finally(() => setLoading(false))
  }, [id])

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const formData = new FormData()
      formData.append('job', id)
      formData.append('first_name', form.first_name)
      formData.append('last_name', form.last_name)
      formData.append('email', form.email)
      formData.append('phone', form.phone)
      formData.append('cover_letter', form.cover_letter)
      if (form.resume) formData.append('resume', form.resume)
      await applyForJob(id, formData)
      setSubmitted(true)
      toast.success('Application submitted!')
    } catch (err) {
      console.log(err.response?.data)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = "w-full bg-[#1a1815] border border-[#2d1f04]/60 text-[#f5f0e8] font-body px-4 py-3 rounded focus:outline-none focus:border-[var(--color-earth-500)] placeholder-[#6b6560]"
  const labelClass = "font-body text-xs text-[#a09890] uppercase tracking-wider mb-2 block"

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0e0c] flex items-center justify-center">
        <p className="text-[#a09890] font-body">Loading...</p>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-[#0f0e0c] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#a09890] font-body mb-4">Job not found.</p>
          <Link to="/careers" className="text-[var(--color-earth-300)] font-body">← Back to Careers</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f0e0c] text-[#f5f0e8]">
      <Navbar />

      <div className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">

          {/* Back link */}
          <Link to="/careers" className="font-body text-sm text-[#a09890] hover:text-[var(--color-earth-300)] transition-colors mb-8 inline-block">
            ← Back to all positions
          </Link>

          {/* Job Header */}
          <div className="mb-12 pb-12 border-b border-[#2d1f04]/40">
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="font-body text-xs px-3 py-1 rounded-full bg-[#141210] border border-[#2d1f04]/50 text-[var(--color-earth-400)]">
                {job.department_name}
              </span>
              <span className="font-body text-xs px-3 py-1 rounded-full bg-[#141210] border border-[#2d1f04]/50 text-[#a09890]">
                {typeLabel[job.job_type]}
              </span>
              <span className="font-body text-xs px-3 py-1 rounded-full bg-[#141210] border border-[#2d1f04]/50 text-[#a09890]">
                {job.location}
              </span>
            </div>
            <h1 className="font-display text-5xl font-bold mb-4">{job.title}</h1>
            {job.salary_min && job.salary_max && (
              <p className="font-body text-[var(--color-earth-300)]">
                ${Number(job.salary_min).toLocaleString()} – ${Number(job.salary_max).toLocaleString()} / year
              </p>
            )}
            {job.deadline && (
              <p className="font-body text-xs text-[#6b6560] mt-2">
                Application deadline: {new Date(job.deadline).toLocaleDateString()}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Job Details */}
            <div className="md:col-span-2 flex flex-col gap-10">
              <div>
                <h2 className="font-display text-xl font-bold mb-4 text-[var(--color-earth-300)]">About the Role</h2>
                <p className="font-body text-[#c4bfb4] leading-relaxed whitespace-pre-line">{job.description}</p>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold mb-4 text-[var(--color-earth-300)]">Key Responsibilities</h2>
                <p className="font-body text-[#c4bfb4] leading-relaxed whitespace-pre-line">{job.responsibilities}</p>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold mb-4 text-[var(--color-earth-300)]">Requirements</h2>
                <p className="font-body text-[#c4bfb4] leading-relaxed whitespace-pre-line">{job.requirements}</p>
              </div>
            </div>

            {/* Sticky sidebar */}
            <div>
              <div className="bg-[#141210] border border-[#2d1f04]/40 rounded-xl p-6 sticky top-24">
                <h3 className="font-display text-lg font-bold mb-4">Job Summary</h3>
                <div className="flex flex-col gap-3 text-sm font-body">
                  <div>
                    <p className="text-[#6b6560] text-xs uppercase tracking-wider mb-1">Department</p>
                    <p className="text-[#f5f0e8]">{job.department_name}</p>
                  </div>
                  <div>
                    <p className="text-[#6b6560] text-xs uppercase tracking-wider mb-1">Location</p>
                    <p className="text-[#f5f0e8]">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-[#6b6560] text-xs uppercase tracking-wider mb-1">Type</p>
                    <p className="text-[#f5f0e8]">{typeLabel[job.job_type]}</p>
                  </div>
                  {job.deadline && (
                    <div>
                      <p className="text-[#6b6560] text-xs uppercase tracking-wider mb-1">Deadline</p>
                      <p className="text-[#f5f0e8]">{new Date(job.deadline).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
                <a href="#apply" className="block mt-6 text-center bg-[var(--color-earth-500)] hover:bg-[var(--color-earth-400)] text-[#1a1002] font-body font-semibold py-3 rounded transition-colors">
                  Apply Now
                </a>
              </div>
            </div>
          </div>

          {/* Application Form */}
          <div id="apply" className="mt-20 pt-12 border-t border-[#2d1f04]/40">
            <h2 className="font-display text-3xl font-bold mb-2">Apply for this Position</h2>
            <p className="font-body text-[#a09890] mb-10">Fill in your details below and we'll be in touch.</p>

            {submitted ? (
              <div className="bg-[#141210] border border-green-800/40 rounded-xl p-10 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-display text-2xl font-bold text-green-400 mb-2">Application Submitted!</h3>
                <p className="font-body text-[#a09890] mb-6">Thank you for applying. We'll review your application and get back to you shortly.</p>
                <Link to="/careers" className="font-body text-sm text-[var(--color-earth-300)] hover:text-[var(--color-earth-200)] transition-colors">
                  ← Browse more positions
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-2xl">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>First Name *</label>
                    <input value={form.first_name} onChange={set('first_name')} className={inputClass} required placeholder="Kwame" />
                  </div>
                  <div>
                    <label className={labelClass}>Last Name *</label>
                    <input value={form.last_name} onChange={set('last_name')} className={inputClass} required placeholder="Asante" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelClass}>Email *</label>
                    <input type="email" value={form.email} onChange={set('email')} className={inputClass} required placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className={labelClass}>Phone *</label>
                    <input type="tel" value={form.phone} onChange={set('phone')} className={inputClass} required placeholder="+233 XX XXX XXXX" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Cover Letter *</label>
                  <textarea
                    value={form.cover_letter}
                    onChange={set('cover_letter')}
                    className={`${inputClass} min-h-[160px] resize-y`}
                    required
                    placeholder="Tell us why you're a great fit for this role..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Resume (Word document only)</label>
                  <input
                    type="file"
                    accept=".doc,.docx"
                    onChange={(e) => setForm({ ...form, resume: e.target.files[0] })}
                    className="w-full font-body text-sm text-[#a09890] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:font-body file:text-sm file:bg-[#2d1f04] file:text-[var(--color-earth-300)] hover:file:bg-[#4a3509] cursor-pointer"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[var(--color-earth-500)] hover:bg-[var(--color-earth-400)] text-[#1a1002] font-body font-semibold py-4 rounded transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
