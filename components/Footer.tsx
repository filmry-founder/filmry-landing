import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#050505] py-14">
      <Reveal variant="fadeUp">
        <div className="page-container mx-auto max-w-6xl text-sm text-gray-400">
          {/* Row 1: brand + link columns */}
          <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
            {/* Left: brand + description */}
            <div className="max-w-sm">
              <Link href="/" className="inline-flex items-center gap-2">
                <Image
                  src="/logo/filmry-logo-white.png"
                  alt="Filmry"
                  width={80}
                  height={24}
                  className="h-6 w-[80px] object-contain opacity-90"
                />
              </Link>
              <p className="mt-4 text-xs text-gray-500">
                A product of Mavren Studios Ltd
              </p>
              <p className="mt-1 text-xs text-gray-600">Manchester, United Kingdom</p>
              <Link
                href="/#waitlist"
                className="mt-4 inline-block text-xs text-gray-400 underline decoration-gray-600/60 underline-offset-4 transition-colors hover:text-gray-200 hover:decoration-gray-300/80"
              >
                Join early access →
              </Link>
            </div>

            {/* Right: link columns */}
            <nav
              aria-label="Footer navigation"
              className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                  Product
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 transition-colors hover:text-gray-100"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-gray-400 transition-colors hover:text-gray-100"
                    >
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about"
                      className="text-gray-400 transition-colors hover:text-gray-100"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                  Company
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <a
                      href="https://www.linkedin.com/company/filmryio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-gray-100"
                    >
                      LinkedIn
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://x.com/filmryio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-gray-100"
                    >
                      X
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/filmryio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 transition-colors hover:text-gray-100"
                    >
                      Instagram
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
                  Legal
                </h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-gray-400 transition-colors hover:text-gray-100"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-gray-400 transition-colors hover:text-gray-100"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cookies"
                      className="text-gray-400 transition-colors hover:text-gray-100"
                    >
                      Cookie preferences
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/do-not-sell"
                      className="text-gray-400 transition-colors hover:text-gray-100"
                    >
                      Do not sell or share my personal information
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>

          {/* Row 2: bottom bar */}
          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <p className="text-xs text-gray-600">
                © 2025–2026 Mavren Studios Ltd. All rights reserved.
              </p>

              <nav aria-label="Social links">
                <ul className="flex items-center gap-3">
                  <li>
                    <a
                      href="https://x.com/filmryio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-100"
                      aria-label="Filmry on X (Twitter)"
                    >
                      <Image
                        src="/icons/icon-x.png"
                        alt="X"
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px]"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://instagram.com/filmryio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-100"
                      aria-label="Filmry on Instagram"
                    >
                      <Image
                        src="/icons/icon-instagram.png"
                        alt="Instagram"
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px]"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/company/filmryio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-100"
                      aria-label="Filmry on LinkedIn"
                    >
                      <Image
                        src="/icons/icon-linkedin.png"
                        alt="LinkedIn"
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px]"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/filmryio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-100"
                      aria-label="Filmry on Facebook"
                    >
                      <Image
                        src="/icons/icon-facebook.png"
                        alt="Facebook"
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px]"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.tiktok.com/@filmryio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-100"
                      aria-label="Filmry on TikTok"
                    >
                      <Image
                        src="/icons/icon-tiktok.png"
                        alt="TikTok"
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px]"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://youtube.com/@filmryio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-100"
                      aria-label="Filmry on YouTube"
                    >
                      <Image
                        src="/icons/icon-youtube.png"
                        alt="YouTube"
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px]"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.threads.com/@filmryio"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-100"
                      aria-label="Filmry on Threads"
                    >
                      <Image
                        src="/icons/icon-threads.png"
                        alt="Threads"
                        width={18}
                        height={18}
                        className="h-[18px] w-[18px]"
                      />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}

