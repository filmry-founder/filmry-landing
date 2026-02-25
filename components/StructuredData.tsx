import React from 'react'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Filmry',
      url: 'https://filmry.io',
      logo: 'https://filmry.io/logo.png',
      image: 'https://filmry.io/logo.png',
      sameAs: [
        'https://x.com/filmryio',
        'https://instagram.com/filmryio',
        'https://www.linkedin.com/company/filmryio',
        'https://www.facebook.com/filmryio',
        'https://www.tiktok.com/@filmryio',
        'https://youtube.com/@filmryio',
        'https://linkedin.com/company/filmry',
      ],
    },
    {
      '@type': 'WebSite',
      name: 'Filmry',
      url: 'https://filmry.io',
    },
  ],
}

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

