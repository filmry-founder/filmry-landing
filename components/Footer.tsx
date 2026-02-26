import Image from 'next/image'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/[0.06] py-20">
      <Reveal variant="fadeUp">
        <div className="page-container flex flex-col items-center justify-center text-center">
          <Image
            src="/logo/filmry-logo-white.png"
            alt="Filmry"
            width={90}
            height={30}
            className="mb-6 h-7 w-[90px] object-contain opacity-70"
          />
          <p className="mt-2 text-xs text-gray-500">A product of Mavren Studios Ltd</p>
          <p className="mt-1 text-xs text-gray-600">Manchester, United Kingdom</p>

          <div className="mt-8 flex gap-8">
            <Link href="/privacy" className="text-xs text-gray-500 transition-colors hover:text-gray-400">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-gray-500 transition-colors hover:text-gray-400">
              Terms
            </Link>
            <Link href="/contact" className="text-xs text-gray-500 transition-colors hover:text-gray-400">
              Contact
            </Link>
            <Link href="/about" className="text-xs text-gray-500 transition-colors hover:text-gray-400">
              About
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4">
            <a
              href="https://x.com/filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-70"
              aria-label="Filmry on X (Twitter)"
            >
              <Image
                src="/icons/icon-x.png"
                alt="X"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://instagram.com/filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-70"
              aria-label="Filmry on Instagram"
            >
              <Image
                src="/icons/icon-instagram.png"
                alt="Instagram"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.linkedin.com/company/filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-70"
              aria-label="Filmry on LinkedIn"
            >
              <Image
                src="/icons/icon-linkedin.png"
                alt="LinkedIn"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.facebook.com/filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-70"
              aria-label="Filmry on Facebook"
            >
              <Image
                src="/icons/icon-facebook.png"
                alt="Facebook"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.tiktok.com/@filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-70"
              aria-label="Filmry on TikTok"
            >
              <Image
                src="/icons/icon-tiktok.png"
                alt="TikTok"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://youtube.com/@filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-70"
              aria-label="Filmry on YouTube"
            >
              <Image
                src="/icons/icon-youtube.png"
                alt="YouTube"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.threads.com/@filmryio"
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-80 transition-opacity hover:opacity-70"
              aria-label="Filmry on Threads"
            >
              <Image
                src="/icons/icon-threads.png"
                alt="Threads"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </a>
          </div>

          <p className="mt-8 text-xs text-gray-600">
            © {new Date().getFullYear()} Filmry. All rights reserved.
          </p>
        </div>
      </Reveal>
    </footer>
  )
}

