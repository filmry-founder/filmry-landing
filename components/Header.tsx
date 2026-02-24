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
      <nav className="header-edge-container flex items-center justify-between py-5">
        <HeaderLogoLink />
        <div className="flex items-center gap-6">
          <Link
            href="/privacy"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Privacy
          </Link>
          <Link
            href="/terms"
            className="text-sm text-gray-400 transition-colors hover:text-white"
          >
            Terms
          </Link>
          <a
            href="/#waitlist"
            className="btn-cinematic btn-early-access rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200"
          >
            Join early access
          </a>
        </div>
      </nav>
    </header>
  )
}
