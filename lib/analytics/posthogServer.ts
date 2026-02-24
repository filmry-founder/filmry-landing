import { PostHog } from 'posthog-node'

let posthog: PostHog | null = null

function getPostHogClient(): PostHog | null {
  if (posthog) {
    return posthog
  }

  const apiKey = process.env.POSTHOG_API_KEY
  const host = process.env.POSTHOG_HOST || 'https://app.posthog.com'

  if (!apiKey) {
    return null
  }

  posthog = new PostHog(apiKey, {
    host,
    flushAt: 1, // Flush after each event (automatic, no manual flush needed)
    flushInterval: 0, // Disable interval flushing
  })

  return posthog
}

export function serverTrack(
  event: string,
  distinctId: string,
  properties?: Record<string, any>
): void {
  const client = getPostHogClient()
  if (!client) {
    return
  }

  // Capture event - PostHog will auto-flush with flushAt: 1
  // No need to manually flush, and no blocking
  client.capture({
    distinctId,
    event,
    properties: properties || {},
  })
}

