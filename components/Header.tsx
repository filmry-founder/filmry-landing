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
      <nav className="header-edge-container flex min-w-0 items-center justify-between py-5 max-sm:gap-2 max-sm:px-4">
        <HeaderLogoLink />
        <a
          href="/#waitlist"
          className="btn-cinematic btn-early-access shrink-0 whitespace-nowrap px-5 py-2.5 text-sm transition-all duration-250 max-sm:px-3 max-sm:py-2"
        >
          <span className="btn-early-access__inner" aria-hidden="true" />
          <span>Join early access</span>
        </a>
      </nav>
    </header>
  )
}
