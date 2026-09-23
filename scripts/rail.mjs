import { chromium } from 'playwright'
const b = await chromium.launch()
for (const w of [1900, 1280, 834]) {
  const p = await b.newPage({ viewport: { width: w, height: 900 } })
  await p.goto('http://localhost:3111/work/peak', { waitUntil: 'networkidle' })
  const scale = w / 1900
  console.log(`\n--- viewport ${w} (scale ${scale.toFixed(3)}) ---`)
  for (const designY of [0, 3250, 5000, 5800, 11000, 12300, 13970]) {
    await p.evaluate(y => window.scrollTo(0, y), designY * scale)
    await p.waitForTimeout(450)
    const r = await p.evaluate(() => {
      const n = document.querySelector('.rail .node')
      const f = document.querySelector('.frame').getBoundingClientRect()
      const box = n.getBoundingClientRect()
      return { screenTop: Math.round(box.top), color: getComputedStyle(n).color,
               designY: Math.round((box.top - f.top) / (f.width / 1900)) }
    })
    console.log(`scroll@${String(designY).padStart(5)}  rail screenTop=${String(r.screenTop).padStart(5)}  designY=${String(r.designY).padStart(6)}  ${r.color}`)
  }
  await p.close()
}
await b.close()
