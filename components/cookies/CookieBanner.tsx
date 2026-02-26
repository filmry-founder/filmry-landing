'use client'

import { defaultConsent } from '@/lib/cookies/consent'
import { useCookieConsent } from '@/components/cookies/CookieConsentProvider'

export default function CookieBanner() {
  const { isBannerOpen, setConsent, openPreferences } = useCookieConsent()

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

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40">
      <div className="pointer-events-auto px-4 pb-4 sm:px-6 sm:pb-6">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/12 bg-[#050505]/95 p-4 shadow-xl backdrop-blur-md sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1.5 text-left">
              <h2 className="text-sm font-medium text-white">
                We use cookies
              </h2>
              <p className="text-xs leading-relaxed text-gray-400">
                We use necessary cookies to make Filmry work. With your permission, we also use analytics and marketing
                cookies to improve the experience.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:min-w-[260px] sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={handleRejectAll}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-3 py-2 text-xs font-medium text-gray-300 transition-colors hover:border-white/30 hover:text-white sm:w-auto"
              >
                Reject all
              </button>
              <button
                type="button"
                onClick={handleOpenPreferences}
                className="inline-flex w-full items-center justify-center rounded-full border border-white/10 px-3 py-2 text-xs font-medium text-gray-300 transition-colors hover:border-white/25 hover:text-white sm:w-auto"
              >
                Cookie preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-gray-100 sm:w-auto"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

