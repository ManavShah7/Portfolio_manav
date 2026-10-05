import { Lines } from './Chrome'

// The first screen of a case study: eyebrow, the line, the facts as pills, and
// a hairline meta row under them. Built for Lighthouse and now shared, because
// Manav wants all four opening the same way.
//
// Absolutely positioned and vertically centred for the reason every hero on
// this site is: neither `overflow` nor a flex centre can go on .pin-first
// without re-scoping the view() timeline the film animates on.
export default function Lockup({ eyebrow, head, tags, meta, accent }) {
  return (
    <div className="lock">
      <div className="lock-copy" data-reveal>
        {eyebrow && <p className="p28 w500 lock-eyebrow">{eyebrow}</p>}
        <h1 className="p70 lock-head"><Lines lines={head} /></h1>
        {tags?.length > 0 && (
          <p className="lock-tags">
            {tags.map(t => <span key={t} className="p26 lock-tag">{t}</span>)}
          </p>
        )}
      </div>
      {meta?.length > 0 && (
        <div className="pin-credits lock-meta" data-reveal data-amp="70"
             style={accent ? { '--ac': accent } : undefined}>
          {meta.filter(m => m.value).map(m => (
            <div key={m.label} className="pin-credit">
              <span className="p20 pin-credit-label">{m.label}</span>
              <span className="p30 pin-credit-value">{m.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
