import {
  featuredProducts,
  footerLinks,
  heroStats,
  latestProducts,
  logos,
  navItems,
  promoCards,
  services,
  testimonials,
  topBarItems,
} from '../data/pharmacyData'

export const defaultSiteContent = {
  header: {
    brand: { prefix: 'medica', accent: 'shop' },
    navItems,
    actions: { cartCount: 2 },
  },
  topbar: {
    items: topBarItems,
  },
  hero: {
    eyebrow: 'Welcome to medicashop',
    title: 'Our only priority is to keep you healthy.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    cta: 'Discover more',
  },
  about: {
    eyebrow: 'Who we are',
    title: 'With us, expect more than just a pharmacy.',
    description:
      'We keep the layout clean and the trust signals visible so the page feels like the reference screenshot without leaning on stock imagery.',
    stats: heroStats,
  },
  featuredProducts: {
    title: "Editor's Choice",
    products: featuredProducts,
    sidebar: [
      {
        icon: '🚚',
        title: 'International Shipping',
        description: 'For select markets, we ship worldwide with clear ETA messaging.',
      },
      {
        icon: '↺',
        title: '30 Days Warranty',
        description: 'Easy returns and replacements are shown as a confidence builder.',
      },
      {
        icon: '▣',
        title: 'Secure Payment',
        description: 'Your orders are protected through secure payment processing.',
      },
    ],
  },
  serviceBanner: {
    eyebrow: 'Service highlight',
    title: 'A pharmacy with world-class service.',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
    cta: 'Discover more',
  },
  latestProducts: {
    title: 'Latest Product',
    products: latestProducts,
  },
  promoGrid: {
    cards: promoCards,
  },
  whyChoose: {
    eyebrow: 'Why choose us',
    title: 'Best services available for the best customers',
    services,
  },
  brandStrip: {
    logos,
  },
  testimonials: {
    eyebrow: 'Testimonial',
    title: 'What they say about us',
    description: 'We use dummy testimonials to keep the visual weight and spacing aligned with the reference.',
    testimonials,
  },
  newsletter: {
    title: 'Signup our newsletter to get update information, news, insight or promotions.',
    button: 'Sign Up',
  },
  footer: {
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.',
    companyLinks: footerLinks.company,
    supportLinks: footerLinks.support,
    contact: {
      address: 'Jn. Complex, Ward No. 22',
      city: 'Kathmandu, Nepal',
      phone: '+1 202-202-2022',
      email: 'support@medicashop.com',
    },
    socials: ['f', 't', 'i', 'y'],
  },
}

export function sectionsToSiteContent(sections = []) {
  const map = sections.reduce((accumulator, section) => {
    accumulator[section.key] = section.data
    return accumulator
  }, {})

  return {
    header: map.header ?? defaultSiteContent.header,
    topbar: map.topbar ?? defaultSiteContent.topbar,
    hero: map.hero ?? defaultSiteContent.hero,
    about: map.about ?? defaultSiteContent.about,
    featuredProducts: map['featured-products'] ?? defaultSiteContent.featuredProducts,
    serviceBanner: map['service-banner'] ?? defaultSiteContent.serviceBanner,
    latestProducts: map['latest-products'] ?? defaultSiteContent.latestProducts,
    promoGrid: map['promo-grid'] ?? defaultSiteContent.promoGrid,
    whyChoose: map['why-choose'] ?? defaultSiteContent.whyChoose,
    brandStrip: map['brand-strip'] ?? defaultSiteContent.brandStrip,
    testimonials: map.testimonials ?? defaultSiteContent.testimonials,
    newsletter: map.newsletter ?? defaultSiteContent.newsletter,
    footer: map.footer ?? defaultSiteContent.footer,
    rawSections: sections,
  }
}

