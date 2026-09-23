import { chromium } from 'playwright'

// Guard for the scroll-driven layer (data-sv, see app/globals.css).
//
// A CSS animation beats a normal declaration, so putting data-sv on an element
// that also carries data-rv="rise" or "card" silently kills the entrance: those
// set a transform on the element itself and the animation overwrites it.
// data-rv="lines" is fine - it transforms the inner spans, not the element.
//
// Also checks the obvious: that every data-sv element actually ended up with a
// running animation, and that reduced motion leaves all of them alone.
const b = await chromium.launch()
let bad = 0
for (const path of process.argv.slice(2)) {
  for (const rm of ['no-preference', 'reduce']) {
    const p = await b.newPage({ viewport: { width: 1900, height: 1000 }, reducedMotion: rm })
    await p.goto('http://localhost:3111' + path, { waitUntil: 'domcontentloaded' })
    await p.waitForTimeout(500)
    const r = await p.evaluate(() => {
      const els = [...document.querySelectorAll('[data-sv]')]
      return {
        n: els.length,
        clash: els.filter(e => ['rise', 'card'].includes(e.dataset.rv))
                  .map(e => `${e.dataset.sv} on data-rv="${e.dataset.rv}"`),
        dead: els.filter(e => getComputedStyle(e).animationName === 'none')
                 .map(e => e.dataset.sv),
        supported: CSS.supports('animation-timeline: view()'),
      }
    })
    const label = `${path}  ${rm}`
    if (rm === 'no-preference') {
      const fails = []
      if (r.clash.length) fails.push(`data-sv on a transforming data-rv: ${r.clash.join(', ')}`)
      if (r.supported && r.dead.length) fails.push(`${r.dead.length} data-sv with no animation`)
      console.log(`${label.padEnd(34)} ${String(r.n).padStart(2)} scroll-driven   ${fails.length ? 'FAIL ' + fails.join('; ') : 'ok'}`)
      if (fails.length) bad++
    } else {
      const live = r.n - r.dead.length
      console.log(`${label.padEnd(34)} ${String(live).padStart(2)} still animating ${live ? 'FAIL' : 'ok'}`)
      if (live) bad++
    }
    await p.close()
  }
}
await b.close()
console.log(bad ? `\n${bad} problem(s)` : '\nscroll-driven layer is sound')
process.exit(bad ? 1 : 0)
