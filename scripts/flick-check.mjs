import { chromium } from 'playwright'

// A fast flick must not leave content invisible.
//
// IntersectionObserver only reports a threshold CROSSING. Scroll hard enough
// and a block goes from below the trigger to above the viewport inside one
// frame - ratio 0 before, 0 after, no entry delivered, entrance never fires,
// and the copy sits at opacity 0 for good. MotionDriver's settle sweep is what
// catches that; this asserts the sweep is doing its job.
const HIDDEN = `(() => {
  const out=[]
  for(const e of document.querySelectorAll('[data-rv]')){
    if(e.dataset.rv==='lines'){
      const w=e.querySelector('.w'); if(!w) continue
      const t=getComputedStyle(w).transform
      if(t!=='none'&&t!=='matrix(1, 0, 0, 1, 0, 0)')
        out.push('['+e.dataset.rvBlock+'] '+(e.textContent||'').trim().slice(0,40))
    } else if(+getComputedStyle(e).opacity<0.05)
      out.push('['+e.dataset.rvBlock+'] '+(e.textContent||'').trim().slice(0,40))
  }
  return out })()`

const PAGES = ['/', '/work/peak', '/work/times-media', '/work/lighthouse', '/work/liveasy']
const b = await chromium.launch()
let bad = 0
for (const path of PAGES) {
  const p = await b.newPage({ viewport: { width: 1512, height: 900 } })
  await p.goto('http://localhost:3111' + path, { waitUntil: 'networkidle' })
  await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400)
  const H = await p.evaluate(() => document.documentElement.scrollHeight)
  const flick = async step => {
    for (let y = 0; y < H; y += step) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(20) }
    await p.evaluate(() => scrollTo(0, document.documentElement.scrollHeight))
    await p.waitForTimeout(2200)
    return p.evaluate(HIDDEN)
  }
  const a = await flick(2500)
  for (let y = H; y > 0; y -= 500) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(40) }
  const c = await flick(2200)
  const n = a.length + c.length
  bad += n
  console.log(`  ${path.padEnd(20)} flick:${String(a.length).padStart(3)}  after rewind:${String(c.length).padStart(3)}  ${n ? 'FAIL' : 'ok'}`)
  if (n) [...a, ...c].slice(0, 5).forEach(x => console.log('      ' + x))
  await p.close()
}
await b.close()
console.log(bad ? `\n${bad} elements left invisible` : '\nnothing is left invisible by a fast scroll')
process.exit(bad ? 1 : 0)
