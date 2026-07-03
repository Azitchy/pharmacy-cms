export default function NewsletterSection() {
  return (
    <section className="py-11">
      <div className="mx-auto w-[min(1180px,calc(100%-32px))]">
        <div className="grid items-center gap-5 rounded-[28px] bg-slate-50 p-6 shadow-[0_16px_36px_rgba(17,78,68,0.08)] lg:grid-cols-[1.2fr_1fr_160px]">
          <div>
            <h2 className="text-[clamp(24px,3vw,42px)] font-extrabold tracking-[-0.05em] text-slate-800">
              Signup our newsletter to get update information, news, insight or promotions.
            </h2>
          </div>
          <form className="grid gap-2">
            <input
              type="text"
              placeholder="Name"
              aria-label="Name"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-400"
            />
            <input
              type="email"
              placeholder="Email"
              aria-label="Email"
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition focus:border-emerald-400"
            />
            <button type="submit" className="rounded-xl bg-emerald-500 px-4 py-3 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-emerald-600">
              Sign Up
            </button>
          </form>
          <div
            aria-hidden="true"
            className="min-h-[150px] rounded-[24px] bg-[radial-gradient(circle_at_45%_30%,#ffe3cf_0_18%,transparent_19%),linear-gradient(180deg,#dff1eb_0_35%,#52b9a8_36%_100%)]"
          />
        </div>
      </div>
    </section>
  )
}
