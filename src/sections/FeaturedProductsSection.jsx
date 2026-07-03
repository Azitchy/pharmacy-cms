import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import { featuredProducts } from '../data/pharmacyData'

export default function FeaturedProductsSection() {
  return (
    <section className="py-11">
      <div className="mx-auto w-[min(1180px,calc(100%-32px))]">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-[26px] bg-white p-7 shadow-[0_18px_46px_rgba(17,78,68,0.08)]">
            <SectionHeading title="Editor's Choice" />
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <aside className="rounded-[26px] bg-white p-7 shadow-[0_18px_46px_rgba(17,78,68,0.08)]">
            <div className="grid gap-4">
              <div className="rounded-[18px] bg-slate-50 p-4">
                <span className="mb-3 inline-grid h-10 w-10 place-items-center rounded-[12px] bg-emerald-500/12 text-[18px] text-emerald-700">
                  🚚
                </span>
                <h3 className="mb-2 text-slate-800">International Shipping</h3>
                <p className="leading-6 text-slate-500">For select markets, we ship worldwide with clear ETA messaging.</p>
              </div>
              <div className="rounded-[18px] bg-slate-50 p-4">
                <span className="mb-3 inline-grid h-10 w-10 place-items-center rounded-[12px] bg-emerald-500/12 text-[18px] text-emerald-700">
                  ↺
                </span>
                <h3 className="mb-2 text-slate-800">30 Days Warranty</h3>
                <p className="leading-6 text-slate-500">Easy returns and replacements are shown as a confidence builder.</p>
              </div>
              <div className="rounded-[18px] bg-slate-50 p-4">
                <span className="mb-3 inline-grid h-10 w-10 place-items-center rounded-[12px] bg-emerald-500/12 text-[18px] text-emerald-700">
                  ▣
                </span>
                <h3 className="mb-2 text-slate-800">Secure Payment</h3>
                <p className="leading-6 text-slate-500">Your orders are protected through secure payment processing.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
