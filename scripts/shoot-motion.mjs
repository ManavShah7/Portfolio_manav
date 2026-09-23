import { chromium } from 'playwright'

// Like shoot.mjs, but with motion ON and every reveal forced to its end state -
// which is the only way to screenshot the band clips, since scripts/shoot.mjs
// runs under prefers-reduced-motion and that hides them.
//
//   node scripts/shoot-motion.mjs <url> <out> <pageHeight> <topY> <bottomY>
const [url, out, height, top, bot] = process.argv.slice(2)
const b = await chromium.launch(['--autoplay-policy=no-user-gesture-required'])
const p = await b.newPage({ viewport:{width:1900,height:1000}, deviceScaleFactor:1,
                            reducedMotion:'no-preference' })
await p.goto(url, {waitUntil:'networkidle'})
await p.evaluate(()=>document.fonts.ready)
await p.setViewportSize({width:1900, height: Math.min(Number(height), 4000)})
// let the clips decode a frame, and force every reveal to its final state
await p.evaluate(()=>{ for (const v of document.querySelectorAll('video')) { v.currentTime = 1; v.play().catch(()=>{}) }
                       for (const e of document.querySelectorAll('[data-rv]')) e.classList.add('in') })
await p.waitForTimeout(2500)
await p.screenshot({ path: out, fullPage: true, clip: { x:0, y:Number(top), width:1900, height:Number(bot)-Number(top) } })
await b.close()
console.log('shot', out)
