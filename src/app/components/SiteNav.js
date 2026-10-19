'use client'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

/**
 * Shared site navigation — warm-gradient design system (matches homepage).
 * Transparent and overlaid; place it above a gradient hero.
 * Desktop: inline links with a City Guides hover dropdown.
 * Mobile (<=760px): collapses into a Menu toggle + full-width panel.
 */
export default function SiteNav() {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)

  const openMenu = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpen(true)
  }
  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    closeTimer.current = setTimeout(() => setOpen(false), 180)
  }

  const [mobileOpen, setMobileOpen] = useState(false)
  const [citiesOpen, setCitiesOpen] = useState(false)
  const closeMobile = () => { setMobileOpen(false); setCitiesOpen(false) }

  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const ink = '#1C1714'
  const clay = '#9B5A44'
  const taupe = '#8D857A'
  const navOpaque = scrolled || mobileOpen

  return (
    <nav
      className="snav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: navOpaque ? 'rgba(251, 246, 239, 0.92)' : 'transparent',
        backdropFilter: navOpaque ? 'saturate(180%) blur(10px)' : 'none',
        WebkitBackdropFilter: navOpaque ? 'saturate(180%) blur(10px)' : 'none',
        borderBottom: scrolled ? '0.5px solid #EBE2D7' : '0.5px solid transparent',
        transition: 'background .25s ease, border-color .25s ease, backdrop-filter .25s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 500,
        fontFamily: 'var(--font-inter), -apple-system, sans-serif',
      }}
    >
      <style>{`
        .snav { box-sizing: border-box; height: 64px; padding: 0 32px; }
        .snav-desktop { display: flex; gap: 26px; align-items: center; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; }
        .snav-burger { display: none; }
        .snav-mobile { display: none; }
        @media (max-width: 760px) {
          .snav { height: 56px; padding: 0 20px; }
          .snav-desktop { display: none !important; }
          .snav-burger { display: inline-flex !important; }
          .snav-mobile { display: block !important; }
        }
      `}</style>

      <Link
        href="/"
        onClick={closeMobile}
        style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '20px', fontWeight: 400, color: ink, textDecoration: 'none' }}
      >
        yvetted
      </Link>

      {/* ── Desktop links ── */}
      <div className="snav-desktop">
        <a
          href="mailto:hello@example.com?subject=Plan%20my%20trip"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: clay, textDecoration: 'none' }}
        >
          Plan a trip
        </a>

        <div
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
          style={{ position: 'relative' }}
        >
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: clay,
              font: 'inherit',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
              padding: 0,
            }}
          >
            City guides
            <span style={{ fontSize: '8px', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▼</span>
          </button>

          {open && (
            <div
              style={{
                position: 'absolute',
                top: 'calc(100% + 12px)',
                right: 0,
                background: '#FBF6EF',
                border: '0.5px solid #EBE2D7',
                borderRadius: '8px',
                boxShadow: '0 12px 32px rgba(28,23,20,0.12)',
                minWidth: '300px',
                display: 'flex',
                overflow: 'hidden',
              }}
            >
              <div style={{ width: '120px', background: '#F3EBE2', padding: '12px 0', borderRight: '0.5px solid #EBE2D7' }}>
                <div style={{ padding: '4px 16px 8px', fontSize: '9px', letterSpacing: '0.12em', color: taupe }}>BY CITY</div>
                <Link href="/guides/tokyo" onClick={() => setOpen(false)} style={dropCity(true)}>Tokyo</Link>
                <div style={dropCity(false, true)}>Kyoto<span style={soon}>soon</span></div>
                <div style={dropCity(false, true)}>Bangkok<span style={soon}>soon</span></div>
              </div>
              <div style={{ flex: 1, padding: '12px 0' }}>
                <div style={{ padding: '4px 18px 8px', fontSize: '9px', letterSpacing: '0.12em', color: taupe }}>TOKYO</div>
                <div style={dropItem(false, true)}>Hotels<span style={soon}>soon</span></div>
                <Link href="/guides/tokyo/restaurants" onClick={() => setOpen(false)} style={dropItem(true)}>Restaurants &amp; bars</Link>
                <div style={dropItem(false, true)}>Activities<span style={soon}>soon</span></div>
              </div>
            </div>
          )}
        </div>

        <Link href="/client" style={{ color: clay, textDecoration: 'none' }}>
          Client section
        </Link>
      </div>

      {/* ── Mobile toggle ── */}
      <button
        className="snav-burger"
        onClick={() => setMobileOpen((v) => !v)}
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: clay,
          fontSize: '11px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          fontFamily: 'var(--font-inter), sans-serif',
          padding: '4px 0',
          alignItems: 'center',
        }}
      >
        {mobileOpen ? 'Close' : 'Menu'}
      </button>

      {/* ── Mobile panel ── */}
      {mobileOpen && (
        <div
          className="snav-mobile"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#FBF6EF',
            borderTop: '0.5px solid #EBE2D7',
            borderBottom: '0.5px solid #EBE2D7',
            boxShadow: '0 14px 30px rgba(28,23,20,0.10)',
            padding: '6px 0 12px',
          }}
        >
          <a href="mailto:hello@example.com?subject=Plan%20my%20trip" target="_blank" rel="noopener noreferrer" onClick={closeMobile} style={mLink}>
            Plan a trip
          </a>

          <button
            onClick={() => setCitiesOpen((v) => !v)}
            aria-expanded={citiesOpen}
            style={{ ...mLink, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}
          >
            City guides
            <span style={{ fontSize: '8px', transform: citiesOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}>▼</span>
          </button>
          {citiesOpen && (
            <div style={{ padding: '2px 0 6px' }}>
              <Link href="/guides/tokyo" onClick={closeMobile} style={mSub}>Tokyo</Link>
              <Link href="/guides/tokyo/restaurants" onClick={closeMobile} style={mSub}>Tokyo · Restaurants &amp; bars</Link>
              <div style={mSubSoon}>Kyoto — soon</div>
              <div style={mSubSoon}>Bangkok — soon</div>
            </div>
          )}

          <Link href="/client" onClick={closeMobile} style={mLink}>
            Client section
          </Link>
        </div>
      )}
    </nav>
  )
}

