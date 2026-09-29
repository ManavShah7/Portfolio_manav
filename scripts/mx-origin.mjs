import { chromium } from 'playwright'
import { PNG } from 'pngjs'
const lines = process.argv.slice(2)
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 2600, height: 600 } })
await p.setContent(`<body style="margin:0;background:#000">
<p id="t" style="margin:0;color:#fff;font-size:80px;line-height:1.05;font-weight:600;
   letter-spacing:-.02em;white-space:nowrap;text-align:center;
   font-family:-apple-system,system-ui,sans-serif;display:inline-block">
${lines.map(l => `<span style="display:block">${l}</span>`).join('')}</p></body>`)
const box = await p.evaluate(() => { const r = document.getElementById('t').getBoundingClientRect(); return { w: Math.ceil(r.width), h: Math.ceil(r.height) } })
const buf = await p.screenshot({ clip: { x: 0, y: 0, width: box.w, height: box.h } })
await b.close()
const png = PNG.sync.read(buf)
const { width: W, height: H, data } = png
const lum = (x, y) => data[(y * W + x) * 4]
let best = null
for (let y = 4; y < H - 4; y++) for (let x = 4; x < W - 4; x++) {
  let ok = true
  for (let dy = -4; dy <= 4 && ok; dy++) for (let dx = -4; dx <= 4; dx++) if (lum(x + dx, y + dy) < 250) { ok = false; break }
  if (!ok) continue
  const d = Math.hypot(x / W - 0.5, y / H - 0.5)
  if (!best || d < best.d) best = { x, y, d }
}
console.log(`box ${W}x${H}  origin ${best ? (best.x/W*100).toFixed(1)+'% '+(best.y/H*100).toFixed(1)+'%' : 'NONE'}`)
