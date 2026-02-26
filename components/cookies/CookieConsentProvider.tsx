'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  type CookieConsent,
  defaultConsent,
  getConsent as readConsentFromStorage,
  setConsent as writeConsentToStorage,
} from '@/lib/cookies/consent'

type CookieConsentContextValue = {
  consent: CookieConsent | null
  setConsent: (consent: CookieConsent) => void
  isBannerOpen: boolean
  isPreferencesOpen: boolean
  openPreferences: () => void
  closePreferences: () => void
  dismissBanner: () => void
}

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined)

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext)
  if (!ctx) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider')
  }
  return ctx
}

type Props = {
  children: React.ReactNode
}

export default function CookieConsentProvider({ children }: Props) {
  const [consent, setConsentState] = useState<CookieConsent | null>(null)
  const [isBannerOpen, setIsBannerOpen] = useState(false)
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false)

  // Load consent from localStorage on mount
  useEffect(() => {
    const existing = readConsentFromStorage()
    if (existing) {
      setConsentState(existing)
      setIsBannerOpen(false)
    } else {
      setConsentState(null)
      setIsBannerOpen(true)
    }
  }, [])

  // Listen for global "open preferences" events (e.g. from footer link)
  useEffect(() => {
    if (typeof window === 'undefined') return

    const handler = () => {
      setIsPreferencesOpen(true)
      setIsBannerOpen(false)
    }

    window.addEventListener('filmry:open-cookie-preferences', handler)
    return () => {
      window.removeEventListener('filmry:open-cookie-preferences', handler)
    }
  }, [])

  const onConsentChange = (next: CookieConsent) => {
    // TODO: Gate analytics / marketing script loading here based on
    // next.analytics and next.marketing before initializing any client SDKs.
    // Example:
    // if (next.analytics) enableAnalytics()
    // else disableAnalytics()
  }

  const setConsent = (next: CookieConsent) => {
    const withUpdated: CookieConsent = {
      necessary: true,
      analytics: next.analytics,
      marketing: next.marketing,
      updatedAt: new Date().toISOString(),
    }

    setConsentState(withUpdated)
    writeConsentToStorage(withUpdated)
    setIsBannerOpen(false)
    setIsPreferencesOpen(false)
    onConsentChange(withUpdated)
  }

  const openPreferences = () => {
    setIsPreferencesOpen(true)
    setIsBannerOpen(false)
  }

  const closePreferences = () => {
    setIsPreferencesOpen(false)
  }

  const dismissBanner = () => {
    setIsBannerOpen(false)
  }

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      setConsent,
      isBannerOpen,
      isPreferencesOpen,
      openPreferences,
      closePreferences,
      dismissBanner,
    }),
    [consent, isBannerOpen, isPreferencesOpen]
  )

  return (
    <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>
  )
}

