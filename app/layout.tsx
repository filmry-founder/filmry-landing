import type { Metadata } from 'next'
import './globals.css'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import CookieConsentProvider from '@/components/cookies/CookieConsentProvider'
import CookieBanner from '@/components/cookies/CookieBanner'
import CookiePreferencesModal from '@/components/cookies/CookiePreferencesModal'

export const metadata: Metadata = {
  metadataBase: new URL('https://filmry.io'),

  title: {
    default: 'Filmry — Make films. Not chaos.',
    template: '%s | Filmry',
  },

  description:
    'Filmry is the end-to-end platform for modern film production — from script to delivery.',

  keywords: [
    'film production platform',
    'filmmaking software',
    'film production tools',
    'film workflow',
    'Filmry',
    'cinema production software',
  ],

  authors: [{ name: 'Filmry' }],
  creator: 'Filmry',
  publisher: 'Filmry',

  alternates: {
    canonical: '/',
  },

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    type: 'website',
    url: 'https://filmry.io',
    title: 'Filmry — Make films. Not chaos.',
    description:
      'The end-to-end platform for modern film production — from script to delivery.',
    siteName: 'Filmry',
    images: [
      {
        url: '/og-v2.png',
        width: 1200,
        height: 630,
        alt: 'Filmry — Make films. Not chaos.',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Filmry — Make films. Not chaos.',
    description:
      'The end-to-end platform for modern film production.',
    images: ['/og-v2.png'],
    creator: '@filmryio',
  },

  robots: {
    index: true,
    follow: true,
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
        <CookieConsentProvider>
          <AnalyticsProvider />
          {children}
          <CookieBanner />
          <CookiePreferencesModal />
        </CookieConsentProvider>
      </body>
    </html>
  )
}


