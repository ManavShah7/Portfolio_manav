// Four small marks, one under each design pillar. Subtle on purpose: the
// pillars are principles, not features, so these say the shape of the idea
// rather than illustrate it. Drawn in the page's own greys and design units,
// like Peak's and Lighthouse's problem graphics - nothing here is an image.
//
// `kind` comes from the copy file, so the four are named rather than ordered
// by accident.
const MARKS = {
  // one line that reads, three that do not: clarity before anything else
  clarity: (
    <>
      <span className="lp-bar lp-bar-lit" />
      <span className="lp-bar" style={{ '--w': '72%' }} />
      <span className="lp-bar" style={{ '--w': '58%' }} />
    </>
  ),
  // the evidence row that comes before the sell
  proof: (
    <>
      <span className="lp-logo" /><span className="lp-logo" />
      <span className="lp-logo" /><span className="lp-logo" />
    </>
  ),
  // four ways out, or one
  path: (
    <>
      <span className="lp-lane" /><span className="lp-lane" />
      <span className="lp-lane" /><span className="lp-lane lp-lane-lit" />
    </>
  ),
  // the feature, and what it actually gets you
  // generic on purpose - the card's own copy already names the Liveasy
  // example, and repeating it verbatim underneath read as a typo
  outcome: (
    <>
      <span className="lp-was">What it does</span>
      <span className="lp-now">What it gets you</span>
    </>
  ),
}

export default function PillarMark({ kind }) {
  if (!MARKS[kind]) return null
  return <span className={`lp lp-${kind}`} aria-hidden="true">{MARKS[kind]}</span>
}
