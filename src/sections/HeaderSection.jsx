import AppLink from '../components/AppLink'
import { navItems } from '../data/pharmacyData'

export default function HeaderSection({ path, onNavigate, content }) {
  const brand = content?.brand ?? { prefix: 'medica', accent: 'shop' }
  const navigation = content?.navItems ?? navItems
  const cartCount = content?.actions?.cartCount ?? 2

  return (
    <header className="sticky top-0 z-30 border-b border-emerald-950/5 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex min-h-[82px] w-[min(1180px,calc(100%-32px))] items-center gap-6 max-lg:justify-between">
        <AppLink href="/" onNavigate={onNavigate} className="flex items-center gap-2 text-[28px] font-extrabold tracking-[-0.04em] text-emerald-800 no-underline" active={path === '/'}>
          <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-[0_14px_24px_rgba(29,166,138,0.26)]">
            +
          </span>
          <span>
            {brand.prefix}
            <span className="text-emerald-500">{brand.accent}</span>
          </span>
        </AppLink>

        <nav className="ml-auto flex gap-6 max-lg:hidden" aria-label="Primary">
          {navigation.map((item) => (
            <AppLink
              key={item.path}
              href={item.path}
              onNavigate={onNavigate}
              active={path === item.path}
              className="text-[15px] font-semibold text-emerald-950/80 no-underline"
            >
              {item.label}
            </AppLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 font-bold text-emerald-700 transition hover:-translate-y-0.5" aria-label="Search">
            ⌕
          </button>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-emerald-50 font-bold text-emerald-700 transition hover:-translate-y-0.5" aria-label="Wishlist">
            ♡
          </button>
          <button type="button" className="inline-flex h-10 items-center justify-center rounded-full bg-emerald-50 px-4 font-bold text-emerald-700 transition hover:-translate-y-0.5" aria-label="Cart">
            Cart <span className="ml-2 grid h-5 w-5 place-items-center rounded-full bg-emerald-500 text-[12px] text-white">{cartCount}</span>
          </button>
        </div>
      </div>
    </header>
  )
}
