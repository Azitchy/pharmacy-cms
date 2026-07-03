import HeroVisual from '../components/HeroVisual'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#5a8f84_0%,#3c8a80_42%,#2d7c73_100%)] py-20 text-white max-md:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.38),transparent_26%),radial-gradient(circle_at_85%_35%,rgba(255,255,255,0.16),transparent_25%),linear-gradient(rgba(14,84,74,0.28),rgba(14,84,74,0.28)),repeating-linear-gradient(135deg,rgba(255,255,255,0.03)_0,rgba(255,255,255,0.03)_2px,transparent_2px,transparent_14px)]" />
      <div className="relative z-10 mx-auto grid w-[min(1180px,calc(100%-32px))] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-[560px]">
          <span className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/90">
            Welcome to medicashop
          </span>
          <h1 className="mt-4 text-[clamp(40px,5vw,72px)] font-extrabold leading-[0.95] tracking-[-0.06em]">
            Our only priority is to keep you healthy.
          </h1>
          <p className="mt-5 text-[16px] leading-7 text-white/88">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
            ullamcorper mattis, pulvinar dapibus leo.
          </p>
          <button
            type="button"
            className="mt-7 rounded-[10px] bg-white px-6 py-3.5 font-extrabold text-emerald-800 shadow-[0_16px_32px_rgba(14,84,74,0.22)] transition hover:-translate-y-0.5"
          >
            Discover more
          </button>
        </div>

        <HeroVisual />
      </div>
    </section>
  )
}
