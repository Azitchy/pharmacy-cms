import ProductCard from '../components/ProductCard'
import SectionHeading from '../components/SectionHeading'
import { latestProducts } from '../data/pharmacyData'

export default function LatestProductsSection() {
  return (
    <section className="py-11">
      <div className="mx-auto w-[min(1180px,calc(100%-32px))]">
        <SectionHeading title="Latest Product" />
        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {latestProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
