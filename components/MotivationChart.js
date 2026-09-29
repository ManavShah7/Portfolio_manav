// The motivation/results curve on Peak's research card.
//
// It is a conceptual diagram, not measured data: one shared "level" axis from
// Low to High against time, carrying two series that cross. Both sit on the
// SAME scale, so there is one y axis - never two, which is the classic way to
// invent a correlation that is not in the data.
//
// Colours are the page's own: the orange Peak already uses for its warm
// gradient carries motivation - the thing that burns off - and the card's own
// teal carries results, the thing that compounds. Warm against cool separates
// under every kind of colour blindness, and the two differ in lightness too,
// so the crossing reads even in greyscale.
//
// Every word around the chart is HTML, not SVG <text>. SVG text is in user
// units and shrinks with the viewBox, and this card is only ~440px wide on a
// laptop - in-chart labels would set at 6-9px there. So the two series are
// named on the curves themselves with real text at real sizes, positioned
// from the same functions that draw them. Naming the lines in place is also
// what removes the legend: identity is never colour alone.
const WARM = '#E6813E'
const COOL = '#077B67'
const WARM_INK = '#BF6216' // the same hue, darkened until label text is legible on white

const W = 1000, H = 820
const L = 10, R = 990, T = 10, B = 810

const motivation = t => 0.18 + 0.82 * Math.exp(-3.2 * t)
const results = t => 0.04 + 0.88 / (1 + Math.exp(-9 * (t - 0.62)))

const X = t => L + t * (R - L)
const Y = v => B - v * (B - T)

const N = 200
const points = fn => {
  const p = []
  for (let i = 0; i <= N; i++) { const t = i / N; p.push([X(t), Y(fn(t))]) }
  return p
}
const d = p => 'M' + p.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join('L')
// the drawn length, so the line can draw itself in on entrance
const len = p => p.reduce((s, q, i) => i ? s + Math.hypot(q[0] - p[i - 1][0], q[1] - p[i - 1][1]) : 0, 0)
const area = p => `${d(p)}L${X(1).toFixed(1)},${B}L${X(0).toFixed(1)},${B}Z`

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

// A label anchored to its own curve and pushed off it by a distance in the
// chart's own units, not pixels - so the clearance survives any viewBox.
const at = (t, fn, dv) => ({ left: `${(X(t) / W) * 100}%`, top: `${(Y(fn(t) + dv) / H) * 100}%` })
const row = y => ({ top: `${(y / H) * 100}%` })

export default function MotivationChart() {
  return (
    <figure className="pk-chart">
      <div className="pk-chart-plot">
        <div className="pk-chart-box">
          <span className="pk-chart-tick pk-ck-y" style={row(T)}>High</span>
          <span className="pk-chart-tick pk-ck-y" style={row(B)}>Low</span>
          <span className="pk-chart-tick pk-ck-time">Time</span>
          <svg viewBox={`0 0 ${W} ${H}`} role="img"
               aria-label="Motivation starts high and falls away while results start low and rise. The two cross about half way along.">
            <defs>
              <linearGradient id="pkFillA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={WARM} stopOpacity=".16" />
                <stop offset="100%" stopColor={WARM} stopOpacity="0" />
              </linearGradient>
              <linearGradient id="pkFillB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={COOL} stopOpacity=".14" />
                <stop offset="100%" stopColor={COOL} stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* the frame is two hairlines, not a box: High and Low are the only
                two values worth drawing, and the labels sit on them */}
            <line x1={L} y1={T} x2={R} y2={T} className="pk-chart-rule" />
            <line x1={L} y1={B} x2={R} y2={B} className="pk-chart-base" />

            <path className="pk-chart-fill" d={area(A)} fill="url(#pkFillA)" />
            <path className="pk-chart-fill" d={area(Z)} fill="url(#pkFillB)" />

            <path className="pk-chart-line" style={{ '--len': len(A).toFixed(0) }}
                  d={d(A)} fill="none" stroke={WARM} strokeWidth="6" strokeLinecap="round" />
            <path className="pk-chart-line" style={{ '--len': len(Z).toFixed(0), '--dd': '.18s' }}
                  d={d(Z)} fill="none" stroke={COOL} strokeWidth="6" strokeLinecap="round" />

            {/* the one moment the card is about: results overtake motivation */}
            <circle className="pk-chart-x" cx={X(crossing).toFixed(1)} cy={Y(results(crossing)).toFixed(1)}
                    r="9" fill="#1D1D1F" stroke="#FFFFFF" strokeWidth="5" />
          </svg>

          <span className="pk-ck-s" style={{ ...at(0.30, motivation, 0.16), color: WARM_INK }}>Motivation</span>
          <span className="pk-ck-s" style={{ ...at(0.78, results, -0.18), color: COOL }}>Results</span>
        </div>
      </div>
    </figure>
  )
}
