export default function StaticPage({ title, description }) {
  return (
    <section className="bg-[radial-gradient(circle_at_top_right,rgba(29,166,138,0.08),transparent_24%),linear-gradient(180deg,#f7fcfb,#eef7f5)] py-20">
      <div className="mx-auto w-[min(1180px,calc(100%-32px))] max-w-[760px]">
        <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-500">
          Placeholder route
        </span>
        <h1 className="mt-4 text-[clamp(36px,5vw,64px)] font-extrabold tracking-[-0.06em] text-slate-800">
          {title}
        </h1>
        <p className="mt-4 text-[16px] leading-7 text-slate-500">{description}</p>
      </div>
    </section>
  )
}
