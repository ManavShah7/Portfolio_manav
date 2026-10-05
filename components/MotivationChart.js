// The motivation/results curve on Peak's research card.
//
// A conceptual diagram, not measured data: one shared level axis against time,
// carrying two series that cross. Both sit on the SAME scale, so there is one
// y axis - never two, which is the classic way to invent a correlation that is
// not in the data.
//
// The updated frame changes what the graphic is FOR. It used to show two
// curves crossing; now it names the gap between them - "Where people quit" -
// which is the sentence the card is actually making. So the band is the
// subject and the curves are its context, and the band's bounds are DERIVED
// from the curves rather than drawn by eye: it is the window where the two
// series are within `GAP` of each other, found by walking them.
//
// Every word around the chart is HTML, not SVG <text>. SVG text is in user
// units and shrinks with the viewBox; this card is only ~700px wide on a
// laptop and in-chart labels would set at 8-10px. So the series are named on
// the curves themselves, at real sizes, positioned from the same functions
// that draw them. Naming the lines in place is also what removes the legend:
// identity is never colour alone.
const MAG = '#D3058B'      // motivation - the page's own magenta
const GRN = '#0B8A3D'      // results - dark enough to label on white
const QUIT = '#D92B20'     // the band's ink

const W = 1000, H = 360
const L = 8, R = 992, T = 16, B = 320

// Both series are logistics, which is what the frame draws: motivation falls
// away as an S, results climb as one, and they cross once.
const motivation = t => 0.13 + 0.76 / (1 + Math.exp(11 * (t - 0.46)))
const results = t => 0.10 + 0.79 / (1 + Math.exp(-9.5 * (t - 0.60)))

const X = t => L + t * (R - L)
const Y = v => B - v * (B - T)

const N = 240
const points = fn => {
  const p = []
  for (let i = 0; i <= N; i++) { const t = i / N; p.push([X(t), Y(fn(t))]) }
  return p
}
const d = p => 'M' + p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L')
// the drawn length, so each line can draw itself in on entrance
const len = p => p.reduce((s, q, i) => i ? s + Math.hypot(q[0] - p[i - 1][0], q[1] - p[i - 1][1]) : 0, 0)

const A = points(motivation), Z = points(results)

// where the two swap places, found rather than guessed
const crossing = (() => {
  let lo = 0, hi = 1
  for (let i = 0; i < 60; i++) {
    const m = (lo + hi) / 2
    if (motivation(m) > results(m)) lo = m; else hi = m
  }
  return (lo + hi) / 2
})()

// The quit window: where the two series sit within GAP of one another -
// motivation already spent, results not yet visible. Walked off the curves, so
// it moves if either curve is ever retuned.
const GAP = 0.30
const band = (() => {
  let a = crossing, b = crossing
  const near = t => Math.abs(motivation(t) - results(t)) <= GAP
  while (a > 0 && near(a - 0.002)) a -= 0.002
  while (b < 1 && near(b + 0.002)) b += 0.002
  return [a, b]
})()

// A label anchored to its own curve and pushed off it by a distance in the
// chart's own units, not pixels - so the clearance survives any viewBox.
const at = (t, fn, dv) => ({ left: `${(X(t) / W) * 100}%`, top: `${(Y(fn(t) + dv) / H) * 100}%` })

export default function MotivationChart({ quit, from, to }) {
  const [b0, b1] = band
  return (
    <figure className="pk-chart">
      <div className="pk-chart-box">
        <svg viewBox={`0 0 ${W} ${H}`} role="img"
             aria-label={`Motivation starts high and falls away while results start low and rise. ${quit} is the window in the middle where the two are closest.`}>
          {/* the band first, so both curves draw over it */}
          <rect className="pk-chart-band"
                x={X(b0).toFixed(1)} y={T} width={(X(b1) - X(b0)).toFixed(1)} height={B - T}
                fill={QUIT} fillOpacity=".13" />
          <line x1={L} y1={B} x2={R} y2={B} className="pk-chart-base" />

          <path className="pk-chart-line" style={{ '--len': len(A).toFixed(0) }}
                d={d(A)} fill="none" stroke={MAG} strokeWidth="7" strokeLinecap="round" />
          <path className="pk-chart-line" style={{ '--len': len(Z).toFixed(0), '--dd': '.16s' }}
                d={d(Z)} fill="none" stroke={GRN} strokeWidth="7" strokeLinecap="round" />
        </svg>

        <span className="pk-ck-s" style={{ ...at(0.04, motivation, 0.17), color: MAG }}>Motivation</span>
        <span className="pk-ck-s pk-ck-end" style={{ ...at(0.97, results, 0.17), color: GRN }}>Results</span>
        <span className="pk-ck-s pk-ck-quit"
              style={{ left: `${((X(b0) + X(b1)) / 2 / W) * 100}%`, color: QUIT }}>{quit}</span>
      </div>
      <figcaption className="pk-chart-axis">
        <span className="pk-chart-tick">{from}</span>
        <span className="pk-chart-tick">{to}</span>
      </figcaption>
    </figure>
  )
}
