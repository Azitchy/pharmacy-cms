import { logos } from '../data/pharmacyData'

export default function BrandStripSection() {
  return (
    <section className="py-8">
      <div className="mx-auto w-[min(1180px,calc(100%-32px))]">
        <div className="grid grid-cols-2 items-center justify-items-center gap-4 py-2 text-center font-extrabold uppercase tracking-[0.1em] text-slate-400 md:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <span key={logo}>{logo}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
