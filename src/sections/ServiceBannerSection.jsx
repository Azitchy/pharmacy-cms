export default function ServiceBannerSection() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(rgba(28,128,115,0.18),rgba(28,128,115,0.18)),radial-gradient(circle_at_center,rgba(255,255,255,0.2),transparent_42%),linear-gradient(135deg,#5fb0a7,#2d7c73)] py-[86px] text-white">
      <div className="mx-auto flex w-[min(1180px,calc(100%-32px))] items-center justify-between gap-6 max-md:flex-col max-md:items-start">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/90">
            Service highlight
          </span>
          <h2 className="mt-3 max-w-[640px] text-[clamp(28px,4vw,54px)] font-extrabold leading-[1.02] tracking-[-0.05em] text-white">
            A pharmacy with world-class service.
          </h2>
          <p className="mt-3 max-w-[620px] text-[16px] leading-7 text-white/88">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
            ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>
        <button type="button" className="rounded-[10px] bg-white px-6 py-3.5 font-extrabold text-emerald-800 shadow-[0_16px_32px_rgba(14,84,74,0.22)] transition hover:-translate-y-0.5">
          Discover more
        </button>
      </div>
    </section>
  )
}
