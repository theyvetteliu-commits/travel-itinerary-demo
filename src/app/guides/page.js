import Link from 'next/link'
import SiteNav from '../components/SiteNav'

export const metadata = { title: 'City Guides — yvetted' }

const CITIES = [
  { name: 'Tokyo', href: '/guides/tokyo', tagline: 'Dining live · hotels & activities soon', live: true },
  { name: 'Kyoto', href: null, tagline: 'Coming soon', live: false },
  { name: 'Bangkok', href: null, tagline: 'Coming soon', live: false },
]

export default function GuidesIndex() {
  return (
    <main style={{ minHeight: '100vh', background: '#FBF6EF', fontFamily: 'var(--font-inter), -apple-system, sans-serif' }}>
      {/* Gradient hero with overlaid transparent nav */}
      <header style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #F4D9D4 0%, #F6E7D6 55%, #F8EFE2 100%)',
        padding: '0 0 64px',
        overflow: 'hidden',
      }}>
        <SiteNav />
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '92px 32px 0' }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#9B5A44', marginBottom: '20px' }}>
            City Guides
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '64px', color: '#1C1714', lineHeight: 1.05, marginBottom: '18px', fontWeight: 400 }}>
            The insider&apos;s edit,<br /><em>city by city.</em>
          </h1>
          <p style={{ fontSize: '15px', color: '#6f675d', lineHeight: 1.8, maxWidth: '520px' }}>
            Curated tables, stays and experiences — the places worth your time.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '56px 32px 80px' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B5A44', marginBottom: '20px' }}>
          Destinations
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {CITIES.map((c) => {
            const card = (
              <div style={{
                border: '0.5px solid #EBE2D7',
                borderRadius: '3px',
                background: c.live ? '#fff' : '#F3EBE2',
                padding: '28px 24px',
                height: '100%',
                opacity: c.live ? 1 : 0.66,
              }}>
                <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '27px', color: '#1C1714', marginBottom: '6px', fontWeight: 400 }}>{c.name}</div>
                <div style={{ fontSize: '13px', color: '#8D857A' }}>{c.tagline}</div>
                {c.live
                  ? <div style={{ marginTop: '18px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1C1714', borderBottom: '1px solid #9B5A44', display: 'inline-block', paddingBottom: '3px' }}>View guide →</div>
                  : <div style={{ marginTop: '18px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D857A' }}>Coming soon</div>}
              </div>
            )
            return c.href ? (
              <Link key={c.name} href={c.href} style={{ textDecoration: 'none' }}>{card}</Link>
            ) : (
              <div key={c.name}>{card}</div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
