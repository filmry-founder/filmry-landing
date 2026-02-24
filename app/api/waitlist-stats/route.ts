import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const CACHE_HEADERS =
  process.env.NODE_ENV === 'production'
    ? { 'Cache-Control': 's-maxage=60, stale-while-revalidate=300' }
    : { 'Cache-Control': 'no-store' }

export async function GET() {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return NextResponse.json(
      { ok: false, error: 'Server configuration error.' },
      { status: 500 }
    )
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    })

    const startOfToday = new Date()
    startOfToday.setUTCHours(0, 0, 0, 0)

    const [totalRes, todayRes] = await Promise.all([
      supabase.from('early_access').select('*', { count: 'exact', head: true }),
      supabase
        .from('early_access')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', startOfToday.toISOString()),
    ])

    const total = totalRes.count ?? 0
    const today = todayRes.count ?? 0

    return NextResponse.json({ ok: true, total, today }, { headers: CACHE_HEADERS })
  } catch (err) {
    console.error('waitlist-stats error:', err)
    return NextResponse.json(
      { ok: false, error: 'Failed to load stats.' },
      { status: 500 }
    )
  }
}
