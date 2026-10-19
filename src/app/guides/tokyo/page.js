import Link from 'next/link'
import SiteNav from '../../components/SiteNav'

export const metadata = { title: 'Tokyo City Guide — yvetted' }

const SECTIONS = [
  { name: 'Hotels', href: null, tagline: 'Where to stay', live: false },
  { name: 'Restaurants & bars', href: '/guides/tokyo/restaurants', tagline: '12-table sample (63 in the live guide)', live: true },
  { name: 'Activities', href: null, tagline: 'What to do', live: false },
]

export default function TokyoHub() {
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
        {/* faded serif wordmark */}
        <div aria-hidden style={{
          position: 'absolute', right: '36px', bottom: '18px', fontFamily: 'var(--font-cormorant), serif',
          fontStyle: 'italic', fontWeight: 600, fontSize: '150px', lineHeight: 0.7, color: '#fff', opacity: 0.3,
          pointerEvents: 'none', userSelect: 'none',
        }}>東京</div>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '92px 32px 0', position: 'relative', zIndex: 2 }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D857A', marginBottom: '20px' }}>
            <Link href="/guides" style={{ color: '#9B5A44', textDecoration: 'none' }}>City Guides</Link> · Tokyo
          </p>
          <h1 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '64px', color: '#1C1714', lineHeight: 1.05, marginBottom: '18px', fontWeight: 400 }}>
            Tokyo
          </h1>
          <p style={{ fontSize: '15px', color: '#6f675d', lineHeight: 1.8, maxWidth: '520px' }}>
            The insider&apos;s edit of Tokyo — from legendary omakase counters to bowls of ramen worth queuing two hours for.
          </p>
        </div>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '56px 32px 80px' }}>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9B5A44', marginBottom: '20px' }}>
          In this guide
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {SECTIONS.map((s) => {
            const card = (
              <div style={{
                border: '0.5px solid #EBE2D7',
                borderRadius: '3px',
                background: s.live ? '#fff' : '#F3EBE2',
                padding: '28px 24px',
                height: '100%',
                opacity: s.live ? 1 : 0.66,
              }}>
                <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '24px', color: '#1C1714', marginBottom: '6px', fontWeight: 400 }}>{s.name}</div>
                <div style={{ fontSize: '13px', color: '#8D857A' }}>{s.tagline}</div>
                {s.live
                  ? <div style={{ marginTop: '18px', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1C1714', borderBottom: '1px solid #9B5A44', display: 'inline-block', paddingBottom: '3px' }}>View →</div>
                  : <div style={{ marginTop: '18px', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8D857A' }}>Soon</div>}
              </div>
            )
            return s.href ? (
              <Link key={s.name} href={s.href} style={{ textDecoration: 'none' }}>{card}</Link>
            ) : (
              <div key={s.name}>{card}</div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
