import { chromium } from 'playwright'

// Composed pages have no export to diff against, so the guard is geometric:
// nothing may run past the frame, and nothing printed on a card may leave it.
const path = process.argv[2]
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1900, height: 1000 }, reducedMotion: 'reduce' })
await p.goto('http://localhost:3111' + path, { waitUntil: 'networkidle' })
await p.evaluate(() => document.fonts.ready)
await p.waitForTimeout(500)

const out = await p.evaluate(() => {
  const frame = document.querySelector('.frame')
  const F = frame.getBoundingClientRect()
  const rel = e => { const r = e.getBoundingClientRect()
    return { x: r.x - F.x, y: r.y - F.y + window.scrollY, w: r.width, h: r.height } }

  const nodes = [...frame.querySelectorAll('.node')].map(e => ({
    ...rel(e), text: (e.textContent || '').slice(0, 42),
    inTrack: !!e.closest('.track'),
  }))
  // cards are the rounded rects that carry a background
  const cards = [...frame.querySelectorAll('div')].filter(e => {
    const cs = getComputedStyle(e)
    return cs.position === 'absolute' && parseFloat(cs.borderRadius) >= 20 &&
           cs.backgroundColor !== 'rgba(0, 0, 0, 0)' && !e.classList.contains('node')
  }).map(rel)

  const offFrame = nodes.filter(n => !n.inTrack && (n.x < 0 || n.x + n.w > 1900))
  const overflow = []
  for (const n of nodes) {
    // the card this text sits on, if any
    const c = cards.find(c => n.x >= c.x - 2 && n.x <= c.x + c.w + 2 &&
                              n.y >= c.y - 2 && n.y <= c.y + c.h + 2)
    if (!c) continue
    if (n.x + n.w > c.x + c.w - 8 || n.y + n.h > c.y + c.h - 8)
      overflow.push({ text: n.text, node: [Math.round(n.x), Math.round(n.y), Math.round(n.w), Math.round(n.h)],
                      card: [Math.round(c.x), Math.round(c.y), Math.round(c.w), Math.round(c.h)] })
  }
  return { count: nodes.length, cards: cards.length, offFrame, overflow,
           maxRight: Math.round(Math.max(...nodes.filter(n => !n.inTrack).map(n => n.x + n.w))) }
})

console.log(path, '-', out.count, 'text nodes,', out.cards, 'cards; rightmost ink x =', out.maxRight)
if (out.offFrame.length) { console.log('  RUNS OFF THE FRAME:')
  for (const n of out.offFrame) console.log('   ', Math.round(n.x), '+', Math.round(n.w), '->', Math.round(n.x + n.w), JSON.stringify(n.text)) }
if (out.overflow.length) { console.log('  LEAVES ITS CARD:')
  for (const o of out.overflow) console.log('   ', JSON.stringify(o.text), 'node', o.node, 'card', o.card) }
if (!out.offFrame.length && !out.overflow.length) console.log('  fits')
await b.close()
