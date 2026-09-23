'use client'
import { useCallback, useEffect, useRef } from 'react'
import { useScale } from './Frame'
import { T } from './Nodes'

// The Figma draws this rail once, at the top of the Overview. Manav asked for
// it to stay with you down the page and to flip colour over the dark bands.
//
// It is pinned with real CSS `position: sticky`, which means the browser holds
// it in place on the compositor and it never lags the page. That is only
// possible because the rail renders OUTSIDE the scaled canvas: a
// transform: scale() ancestor makes sticky resolve its offsets in unscaled
// layout coordinates, so it would pin at the wrong scroll position and drift.
// Instead every number here is multiplied by the scale once, on resize.

// Peak's rail. Other pages pass their own `config` - see the Times Media page,
// which has six stops, a different column and white ink on its black.
const PEAK = {
  items: [
    { label: 'Overview',     x: 126.5, y: 997.5,  to: 832 },
    { label: 'Problem',      x: 127.5, y: 1051,   to: 1770 },
    { label: 'Research',     x: 127.5, y: 1104,   to: 3494 },
    { label: 'Solution',     x: 126.5, y: 1153.5, to: 6031 },
    { label: "What's Next?", x: 126.5, y: 1203.5, to: 12889 },
  ],
  natural: 960, stick: 300, height: 270, end: 14866,
  dark: [[3494, 3877], [6031, 12503]],
  light: '#5A5A5A', darkInk: '#A9A9A9',
}

const BLEND = 70   // design px either side of a crossover to ramp across
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16))

// 0 = light background, 1 = dark, ramped smoothly through each boundary so the
// colour is a function of where the item is rather than of a timer.
function darkness(y, bands) {
  let d = 0
  for (const [a, b] of bands) {
    const inside = Math.min((y - a) / BLEND, (b - y) / BLEND)
    d = Math.max(d, Math.min(1, Math.max(0, inside * 0.5 + 0.5)))
  }
  return d * d * (3 - 2 * d)    // smoothstep, so it eases in and out of the ramp
}

export default function SectionRail({ config = PEAK }) {
  const { items: ITEMS, natural: NATURAL, stick: STICK, height: RAIL_H, end: END } = config
  const mix = useCallback(d => {
    const a = hex(config.light), b = hex(config.darkInk)
    return `rgb(${a.map((l, i) => Math.round(l + (b[i] - l) * d)).join(',')})`
  }, [config.light, config.darkInk])
  const { scale, offsetX } = useScale()
  const items = useRef([])

  // Each item is coloured for the background behind ITSELF, continuously. The
  // rail is 270px tall, so crossing a band recolours the items one after the
  // other instead of flipping all five on a timer.
  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const frame = document.querySelector('.frame')
      if (!frame) return
      const box = frame.getBoundingClientRect()
      const s = box.width / 1900
      const y = Math.min(Math.max(-box.top / s + STICK, NATURAL), END - RAIL_H)
      items.current.forEach((el, i) => {
        if (el) el.style.color = mix(darkness(y + ITEMS[i].y - NATURAL + 12, config.dark))
      })
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [config, ITEMS, NATURAL, STICK, RAIL_H, END, mix])

  const jump = to => {
    const frame = document.querySelector('.frame')
    if (!frame) return
    const top = window.scrollY + frame.getBoundingClientRect().top + (to - STICK) * scale
    if (window.__lenis) window.__lenis.scrollTo(top, { duration: 1.4 })
    else window.scrollTo({ top, behavior: 'smooth' })
  }

  const style = { size: 24 * scale, weight: 500, lh: 29 * scale, color: config.light }

  return (
    <nav aria-label="Sections" className="rail"
         style={{ position: 'absolute', left: offsetX, top: NATURAL * scale,
                  width: 400 * scale, height: (END - NATURAL) * scale }}>
      <div className="railPin"
           style={{ position: 'sticky', top: STICK * scale, height: RAIL_H * scale }}>
        {ITEMS.map((it, i) => (
          <T key={it.label} as="button" className="railItem"
             ref={el => { items.current[i] = el }}
             x={it.x * scale} y={(it.y - NATURAL) * scale} s={style} lines={it.label}
             onClick={() => jump(it.to)} />
        ))}
      </div>
    </nav>
  )
}
