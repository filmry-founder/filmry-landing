import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const aboutPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  '@id': 'https://filmry.io/about#about',
  name: 'About Filmry',
  url: 'https://filmry.io/about',
  description:
    'Learn about Filmry — the end-to-end production platform redefining modern film production infrastructure.',
  mainEntity: {
    '@id': 'https://filmry.io/#organization',
  },
}

export const metadata: Metadata = {
  title: 'About Filmry',
  description:
    'Learn about Filmry — the end-to-end production platform redefining modern film production infrastructure.',
}

export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-[#0a0a0a] text-white">
        <Header />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(aboutPageJsonLd),
          }}
        />
        <div
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(120,120,120,0.08), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(80,80,80,0.05), transparent)',
          }}
        />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-[600px] flex-col justify-center px-6 py-24 sm:px-8">
          <Link
            href="/"
            className="mb-8 inline-block text-sm text-gray-400 transition-colors hover:text-gray-300"
          >
            ← Back to home
          </Link>

          <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
            About Filmry
          </h1>

          <div className="mt-12 space-y-12">
            <section>
              <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
                Introduction
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                Filmry is an end-to-end film production platform designed to unify the filmmaking process from script
                development to final delivery.
              </p>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                Built for directors, producers, and production teams, Filmry streamlines workflows across development,
                production, and post-production. By bringing structure to creative collaboration, Filmry helps
                filmmakers reduce fragmentation, improve coordination, and focus on storytelling.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
                Mission
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                Our mission is to provide modern production infrastructure for cinema.
              </p>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                We believe filmmaking deserves unified systems, clear workflows, and technology that empowers
                creativity rather than complicates it.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
                Vision
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                Filmry is building the operating system for film production, connecting creative teams inside one
                scalable, structured environment from script to delivery.
              </p>
            </section>

            <section>
              <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
                Company Information
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                Filmry HQ: Manchester, United Kingdom
                <br />
                Founder Studio: Mavren Studios Ltd
              </p>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                Address:
                <br />
                Mavren Studios Ltd
                <br />
                1 Balloon Street
                <br />
                City Centre
                <br />
                Manchester
                <br />
                M4 4BE
                <br />
                England
              </p>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                Phone: +44 161 527 6986
                <br />
                Email: hello@filmry.io
              </p>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                <a
                  href="https://www.linkedin.com/company/filmryio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 underline decoration-white/30 underline-offset-2 transition-colors hover:text-white hover:decoration-white/60"
                >
                  LinkedIn →
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
                Founder
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/80">
                Filmry was founded by{' '}
                <a
                  href="https://www.linkedin.com/in/dirshahin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/30 underline-offset-2 transition-colors hover:text-white hover:decoration-white/60"
                >
                  Saeid Zerehpoosh (Dir Shahin)
                </a>
                , a filmmaker and production specialist with experience across directing, virtual production, and
                cinematic workflows.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

