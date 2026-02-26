import type { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'About Filmry',
  description:
    'Learn about Filmry — the end-to-end production platform redefining modern film production infrastructure.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header />
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
              Section 1 — Introduction
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              Filmry is an end-to-end film production platform designed to unify the filmmaking process from script
              development to final delivery.
            </p>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              Built for directors, producers, and production teams, Filmry streamlines workflows across development,
              production, and post-production. By bringing structure to creative collaboration, Filmry helps filmmakers
              reduce fragmentation, improve coordination, and focus on storytelling.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
              Section 2 — Mission
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              Our mission is to provide modern production infrastructure for cinema.
            </p>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              We believe filmmaking deserves unified systems, clear workflows, and technology that empowers creativity
              rather than complicates it.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
              Section 3 — Vision
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              Filmry is building the operating system for film production, connecting creative teams inside one
              scalable, structured environment from script to delivery.
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
              Section 4 — Company Information
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              Founded in 2025
              <br />
              Headquartered in Manchester, United Kingdom
              <br />
              Industry: Film Production Technology
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
              Section 5 — Founder
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/80">
              Filmry was founded by Saeid Zerehpoosh (Dir Shahin), a filmmaker and production specialist with
              experience across directing, virtual production, and cinematic workflows.
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

