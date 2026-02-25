import type { Metadata } from 'next'
import './globals.css'
import AnalyticsProvider from '@/components/AnalyticsProvider'

export const metadata: Metadata = {
  title: 'Filmry — Make films. Not chaos.',
  description:
    'Filmry is the end-to-end platform for modern film production — from script to delivery.',
  metadataBase: new URL('https://filmry.io'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Filmry',
    description:
      'End-to-end infrastructure for modern film production.',
    url: 'https://filmry.io',
    siteName: 'Filmry',
    images: [
      {
        url: '/icon.png',
        width: 512,
        height: 512,
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Filmry',
    description: 'Make films. Not chaos.',
    images: ['/icon.png'],
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

