import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const values = [
  {
    title: 'Safety First',
    desc: 'Every decision starts with the safety of our people. Zero harm is not a target — it is our standard.',
  },
  {
    title: 'Environmental Stewardship',
    desc: 'We restore what we use. Every mine site is reclaimed, replanted, and returned to the community.',
  },
  {
    title: 'Community Partnership',
    desc: 'We invest in local infrastructure, education, and employment in every region we operate.',
  },
  {
    title: 'Operational Excellence',
    desc: 'World-class engineering and technology drive efficiency and precision across all our operations.',
  },
]

const team = [
  { name: 'Kwame Asante', role: 'Chief Executive Officer', since: '2009' },
  { name: 'Abena Mensah', role: 'Chief Operations Officer', since: '2013' },
  { name: 'David Osei', role: 'Chief Financial Officer', since: '2015' },
  { name: 'Ama Boateng', role: 'VP, Sustainability', since: '2017' },
  { name: 'Samuel Darko', role: 'VP, Engineering', since: '2011' },
  { name: 'Grace Ntow', role: 'VP, Human Resources', since: '2018' },
]

const milestones = [
  { year: '1989', event: 'Founded in Accra by the Asante family with a single bauxite concession.' },
  { year: '1997', event: 'Expanded into gold mining operations across the Ashanti Region.' },
  { year: '2004', event: 'Achieved ISO 14001 environmental management certification.' },
  { year: '2011', event: 'Launched the TerraNova Community Fund, investing $50M in local development.' },
  { year: '2018', event: 'Expanded operations into Côte d\'Ivoire and Burkina Faso.' },
  { year: '2023', event: 'Became the first West African miner to achieve carbon-neutral operations.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0f0e0c] text-[#f5f0e8]">
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-20 px-6 bg-[#0f0e0c] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a52a' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-[var(--color-earth-400)] font-body text-sm tracking-widest uppercase mb-4">Who We Are</p>
          <h1 className="font-display text-6xl font-bold mb-6 leading-tight">
            Rooted in Africa.<br />
            <span style={{ color: 'var(--color-earth-300)' }}>Built for the World.</span>
          </h1>
          <p className="font-body text-lg text-[#c4bfb4] max-w-2xl leading-relaxed">
            For over 35 years, TerraNova Mining has been extracting the minerals that
            power modern civilization — while giving back to the land and people that make it possible.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-20 px-6 bg-[#141210] border-y border-[#2d1f04]/50">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-sm tracking-widest uppercase mb-3" style={{ color: 'var(--color-earth-400)' }}>Our Story</p>
            <h2 className="font-display text-4xl font-bold mb-6">From a single concession to 12 sites</h2>
            <p className="font-body text-[#a09890] leading-relaxed mb-4">
              TerraNova was founded in 1989 by Emmanuel Asante, a geologist who believed that
              Africa's mineral wealth could be harnessed responsibly — benefiting communities,
              not just shareholders.
            </p>
            <p className="font-body text-[#a09890] leading-relaxed">
              Starting with a single bauxite concession in the Western Region of Ghana, we have
              grown into one of West Africa's most respected mining companies, operating across
              three countries and employing over 4,200 people.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '1989', label: 'Founded' },
              { value: '3', label: 'Countries' },
              { value: '$2.1B', label: 'Annual Revenue' },
              { value: '4,200+', label: 'Employees' },
            ].map((s) => (
              <div key={s.label} className="bg-[#0f0e0c] border border-[#2d1f04]/50 rounded-lg p-6 text-center">
                <div className="font-display text-3xl font-bold mb-1" style={{ color: 'var(--color-earth-300)' }}>{s.value}</div>
                <div className="font-body text-xs text-[#a09890] uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="font-body text-sm tracking-widest uppercase mb-3" style={{ color: 'var(--color-earth-400)' }}>What Guides Us</p>
            <h2 className="font-display text-4xl font-bold">Our Core Values</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={v.title} className="flex gap-5 p-6 bg-[#141210] border border-[#2d1f04]/40 rounded-lg">
                <div className="font-display text-2xl font-bold shrink-0" style={{ color: 'var(--color-earth-700)' }}>
                  0{i + 1}
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold mb-2 text-[#f5f0e8]">{v.title}</h3>
                  <p className="font-body text-sm text-[#a09890] leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 bg-[#141210] border-y border-[#2d1f04]/50">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14">
            <p className="font-body text-sm tracking-widest uppercase mb-3" style={{ color: 'var(--color-earth-400)' }}>Our Journey</p>
            <h2 className="font-display text-4xl font-bold">Key Milestones</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-[#2d1f04]/60" />
            <div className="flex flex-col gap-10">
              {milestones.map((m) => (
                <div key={m.year} className="flex gap-8 items-start relative">
                  <div className="w-16 shrink-0 font-display text-sm font-bold text-right" style={{ color: 'var(--color-earth-400)' }}>
                    {m.year}
                  </div>
                  <div className="w-3 h-3 rounded-full shrink-0 mt-1 relative z-10" style={{ backgroundColor: 'var(--color-earth-500)' }} />
                  <p className="font-body text-[#c4bfb4] leading-relaxed text-sm">{m.event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-14">
            <p className="font-body text-sm tracking-widest uppercase mb-3" style={{ color: 'var(--color-earth-400)' }}>The People Behind It</p>
            <h2 className="font-display text-4xl font-bold">Leadership Team</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {team.map((t) => (
              <div key={t.name} className="p-6 bg-[#141210] border border-[#2d1f04]/40 rounded-lg">
                <div className="w-12 h-12 rounded-full mb-4 flex items-center justify-center font-display text-lg font-bold"
                  style={{ backgroundColor: 'var(--color-earth-800)', color: 'var(--color-earth-300)' }}>
                  {t.name.charAt(0)}
                </div>
                <h3 className="font-display text-lg font-semibold text-[#f5f0e8] mb-1">{t.name}</h3>
                <p className="font-body text-sm mb-2" style={{ color: 'var(--color-earth-400)' }}>{t.role}</p>
                <p className="font-body text-xs text-[#6b6560]">With TerraNova since {t.since}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
