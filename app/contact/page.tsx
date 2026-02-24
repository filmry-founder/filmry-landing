import Link from 'next/link'
import Header from '@/components/Header'

export default function ContactPage() {
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
          className="mb-8 inline-block text-sm text-white/50 transition-colors hover:text-white/80"
        >
          ← Back to home
        </Link>
        <h1 className="text-3xl font-light tracking-tight sm:text-4xl">
          Contact
        </h1>
        <p className="mt-4 text-lg text-white/60">
          We&apos;d love to hear from you.
        </p>

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
              Company
            </h2>
            <p className="mt-2 text-base text-white/80">Mavren Studios Ltd</p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
              Address
            </h2>
            <p className="mt-2 text-base leading-relaxed text-white/80">
              1 Balloon Street<br />
              Manchester<br />
              M4 4BE<br />
              United Kingdom
            </p>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
              Email
            </h2>
            <a
              href="mailto:hello@filmry.io"
              className="mt-2 inline-block text-base text-white/80 underline decoration-white/30 underline-offset-2 transition-colors hover:text-white hover:decoration-white/60"
            >
              hello@filmry.io
            </a>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
              Phone
            </h2>
            <a
              href="tel:01615276986"
              className="mt-2 inline-block text-base text-white/80 underline decoration-white/30 underline-offset-2 transition-colors hover:text-white hover:decoration-white/60"
            >
              0161 527 6986
            </a>
          </section>

          <section>
            <h2 className="text-xs font-medium uppercase tracking-wider text-white/40">
              Social
            </h2>
            <a
              href="https://x.com/filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-base text-white/80 underline decoration-white/30 underline-offset-2 transition-colors hover:text-white hover:decoration-white/60"
            >
              @filmryio
            </a>
          </section>
        </div>
      </div>
    </main>
  )
}
