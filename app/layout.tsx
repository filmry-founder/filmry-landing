import type { Metadata } from 'next'
import './globals.css'
import AnalyticsProvider from '@/components/AnalyticsProvider'

export const metadata: Metadata = {
  title: 'Filmry — Make films. Not chaos.',
  description:
    'The end-to-end operating system for film production — from script to delivery. Early access now open.',
  metadataBase: new URL('https://filmry.io'),
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
      'The end-to-end operating system for film production — from script to delivery.',
    url: 'https://filmry.io',
    siteName: 'Filmry',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Filmry — Make films. Not chaos.',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Filmry — Make films. Not chaos.',
    description:
      'The end-to-end operating system for film production — from script to delivery.',
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
        <AnalyticsProvider />
        {children}
      </body>
    </html>
  )
}

