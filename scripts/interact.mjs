import { chromium } from 'playwright'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1900, height: 1000 } })
const path = process.argv[2] || '/work/peak'
await p.goto('http://localhost:3111' + path, { waitUntil: 'networkidle' })
const tracks = await p.$$('.track')
console.log('tracks:', tracks.length)
for (const [i, t] of tracks.entries()) {
  const before = await t.evaluate(e => e.scrollLeft)
  const can = await t.evaluate(e => e.scrollWidth - e.clientWidth)
  await p.$$eval('.paddle', (bs, i) => bs[i * 2 + 1].click(), i)
  await p.waitForTimeout(700)
  const after = await t.evaluate(e => e.scrollLeft)
  console.log(`track ${i}: scrollable=${can}px  scrollLeft ${before} -> ${after}`)
}
await b.close()
