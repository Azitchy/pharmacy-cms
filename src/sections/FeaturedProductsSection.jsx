import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import { featuredProducts } from '../data/pharmacyData'

export default function FeaturedProductsSection({ content }) {
  const featured = content ?? {}
  const products = featured.products ?? featuredProducts
  const sidebar = featured.sidebar ?? []

  return (
    <section className="py-11">
      <div className="mx-auto w-[min(1180px,calc(100%-32px))]">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="rounded-[26px] bg-white p-7 shadow-[0_18px_46px_rgba(17,78,68,0.08)]">
            <SectionHeading title={featured.title ?? "Editor's Choice"} />
            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          <aside className="rounded-[26px] bg-white p-7 shadow-[0_18px_46px_rgba(17,78,68,0.08)]">
            <div className="grid gap-4">
              {sidebar.map((item) => (
                <div key={item.title} className="rounded-[18px] bg-slate-50 p-4">
                  <span className="mb-3 inline-grid h-10 w-10 place-items-center rounded-[12px] bg-emerald-500/12 text-[18px] text-emerald-700">
                    {item.icon}
                  </span>
                  <h3 className="mb-2 text-slate-800">{item.title}</h3>
                  <p className="leading-6 text-slate-500">{item.description}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
