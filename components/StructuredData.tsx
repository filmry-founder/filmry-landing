import React from 'react'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Filmry',
      url: 'https://filmry.io',
      logo: 'https://filmry.io/logo/filmry-logo-white.png',
      sameAs: [],
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

