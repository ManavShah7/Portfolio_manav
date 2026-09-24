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
function rvProps(rv, block, at, sv) {
  return {
    ...(rv ? { 'data-rv': rv,
               ...(block ? { 'data-rv-block': block } : {}),
               ...(at ? { 'data-at': at } : {}) } : {}),
    // scroll-driven, see data-sv in app/globals.css. Safe alongside
    // data-rv="lines" - which transforms the inner spans - and nothing else.
    ...(sv ? { 'data-sv': sv } : {}),
  }
}

export function T({ x, y, lines, s, align = 'left', w, color, className, style,
                    accent, lead, as: Tag = 'div', rv, block, at, sv, ref, ...rest }) {
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
    // An absolutely positioned box shrink-wraps, and `.ln` clips to it. Any
    // line longer than the first - which `accent` guarantees - then gets cut
    // off mid-word. `max-content` does not survive the clip boxes, so give a
    // left-aligned masked block the rest of the frame unless told otherwise.
    if (w) box.width = w
    else if (rv === 'lines' || accent || lead) box.width = Math.max(0, 1900 - box.left)
  }
  return (
    <Tag ref={ref} className={`node${className ? ' ' + className : ''}`} style={box}
         {...rvProps(rv, block, at, sv)} {...rest}>
      {rows.map((l, i) => {
        // `accent` colours a trailing phrase on the LAST line - "Push your
        // friend and grow together." Appending it cannot move anything: ink
        // metrics are taken from line 0, and the phrase sits inline after the
        // text it follows rather than being positioned.
        // `lead` runs a differently-weighted sentence INTO the first line -
        // the catalog captions read "Type it however you want. Peak gets it..."
        // as one paragraph with only the opening sentence in white.
        const withLead = lead && i === 0
          ? <><span style={{ color: lead.color, fontWeight: lead.weight, display: 'inline' }}>{lead.text}</span>{l}</>
          : l
        const body = accent && i === rows.length - 1
          // display:inline is not optional - globals.css sets `.node span
          // { display: block }` for the line spans, which would drop the
          // accent onto a line of its own.
          ? <>{withLead}<span style={{ color: accent.color, display: 'inline' }}>{accent.text}</span></>
          : withLead
        return rv === 'lines'
          // .ln clips, .w slides up from under it. The padding/margin pair keeps
          // the clip box off the glyphs without moving the layout by a hair.
          ? <span className="ln" key={i}><span className="w">{body}</span></span>
          : <span key={i}>{body}</span>
      })}
    </Tag>
  )
}

export function Rect({ x, y, w, h, r = 20, fill, style, rv, block, at, sv, children, ...rest }) {
  return (
    <div {...rvProps(rv, block, at, sv)} {...rest}
         style={{ position: 'absolute', left: x, top: y, width: w, height: h,
                  borderRadius: r, background: fill, ...style }}>{children}</div>
  )
}

export function Img({ x, y, w, h, src, alt = '', href, label, rv, block, at, sv, className, ...rest }) {
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
      <a href={href} aria-label={label} {...rvProps(rv, block, at, sv)} style={box}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={className} {...rest}
             style={{ display: 'block', width: '100%', height: '100%' }} />
      </a>
    )
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className}
              {...rvProps(rv, block, at, sv)} {...rest} style={box} />
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
export function Shot({ x, y, w, h, src, clip, alt = '', rv, block, at, sv, className, ...rest }) {
  const box = { position: 'absolute', left: x, top: y, width: w, height: h }
  // nothing dropped, or a still dropped: either way it is one <img>
  if (!clip || !clip.video) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={clip ? clip.src : src} alt={alt} className={className}
                {...rvProps(rv, block, at, sv)} {...rest}
                style={{ ...box, objectFit: 'contain' }} />
  }
  // The wrapper carries the box, the reveal AND the still as its background, so
  // that when `.shotVideo` is switched off for prefers-reduced-motion there is
  // something behind it rather than a hole. Putting the reveal on the <video>
  // instead would work, but then reduced motion has no fallback frame.
  return (
    <div className={className} {...rvProps(rv, block, at, sv)} {...rest}
         role={alt ? 'img' : undefined} aria-label={alt || undefined}
         style={{ ...box, background: `url(${src}) center/100% 100% no-repeat` }}>
      <video className="shotVideo" src={clip.src} poster={src}
             autoPlay muted loop playsInline preload="metadata" />
    </div>
  )
}


