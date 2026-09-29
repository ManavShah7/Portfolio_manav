// The guard for the responsive build. Run against a dev or production server:
//
//   node scripts/check.mjs [baseUrl]        (default http://localhost:3000)
//
// Every page, at a laptop, a tablet and a phone width, must:
//   - load with no console errors and no failed requests;
//   - never scroll sideways (nothing wider than the viewport);
//   - set no visible text below 12px - the canvas build rendered 5px on phones;
//   - leave nothing hidden after a normal read-through;
//   - leave nothing hidden after a FLICK. IntersectionObserver only reports
//     threshold crossings, so a hard scroll can carry a block past its trigger
//     inside one frame; components/Reveal.js sweeps once the scroll settles and
//     this proves the sweep works.
import { chromium } from 'playwright'

const BASE = process.argv[2] || 'http://localhost:3000'
const PAGES = ['/', '/about', '/work/peak', '/work/times-media', '/work/lighthouse', '/work/liveasy']
const WIDTHS = [[1440, 900], [1024, 768], [390, 844]]

const b = await chromium.launch()
let failed = 0
const fail = (where, msg) => { failed++; console.log(`  FAIL ${where}: ${msg}`) }

for (const path of PAGES) {
  for (const [w, h] of WIDTHS) {
    const where = `${path} @${w}`
    const p = await b.newPage({ viewport: { width: w, height: h } })
    const errs = []
    p.on('pageerror', e => errs.push(e.message))
    p.on('console', m => { if (m.type() === 'error') errs.push(m.text()) })
    p.on('response', r => { if (r.status() >= 400) errs.push(`${r.status()} ${r.url()}`) })
    await p.goto(BASE + path, { waitUntil: 'networkidle' })

    // a normal read-through
    const H = await p.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < H; y += Math.round(h * 0.6)) {
      await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60)
    }
    await p.waitForTimeout(1600)
    const r = await p.evaluate(() => {
      // Computed opacity, not the `.in` class. `.in` is a marker the driver
      // sets itself, so a bug that leaves an element transparent AFTER it
      // arrives is invisible to a class check - which is exactly what
      // happened when the follower cleared its inline opacity and fell back
      // to the hidden rule. What a visitor can see is the only honest test.
      const hidden = [...document.querySelectorAll('[data-reveal]')]
        .filter(e => parseFloat(getComputedStyle(e).opacity) < 0.9).length
      const wide = document.documentElement.scrollWidth - innerWidth
      let tiny = []
      const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
      while (walk.nextNode()) {
        const el = walk.currentNode.parentElement
        if (!walk.currentNode.textContent.trim() || !el.offsetWidth) continue
        const cs = getComputedStyle(el)
        if (cs.visibility === 'hidden' || cs.color === 'rgba(0, 0, 0, 0)' && !cs.backgroundClip.includes('text')) continue
        if (parseFloat(cs.fontSize) < 12) tiny.push(`${cs.fontSize} "${walk.currentNode.textContent.trim().slice(0, 30)}"`)
      }
      return { hidden, wide, tiny }
    })
    if (r.hidden) fail(where, `${r.hidden} entrance(s) never played`)
    if (r.wide > 1) fail(where, `page is ${r.wide}px wider than the viewport`)
    if (r.tiny.length) fail(where, `text below 12px: ${r.tiny.slice(0, 3).join(', ')}`)

    // the flick: straight to the bottom in one jump, from a fresh load
    await p.goto(BASE + path, { waitUntil: 'networkidle' })
    await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight))
    // long enough for a staggered group to finish: the fourth item in a group
    // waits 450ms for its turn and then fades for 800ms. The check is "left
    // invisible", not "not yet finished", so sampling at 900ms flagged the
    // last footer column while it was correctly still on its way in.
    await p.waitForTimeout(1800)
    const left = await p.evaluate(() =>
      [...document.querySelectorAll('[data-reveal]')].filter(e =>
        e.getBoundingClientRect().top < innerHeight
        && parseFloat(getComputedStyle(e).opacity) < 0.9).length)
    if (left) fail(where, `${left} block(s) left invisible after a flick`)

    if (errs.length) fail(where, errs.slice(0, 3).join(' | '))
    await p.close()
  }
  console.log(`${failed ? '…' : 'ok'} ${path}`)
}
await b.close()
console.log(failed ? `\n${failed} failure(s)` : '\nall clear')
process.exit(failed ? 1 : 0)
