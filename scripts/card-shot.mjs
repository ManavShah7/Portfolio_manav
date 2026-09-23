// Capture one carousel card at 2x so it can be diffed against the frame it was
// exported from. The cards past the first are clipped by the track, so they
// never appear in a whole-page shot - the track has to be scrolled first.
//
//   node scripts/card-shot.mjs <url> <trackTopDesignPx> <index> <step> <w> <h> <out>
import { chromium } from 'playwright'

const [url, top, index, step, w, h, out] = process.argv.slice(2)
const T = Number(top), I = Number(index), S = Number(step)
const W = Number(w), H = Number(h)

const browser = await chromium.launch()
const page = await browser.newPage({
  viewport: { width: 1900, height: 1000 },
  deviceScaleFactor: 2,
  reducedMotion: 'reduce',
})
await page.goto(url, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
await page.setViewportSize({ width: 1900, height: 4600 })

// pick the track whose top matches, then jump it to the card with no animation
const box = await page.evaluate(([T, I, S]) => {
  const tracks = [...document.querySelectorAll('.track')]
  const el = tracks.find(t => Math.abs(parseFloat(t.style.top) - T) < 1)
  if (!el) throw new Error('no track at top ' + T)
  el.style.scrollBehavior = 'auto'
  el.scrollLeft = I * S
  // the last card cannot sit flush left - the track clamps - so the card's own
  // offset has to come from the scroll position the track actually took
  const r = el.getBoundingClientRect()
  return { x: r.x + window.scrollX + (I * S - el.scrollLeft),
           y: r.y + window.scrollY, scroll: el.scrollLeft }
}, [T, I, S])

await page.waitForTimeout(400)
await page.screenshot({ path: out, fullPage: true,
                        clip: { x: box.x, y: box.y, width: W, height: H } })
await browser.close()
console.log('shot', out, 'at', box.x, box.y)
