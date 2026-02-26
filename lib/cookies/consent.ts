export type CookieConsent = {
  necessary: true
  analytics: boolean
  marketing: boolean
  updatedAt: string
}

export const CONSENT_STORAGE_KEY = 'filmry_cookie_consent_v1'

export function defaultConsent(): CookieConsent {
  return {
    necessary: true,
    analytics: false,
    marketing: false,
    updatedAt: new Date().toISOString(),
  }
}

export function getConsent(): CookieConsent | null {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<CookieConsent>

    if (typeof parsed !== 'object' || parsed === null) return null

    const necessary = true
    const analytics = Boolean(parsed.analytics)
    const marketing = Boolean(parsed.marketing)
    const updatedAt =
      typeof parsed.updatedAt === 'string' ? parsed.updatedAt : new Date().toISOString()

    return { necessary, analytics, marketing, updatedAt }
  } catch {
    return null
  }
}

export function setConsent(consent: CookieConsent): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    const value: CookieConsent = {
      necessary: true,
      analytics: consent.analytics,
      marketing: consent.marketing,
      updatedAt: consent.updatedAt ?? new Date().toISOString(),
    }
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(value))
  } catch {
    // Swallow storage errors (e.g. private mode, quota exceeded)
  }
}

export function hasConsent(): boolean {
  if (typeof window === 'undefined') return false
  return getConsent() !== null
}

