import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { track, identify } from '@/lib/analytics'

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
    const { email, user_type, role, org_name, focus, experience_level, country, team_size, primary_need, attribution, meta } = body

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

    // Create server-side Supabase client with service role key
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Look up early_access.id by email
    const { data: earlyAccessData, error: earlyAccessError } = await supabase
      .from('early_access')
      .select('id, attribution, meta')
      .eq('email', normalizedEmail)
      .single()

    if (earlyAccessError && earlyAccessError.code !== 'PGRST116') {
      // PGRST116 is "not found", which is acceptable
      console.error('Error looking up early_access:', earlyAccessError)
    }

    // Get IP and user agent from request
    const ip = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || null

    // Merge attribution and meta with existing data (shallow merge)
    const mergedAttribution = {
      ...(earlyAccessData?.attribution || {}),
      ...(attribution || {}),
    }
    const mergedMeta = {
      ...(earlyAccessData?.meta || {}),
      ...(meta || {}),
    }

    // Prepare data for upsert
    const upsertData: any = {
      email: normalizedEmail,
      user_type: user_type || null,
      role: role || null,
      org_name: org_name || null,
      focus: focus || null,
      experience_level: experience_level || null,
      country: country || null,
      team_size: team_size || null,
      primary_need: primary_need || null,
      early_access_id: earlyAccessData?.id || null,
      ip: ip,
      user_agent: userAgent,
      attribution: mergedAttribution,
      meta: mergedMeta,
    }

    // Get locale from meta if available
    if (mergedMeta.locale) {
      upsertData.locale = mergedMeta.locale
    }

    // Upsert into waitlist_profiles
    const { error } = await supabase
      .from('waitlist_profiles')
      .upsert(upsertData, {
        onConflict: 'email',
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        {
          ok: false,
          error: 'Failed to save profile. Please try again.',
        },
        { status: 500 }
      )
    }

    // Track analytics events after successful DB operation
    track(
      'waitlist_profile_completed',
      normalizedEmail,
      {
        user_type: user_type || null,
        role: role || null,
        org_name: org_name || null,
        focus: focus || null,
        experience_level: experience_level || null,
        country: country || null,
        team_size: team_size || null,
        primary_need: primary_need || null,
        locale: mergedMeta.locale || null,
      },
      {
        ip,
        user_agent: userAgent,
        pathname: mergedAttribution?.landing_path,
      }
    )

    identify(normalizedEmail, {
      user_type: user_type || null,
      role: role || null,
      org_name: org_name || null,
      focus: focus || null,
      experience_level: experience_level || null,
      country: country || null,
    })

    return NextResponse.json({ ok: true })
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

