import BRANDS from '@/lib/brand-icons'
import S from '@/lib/styles'
import { inkOffset, sideBearing } from '@/lib/type'

// Text is authored by the ink position measured off the export - the top-left
// of the actual pixels, not of the line box. Both differ from the CSS box by an
// amount that depends on the glyphs on the line, so it is computed, not guessed.
// Entrance annotations, read by MotionDriver:
//   rv     'lines' | 'rise' | 'card'  - which entrance this part performs
//   block  parts sharing a block share one trigger and perform together
//   at     this part's delay, in ms, within its block
function rvProps(rv, block, at) {
  if (!rv) return {}
  return { 'data-rv': rv,
           ...(block ? { 'data-rv-block': block } : {}),
           ...(at ? { 'data-at': at } : {}) }
}

export function T({ x, y, lines, s, align = 'left', w, color, className, style,
                    as: Tag = 'div', rv, block, at, ref, ...rest }) {
  const st = typeof s === 'string' ? S[s] : s
  const first = Array.isArray(lines) ? lines[0] : lines
  const rows = Array.isArray(lines) ? lines : [lines]
  const top = y - inkOffset(first, st)
  const box = { position: 'absolute', top, fontSize: st.size, fontWeight: st.weight,
                lineHeight: `${st.lh}px`, color: color || st.color, ...style }
  if (align === 'center') {
    box.left = x - (w || 0) / 2
    box.width = w
    box.textAlign = 'center'
  } else if (align === 'right') {
    box.left = x - (w || 0)
    box.width = w
    box.textAlign = 'right'
  } else {
    box.left = x - sideBearing(first, st)
  }
  return (
    <Tag ref={ref} className={`node${className ? ' ' + className : ''}`} style={box}
         {...rvProps(rv, block, at)} {...rest}>
      {rows.map((l, i) => rv === 'lines'
        // .ln clips, .w slides up from under it. The padding/margin pair keeps
        // the clip box off the glyphs without moving the layout by a hair.
        ? <span className="ln" key={i}><span className="w">{l}</span></span>
        : <span key={i}>{l}</span>)}
    </Tag>
  )
}

export function Rect({ x, y, w, h, r = 20, fill, style, rv, block, at, children, ...rest }) {
  return (
    <div {...rvProps(rv, block, at)} {...rest}
         style={{ position: 'absolute', left: x, top: y, width: w, height: h,
                  borderRadius: r, background: fill, ...style }}>{children}</div>
  )
}

export function Img({ x, y, w, h, src, alt = '', href, label, rv, block, at, className, ...rest }) {
  // Deliberately a raw <img>: these are slices cut straight out of the 2x Figma
  // export at exact design-px sizes, and next/image would re-encode and pick its
  // own widths, which is the one thing this page cannot tolerate.
  const box = { position: 'absolute', left: x, top: y, width: w, height: h }
  // The link has to carry the box: an <a> wrapped round an absolutely
  // positioned <img> collapses to zero size and cannot be clicked. Whichever
  // element carries the box also carries the reveal - never put data-rv on a
  // wrapper that generates no box, or the entrance silently does nothing and
  // the block picks it as a zero-sized trigger.
  if (href) {
    return (
      <a href={href} aria-label={label} {...rvProps(rv, block, at)} style={box}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={className} {...rest}
             style={{ display: 'block', width: '100%', height: '100%' }} />
      </a>
    )
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className}
              {...rvProps(rv, block, at)} {...rest} style={box} />
}

// A device frame, or the clip that replaces it.
//
// Video goes in as a whole-frame replacement, not composited inside the bezel:
// the screen rectangles in these PNGs cannot be detected reliably (the macbook
// wallpaper and the dark phone screens defeat every edge test), and a clip
// misaligned by a few px inside a bezel looks broken. So a slot is one file
// occupying exactly the box the still occupied - which is also what a device
// mockup exports from Figma or Rotato already looks like.
//
// `clip` is resolved at build time by the page, which is a server component and
// can touch the filesystem; until the file exists this is just the <img>.
export function Shot({ x, y, w, h, src, clip, alt = '', rv, block, at, className, ...rest }) {
  const box = { position: 'absolute', left: x, top: y, width: w, height: h }
  if (!clip) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={className}
                {...rvProps(rv, block, at)} {...rest} style={box} />
  }
  // The wrapper carries the box, the reveal AND the still as its background, so
  // that when `.shotVideo` is switched off for prefers-reduced-motion there is
  // something behind it rather than a hole. Putting the reveal on the <video>
  // instead would work, but then reduced motion has no fallback frame.
  return (
    <div className={className} {...rvProps(rv, block, at)} {...rest}
         role={alt ? 'img' : undefined} aria-label={alt || undefined}
         style={{ ...box, background: `url(${src}) center/100% 100% no-repeat` }}>
      <video className="shotVideo" src={clip} poster={src}
             autoPlay muted loop playsInline preload="metadata" />
    </div>
  )
}

