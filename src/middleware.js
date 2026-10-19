import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Get the slug from the URL — e.g. /trips/demo-kyoto-2027 → demo-kyoto-2027
  const slug = pathname.replace('/trips/', '').split('/')[0]

  // Open trips — reachable by URL with no passcode.
  // Visitors still get client_access so the full city guides stay unlocked.
  const OPEN_TRIPS = ['demo-kyoto-2027']  // demo trip: open to anyone, no code needed
  if (OPEN_TRIPS.includes(slug)) {
    const res = NextResponse.next()
    res.cookies.set('client_access', '1', { path: '/', sameSite: 'strict' })
    return res
  }

  // Check the auth cookie — must match this specific slug
  const authCookie = request.cookies.get('trip_auth')

  if (!authCookie || authCookie.value !== slug) {
    const url = request.nextUrl.clone()
    url.pathname = '/client'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/trips/:path*'],
}
