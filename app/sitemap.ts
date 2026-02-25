import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: 'https://filmry.io/',
      lastModified,
    },
    {
      url: 'https://filmry.io/privacy',
      lastModified,
    },
    {
      url: 'https://filmry.io/terms',
      lastModified,
    },
    {
      url: 'https://filmry.io/contact',
      lastModified,
    },
  ]
}

