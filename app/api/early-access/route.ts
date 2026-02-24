import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { track } from '@/lib/analytics'
import { sendWaitlistEmail } from '@/lib/sendEmail'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  console.error('Missing environment variable: SUPABASE_URL')
}

if (!supabaseServiceRoleKey) {
  console.error('Missing environment variable: SUPABASE_SERVICE_ROLE_KEY')
}

function getClientIP(request: NextRequest): string | null {
  // Try various headers in order of preference
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Fallback to connection remote address (if available)
  return null
}

export async function POST(request: NextRequest) {
  // Validate environment variables
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Server configuration error. Please contact support.',
      },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()
    const { email, source, attribution, meta, columns } = body

    // Validate email is required
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        {
          ok: false,
          error: 'Email is required.',
        },
        { status: 400 }
      )
    }

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase()

    // Get IP and user agent from request
    const ip = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || null

    // Create server-side Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Prepare data for insert/upsert
    const insertData: any = {
      email: normalizedEmail,
      source: source || 'landing',
      status: 'pending',
      ip: ip,
      user_agent: userAgent,
      attribution: attribution || {},
      meta: meta || {},
    }

    // Add column-level fields if provided
    if (columns) {
      if (columns.utm_source) insertData.utm_source = columns.utm_source
      if (columns.utm_medium) insertData.utm_medium = columns.utm_medium
      if (columns.utm_campaign) insertData.utm_campaign = columns.utm_campaign
      if (columns.utm_content) insertData.utm_content = columns.utm_content
      if (columns.utm_term) insertData.utm_term = columns.utm_term
      if (columns.ref) insertData.ref = columns.ref
      if (columns.locale) insertData.locale = columns.locale
    }

    // Upsert into early_access (on conflict email)
    const { data, error } = await supabase
      .from('early_access')
      .upsert(insertData, {
        onConflict: 'email',
      })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        {
          ok: false,
          error: 'Failed to save. Please try again.',
        },
        { status: 500 }
      )
    }

    // Send confirmation email (non-blocking; do not fail signup if email fails)
    try {
      await sendWaitlistEmail(normalizedEmail)
    } catch (emailErr) {
      console.error('Waitlist confirmation email failed:', emailErr)
    }

    // Track analytics event after successful DB operation
    track(
      'waitlist_email_submitted',
      normalizedEmail,
      {
        source: source || 'landing',
        utm_source: columns?.utm_source,
        utm_medium: columns?.utm_medium,
        utm_campaign: columns?.utm_campaign,
        utm_content: columns?.utm_content,
        utm_term: columns?.utm_term,
        ref: columns?.ref,
        locale: columns?.locale,
        landing_path: attribution?.landing_path,
      },
      {
        ip,
        user_agent: userAgent,
        pathname: attribution?.landing_path,
      }
    )

    return NextResponse.json({
      ok: true,
      early_access_id: data?.id,
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      {
        ok: false,
        error: 'Something went wrong. Please try again.',
      },
      { status: 500 }
    )
  }
}

