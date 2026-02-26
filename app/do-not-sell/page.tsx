import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function DoNotSellPage() {
  return (
    <>
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <Header />
        <div className="px-6 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-[860px]">
            <Link
              href="/"
              className="mb-12 inline-block text-sm text-white/50 transition-colors hover:text-white/80"
            >
              ← Back to home
            </Link>

            <h1 className="mb-6 text-3xl font-light tracking-tight sm:text-4xl">
              Do not sell or share my personal information
            </h1>
            <p className="text-base leading-relaxed text-white/70">
              This page will be updated soon.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

