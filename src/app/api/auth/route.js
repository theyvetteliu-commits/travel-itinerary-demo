import { NextResponse } from 'next/server'

// ── Server-only: these codes are NEVER sent to the browser ──
// Add new trips here: 'TRIPCODE': 'slug-from-url'
const TRIP_CODES = {
  'KYOTO-2027': 'demo-kyoto-2027',   // Demo trip — invented family, Kyoto & Hakone, April 2027
}

export async function POST(request) {
  try {
    const { code } = await request.json()
    const slug = TRIP_CODES[code?.trim()]

    if (!slug) {
      return NextResponse.json(
        { error: 'Code not recognised. Please check with Yvette.' },
        { status: 401 }
      )
    }

    const response = NextResponse.json({ slug })
    // Set the trip auth cookie server-side (scopes access to this slug)
    response.cookies.set('trip_auth', slug, {
      path: '/',
      sameSite: 'strict',
    })
    // Mark the visitor as an authenticated client — unlocks the full city guides.
    // Any valid code sets this; it is not tied to a specific trip.
    response.cookies.set('client_access', '1', {
      path: '/',
      sameSite: 'strict',
    })
    return response
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