// A plate: the flat dark rounded rect the new Peak frame draws wherever a clip
// is going to go. With nothing dropped it stays a plate, which is exactly what
// the frame shows; drop `peak-<slot>.mp4` and it fills with the clip.
// The still hangs on the PARENT for the reduced-motion reason in rule 16.
export function Plate({ x, y, w, h, r = 20, fill = '#050505', clip, poster, alt = '',
                        rv, block, at, sv, ...rest }) {
  const box = { position: 'absolute', left: x, top: y, width: w, height: h,
                borderRadius: r, background: poster ? `url(${poster}) center/cover no-repeat` : fill,
                overflow: 'hidden' }
  if (!clip) return <div {...rvProps(rv, block, at, sv)} {...rest} style={box} />
  if (!clip.video) {
    return <div {...rvProps(rv, block, at, sv)} {...rest} role="img" aria-label={alt || undefined}
                style={{ ...box, background: `url(${clip.src}) center/cover no-repeat` }} />
  }
  return (
    <div {...rvProps(rv, block, at, sv)} {...rest}
         role={alt ? 'img' : undefined} aria-label={alt || undefined} style={box}>
      <video className="bandVideo" src={clip.src} poster={poster}
             autoPlay muted loop playsInline preload="metadata" />
    </div>
  )
}


// The phone the new Peak frame draws over the social bands is an outline, not
// a device shot - every PNG in public/figma has its background baked in
// (rule 15), so a cutout would draw a black rectangle over the footage.
export function PhoneOutline({ x, y, w, h, stroke = 'rgba(255,255,255,.9)' }) {
  const r = w * 0.15
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h,
                  border: `${Math.max(2, w * 0.011)}px solid ${stroke}`,
                  borderRadius: r, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', top: h * 0.018, left: '50%',
                    transform: 'translateX(-50%)', width: w * 0.42, height: h * 0.022,
                    borderRadius: 99, background: stroke }} />
    </div>
  )
}

// The band at the top of every case study. The frames draw a checkerboard
// there, which is Figma for "artwork goes here" - so it stays a checkerboard
// until a cover clip is dropped in.
export function Cover({ y, h, clip, poster }) {
  if (!clip) return <div className="band checker" style={{ top: y, height: h }} />
  // A still dropped in is simply the band's background. For a clip the still
  // stays as the background too, rather than only being the <video poster>,
  // because reduced motion hides .bandVideo and would otherwise leave a hole.
  const still = clip.video ? poster : clip.src
  return (
    <div className="band"
         style={{ top: y, height: h,
                  background: `url(${still}) center/1900px ${h}px no-repeat` }}>
      {clip.video && (
        <video className="bandVideo" src={clip.src} poster={poster}
               autoPlay muted loop playsInline preload="auto" />
      )}
    </div>
  )
}

// A real button - the one on the home page is the resume download.
// The <a> carries the box, for the same reason <Img href> does: an anchor
// wrapped round an absolutely positioned child collapses to nothing.
export function Btn({ x, y, w, h, href, download, label, size = 24, rv, block, at, sv }) {
  return (
    <a className="btn" href={href} download={download}
       {...rvProps(rv, block, at, sv)}
       style={{ position: 'absolute', left: x, top: y, width: w, height: h,
                fontSize: size, lineHeight: `${h}px` }}>
      <span>{label}</span>
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 3v10M5.5 9l4.5 4.5L14.5 9M4 16.5h12" />
      </svg>
    </a>
  )
}

