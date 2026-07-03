import { promoCards } from '../data/pharmacyData'

export default function PromoGridSection({ content }) {
  const promo = content ?? {}
  const cards = promo.cards ?? promoCards

  return (
    <section className="py-11">
      <div className="mx-auto w-[min(1180px,calc(100%-32px))]">
        <div className="grid gap-4 lg:grid-cols-[1.12fr_1fr_1fr]">
          {cards.map((card, index) => (
            <article
              key={card.title}
              className={`relative min-h-[220px] overflow-hidden rounded-[24px] p-6 shadow-[0_16px_36px_rgba(17,78,68,0.08)] ${
                card.tone === 'blue'
                  ? 'bg-gradient-to-br from-sky-100 to-sky-50'
                  : card.tone === 'sand'
                    ? 'bg-gradient-to-br from-stone-100 to-stone-50'
                    : card.tone === 'linen'
                      ? 'bg-gradient-to-br from-orange-50 to-amber-50'
                      : 'bg-gradient-to-br from-emerald-50 to-emerald-100'
              }`}
            >
              <span className="inline-flex rounded-full bg-emerald-500/12 px-3 py-1 text-[11px] font-extrabold text-emerald-700">
                {card.label}
              </span>
              <h3 className="mt-4 max-w-[220px] text-[22px] font-extrabold leading-tight text-slate-800">
                {card.title}
              </h3>
              <button type="button" className="mt-5 rounded-lg bg-white/80 px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm transition hover:-translate-y-0.5">
                {card.cta}
              </button>
              <div
                className={`absolute -bottom-7 -right-6 rounded-[28px] opacity-85 ${
                  index === 0
                    ? 'h-[170px] w-[170px] bg-[radial-gradient(circle_at_50%_40%,#ffffff_0_26%,#9ed6ef_27%_52%,#4d8fe1_53%_100%)]'
                    : index === 1
                      ? 'h-[180px] w-[190px] bg-[radial-gradient(circle_at_52%_26%,#ffe5d4_0_16%,transparent_17%),linear-gradient(180deg,#d2eee9_0_24%,#f0f2f2_25%_100%)]'
                      : index === 2
                        ? 'h-[180px] w-[180px] bg-[radial-gradient(circle_at_52%_20%,#fff7eb_0_12%,transparent_13%),linear-gradient(180deg,#fff_0_20%,#f2eadc_21%_100%)]'
                        : 'h-[180px] w-[180px] bg-[radial-gradient(circle_at_35%_20%,#ffe8ef_0_12%,transparent_13%),linear-gradient(180deg,#f4efe4_0_30%,#d7e8d3_31%_100%)]'
                }`}
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
