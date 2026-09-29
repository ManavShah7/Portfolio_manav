import Link from 'next/link'

import { Video } from './Media'
import { Chev, EMAIL } from './Chrome'
import { media } from '@/lib/clips'
import { next } from '@/lib/work'

// The pinned hero that opens every case study (apple.com/apple-tv, Vision Pro):
// the film is sticky and holds for the length of the section, the product name
// sits on it for the first screen, and the opening lines then scroll up over
// the film at 1:1 while a flat black scrim darkens it on a linear ramp.
// The credit row on the film's first screen: who, what they did, how long.
// Left-aligned to the intro copy above it and sitting on a hairline, so it
// reads as a caption on the film rather than a panel over it.
function Credits({ items }) {
  return (
    <div className="pin-credits" data-reveal>
      {items.map(c => (
        <div key={c.label} className="pin-credit">
          <span className="p20 pin-credit-label">{c.label}</span>
          <span className="p30 pin-credit-value">{c.value}</span>
        </div>
      ))}
    </div>
  )
}

export function CaseHero({ clip, name, kind, fill, credits, className = '', children }) {
  const still = clip?.poster || (clip && !clip.video ? clip.src : undefined)
  return (
    <section className={`pin ${className}`}>
      <div className="pin-stage">
        <div className="pin-still"
             style={still ? { backgroundImage: `url(${still})` } : fill ? { background: fill } : undefined} />
        {clip?.video && <Video src={clip.src} poster={clip.poster} eager />}
        <div className="pin-scrim" />
      </div>
      <div className="pin-first">
        {credits && <Credits items={credits} />}
        {/* a page can open on the film alone - Peak's frame has no title on it */}
        {name && (
          <div className="wrap pin-title">
            <p className="t-eyebrow on-dark-2">{kind}</p>
            <h1 className="t-hero">{name}</h1>
          </div>
        )}
      </div>
      <div className="wrap pin-copy">{children}</div>
    </section>
  )
}

// The foot of every case study: the next one, as a full-width tile carrying
// its own film, and a way to get in touch.
export function NextProject({ slug }) {
  const n = next(slug)
  const clip = n.clip ? media(n.clip) : null
  return (
    <section className="section end">
      <div className="wrap">
        <Link href={`/work/${n.slug}`} className="tile tile-next" style={{ '--accent': n.accent }} data-reveal>
          <div className="tile-media"
               style={clip ? { background: `url(${clip.poster}) center/cover no-repeat` } : undefined}>
            {clip?.video && <Video src={clip.src} poster={clip.poster} />}
          </div>
          <div className="tile-copy">
            <span className="t-eyebrow tile-kind">Next project</span>
            <h2 className="t-display">{n.name}</h2>
            <p className="t-body-lg tile-line">{n.line}</p>
            <span className="t-body tile-cta">Read the case study <Chev /></span>
          </div>
        </Link>
        <div className="case-contact" data-reveal>
          <p className="t-head">Have something worth building?</p>
          <a href={EMAIL} className="btn">Get in touch</a>
        </div>
      </div>
    </section>
  )
}

// Line icons in the SF Symbols manner, for cards that have no screenshot yet.
const PATHS = {
  catalog: 'M14 12h28M14 24h28M14 36h18M6 12h.01M6 24h.01M6 36h.01',
  type: 'M4 14h40v22H4zM10 21h2M16 21h2M22 21h2M28 21h2M34 21h2M13 29h22',
  scan: 'M4 14V8a4 4 0 0 1 4-4h6M34 4h6a4 4 0 0 1 4 4v6M44 34v6a4 4 0 0 1-4 4h-6M14 44H8a4 4 0 0 1-4-4v-6M14 16h20M14 24h20M14 32h12',
  barcode: 'M6 8v32M12 8v32M17 8v32M24 8v32M29 8v32M36 8v32M42 8v32',
}
export function Glyph({ name, color = 'currentColor', size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true"
         style={{ fill: 'none', stroke: color, strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
      <path d={PATHS[name]} />
    </svg>
  )
}
