import { chromium } from 'playwright'
const PAGES = { home: '/', peak: '/work/peak', times: '/work/times-media' }
const b = await chromium.launch()
for (const [name, path] of Object.entries(PAGES)) {
  const ctx = await b.newContext({ viewport: { width: 1900, height: 1000 } })
  const p = await ctx.newPage()
  let bytes = 0, reqs = 0
  p.on('response', async r => {
    reqs++
    const l = r.headers()['content-length']
    if (l) bytes += +l
  })
  const t0 = Date.now()
  await p.goto('http://localhost:3111' + path, { waitUntil: 'networkidle' })
  const load = Date.now() - t0
  const a = await p.evaluate(() => {
    const tags = t => [...document.querySelectorAll(t)].length
    const imgs = [...document.querySelectorAll('img')]
    const heads = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => h.tagName)
    return {
      words: document.body.innerText.trim().split(/\s+/).length,
      h: { h1: tags('h1'), h2: tags('h2'), h3: tags('h3'), total: heads.length },
      landmarks: { main: tags('main'), nav: tags('nav'), header: tags('header'), footer: tags('footer'), article: tags('article'), section: tags('section') },
      imgs: imgs.length,
      imgsNoAlt: imgs.filter(i => !i.getAttribute('alt')).length,
      links: tags('a'),
      buttons: tags('button'),
      title: document.title,
      desc: document.querySelector('meta[name=description]')?.content || null,
      og: tags('meta[property^="og:"]'),
      canonical: !!document.querySelector('link[rel=canonical]'),
      lang: document.documentElement.lang || null,
      domNodes: document.querySelectorAll('*').length,
    }
  })
  console.log(`\n=== ${name.toUpperCase()} (${path}) ===`)
  console.log(` load ${load}ms   ${reqs} requests   ${(bytes/1024).toFixed(0)}KB declared   ${a.domNodes} DOM nodes`)
  console.log(` words ${a.words}   headings ${JSON.stringify(a.h)}   landmarks ${JSON.stringify(a.landmarks)}`)
  console.log(` imgs ${a.imgs} (${a.imgsNoAlt} without alt)   links ${a.links}   buttons ${a.buttons}`)
  console.log(` title "${a.title}"`)
  console.log(` description ${a.desc ? '"' + a.desc + '"' : 'MISSING'}   og tags ${a.og}   canonical ${a.canonical}   lang ${a.lang}`)
  await ctx.close()
}
await b.close()
