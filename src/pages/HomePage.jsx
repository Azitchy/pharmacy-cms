import AboutSection from '../sections/AboutSection'
import BrandStripSection from '../sections/BrandStripSection'
import FeaturedProductsSection from '../sections/FeaturedProductsSection'
import HeroSection from '../sections/HeroSection'
import LatestProductsSection from '../sections/LatestProductsSection'
import NewsletterSection from '../sections/NewsletterSection'
import PromoGridSection from '../sections/PromoGridSection'
import ServiceBannerSection from '../sections/ServiceBannerSection'
import TestimonialsSection from '../sections/TestimonialsSection'
import TopBarSection from '../sections/TopBarSection'
import WhyChooseSection from '../sections/WhyChooseSection'

export default function HomePage({ content }) {
  const site = content ?? {}

  return (
    <>
      <TopBarSection content={site.topbar} />
      <HeroSection content={site.hero} />
      <AboutSection content={site.about} />
      <FeaturedProductsSection content={site.featuredProducts} />
      <ServiceBannerSection content={site.serviceBanner} />
      <LatestProductsSection content={site.latestProducts} />
      <PromoGridSection content={site.promoGrid} />
      <WhyChooseSection content={site.whyChoose} />
      <BrandStripSection content={site.brandStrip} />
      <TestimonialsSection content={site.testimonials} />
      <NewsletterSection content={site.newsletter} />
    </>
  )
}
