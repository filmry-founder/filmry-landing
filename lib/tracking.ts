/**
 * Client-side tracking utility
 * Collects UTM parameters, referrer, locale, and other attribution data
 */

export interface TrackingData {
  attribution: {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_content?: string
    utm_term?: string
    ref?: string
    referrer?: string
    landing_path?: string
  }
  meta: {
    locale?: string
    first_seen_at?: string
  }
  columns: {
    utm_source?: string
    utm_medium?: string
    utm_campaign?: string
    utm_content?: string
    utm_term?: string
    ref?: string
    locale?: string
  }
}

export function collectTrackingData(): TrackingData {
  if (typeof window === 'undefined') {
    return {
      attribution: {},
      meta: {},
      columns: {},
    }
  }

  const urlParams = new URLSearchParams(window.location.search)
  const attribution: TrackingData['attribution'] = {}
  const meta: TrackingData['meta'] = {}
  const columns: TrackingData['columns'] = {}

  // UTM parameters
  const utmSource = urlParams.get('utm_source')
  const utmMedium = urlParams.get('utm_medium')
  const utmCampaign = urlParams.get('utm_campaign')
  const utmContent = urlParams.get('utm_content')
  const utmTerm = urlParams.get('utm_term')

  if (utmSource) {
    attribution.utm_source = utmSource
    columns.utm_source = utmSource
  }
  if (utmMedium) {
    attribution.utm_medium = utmMedium
    columns.utm_medium = utmMedium
  }
  if (utmCampaign) {
    attribution.utm_campaign = utmCampaign
    columns.utm_campaign = utmCampaign
  }
  if (utmContent) {
    attribution.utm_content = utmContent
    columns.utm_content = utmContent
  }
  if (utmTerm) {
    attribution.utm_term = utmTerm
    columns.utm_term = utmTerm
  }

  // Ref parameter (supports both ?ref= and ?r=)
  const ref = urlParams.get('ref') || urlParams.get('r')
  if (ref) {
    attribution.ref = ref
    columns.ref = ref
  }

  // Locale (from URL param or navigator.language)
  const localeParam = urlParams.get('locale')
  const locale = localeParam || navigator.language || undefined
  if (locale) {
    meta.locale = locale
    columns.locale = locale
  }

  // Referrer
  if (document.referrer) {
    attribution.referrer = document.referrer
  }

  // Landing path
  attribution.landing_path = window.location.pathname

  // First seen timestamp
  meta.first_seen_at = new Date().toISOString()

  return {
    attribution,
    meta,
    columns,
  }
}

