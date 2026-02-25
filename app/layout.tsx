import type { Metadata } from 'next'
import './globals.css'
import AnalyticsProvider from '@/components/AnalyticsProvider'

export const metadata: Metadata = {
  metadataBase: new URL('https://filmry.io'),
  title: 'Filmry — The operating system for film production',
  description:
    'Filmry is the end-to-end production infrastructure for modern filmmaking — from script to delivery.',
  openGraph: {
    title: 'Filmry',
    description:
      'Filmry is the end-to-end production infrastructure for modern filmmaking.',
    url: 'https://filmry.io',
    siteName: 'Filmry',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Filmry',
    description:
      'End-to-end production infrastructure for filmmakers.',
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

