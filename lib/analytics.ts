/**
 * Server-side analytics utility - uses posthog-node
 * For client-side tracking, use lib/analytics/posthogClient.ts
 */

import { serverTrack as posthogServerTrack } from './analytics/posthogServer'
import { randomUUID } from 'crypto'

const provider = process.env.ANALYTICS_PROVIDER
const appEnv = process.env.APP_ENV

interface TrackContext {
  ip?: string | null
  user_agent?: string | null
  pathname?: string | null
}

export function track(
  event: string,
  distinctId: string,
  properties?: Record<string, any>,
  context?: TrackContext
): void {
  // Noop if provider not set
  if (!provider) {
    return
  }

  if (provider === 'posthog') {
    // Enrich properties with server-side context
    const enrichedProperties: Record<string, any> = {
      ...(properties || {}),
      app_env: appEnv || undefined,
      request_id: randomUUID(),
    }

    // Add context if available
    if (context?.ip) {
      enrichedProperties.ip = context.ip
    }
    if (context?.user_agent) {
      enrichedProperties.user_agent = context.user_agent
    }
    if (context?.pathname) {
      enrichedProperties.pathname = context.pathname
    }

    // Use server-side PostHog client (no flush needed - auto-flushes with flushAt: 1)
    posthogServerTrack(event, distinctId, enrichedProperties)
    return
  }

  // Fallback to console logging for other providers
  const payload = {
    type: 'track',
    event,
    distinctId,
    properties: properties || {},
    timestamp: new Date().toISOString(),
  }

  console.log(JSON.stringify(payload))
}

export function identify(
  distinctId: string,
  traits?: Record<string, any>
): void {
  // Noop if provider not set
  if (!provider) {
    return
  }

  if (provider === 'posthog') {
    const enrichedTraits: Record<string, any> = {
      ...(traits || {}),
      app_env: appEnv || undefined,
    }

    // Note: posthog-node doesn't have identify, only capture
    // For identify events, we'll track as a special event
    posthogServerTrack('$identify', distinctId, enrichedTraits)
    return
  }

  // Fallback to console logging
  const payload = {
    type: 'identify',
    distinctId,
    traits: traits || {},
    timestamp: new Date().toISOString(),
  }

  console.log(JSON.stringify(payload))
}
