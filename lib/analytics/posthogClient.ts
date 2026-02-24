'use client'

import posthog from 'posthog-js'

let isInitialized = false

export function initPostHog() {
  if (typeof window === 'undefined' || isInitialized) {
    return
  }

  const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'
  const appEnv = process.env.NEXT_PUBLIC_APP_ENV || 'local'

  if (!apiKey) {
    return
  }

  posthog.init(apiKey, {
    api_host: host,
    autocapture: false,
    loaded: (posthog) => {
      if (process.env.NODE_ENV === 'development') {
        console.log('PostHog initialized')
      }
    },
  })

  // Set app environment
  posthog.register({
    app_env: appEnv,
  })

  isInitialized = true
}

export function track(event: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined' || !isInitialized) {
    return
  }

  posthog.capture(event, properties)
}

export function identify(distinctId: string, props?: Record<string, any>) {
  if (typeof window === 'undefined' || !isInitialized) {
    return
  }

  posthog.identify(distinctId, props)
}

