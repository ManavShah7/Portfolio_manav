// The two graphics inside Peak's problem cards. The frame leaves both cards
// empty under their headings; these say what the headings claim.
//
// Built rather than sourced: they are UI, so they should be drawn in the
// page's own type and greys at the page's own scale (design units, so they
// hold proportion from 1900 down to a phone). Nothing here is an image.

// "Same Questions. Same Answers." - the onboarding form, three deep. The
// offset sheets behind the front one are the point: every app opens with this.
export function SameQuestions({ head, fields }) {
  return (
    <div className="pq" aria-hidden="true">
      <span className="pq-sheet pq-sheet-3" />
      <span className="pq-sheet pq-sheet-2" />
      <div className="pq-form">
        <span className="pq-head">{head}</span>
        {fields.map(f => (
          <span key={f.q} className="pq-row">
            <span className="pq-q">{f.q}</span>
            <span className="pq-a">{f.a}<i>{f.unit}</i></span>
          </span>
        ))}
      </div>
    </div>
  )
}

const Tick = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.4 8.6l3 3L12.6 5" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const Cross = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4.8 4.8l6.4 6.4M11.2 4.8l-6.4 6.4" stroke="currentColor" strokeWidth="2.2"
          strokeLinecap="round" />
  </svg>
)

// "No room to miss. No one to miss with." - one missed day takes the streak
// to zero, and there is nobody in the row underneath.
export function NoRoomToMiss({ label, was, now, days, state, friends }) {
  return (
    <div className="pq" aria-hidden="true">
      <div className="pq-streak">
        <span className="pq-q">{label}</span>
        <span className="pq-count"><s>{was}</s>{now}</span>
      </div>
      <div className="pq-week">
        {days.map((d, i) => (
          <span key={i} className={`pq-day is-${state[i]}`}>
            <i>{state[i] === 'done' ? <Tick /> : state[i] === 'miss' ? <Cross /> : null}</i>
            {d}
          </span>
        ))}
      </div>
      <div className="pq-alone">
        <span className="pq-slots">{[0, 1, 2].map(i => <span key={i} />)}</span>
        <span className="pq-q">{friends}</span>
      </div>
    </div>
  )
}

// The three phones standing on the problem card. Left as the mockup has them
// they are three blank white screens on a black card - which reads as three
// images that failed to load, not as "three apps everyday". So each one is
// drawn, and drawn as a *different* app: a logger, a ring, a step chart.
//
// No type anywhere. At 1440 these screens are about 130px wide, so any label
// would land under the 12px floor the guard enforces. At this size an app is
// its silhouette, which is the whole point being made.
//
// `cqw` throughout, off the screen's own width, so one set of rules holds from
// 1900 down to the phone breakpoint without a single media query.
export function PhoneApp({ n }) {
  return (
    <span className={`pa pa-${n}`} aria-hidden="true">
     {/* the padding has to sit on a child, not on the query container: a
         `cqw` written on the container itself resolves against the container
         ABOVE it - here the viewport - so 7cqw of side padding came out as
         100px on a 200px screen and squeezed every child to zero width. */}
     <span className="pa-in">
      <span className="pa-bar" />
      <span className="pa-title" />
      <span className="pa-body">
        {n === 1 && [0, 1, 2, 3, 4].map(i => (
          <span key={i} className="pa-row"><i /><em /></span>
        ))}
        {n === 2 && (
          <>
            <svg className="pa-ring" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="40" className="pa-ring-v" />
            </svg>
            <span className="pa-stats">{[0, 1, 2].map(i => <i key={i} />)}</span>
          </>
        )}
        {n === 3 && (
          <>
            <span className="pa-lede" />
            <span className="pa-bars">
              {[46, 72, 34, 88, 58, 26, 66].map((h, i) => (
                <i key={i} style={{ '--h': `${h}%` }} />
              ))}
            </span>
          </>
        )}
      </span>
     </span>
    </span>
  )
}
