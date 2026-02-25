import type { Metadata } from 'next'
import './globals.css'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import StructuredData from '@/components/StructuredData'

export const metadata: Metadata = {
  metadataBase: new URL('https://filmry.io'),

  title: 'Filmry — Make films. Not chaos.',
  description:
    'Filmry is the end-to-end platform for modern film production — from script to delivery.',

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    title: 'Filmry — Make films. Not chaos.',
    description:
      'The end-to-end platform for modern film production.',
    url: 'https://filmry.io',
    siteName: 'Filmry',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Filmry',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Filmry',
    description:
      'End-to-end platform for modern film production.',
    images: ['/og.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StructuredData />
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  )
}


