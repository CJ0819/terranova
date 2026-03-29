import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import toast from 'react-hot-toast'
import { sendContactMessage } from '../api'

const offices = [
  {
    city: 'Accra',
    country: 'Ghana',
    address: '14 Independence Avenue, Accra, Ghana',
    phone: '+233 30 277 8900',
    email: 'accra@terranova.com',
    label: 'Head Office',
  },
  {
    city: 'Kumasi',
    country: 'Ghana',
    address: '7 Asante Road, Kumasi, Ghana',
    phone: '+233 32 202 1100',
    email: 'kumasi@terranova.com',
    label: 'Operations Centre',
  },
  {
    city: 'Abidjan',
    country: 'Côte d\'Ivoire',
    address: 'Plateau District, Abidjan, CI',
    phone: '+225 27 22 400 500',
    email: 'abidjan@terranova.com',
    label: 'Regional Office',
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await sendContactMessage(form)
      setSubmitted(true)
      toast.success('Message sent!')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = "w-full bg-[#1a1815] border border-[#2d1f04]/60 text-[#f5f0e8] font-body px-4 py-3 rounded focus:outline-none focus:border-[var(--color-earth-500)] placeholder-[#6b6560]"
  const labelClass = "font-body text-xs text-[#a09890] uppercase tracking-wider mb-2 block"

  return (
    <div className="min-h-screen bg-[#0f0e0c] text-[#f5f0e8]">
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--color-earth-400)' }}>Get In Touch</p>
          <h1 className="font-display text-6xl font-bold mb-6">
            Let's <span style={{ color: 'var(--color-earth-300)' }}>Talk</span>
          </h1>
          <p className="font-body text-lg text-[#c4bfb4] max-w-xl leading-relaxed">
            Whether you're a potential partner, investor, job seeker, or community member —
            we'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">

          {/* Contact Form */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-8">Send Us a Message</h2>

            {submitted ? (
              <div className="bg-[#141210] border border-green-800/40 rounded-xl p-10 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="font-display text-xl font-bold text-green-400 mb-2">Message Received!</h3>
                <p className="font-body text-[#a09890]">We'll get back to you within 2 business days.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input value={form.name} onChange={set('name')} className={inputClass} required placeholder="Your name" />
                </div>
                <div>
                  <label className={labelClass}>Email Address *</label>
                  <input type="email" value={form.email} onChange={set('email')} className={inputClass} required placeholder="you@example.com" />
                </div>
                <div>
                  <label className={labelClass}>Subject *</label>
                  <select value={form.subject} onChange={set('subject')} className={inputClass} required>
                    <option value="">Select a subject</option>
                    <option value="partnership">Business Partnership</option>
                    <option value="investment">Investor Relations</option>
                    <option value="careers">Careers Enquiry</option>
                    <option value="community">Community Relations</option>
                    <option value="media">Media & Press</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Message *</label>
                  <textarea
                    value={form.message}
                    onChange={set('message')}
                    className={`${inputClass} min-h-[150px] resize-y`}
                    required
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[var(--color-earth-500)] hover:bg-[var(--color-earth-400)] text-[#1a1002] font-body font-semibold py-4 rounded transition-colors disabled:opacity-50"
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Office Locations */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-8">Our Offices</h2>
            <div className="flex flex-col gap-5">
              {offices.map((o) => (
                <div key={o.city} className="bg-[#141210] border border-[#2d1f04]/40 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-lg font-semibold">{o.city}, {o.country}</h3>
                    <span className="font-body text-xs px-2 py-1 rounded" style={{ backgroundColor: 'var(--color-earth-900)', color: 'var(--color-earth-400)' }}>
                      {o.label}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 font-body text-sm text-[#a09890]">
                    <p>{o.address}</p>
                    <p>{o.phone}</p>
                    <a href={`mailto:${o.email}`} className="transition-colors" style={{ color: 'var(--color-earth-400)' }}>
                      {o.email}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* General contacts */}
            <div className="mt-8 p-6 bg-[#141210] border border-[#2d1f04]/40 rounded-xl">
              <h3 className="font-display text-lg font-semibold mb-4">General Contacts</h3>
              <div className="flex flex-col gap-3 font-body text-sm">
                <div className="flex justify-between">
                  <span className="text-[#6b6560]">Investor Relations</span>
                  <a href="mailto:ir@terranova.com" style={{ color: 'var(--color-earth-400)' }}>ir@terranova.com</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6b6560]">Media & Press</span>
                  <a href="mailto:press@terranova.com" style={{ color: 'var(--color-earth-400)' }}>press@terranova.com</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6b6560]">Careers</span>
                  <a href="mailto:careers@terranova.com" style={{ color: 'var(--color-earth-400)' }}>careers@terranova.com</a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}
