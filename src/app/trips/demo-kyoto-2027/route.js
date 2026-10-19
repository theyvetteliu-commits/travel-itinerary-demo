import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(
      process.cwd(),
      'src', 'app', 'trips', 'demo-kyoto-2027', 'itinerary.html'
    )
    const html = fs.readFileSync(filePath, 'utf-8')
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'private, no-store',
      },
    })
  } catch {
    return new NextResponse('Not found', { status: 404 })
  }
}
