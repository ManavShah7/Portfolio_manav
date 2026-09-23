import { chromium } from 'playwright'

// Fast guard for every page: under reduced motion nothing may be left hidden,
// and no reveal may sit on an element that generates no box.
const PAGES = process.argv.slice(2)
const b = await chromium.launch()
for (const path of PAGES) {
  const p = await b.newPage({ viewport: { width: 1900, height: 900 }, reducedMotion: 'reduce' })
  await p.goto('http://localhost:3111' + path, { waitUntil: 'domcontentloaded' })
  await p.waitForTimeout(700)
  const r = await p.evaluate(() => {
    const els = [...document.querySelectorAll('[data-rv]')]
    const off = els.filter(e => {
      const cs = getComputedStyle(e)
      if (+cs.opacity < 0.9 || cs.transform !== 'none') return true
      return [...e.querySelectorAll('.w')].some(w => getComputedStyle(w).transform !== 'none')
    })
    const ghost = els.filter(e => { const x = e.getBoundingClientRect()
      return x.width === 0 || x.height === 0 || getComputedStyle(e).display === 'contents' })
    const blocks = new Set(els.map(e => e.dataset.rvBlock).filter(Boolean))
    return { total: els.length, off: off.length, ghost: ghost.length, blocks: blocks.size }
  })
  const ok = r.off === 0 && r.ghost === 0
  console.log(`${path.padEnd(20)} ${String(r.total).padStart(3)} parts / ${r.blocks} blocks   hidden:${r.off}  box-less:${r.ghost}   ${ok ? 'ok' : '<<< FAIL'}`)
  await p.close()
}
await b.close()
