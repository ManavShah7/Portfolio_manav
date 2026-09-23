import fs from 'node:fs'

// Lists every media slot: where to drop the file and what size to export it at.
// Sizes are at 2x, which is what the page renders at on a retina screen. Either a
// clip (.mp4/.webm) or a still (.png/.webp/.jpg) works in any slot.
const PAGES = {
  home:      'app/page.js',
  peak:      'app/work/peak/page.js',
  times:     'app/work/times-media/page.js',
  lighthouse:'app/work/lighthouse/page.js',
  liveasy:   'app/work/liveasy/page.js',
}
const N = '-?\\d+(?:\\.\\d+)?'
const rows = []
for (const [page, file] of Object.entries(PAGES)) {
  const src = fs.readFileSync(file, 'utf8')
  // full-bleed cover band
  for (const m of src.matchAll(new RegExp(`<Cover\\b[^>]*?h=\\{(${N})\\}[^>]*?clip=\\{V\\('([\\w-]+)'\\)\\}`, 'gs')))
    rows.push({ page, name: m[2], w: 1900, h: Number(m[1]), kind: 'full-bleed band' })
  // a coloured band whose background is a clip
  for (const m of src.matchAll(new RegExp(`<MediaBand\\b[^>]*?h=\\{(${N})\\}[^>]*?clip=\\{V\\('([\\w-]+)'\\)\\}`, 'gs')))
    rows.push({ page, name: m[2], w: 1900, h: Number(m[1]), kind: 'band background' })
  // the iPad on the home page, whose media goes inside the screen
  for (const m of src.matchAll(new RegExp(`<IPad\\b([\\s\\S]*?)/>`, 'g'))) {
    const b = m[1]
    const one = b.match(/clip=\{V\('([\w-]+)'\)\}/)
    if (one) rows.push({ page, name: one[1], w: 1044.5, h: 651, kind: 'inside the iPad screen' })
  }
  // device frames
  for (const m of src.matchAll(new RegExp(`<Shot\\b([\\s\\S]*?)/>`, 'g'))) {
    const b = m[1]
    const w = b.match(new RegExp(`\\bw=\\{(${N})\\}`)), h = b.match(new RegExp(`\\bh=\\{(${N})\\}`))
    const one = b.match(/clip=\{V\('([\w-]+)'\)\}/)
    const many = b.match(/clip=\{V\(\['([\w-]+)', '([\w-]+)'\]\[i\]\)\}/)
    const png = (b.match(/src="([^"]+)"/) || [])[1] || ''
    const frame = png.split('/').pop().replace('.png', '')
    if (!w || !h) continue
    for (const nm of many ? [many[1], many[2]] : one ? [one[1]] : [])
      rows.push({ page, name: nm, w: Number(w[1]), h: Number(h[1]), kind: frame })
  }
}
const pad = (s, n) => String(s).padEnd(n)
console.log(pad('DROP THE FILE AT  (.mp4 or .png)', 42) + pad('EXPORT AT (2x)', 16) + pad('ASPECT', 9) + 'REPLACES')
console.log('-'.repeat(96))
let last = null
for (const r of rows) {
  if (last && last !== r.page) console.log('')
  last = r.page
  const found = ['mp4','webm','png','webp','jpg','jpeg']
    .find(e => fs.existsSync(`public/media/${r.page}-${r.name}.${e}`))
  const have = found ? `  <- ${r.page}-${r.name}.${found} is in place` : ''
  console.log(pad(`public/media/${r.page}-${r.name}.*`, 42) +
              pad(`${Math.round(r.w * 2)} x ${Math.round(r.h * 2)}`, 16) +
              pad((r.w / r.h).toFixed(2) + ':1', 9) + r.kind + have)
}
console.log(`\n${rows.length} slots, all under ${process.cwd()}/public/media/`)
console.log('Anything not dropped stays the placeholder frame it is now.')
