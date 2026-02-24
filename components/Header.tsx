import Link from 'next/link'
import HeaderLogoLink from '@/components/HeaderLogoLink'

type HeaderProps = {
  /** Use solid background for sub-pages; transparent for homepage (sits on gradient) */
  variant?: 'solid' | 'transparent'
}

export default function Header({ variant = 'solid' }: HeaderProps) {
  return (
    <header
      id="header-logo-link"
      className={`relative z-10 w-full border-b border-white/5 ${variant === 'solid' ? 'bg-[#0a0a0a]' : ''}`}
    >
      <nav className="header-edge-container flex items-center justify-between py-5 max-sm:gap-5 max-sm:px-5">
        <HeaderLogoLink />
        <div className="flex flex-shrink-0 items-center gap-8 sm:gap-6">
          <div className="flex items-center gap-8 sm:gap-6">
            <Link
              href="/privacy"
              className="whitespace-nowrap text-sm text-gray-400 transition-colors hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="whitespace-nowrap text-sm text-gray-400 transition-colors hover:text-white"
            >
              Terms
            </Link>
          </div>
          <a
            href="/#waitlist"
            className="btn-cinematic btn-early-access whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200 max-sm:px-3 max-sm:py-1.5"
          >
            Join early access
          </a>
        </div>
      </nav>
    </header>
  )
}
