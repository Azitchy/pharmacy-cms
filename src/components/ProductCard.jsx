function ProductArt({ tone }) {
  const tones = {
    rose: 'bg-gradient-to-br from-rose-100 via-rose-300 to-rose-500',
    mint: 'bg-gradient-to-br from-emerald-50 via-emerald-200 to-emerald-500',
    teal: 'bg-gradient-to-br from-cyan-100 via-teal-200 to-teal-500',
    indigo: 'bg-gradient-to-br from-indigo-100 via-indigo-200 to-indigo-500',
    slate: 'bg-gradient-to-br from-slate-100 via-slate-200 to-slate-500',
    sky: 'bg-gradient-to-br from-sky-50 via-sky-200 to-sky-500',
    cyan: 'bg-gradient-to-br from-cyan-50 via-cyan-200 to-cyan-500',
    blue: 'bg-gradient-to-br from-blue-50 via-blue-200 to-blue-500',
    gold: 'bg-gradient-to-br from-amber-50 via-amber-200 to-amber-500',
    violet: 'bg-gradient-to-br from-violet-50 via-violet-200 to-violet-500',
    green: 'bg-gradient-to-br from-green-50 via-green-200 to-green-500',
    emerald: 'bg-gradient-to-br from-emerald-50 via-emerald-200 to-emerald-500',
  }

  return (
    <div className={`h-36 border-b border-slate-100 ${tones[tone] || tones.slate}`} aria-hidden="true" />
  )
}

export default function ProductCard({ product }) {
  return (
    <article className="group relative overflow-hidden rounded-[22px] border border-slate-100 bg-white shadow-[0_12px_28px_rgba(17,78,68,0.06)]">
      <span className="absolute right-3 top-3 z-10 rounded-full bg-emerald-500 px-3 py-1 text-[11px] font-extrabold text-white">
        {product.badge}
      </span>
      <ProductArt tone={product.tone} />
      <div className="p-4">
        <h3 className="min-h-14 text-[15px] font-semibold leading-6 text-slate-800">{product.name}</h3>
        <div className="mt-3 flex items-baseline gap-2">
          <strong className="text-emerald-500">{product.price}</strong>
          <span className="text-sm text-slate-400 line-through">{product.oldPrice}</span>
        </div>
        <button
          type="button"
          className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-emerald-600"
        >
          Add to cart
        </button>
      </div>
    </article>
  )
}
