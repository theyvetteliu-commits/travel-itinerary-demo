'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function UnlockGuides({ remaining }) {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const router = useRouter()

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      })
      const data = await res.json()
      if (res.ok) {
        router.refresh()
      } else {
        setError(data.error || 'Code not recognised. Please check with Yvette.')
        setBusy(false)
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setBusy(false)
    }
  }

  return (
    <div id="unlock" style={{
      maxWidth: '520px',
      margin: '0 auto 72px',
      border: '0.5px solid #EBE2D7',
      borderRadius: '14px',
      background: 'linear-gradient(135deg, #F4D9D4 0%, #F8EFE2 100%)',
      padding: '48px 32px',
      textAlign: 'center',
      fontFamily: 'var(--font-inter), -apple-system, sans-serif',
    }}>
      <div style={{ fontSize: '22px', marginBottom: '10px' }}>🔒</div>
      <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '28px', fontWeight: 400, color: '#1C1714', marginBottom: '8px' }}>
        {remaining} more restaurants
      </div>
      <p style={{ fontSize: '14px', color: '#6f675d', lineHeight: 1.7, marginBottom: '22px' }}>
        Unlock the full Tokyo guide — kaiseki, wagyu, ramen, casual and vegetarian — with your access code.
      </p>
      <form onSubmit={submit} style={{ display: 'flex', gap: '8px', maxWidth: '340px', margin: '0 auto' }}>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          autoComplete="off"
          name="guide-access-code"
          inputMode="text"
          data-1p-ignore
          data-lpignore="true"
          data-bwignore
          data-form-type="other"
          style={{
            flex: 1,
            border: '0.5px solid #EBE2D7',
            background: '#fff',
            padding: '12px 16px',
            fontSize: '14px',
            color: '#1C1714',
            outline: 'none',
            borderRadius: '6px',
            fontFamily: 'var(--font-inter), sans-serif',
          }}
        />
        <button
          type="submit"
          disabled={busy}
          style={{
            background: '#1C1714',
            color: '#FBF6EF',
            border: 'none',
            padding: '12px 22px',
            fontSize: '11px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            borderRadius: '6px',
            cursor: busy ? 'default' : 'pointer',
            fontFamily: 'var(--font-inter), sans-serif',
            whiteSpace: 'nowrap',
            opacity: busy ? 0.6 : 1,
          }}
        >
          {busy ? 'Checking…' : 'Unlock'}
        </button>
      </form>
      {error && (
        <p style={{ fontSize: '13px', color: '#9B5A44', marginTop: '14px', fontFamily: 'var(--font-inter), sans-serif' }}>
          {error}
        </p>
      )}
      <p style={{ fontSize: '13px', color: '#6f675d', lineHeight: 1.7, marginTop: '20px', fontFamily: 'var(--font-inter), sans-serif' }}>
        Don&apos;t have a code yet?{' '}
        <a
          href="mailto:hello@example.com"
          style={{ color: '#9B5A44', textDecoration: 'none', borderBottom: '1px solid #9B5A44' }}
        >
          Get in touch
        </a>{' '}
        and become a client today.
      </p>
    </div>
  )
}