const mLink = {
  display: 'block',
  textAlign: 'left',
  padding: '14px 24px',
  fontSize: '12px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: '#1C1714',
  textDecoration: 'none',
  background: 'none',
  border: 'none',
  fontFamily: 'var(--font-inter), sans-serif',
  cursor: 'pointer',
}

const mSub = {
  display: 'block',
  padding: '9px 24px 9px 40px',
  fontSize: '16px',
  letterSpacing: '0.01em',
  textTransform: 'none',
  color: '#1C1714',
  textDecoration: 'none',
  fontFamily: 'var(--font-cormorant), Georgia, serif',
}

const mSubSoon = { ...mSub, color: '#8D857A' }

const soon = { fontSize: '8px', marginLeft: '8px', color: '#8D857A', letterSpacing: '0.08em' }

function dropCity(active, disabled) {
  return {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    fontSize: '14px',
    letterSpacing: '0.01em',
    textTransform: 'none',
    textDecoration: 'none',
    color: disabled ? '#8D857A' : '#1C1714',
    background: active ? '#FBF6EF' : 'transparent',
    fontFamily: 'var(--font-cormorant), Georgia, serif',
  }
}

function dropItem(active, disabled) {
  return {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 18px',
    fontSize: '14px',
    letterSpacing: '0.01em',
    textTransform: 'none',
    textDecoration: 'none',
    color: disabled ? '#8D857A' : '#1C1714',
    borderLeft: active ? '2px solid #9B5A44' : '2px solid transparent',
    fontFamily: 'var(--font-cormorant), Georgia, serif',
  }
}
