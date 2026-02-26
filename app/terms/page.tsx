import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsPage() {
  return (
    <>
      <main className="min-h-screen bg-[#ffffff]">
        <Header />
        <div className="px-6 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-[860px]">
            <Link
              href="/"
              className="mb-12 inline-block text-sm text-[#111] opacity-60 transition-opacity hover:opacity-100"
            >
              ← Back to home
            </Link>

            <h1 className="mb-8 text-3xl font-light tracking-tight text-[#111] sm:text-4xl">
              Terms of Service
            </h1>
            <p className="mb-8 text-lg text-[#111] opacity-70">
              Terms governing access to Filmry early access.
            </p>

            <div className="prose prose-sm max-w-none text-[#111] prose-headings:text-[#111] prose-p:text-[#111] prose-li:text-[#111] prose-a:text-[#111] prose-a:underline prose-a:underline-offset-2 hover:prose-a:opacity-80">
              <p className="mb-4">
                Filmry is a product operated by:
              </p>
              <p className="mb-4">
                Mavren Studios Ltd<br />
                1 Balloon Street<br />
                City Centre<br />
                Manchester<br />
                M4 4BE<br />
                England
              </p>
              <p className="mb-4">
                Phone: 0161 527 6986<br />
                Email: hello@filmry.io
              </p>

              <h2 className="mt-8 mb-4 text-xl font-medium">Early Access Notice</h2>
              <p className="mb-4">
                Filmry is currently in early development. Features, structure, and availability may change.
              </p>

              <h2 className="mt-8 mb-4 text-xl font-medium">User Responsibility</h2>
              <p className="mb-4">
                By joining the waitlist, users agree to provide accurate information.
              </p>

              <h2 className="mt-8 mb-4 text-xl font-medium">Platform Vision</h2>
              <p className="mb-4">
                Filmry aims to become an end-to-end platform for film production — from development to delivery.
              </p>

              <h2 className="mt-8 mb-4 text-xl font-medium">Intellectual Property</h2>
              <p className="mb-4">
                All Filmry branding, product concepts, and platform design are owned by Mavren Studios Ltd.
              </p>

              <h2 className="mt-8 mb-4 text-xl font-medium">Limitation of Liability</h2>
              <p className="mb-4">
                Filmry is provided during early access &quot;as is&quot;.
                We are not responsible for interruptions, changes, or feature removals.
              </p>

              <h2 className="mt-8 mb-4 text-xl font-medium">Governing Law</h2>
              <p className="mb-4">
                These Terms are governed by the laws of England and Wales.
              </p>

              <h2 className="mt-8 mb-4 text-xl font-medium">Contact</h2>
              <p className="mb-4">
                For questions about these Terms, email us at{' '}
                <a href="mailto:hello@filmry.io" className="text-[#111] underline">
                  hello@filmry.io
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

