import { chromium } from 'playwright'
const b = await chromium.launch()
for (const path of process.argv.slice(2)) {
  const p = await b.newPage({ viewport:{width:1900,height:1000}, reducedMotion:'reduce' })
  await p.goto('http://localhost:3111'+path, {waitUntil:'networkidle'})
  await p.evaluate(()=>document.fonts.ready); await p.waitForTimeout(400)
  const r = await p.evaluate(() => {
    const F=document.querySelector('.frame').getBoundingClientRect()
    const rel=e=>{const r=e.getBoundingClientRect();return{x:r.x-F.x,y:r.y-F.y+scrollY,w:r.width,h:r.height}}
    const cards=[...document.querySelectorAll('.frame div')].filter(e=>{
      const cs=getComputedStyle(e)
      return cs.position==='absolute'&&parseFloat(cs.borderRadius)>=20&&
             cs.backgroundColor!=='rgba(0, 0, 0, 0)'&&!e.classList.contains('node')}).map(rel)
    const out=[]
    for(const c of cards){
      const texts=[...document.querySelectorAll('.frame .node')].map(rel).filter(n=>
        n.x>=c.x-2&&n.x<=c.x+c.w&&n.y>=c.y-2&&n.y<=c.y+c.h)
      if(!texts.length) continue
      const pad=Math.min(...texts.map(t=>t.x-c.x))
      // widest actual ink run inside the card
      const spans=[...document.querySelectorAll('.frame .node span')].map(rel).filter(n=>
        n.x>=c.x-2&&n.x<=c.x+c.w&&n.y>=c.y-2&&n.y<=c.y+c.h)
      const widest=Math.max(0,...spans.map(s=>s.w))
      const avail=c.w-2*pad
      out.push({card:[Math.round(c.x),Math.round(c.y),Math.round(c.w)],pad:Math.round(pad),
                avail:Math.round(avail),widest:Math.round(widest),
                fill:avail>0?Math.round(100*widest/avail):0})
    }
    return out
  })
  console.log(path)
  for(const o of r) console.log('   card x'+o.card[0]+' y'+o.card[1]+' w'+o.card[2],
    ' pad',o.pad,' text area',o.avail,' widest line',o.widest,' fill '+o.fill+'%')
  await p.close()
}
await b.close()
