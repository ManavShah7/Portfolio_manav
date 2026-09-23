import { chromium } from 'playwright'
const b = await chromium.launch()
for (const w of [2200, 1900, 1280, 390]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } })
  await p.goto('http://localhost:3111/work/peak', { waitUntil: 'networkidle' })
  const over = await p.evaluate(() => ({
    docW: document.documentElement.scrollWidth, winW: window.innerWidth,
    lenis: !!window.__lenis,
  }))
  // one wheel tick, then sample scrollY over ~600ms: eased = many distinct values
  await p.mouse.move(w / 2, 450)
  await p.mouse.wheel(0, 600)
  const samples = []
  for (let i = 0; i < 12; i++) { samples.push(await p.evaluate(() => Math.round(window.scrollY))); await p.waitForTimeout(50) }
  const distinct = new Set(samples).size
  console.log(`w=${w} docW=${over.docW} (win ${over.winW}) lenis=${over.lenis} overflowX=${over.docW > over.winW} eased-steps=${distinct} -> ${samples[0]}..${samples.at(-1)}`)
  await p.close()
}
await b.close()
