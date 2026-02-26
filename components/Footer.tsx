import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] bg-[#050505] py-14">
      <Reveal variant="fadeUp">
        <div className="page-container flex flex-col items-center justify-center text-center text-sm text-gray-400">
          {/* Top: brand + location */}
          <div className="flex flex-col items-center">
            <Image
              src="/logo/filmry-logo-white.png"
              alt="Filmry"
              width={80}
              height={24}
              className="mb-3 h-6 w-[80px] object-contain opacity-80"
            />
            <p className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
              Filmry
            </p>
            <p className="mt-4 text-xs text-gray-500">
              A product of Mavren Studios Ltd
            </p>
            <p className="mt-1 text-xs text-gray-600">Manchester, United Kingdom</p>
          </div>

          {/* Middle: navigation links */}
          <div className="mt-10 w-full border-t border-white/5 pt-6">
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.16em] text-gray-500">
              <Link href="/privacy" className="transition-colors hover:text-gray-300">
                Privacy
              </Link>
              <span className="hidden text-gray-700 sm:inline">•</span>
              <Link href="/terms" className="transition-colors hover:text-gray-300">
                Terms
              </Link>
              <span className="hidden text-gray-700 sm:inline">•</span>
              <Link href="/contact" className="transition-colors hover:text-gray-300">
                Contact
              </Link>
              <span className="hidden text-gray-700 sm:inline">•</span>
              <Link href="/about" className="transition-colors hover:text-gray-300">
                About
              </Link>
              <span className="hidden text-gray-700 sm:inline">•</span>
              <Link href="/cookies" className="transition-colors hover:text-gray-300">
                Cookie preferences
              </Link>
              <span className="hidden text-gray-700 sm:inline">•</span>
              <Link href="/do-not-sell" className="transition-colors hover:text-gray-300">
                Do not sell or share my personal information
              </Link>
            </nav>
          </div>

          {/* Bottom: socials + copyright */}
          <div className="mt-8 w-full border-t border-white/5 pt-6">
            <div className="flex items-center justify-center gap-3">
            <a
              href="https://x.com/filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-70"
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
            <a
              href="https://instagram.com/filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-70"
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
            <a
              href="https://www.linkedin.com/company/filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-70"
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
            <a
              href="https://www.facebook.com/filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-70"
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
            <a
              href="https://www.tiktok.com/@filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-70"
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
            <a
              href="https://youtube.com/@filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-70"
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
            <a
              href="https://www.threads.com/@filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 opacity-80 transition-all hover:-translate-y-px hover:bg-white/10 hover:opacity-70"
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
          </div>

            <p className="mt-6 text-[11px] text-gray-600">
              © 2025–2026 Mavren Studios Ltd. All rights reserved. Filmry is a product name of Mavren Studios Ltd.
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  )
}