// The iPad on the home page, and the collage inside it.
//
// This is the one device on the site whose screen rectangle IS reliably
// detectable - a big flat white rect inside a near-black bezel - so unlike
// <Shot> the media goes INSIDE the frame rather than replacing it. The rect was
// measured off the export: 1044.5x651 at (58, 51.5) in the frame's own
// coordinates, radius 20.
//
// The stage/rig split exists for the scroll-driven animation: the stage holds
// the perspective and stays put, the rig is what tilts. See .ipadStage in
// app/globals.css.
export function IPad({ x, y, w, h, src, screen, clip, alt = '' }) {
  return (
    <div className="ipadStage" style={{ left: x, top: y, width: w, height: h }}>
      <div className="ipadGlow"
           style={{ left: w * 0.08, top: h * 0.3, width: w * 0.84, height: h * 0.9 }} />
      <div className="ipadRig">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ipadShell" src={src} alt="" />
        <div className="ipadScreen"
             style={{ left: screen.x, top: screen.y, width: screen.w, height: screen.h,
                      borderRadius: screen.r }}>
          {clip && (clip.video
            ? <video src={clip.src} autoPlay muted loop playsInline preload="metadata"
                     aria-label={alt || undefined} />
            // eslint-disable-next-line @next/next/no-img-element
            : <img src={clip.src} alt={alt} />)}
        </div>
      </div>
    </div>
  )
}

// A band whose background is a clip rather than a fill.
//
// The CSS fill stays underneath as the reduced-motion fallback - globals.css
// hides .bandVideo for prefers-reduced-motion, which leaves exactly the ramp
// the frames were drawn with. `over` is a wash drawn on top of the clip, for
// the bands whose ramps have to reach a particular colour by the bottom: the
// green one ends near-white under a dark caption and the pink one has to meet
// the white band below without a step. The wash is hidden under reduced motion
// too, or it would fade a ramp that already fades.
// `poster` is the still the band falls back to. It hangs on the PARENT as a
// background, never on the <video>, because prefers-reduced-motion hides
// .bandVideo and would otherwise leave a hole (CLAUDE.md rule 16).
// `eager` is only for a clip above the fold: everything else is metadata-only
// until it is close, or four autoplaying bands are a 40MB page load.
export function MediaBand({ y, h, clip, fill, over, className, poster, eager }) {
  if (!clip) return <Band y={y} h={h} fill={fill} className={className} />
  const still = poster
    ? `url(${poster}) center/1900px ${h}px no-repeat`
    : fill
  return (
    <div className={`band${className ? ' ' + className : ''}`}
         style={{ top: y, height: h, background: still }}>
      {clip.video
        ? <video className="bandVideo" src={clip.src} poster={poster}
                 autoPlay muted loop playsInline
                 preload={eager ? 'auto' : 'metadata'} />
        : <div className="bandVideo"
               style={{ background: `url(${clip.src}) center/cover no-repeat` }} />}
      {over && <div className="bandWash" style={{ background: over }} />}
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

// `to` is the colour the band below opens on. When that band is a clip the
// opening colour is the clip's, not the CSS ramp's - and the two differ enough
// to show (the green band's ramp opens on #0DA31C and its clip on #57C859, a
// 182-level step across 1900px). So `over` gives the clip's colour and both
// layers are rendered, with CSS picking one: the still for anyone who asked for
// less motion, since that is who sees the CSS ramp.
export function Seam({ y, h, to, over }) {
  const still = (
    <div className={`seam${over ? ' seamStill' : ''}`}
         style={{ top: y, height: h, background: RAMP(...to) }} />
  )
  if (!over) return still
  return (
    <>
      <div className="seam seamMotion"
           style={{ top: y, height: h, background: RAMP(...over) }} />
      {still}
    </>
  )
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
