// The two graphics inside Lighthouse's problem cards. Both cards used to be a
// heading and a line on a lot of white, which left them squat beside the photo
// card above them and made the argument on this page entirely verbal.
//
// Drawn, not sourced - the same decision Peak's problem cards make
// (components/PeakProblem.js): they are UI, so they are built in the page's
// own greens, greys and design units rather than dropped in as an image.

// "Same roadmap for everyone." - three different people, and the identical
// three steps handed to each of them. The repetition IS the point, so nothing
// here varies by row.
export function SameRoadmap({ steps }) {
  return (
    <div className="lq lq-road" aria-hidden="true">
      {[0, 1, 2].map(i => (
        <span key={i} className="lq-lane">
          <span className="lq-face" />
          <span className="lq-track">
            {steps.map(s => <span key={s} className="lq-step">{s}</span>)}
          </span>
        </span>
      ))}
    </div>
  )
}

// "Knowledge is everywhere." - every source at once, none of them ranked,
// none of them pointing anywhere. Laid out to read as scatter rather than as
// a list, which is the difference between information and direction.
export function Everywhere({ sources }) {
  return (
    <div className="lq lq-noise" aria-hidden="true">
      {sources.map((s, i) => (
        <span key={s} className="lq-chip" style={{ '--i': i }}>{s}</span>
      ))}
    </div>
  )
}
