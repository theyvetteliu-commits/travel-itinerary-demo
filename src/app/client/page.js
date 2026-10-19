'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SiteNav from '../components/SiteNav'

export default function ClientPage() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
    const data = await res.json()
    if (res.ok && data.slug) {
      router.push(`/trips/${data.slug}`)
    } else {
      setError(data.error || 'Code not recognised. Please check with Yvette.')
      setTimeout(() => setError(''), 3500)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F4D9D4 0%, #F6E7D6 55%, #F8EFE2 100%)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      <style>{`
        @media (max-width: 640px) {
          .client-form { padding: 32px 20px !important; }
        }
      `}</style>

      <SiteNav />

      {/* ── PASSCODE FORM ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        textAlign: 'center',
      }}>

        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '11px',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#9B5A44',
          marginBottom: '16px',
        }}>
          Welcome
        </p>

        <h1 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: '54px',
          fontWeight: 400,
          color: '#1C1714',
          lineHeight: 1.08,
          marginBottom: '14px',
        }}>
          Your trip awaits.
        </h1>

        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '15px',
          color: '#8D857A',
          lineHeight: 1.85,
          maxWidth: '340px',
          marginBottom: '44px',
        }}>
          Use the access code from your welcome message to continue.
        </p>

        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '14px',
          width: '100%',
          maxWidth: '360px',
        }}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter code"
            autoComplete="off"
            style={{
              width: '100%',
              border: '0.5px solid #C4A898',
              background: 'rgba(255,255,255,0.7)',
              padding: '14px 20px',
              fontSize: '15px',
              color: '#1C1714',
              outline: 'none',
              fontFamily: 'var(--font-inter)',
              letterSpacing: '0.1em',
              textAlign: 'center',
            }}
          />

          {error && (
            <p style={{
              fontSize: '13px',
              color: '#9B5A44',
              fontFamily: 'var(--font-inter)',
              letterSpacing: '0.04em',
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              background: '#1C1714',
              color: '#FBF6EF',
              border: 'none',
              padding: '13px 40px',
              fontSize: '11px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-inter)',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Access Details →
          </button>
        </form>

      </div>
    </main>
  )
}
