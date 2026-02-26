'use client'

import Link from 'next/link'
import { defaultConsent } from '@/lib/cookies/consent'
import { useCookieConsent } from '@/components/cookies/CookieConsentProvider'

export default function CookieBanner() {
  const { isBannerOpen, setConsent, openPreferences, dismissBanner } = useCookieConsent()

  if (!isBannerOpen) return null

  const handleAcceptAll = () => {
    const base = defaultConsent()
    setConsent({
      ...base,
      analytics: true,
      marketing: true,
    })
  }

  const handleRejectAll = () => {
    const base = defaultConsent()
    setConsent(base)
  }

  const handleOpenPreferences = () => {
    openPreferences()
  }

  const handleDismiss = () => {
    dismissBanner()
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="pointer-events-auto px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="cookie-banner-enter mx-auto max-w-5xl rounded-2xl border border-white/10 bg-black/70 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-5">
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close cookie banner"
            className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs text-gray-400 transition-colors hover:bg-white/10 hover:text-gray-100"
          >
            ×
          </button>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="pr-2 text-left md:max-w-xl md:pr-8">
              <h2 className="text-sm font-semibold tracking-tight text-white sm:text-base">
                This website uses cookies
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-gray-300 sm:text-[13px]">
                We use necessary cookies to make Filmry work. With your permission, we also use analytics and marketing
                cookies to improve the experience. Read our{' '}
                <Link
                  href="/privacy"
                  className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                >
                  Privacy Policy
                </Link>{' '}
                and{' '}
                <Link
                  href="/do-not-sell"
                  className="underline decoration-white/30 underline-offset-4 transition-colors hover:text-white hover:decoration-white/60"
                >
                  Do not sell
                </Link>{' '}
                to learn more.
              </p>
            </div>
            <div className="mt-1 flex flex-col gap-2 text-xs md:mt-0 md:min-w-[260px] md:flex-row md:justify-end">
              <button
                type="button"
                onClick={handleRejectAll}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-3 py-2 font-medium text-gray-200 transition-colors hover:border-white/35 hover:text-white md:w-auto"
              >
                REJECT
              </button>
              <button
                type="button"
                onClick={handleOpenPreferences}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-3 py-2 font-medium text-gray-200 transition-colors hover:border-white/25 hover:text-white md:w-auto"
              >
                SHOW DETAILS
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2 font-semibold tracking-wide text-black transition-colors hover:bg-gray-100 md:w-auto"
              >
                ACCEPT ALL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

