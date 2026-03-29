import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const services = [
  {
    number: '01',
    title: 'Surface Mining',
    subtitle: 'Open-pit & Strip Operations',
    desc: 'Our surface mining operations use the latest heavy equipment and precision blasting techniques to extract bauxite, gold, and manganese across 12 active sites in West Africa. We maintain strict environmental controls at every stage.',
    details: ['Open-pit extraction', 'Strip mining', 'Precision blasting', 'Haul road management'],
  },
  {
    number: '02',
    title: 'Underground Mining',
    subtitle: 'Deep Ore Extraction',
    desc: 'For deeper ore bodies, our underground operations deploy world-class shaft sinking, tunneling, and stope mining techniques. Our teams work in fully ventilated, sensor-monitored environments built to the highest safety standards.',
    details: ['Shaft sinking', 'Long-hole stoping', 'Cut-and-fill methods', 'Real-time monitoring'],
  },
  {
    number: '03',
    title: 'Mineral Processing',
    subtitle: 'Refining & Recovery',
    desc: 'Our processing plants use advanced flotation, leaching, and gravity separation methods to maximize mineral recovery while minimizing waste. We operate three fully integrated processing facilities across Ghana.',
    details: ['Flotation processing', 'Carbon-in-leach (CIL)', 'Gravity separation', 'Tailings management'],
  },
  {
    number: '04',
    title: 'Exploration',
    subtitle: 'Geological Surveys & Drilling',
    desc: 'Our geoscience team uses satellite imaging, geophysical surveys, and diamond drilling to identify and define new ore bodies. We maintain an active exploration pipeline across six target regions.',
    details: ['Airborne geophysics', 'Diamond core drilling', 'Resource estimation', 'Feasibility studies'],
  },
  {
    number: '05',
    title: 'Land Reclamation',
    subtitle: 'Restoration & Rehabilitation',
    desc: 'Every mine site we operate is subject to a comprehensive closure and reclamation plan from day one. We replant native vegetation, restore water systems, and monitor ecological recovery for decades after operations cease.',
    details: ['Topsoil restoration', 'Native replanting', 'Water system rehab', 'Long-term monitoring'],
  },
  {
    number: '06',
    title: 'Contract Mining',
    subtitle: 'Services for Third Parties',
    desc: 'TerraNova offers full-service contract mining to third-party resource owners across West Africa. We bring equipment, expertise, and compliance infrastructure so clients can focus on their core business.',
    details: ['Drill & blast services', 'Load & haul', 'Mine planning', 'Safety management'],
  },
]

const minerals = [
  { name: 'Gold', symbol: 'Au', desc: 'Primary revenue mineral, extracted across 6 sites' },
  { name: 'Bauxite', symbol: 'Al₂O₃', desc: 'Aluminium ore, exported to smelters globally' },
  { name: 'Manganese', symbol: 'Mn', desc: 'Steel industry feedstock, mined in 2 concessions' },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0f0e0c] text-[#f5f0e8]">
      <Navbar />

      {/* Header */}
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-body text-sm tracking-widest uppercase mb-4" style={{ color: 'var(--color-earth-400)' }}>What We Do</p>
          <h1 className="font-display text-6xl font-bold mb-6 leading-tight">
            Full-Spectrum<br />
            <span style={{ color: 'var(--color-earth-300)' }}>Mining Operations</span>
          </h1>
          <p className="font-body text-lg text-[#c4bfb4] max-w-2xl leading-relaxed">
            From exploration to reclamation, TerraNova manages every stage of the mining lifecycle
            with precision, safety, and environmental responsibility.
          </p>
        </div>
      </div>

      {/* Minerals */}
      <section className="px-6 pb-16">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {minerals.map((m) => (
            <div key={m.name} className="bg-[#141210] border border-[#2d1f04]/50 rounded-lg p-6 flex gap-4 items-start">
              <div className="font-display text-2xl font-bold shrink-0" style={{ color: 'var(--color-earth-600)' }}>{m.symbol}</div>
              <div>
                <h3 className="font-display text-lg font-semibold text-[#f5f0e8] mb-1">{m.name}</h3>
                <p className="font-body text-xs text-[#a09890]">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services List */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {services.map((s) => (
            <div key={s.number} className="bg-[#141210] border border-[#2d1f04]/40 rounded-xl p-8 grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-3">
                  <span className="font-display text-sm font-bold" style={{ color: 'var(--color-earth-700)' }}>{s.number}</span>
                  <div className="h-px flex-1" style={{ backgroundColor: 'var(--color-earth-800)' }} />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#f5f0e8] mb-1">{s.title}</h2>
                <p className="font-body text-sm mb-4" style={{ color: 'var(--color-earth-400)' }}>{s.subtitle}</p>
                <p className="font-body text-[#a09890] leading-relaxed text-sm">{s.desc}</p>
              </div>
              <div>
                <p className="font-body text-xs text-[#6b6560] uppercase tracking-wider mb-3">Capabilities</p>
                <ul className="flex flex-col gap-2">
                  {s.details.map((d) => (
                    <li key={d} className="flex items-center gap-2 font-body text-sm text-[#c4bfb4]">
                      <span style={{ color: 'var(--color-earth-500)' }}>—</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
