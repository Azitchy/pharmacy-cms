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

export default function HomePage() {
  return (
    <>
      <TopBarSection />
      <HeroSection />
      <AboutSection />
      <FeaturedProductsSection />
      <ServiceBannerSection />
      <LatestProductsSection />
      <PromoGridSection />
      <WhyChooseSection />
      <BrandStripSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  )
}
