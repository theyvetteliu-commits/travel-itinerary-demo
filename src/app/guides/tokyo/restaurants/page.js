import { cookies } from 'next/headers'
import SiteNav from '../../../components/SiteNav'
import UnlockGuides from '../../../components/UnlockGuides'
import guide from '../../../../data/guides/tokyo-restaurants.json'

export const metadata = {
  title: 'Tokyo Restaurants & Bars — yvetted City Guides',
}

// Live USD/JPY rate, cached daily. Falls back to 150 if the request fails.
async function getUsdJpy() {
  try {
    const r = await fetch('https://open.er-api.com/v6/latest/USD', { next: { revalidate: 86400 } })
    const d = await r.json()
    const jpy = d?.rates?.JPY
    if (jpy && jpy > 50 && jpy < 500) return jpy
  } catch {}
  return 150
}

// Recompute the "~$NNN USD" approximations from the ¥ amount at the live rate.
function applyForex(html, rate) {
  return html.replace(
    /¥([\d,]+)(~?(?:<br>)?\s*<span[^>]*>~?\$)(\d[\d,]*)(\s*USD)/g,
    (m, yen, mid, _old, tail) => {
      const j = parseInt(yen.replace(/,/g, ''), 10)
      const v = Math.round(j / rate / 5) * 5
      return '¥' + yen + mid + v.toLocaleString('en-US') + tail
    }
  )
}

function renderSection(s) {
  const eyebrow = s.eyebrow ? `<p class="sec-eyebrow ${s.eyebrowClass}">${s.eyebrow}</p>` : ''
  const desc = s.desc ? `<p class="sec-desc">${s.desc}</p>` : ''
  return `<section class="sec" id="${s.id}">
    <div class="sec-head">
      <div class="sec-head-left">
        ${eyebrow}
        <h2 class="sec-title">${s.title}</h2>
        ${desc}
      </div>
      <span class="sec-count">${s.count}</span>
    </div>
    ${s.cards.map((c) => c.html).join('\n')}
  </section>`
}

export default async function TokyoRestaurantsPage() {
  const cookieStore = await cookies()
  const authed = cookieStore.get('client_access')?.value === '1'
  const rate = await getUsdJpy()

  const free = guide.meta.freeCount
  const visible = []
  let shown = 0
  for (const s of guide.sections) {
    if (authed) {
      visible.push(s)
      continue
    }
    if (shown >= free) break
    const cards = s.cards.slice(0, free - shown)
    shown += cards.length
    visible.push({ ...s, cards })
  }

  const visibleIds = new Set(visible.filter((s) => s.cards.length).map((s) => s.id))
  let chrome = guide.chromeHtml
  if (!authed) {
    for (const s of guide.sections) {
      if (!visibleIds.has(s.id)) {
        chrome = chrome.split(`href="#${s.id}"`).join('href="#unlock"')
      }
    }
  }

  const sectionsHtml = visible.map(renderSection).join('\n')
  const remaining = guide.meta.total - shown
  const staticTop = applyForex(chrome + '\n' + sectionsHtml + '\n</div>', rate)
  const footerHtml = guide.footerHtml.replace('{{RATE}}', rate.toFixed(1))

  return (
    <>
      <link rel="stylesheet" href={guide.fontsHref} />
      <style dangerouslySetInnerHTML={{ __html: guide.css }} />
      <SiteNav />
      <div dangerouslySetInnerHTML={{ __html: staticTop }} />
      {!authed && <UnlockGuides remaining={remaining} />}
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </>
  )
}
