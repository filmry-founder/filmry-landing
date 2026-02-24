'use client'

import { useEffect } from 'react'
import { initPostHog } from '@/lib/analytics/posthogClient'

const UTM_STORAGE_KEY = 'filmry_utm_params'
const REF_STORAGE_KEY = 'filmry_ref'
const LOCALE_STORAGE_KEY = 'filmry_locale'

export default function AnalyticsProvider() {
  useEffect(() => {
    // Initialize PostHog
    initPostHog()

    // Read URL params from current URL
    if (typeof window === 'undefined') {
      return
    }

    const urlParams = new URLSearchParams(window.location.search)
    const utmSource = urlParams.get('utm_source')
    const utmMedium = urlParams.get('utm_medium')
    const utmCampaign = urlParams.get('utm_campaign')
    const utmTerm = urlParams.get('utm_term')
    const utmContent = urlParams.get('utm_content')
    const ref = urlParams.get('ref') || urlParams.get('r')
    const locale = urlParams.get('locale')

    // Persist UTM params to localStorage
    if (utmSource || utmMedium || utmCampaign || utmTerm || utmContent) {
      const utmParams = {
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        utm_term: utmTerm,
        utm_content: utmContent,
      }
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams))
    }

    // Persist ref to localStorage
    if (ref) {
      localStorage.setItem(REF_STORAGE_KEY, ref)
    }

    // Persist locale to localStorage
    if (locale) {
      localStorage.setItem(LOCALE_STORAGE_KEY, locale)
    }
  }, [])

  return null
}

// Helper functions to read persisted values
export function getPersistedUTMParams(): Record<string, string | null> {
  if (typeof window === 'undefined') {
    return {}
  }

  try {
    const stored = localStorage.getItem(UTM_STORAGE_KEY)
    return stored ? JSON.parse(stored) : {}
  } catch {
    return {}
  }
}

export function getPersistedRef(): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  return localStorage.getItem(REF_STORAGE_KEY)
}

export function getPersistedLocale(): string | null {
  if (typeof window === 'undefined') {
    return null
  }

  return localStorage.getItem(LOCALE_STORAGE_KEY)
}

