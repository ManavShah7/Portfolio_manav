import { chromium } from 'playwright'

const PAGE = process.argv[2] || '/work/peak'
const b = await chromium.launch()

// 1. reduced motion / no JS must land on the finished page
{
  const p = await b.newPage({ viewport: { width: 1900, height: 900 }, reducedMotion: 'reduce' })
  await p.goto('http://localhost:3111' + PAGE, { waitUntil: 'networkidle' })
  const r = await p.evaluate(() => {
    const els = [...document.querySelectorAll('[data-rv]')]
    const off = els.filter(e => {
      const cs = getComputedStyle(e)
      if (+cs.opacity < 0.9 || cs.transform !== 'none') return true
      return [...e.querySelectorAll('.w')].some(w => getComputedStyle(w).transform !== 'none')
    })
    return { total: els.length, off: off.length, cls: document.documentElement.className }
  })
  console.log(`reduced motion: ${r.total} parts, ${r.off} not at final state  [${r.cls}]`)
  // a part on a box-less element can never animate, and poisons its block's trigger
  const ghosts = await p.evaluate(() => [...document.querySelectorAll('[data-rv]')]
    .filter(e => { const b = e.getBoundingClientRect()
                   return b.width === 0 || b.height === 0 || getComputedStyle(e).display === 'contents' })
    .map(e => `${e.tagName.toLowerCase()}[${e.dataset.rvBlock}]`))
  console.log(`box-less parts: ${ghosts.length}${ghosts.length ? '  <<< ' + ghosts.slice(0, 6).join(' ') : ''}`)
  await p.close()
}

const p = await b.newPage({ viewport: { width: 1900, height: 900 } })
await p.goto('http://localhost:3111' + PAGE, { waitUntil: 'networkidle' })
await p.evaluate(() => window.__lenis?.destroy())
await p.waitForTimeout(400)

// 2. how many blocks, and what each contains
const blocks = await p.evaluate(() => {
  const m = {}
  for (const e of document.querySelectorAll('[data-rv-block]')) {
    const b = e.dataset.rvBlock
    m[b] ??= {}
    m[b][e.dataset.rv] = (m[b][e.dataset.rv] || 0) + 1
  }
  return m
})
console.log(`\n${Object.keys(blocks).length} blocks:`)
for (const [k, v] of Object.entries(blocks)) console.log(`  ${k.padEnd(6)} ${JSON.stringify(v)}`)

// 3. watch one headline's lines come up, one after the next
const y = await p.evaluate(() => {
  const e = document.querySelector('[data-rv-block="pb"][data-rv="lines"]')
  return Math.round(window.scrollY + e.getBoundingClientRect().top)
})
await p.evaluate(v => window.scrollTo(0, v), y - 1400); await p.waitForTimeout(500)
const frames = await p.evaluate(async to => {
  window.scrollTo(0, to)
  const ws = [...document.querySelectorAll('[data-rv-block="pb"][data-rv="lines"] .w')]
  const body = document.querySelector('[data-rv-block="pb"][data-rv="rise"]')
  const out = []; const t0 = performance.now()
  return new Promise(res => { const tick = () => {
    out.push([Math.round(performance.now() - t0),
              ws.map(w => +new DOMMatrixReadOnly(getComputedStyle(w).transform).m42.toFixed(0)),
              +(+getComputedStyle(body).opacity).toFixed(2)])
    if (performance.now() - t0 < 1300) requestAnimationFrame(tick); else res(out) }
    requestAnimationFrame(tick) })
}, y - 700)
console.log('\nheadline lines (translateY px) + body opacity, ms after trigger:')
for (const [t, ws, op] of frames.filter((_, i) => i % 8 === 0))
  console.log(`  ${String(t).padStart(4)}ms   lines ${JSON.stringify(ws).padEnd(14)}  body ${op}`)
await b.close()
