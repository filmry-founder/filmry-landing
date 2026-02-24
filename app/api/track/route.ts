import { NextRequest, NextResponse } from 'next/server'
import { serverTrack } from '@/lib/analytics/posthogServer'

function getClientIP(request: NextRequest): string | null {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  return null
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, distinctId, properties } = body

    if (!event || !distinctId) {
      return NextResponse.json(
        {
          ok: false,
          error: 'event and distinctId are required',
        },
        { status: 400 }
      )
    }

    // Get request metadata
    const ip = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || null
    const referer = request.headers.get('referer') || null

    // Merge properties with request metadata
    const enrichedProperties = {
      ...(properties || {}),
      ...(ip && { ip }),
      ...(userAgent && { user_agent: userAgent }),
      ...(referer && { referer }),
    }

    // Track event
    serverTrack(event, distinctId, enrichedProperties)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Track API error:', error)
    return NextResponse.json(
      {
        ok: false,
        error: 'Failed to track event',
      },
      { status: 500 }
    )
  }
}

