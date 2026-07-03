import AppLink from '../components/AppLink'
import { footerLinks } from '../data/pharmacyData'

export default function FooterSection({ onNavigate, content }) {
  const footer = content ?? {}
  const companyLinks = footer.companyLinks ?? footerLinks.company
  const supportLinks = footer.supportLinks ?? footerLinks.support
  const contact = footer.contact ?? {
    address: 'Jn. Complex, Ward No. 22',
    city: 'Kathmandu, Nepal',
    phone: '+1 202-202-2022',
    email: 'support@medicashop.com',
  }
  const socials = footer.socials ?? ['f', 't', 'i', 'y']

  return (
    <footer className="bg-white py-10 pb-6">
      <div className="mx-auto grid w-[min(1180px,calc(100%-32px))] gap-7 border-b border-emerald-950/5 pb-6 lg:grid-cols-[1.1fr_1.4fr]">
        <div>
          <div className="flex items-center gap-2 text-[28px] font-extrabold tracking-[-0.04em] text-emerald-800">
            <span className="grid h-[30px] w-[30px] place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              +
            </span>
            <span>
              medica<span className="text-emerald-500">shop</span>
            </span>
          </div>
          <p className="mt-4 leading-7 text-slate-500">
            {footer.description ??
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.'}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <h3 className="mb-4 font-bold text-slate-800">Company</h3>
            {companyLinks.map((label) => (
              <AppLink key={label} href="/about" onNavigate={onNavigate} className="mb-2 block text-slate-500 no-underline">
                {label}
              </AppLink>
            ))}
          </div>
          <div>
            <h3 className="mb-4 font-bold text-slate-800">Support</h3>
            {supportLinks.map((label) => (
              <AppLink key={label} href="/contact" onNavigate={onNavigate} className="mb-2 block text-slate-500 no-underline">
                {label}
              </AppLink>
            ))}
          </div>
          <div>
            <h3 className="mb-4 font-bold text-slate-800">Get in touch</h3>
            <p className="mb-2 text-slate-500">{contact.address}</p>
            <p className="mb-2 text-slate-500">{contact.city}</p>
            <p className="mb-2 text-slate-500">{contact.phone}</p>
            <p className="text-slate-500">{contact.email}</p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex w-[min(1180px,calc(100%-32px))] items-center justify-between gap-4 pt-4 text-sm text-slate-400 max-md:flex-col max-md:items-start">
        <span>Copyright 2026 MedicaShop. All rights reserved.</span>
        <div className="flex gap-3">
          {socials.map((social) => (
            <span key={social} className="grid h-8 w-8 place-items-center rounded-full bg-emerald-50">
              {social}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
