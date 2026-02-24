import type { Metadata } from 'next'
import './globals.css'
import AnalyticsProvider from '@/components/AnalyticsProvider'

export const metadata: Metadata = {
  title: 'Filmry - Make films. Not chaos.',
  description: 'Filmry is an end-to-end filmmaking platform built for modern creators.',
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

