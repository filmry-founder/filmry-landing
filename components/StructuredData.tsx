const SITE_URL = 'https://filmry.io'
const LOGO_URL = 'https://filmry.io/icon-512.png'
const OG_IMAGE_URL = 'https://filmry.io/og-v2.png'
const CONTACT_EMAIL = 'hello@filmry.io'
const SOCIALS = [
  'https://x.com/filmryio',
  'https://instagram.com/filmryio',
  'https://www.linkedin.com/company/filmryio',
  'https://www.facebook.com/filmryio',
  'https://www.tiktok.com/@filmryio',
  'https://youtube.com/@filmryio',
]

const organization = {
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: 'Filmry',
  legalName: 'Filmry',
  url: SITE_URL,
  description:
    'Filmry is the operating system for film production — unifying the entire workflow from script to delivery.',
  logo: LOGO_URL,
  image: OG_IMAGE_URL,
  sameAs: SOCIALS,
  brand: {
    '@type': 'Brand',
    name: 'Filmry',
    logo: LOGO_URL,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: CONTACT_EMAIL,
      availableLanguage: ['English'],
    },
  ],
}

const website = {
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Filmry',
  publisher: { '@id': `${SITE_URL}/#organization` },
  inLanguage: 'en-GB',
}

const webpage = {
  '@type': 'WebPage',
  '@id': `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  name: 'Filmry — Make films. Not chaos.',
  description: 'The end-to-end platform for modern film production.',
  isPartOf: { '@id': `${SITE_URL}/#website` },
  about: { '@id': `${SITE_URL}/#organization` },
  primaryImageOfPage: {
    '@type': 'ImageObject',
    url: OG_IMAGE_URL,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [organization, website, webpage],
}

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd),
      }}
    />
  )
}
