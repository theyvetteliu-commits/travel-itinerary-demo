'use client'
import { motion } from 'framer-motion'
import SiteNav from './components/SiteNav'

export default function Home() {
  return (
    <main style={{ background: '#FBF6EF', fontFamily: 'var(--font-inter), -apple-system, sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .h-hero {
          min-height: 80vh;
          background: linear-gradient(135deg, #F4D9D4 0%, #F6E7D6 55%, #F8EFE2 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
          text-align: center;
          position: relative;
        }
        .h-h1 {
          font-family: var(--font-cormorant);
          font-size: clamp(2rem, 5.6vw, 4rem);
          white-space: nowrap;
          font-weight: 400;
          line-height: 1.08;
          color: #1C1714;
          margin-bottom: 18px;
        }
        .h-subtitle {
          font-family: var(--font-cormorant);
          font-size: 26px;
          font-weight: 400;
          color: #1C1714;
          margin-bottom: 44px;
        }
        .h-cta {
          font-size: 13px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #1C1714;
          border-bottom: 1px solid #9B5A44;
          padding-bottom: 2px;
          text-decoration: none;
          font-family: var(--font-inter);
        }
        .how {
          background: #FBF6EF;
          padding: 88px 32px 96px;
        }
        .how-inner { max-width: 660px; margin: 0 auto; }
        .how-eyebrow {
          font-family: var(--font-inter);
          font-size: 14px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9B5A44;
          margin-bottom: 22px;
        }
        .how-body {
          font-family: var(--font-cormorant);
          font-size: 22px;
          font-weight: 400;
          line-height: 1.55;
          color: #1C1714;
        }
        .how-contact {
          font-family: var(--font-inter);
          font-size: 15px;
          line-height: 1.7;
          color: #8D857A;
          margin-top: 30px;
        }
        .how-contact a {
          color: #9B5A44;
          text-decoration: none;
          border-bottom: 1px solid #9B5A44;
        }
        @media (max-width: 640px) {
          .how { padding: 64px 24px 72px; }
          .how-body { font-size: 20px; }
        }
      `}</style>

      <section className="h-hero">
        <SiteNav />
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          style={{ maxWidth: '900px' }}
        >
          <h1 className="h-h1">
            Your exact travel story,<br /><em>researched and handpicked</em>
          </h1>

          <p className="h-subtitle">What you see is worth your time.</p>

          <a
            href="mailto:hello@example.com?subject=Plan%20my%20trip"
            target="_blank"
            rel="noopener noreferrer"
            className="h-cta"
          >
            Plan your trip →
          </a>
        </motion.div>
      </section>

      <section className="how">
        <div className="how-inner">
          <p className="how-eyebrow">How it works</p>
          <p className="how-body">
            I filter the noise, aggregate what actually matters, and present only what deserves your time. Every recommendation is researched across 10+ luxury platforms and advisor networks, then curated specifically for your vision — never templated, never generic. <em>What you see is worth exploring.</em>
          </p>
          <p className="how-contact">
            Want to chat? Send me an email with your inquiries at{' '}
            <a href="mailto:hello@example.com">hello@example.com</a>.
          </p>
        </div>
      </section>
    </main>
  )
}