// The band at the top of every case study. The frames draw a checkerboard
// there, which is Figma for "artwork goes here" - so it stays a checkerboard
// until a cover clip is dropped in.
export function Cover({ y, h, clip, poster }) {
  if (!clip) return <div className="band checker" style={{ top: y, height: h }} />
  // the poster is the band's own background, not just the <video poster>, so
  // reduced motion - which hides .bandVideo - still has the frame behind it
  return (
    <div className="band"
         style={{ top: y, height: h,
                  background: `url(${poster}) center/1900px ${h}px no-repeat` }}>
      <video className="bandVideo" src={clip} poster={poster}
             autoPlay muted loop playsInline preload="auto" />
    </div>
  )
}

export function Band({ y, h, fill, className, style }) {
  return <div className={`band${className ? ' ' + className : ''}`}
              style={{ top: y, height: h, background: fill, ...style }} />
}

// Progressive blur, Apple's recipe: backdrop-filter plus a mask whose alpha
// follows t^1.7 (see app/globals.css --scrim-ramp). Lets white type sit on a
// busy photo with no visible edge where the blur starts.
//
// backdrop-filter is inline rather than in the stylesheet because the CSS
// minifier rewrites it to `-webkit-backdrop-filter` only, and Chrome does not
// support the prefixed form - the blur silently does nothing. Verified: a
// prefixed-only rule computes to `none` in Chrome 153.
export function Scrim({ y, h, blur = 20 }) {
  return (
    <div className="scrim"
         style={{ top: y, height: h,
                  backdropFilter: `blur(${blur}px)`,
                  WebkitBackdropFilter: `blur(${blur}px)` }} />
  )
}

// Softens a join between two things that are meant to read as continuous - the
// photo into the gradient below it, the gradient onto the white below that.
// Not for the deliberate hard cuts between sections; those are the composition.
// Alpha follows t^1.7 for the same reason the blur scrim does: a linear ramp
// shows you where it starts.
const RAMP = (r, g, bl) => 'linear-gradient(to bottom,' +
  Array.from({ length: 9 }, (_, i) => {
    const t = i / 8
    return `rgba(${r},${g},${bl},${+(t ** 1.7).toFixed(3)}) ${(t * 100).toFixed(1)}%`
  }).join(',') + ')'

export function Seam({ y, h, to }) {
  return <div className="seam" style={{ top: y, height: h, background: RAMP(...to) }} />
}

// A band whose fill is a looping video, with the still as its poster.
// `on` comes from a build-time check that the file is actually on disk (see
// hasAsset in the page), so before you drop one in, the band is simply the
// still and there is no 404. Nodes.js is imported by client components, so the
// fs check cannot live here.
export function VideoBand({ y, h, src, poster, on }) {
  return (
    <div className="band"
         style={{ top: y, height: h,
                  background: `url(${poster}) center/1900px ${h}px no-repeat` }}>
      {on && (
        <video className="bandVideo" src={src} poster={poster}
               autoPlay muted loop playsInline preload="auto" />
      )}
    </div>
  )
}

// Outline icons in the page's own drawing language: 88px box, 6px stroke,
// round joins - the proportions Apple uses on its product-icon rows.
const ICONS = {
  // the same three fields, every time
  form: 'M14 10h60a8 8 0 0 1 8 8v52a8 8 0 0 1-8 8H14a8 8 0 0 1-8-8V18a8 8 0 0 1 8-8Z M26 30h36 M26 44h36 M26 58h36',
  // a day with a cross through it
  missed: 'M18 18h52a8 8 0 0 1 8 8v46a8 8 0 0 1-8 8H18a8 8 0 0 1-8-8V26a8 8 0 0 1 8-8Z M28 8v16 M60 8v16 M10 38h68 M34 50l20 20 M54 50l-20 20',
  // plates with weight to them, not a thin barbell
}

export function Icon({ x, y, size = 88, name, color = '#1C1C1E', stroke = 6,
                       rv, block, at }) {
  return (
    <svg {...rvProps(rv, block, at)} viewBox="0 0 88 88" width={size} height={size}
         aria-hidden="true"
         style={{ position: 'absolute', left: x, top: y, overflow: 'visible' }}>
      <path d={ICONS[name]} fill="none" stroke={color} strokeWidth={stroke}
            strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// A real brand mark, centred on an `size` box. Solid rather than outline
// because that is how these marks are drawn - the outline icons above are the
// page's own language, these are somebody else's.
export function BrandIcon({ cx, y, size = 84, name, color = '#FFFFFF',
                            rv, block, at }) {
  const b = BRANDS[name]
  const s = size * b.k
  return (
    <svg {...rvProps(rv, block, at)} viewBox="0 0 24 24" width={s} height={s}
         aria-hidden="true" fill={color}
         style={{ position: 'absolute', left: cx - s / 2, top: y + (size - s) / 2 }}>
      <path d={b.d} />
    </svg>
  )
}
