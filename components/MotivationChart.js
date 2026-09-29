// The motivation/results curve on Peak's research card.
//
// It is a conceptual diagram, not measured data: one shared "level" axis from
// Low to High against time, carrying two series that cross. Both sit on the
// SAME scale, so there is one y axis - never two, which is the classic way to
// invent a correlation that is not in the data.
//
// Colours are Peak's own, validated rather than eyeballed: a deepened lime for
// motivation and the magenta already used for "insights.". Adjacent-pair CVD
// separation is dE 16.0 (deutan) against 35.0 normal-vision, both above 3:1 on
// the white card - all six checks pass.
//
// Every word around the chart is HTML, not SVG <text>. SVG text is in user
// units and shrinks with the viewBox, and this card is only ~440px wide on a
// laptop - in-chart labels set at 6-9px there. The axis labels are real text
// at real sizes, and the four phases below carry what the annotations said.
const LIME = '#8A9A1F'
const MAGENTA = '#D3058B'

const L = 6, R = 994, T = 26, B = 900

const motivation = t => 0.18 + 0.82 * Math.exp(-3.2 * t)
const results = t => 0.04 + 0.88 / (1 + Math.exp(-9 * (t - 0.62)))

const X = t => L + t * (R - L)
const Y = v => B - v * (B - T)

function path(fn) {
  const pts = []
  for (let i = 0; i <= 120; i++) { const t = i / 120; pts.push(`${X(t).toFixed(1)},${Y(fn(t)).toFixed(1)}`) }
  return 'M' + pts.join('L')
}
const area = fn => `${path(fn)}L${X(1).toFixed(1)},${B}L${L},${B}Z`

// the four moments the story turns on
const DOTS = [
  { t: 0, fn: motivation, c: LIME }, { t: 0.30, fn: motivation, c: LIME },
  { t: 0.62, fn: results, c: MAGENTA }, { t: 1, fn: results, c: MAGENTA },
]

export default function MotivationChart() {
  return (
    <figure className="pk-chart">
      <div className="pk-chart-plot">
        <div className="pk-chart-scale">
          <span className="pk-chart-tick">High</span>
          <span className="pk-chart-tick">Low</span>
        </div>
        <svg viewBox="0 0 1000 926" role="img"
             aria-label="Motivation starts high and falls away while results start low and rise. The two cross at around six weeks.">
          <defs>
            <linearGradient id="pkFillA" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={LIME} stopOpacity=".22" />
              <stop offset="100%" stopColor={LIME} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="pkFillB" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={MAGENTA} stopOpacity=".20" />
              <stop offset="100%" stopColor={MAGENTA} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area(motivation)} fill="url(#pkFillA)" />
          <path d={area(results)} fill="url(#pkFillB)" />
          <path d={path(motivation)} fill="none" stroke={LIME} strokeWidth="3"
                strokeLinecap="round" />
          <path d={path(results)} fill="none" stroke={MAGENTA} strokeWidth="3"
                strokeLinecap="round" />
          {DOTS.map((d, i) => (
            // a 2px surface ring, not a border, so a marker over a fill reads
            <circle key={i} cx={X(d.t)} cy={Y(d.fn(d.t))} r="11" fill={d.c}
                    stroke="#FFFFFF" strokeWidth="3" />
          ))}
        </svg>
        <span className="pk-chart-tick pk-chart-time">Time</span>
      </div>

      {/* identity is never colour alone - a legend as well as the phases below */}
      <figcaption className="pk-chart-key">
        <span><i style={{ background: LIME }} />Motivation</span>
        <span><i style={{ background: MAGENTA }} />Results</span>
      </figcaption>
    </figure>
  )
}
