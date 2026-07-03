export default function AdminLoginPage({
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) {
  return (
    <section className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(46,185,165,0.18),transparent_24%),linear-gradient(180deg,#f2fbf8,#e6f5f1)] px-4 py-10">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-emerald-500/12 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-emerald-700">
            Admin Access
          </span>
          <h1 className="text-[clamp(40px,6vw,72px)] font-extrabold leading-[0.95] tracking-[-0.06em] text-slate-900">
            Sign in to control the pharmacy storefront.
          </h1>
          <p className="max-w-xl text-[16px] leading-7 text-slate-600">
            Manage every homepage section, update product cards, edit promos, and toggle content
            live from the Laravel-powered backend.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['Sections', '13 editable blocks'],
              ['Mode', 'API-backed dashboard'],
              ['Login', 'Bearer token auth'],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-white p-4 shadow-[0_14px_30px_rgba(17,78,68,0.08)]">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{label}</p>
                <p className="mt-2 font-semibold text-slate-800">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-[28px] bg-white p-7 shadow-[0_20px_50px_rgba(17,78,68,0.12)]"
        >
          <div className="mb-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-500">
              Admin Login
            </p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-[-0.05em] text-slate-800">
              Welcome back
            </h2>
          </div>

          <label className="mb-4 block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
            <input
              value={email}
              onChange={(event) => onEmailChange(event.target.value)}
              type="email"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-400"
              placeholder="admin@medicashop.com"
            />
          </label>

          <label className="mb-5 block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Password</span>
            <input
              value={password}
              onChange={(event) => onPasswordChange(event.target.value)}
              type="password"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-emerald-400"
              placeholder="password123"
            />
          </label>

          {error ? (
            <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Signing in...' : 'Enter dashboard'}
          </button>

          <p className="mt-4 text-sm leading-6 text-slate-500">
            Seeded credentials: <span className="font-semibold text-slate-700">admin@medicashop.com</span> /
            <span className="font-semibold text-slate-700">password123</span>
          </p>
        </form>
      </div>
    </section>
  )
}

