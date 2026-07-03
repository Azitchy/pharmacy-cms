import SectionHeading from '../components/SectionHeading'
import { services } from '../data/pharmacyData'

export default function WhyChooseSection({ content }) {
  const why = content ?? {}
  const list = why.services ?? services

  return (
    <section className="py-11">
      <div className="mx-auto w-[min(1180px,calc(100%-32px))]">
        <div className="grid gap-7 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={why.eyebrow ?? 'Why choose us'}
              title={why.title ?? 'Best services available for the best customers'}
            />
            <div
              aria-hidden="true"
              className="mt-6 min-h-[260px] rounded-[30px] bg-[radial-gradient(circle_at_20%_20%,rgba(46,185,165,0.18),transparent_16%),radial-gradient(circle_at_80%_30%,rgba(45,124,115,0.2),transparent_18%),linear-gradient(145deg,#f5fbf9,#d7efe8_58%,#7cc8bd)] shadow-[0_16px_36px_rgba(17,78,68,0.08)]"
            />
          </div>

          <div className="grid gap-4">
            {list.map((service, index) => (
              <article key={service.title} className="grid grid-cols-[70px_1fr] gap-4 rounded-[20px] bg-white p-5 shadow-[0_14px_30px_rgba(17,78,68,0.08)]">
                <span className="grid h-[50px] w-[50px] place-items-center rounded-[16px] bg-emerald-500/12 font-extrabold text-emerald-700">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="mb-2 text-slate-800">{service.title}</h3>
                  <p className="leading-6 text-slate-500">{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
