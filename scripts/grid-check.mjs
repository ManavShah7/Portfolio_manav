import { chromium } from 'playwright'

// Spacing guard. The frames are hand-placed and disagree with themselves; the
// pages are snapped to one grid per page in lib/grid.js. This measures what
// actually rendered and reports how many distinct left edges, card edges and
// centre axes a page ends up with - the numbers Manav asked to be brought down.
//
// Multi-column rows are legitimate - the Role/Duration/Skills row really does
// start three columns, and a two-up card row really does have two left edges.
// So the assertions are: every card ROW spans exactly L..R, the column every
// block starts from is L, and everything centred full-width shares one axis.
//
//   node scripts/grid-check.mjs <path>:<L>:<W>[:<centre>[:<fromY>]]
//
// `centre` overrides the expected centre axis, for a block centred on something
// other than its own measure. `fromY` ignores everything above it, for the home
// page, whose hero is still on the frame's own numbers above the About block.
const SNAP = 0.75

const group = xs => {
  const out = []
  for (const x of [...xs].sort((a, b) => a - b)) {
    if (!out.length || x - out.at(-1).at > SNAP) out.push({ at: x, n: 1 })
    else out.at(-1).n++
  }
  return out
}
const fmt = g => g.map(o => `${o.at.toFixed(1)}×${o.n}`).join('  ')

const b = await chromium.launch()
let bad = 0
for (const arg of process.argv.slice(2)) {
  const [path, Ls, Ws, Cs, Fs] = arg.split(':')
  const L0 = Number(Ls), W0 = Number(Ws), R0 = L0 + W0
  const C0 = Cs ? Number(Cs) : L0 + W0 / 2
  const FROM = Fs ? Number(Fs) : 0
  const p = await b.newPage({ viewport: { width: 1900, height: 1000 }, reducedMotion: 'reduce' })
  await p.goto('http://localhost:3111' + path, { waitUntil: 'networkidle' })
  await p.evaluate(() => document.fonts.ready)
  await p.waitForTimeout(400)

  const r = await p.evaluate(() => {
    const F = document.querySelector('.frame').getBoundingClientRect()
    const rel = e => { const r = e.getBoundingClientRect()
      return { x: r.x - F.x, y: r.y - F.y + window.scrollY, w: r.width, h: r.height,
               right: r.x - F.x + r.width } }
    // a device's own internals are not cards, and neither is anything in a track
    const skip = el => !!el.closest('.track') || !!el.closest('.ipadStage')
    const cards = [...document.querySelectorAll('.frame div')].filter(e => {
      const cs = getComputedStyle(e)
      return cs.position === 'absolute' && parseFloat(cs.borderRadius) >= 12 &&
             !e.classList.contains('node') && !skip(e)
    }).map(rel)
    const nodes = [...document.querySelectorAll('.frame .node')]
      .filter(n => !skip(n))
      .map(n => ({ ...rel(n), centred: getComputedStyle(n).textAlign === 'center' }))
    // a node belongs to a card only if it overlaps it in BOTH axes
    const free = nodes.filter(n => !cards.some(c =>
      n.x >= c.x - 2 && n.right <= c.right + 2 && n.y >= c.y - 2 && n.y <= c.y + c.h + 2))
    return {
      left:   free.filter(n => !n.centred).map(n => ({ x: n.x, y: n.y })),
      centre: free.filter(n =>  n.centred).map(n => ({ x: n.x + n.w / 2, y: n.y })),
      cards,
    }
  })
  r.left   = r.left.filter(o => o.y >= FROM).map(o => o.x)
  r.centre = r.centre.filter(o => o.y >= FROM).map(o => o.x)
  r.cards  = r.cards.filter(c => c.y >= FROM)

  // group cards into rows by y, then take each row's outer edges
  const rows = []
  for (const c of r.cards.sort((a, b) => a.y - b.y)) {
    const row = rows.find(x => Math.abs(x.y - c.y) < 40)
    if (row) { row.l = Math.min(row.l, c.x); row.r = Math.max(row.r, c.right) }
    else rows.push({ y: c.y, l: c.x, r: c.right })
  }

  const L = group(r.left), Cn = group(r.centre)
  const RL = group(rows.map(x => x.l)), RR = group(rows.map(x => x.r))
  const top = g => g.slice().sort((a, b) => b.n - a.n)[0]
  const near = (a, b) => Math.abs(a - b) <= SNAP

  const fails = []
  if (RL.length !== 1 || !near(RL[0].at, L0)) fails.push(`card rows start at ${fmt(RL)}, want ${L0}`)
  if (RR.length !== 1 || !near(RR[0].at, R0)) fails.push(`card rows end at ${fmt(RR)}, want ${R0}`)
  if (L.length && !near(top(L).at, L0)) fails.push(`main column is ${top(L).at}, want ${L0}`)
  if (Cn.length && !near(top(Cn).at, C0)) fails.push(`main centre axis is ${top(Cn).at}, want ${C0}`)
  const stray = L.filter(o => o.at < L0 - SNAP)
  if (stray.length) fails.push(`${stray.length} block(s) start left of the column: ${fmt(stray)}`)

  console.log(`\n${path}   grid L=${L0} W=${W0} R=${R0} C=${C0}`)
  console.log(`   left edges       ${String(L.length).padStart(2)}   ${fmt(L)}`)
  console.log(`   centre axes      ${String(Cn.length).padStart(2)}   ${fmt(Cn)}`)
  console.log(`   card-row left    ${String(RL.length).padStart(2)}   ${fmt(RL)}`)
  console.log(`   card-row right   ${String(RR.length).padStart(2)}   ${fmt(RR)}`)
  if (fails.length) { bad++; for (const f of fails) console.log('   FAIL ' + f) }
  else console.log('   ok')
  await p.close()
}
await b.close()
console.log(bad ? `\n${bad} page(s) off grid` : '\nevery page is on its grid')
process.exit(bad ? 1 : 0)
