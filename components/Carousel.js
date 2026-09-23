'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

// The Figma draws these rows running off the right edge of the 1900 frame with
// a pair of paddles beneath, so they are real horizontal tracks here. Children
// keep design-px coordinates relative to the track's own origin, which is what
// every position in this file is measured as.
function Chevron({ dir }) {
  // drawn in the 80px circle's own coordinates, so it scales with the canvas
  const x0 = dir < 0 ? 45 : 35
  const x1 = dir < 0 ? 35 : 45
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
      <path d={`M${x0} 28 L${x1} 40 L${x0} 52`} />
    </svg>
  )
}

export default function Carousel({ x, y, w, h, inner, step, paddleY, paddleX,
                                  depth = false, children }) {
  const ref = useRef(null)
  const [at, setAt] = useState({ start: true, end: true })

  // Depth of field: whichever card sits at the left edge is sharp and the ones
  // queued behind it soften off, so the row reads as a stack you are pulling
  // from rather than three equal things.
  const focus = useCallback(() => {
    const el = ref.current
    if (!el || !depth) return
    for (const part of el.querySelectorAll('[data-depth]')) {
      const behind = Math.max(0, (+part.dataset.depth * step - el.scrollLeft) / step)
      part.style.filter = `blur(${Math.min(7, behind * 2.6).toFixed(2)}px)`
    }
  }, [depth, step])

  const read = useCallback(() => {
    const el = ref.current
    if (!el) return
    setAt({ start: el.scrollLeft <= 1,
            end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 1 })
    focus()
  }, [focus])
  useEffect(() => { read() }, [read])

  const go = d => ref.current?.scrollBy({ left: d * step, behavior: 'smooth' })

  return (
    <>
      <div ref={ref} className="track" onScroll={read}
           style={{ left: x, top: y, width: w, height: h }}>
        <div style={{ position: 'relative', width: inner, height: h }}>{children}</div>
      </div>
      <button className="paddle" aria-label="Previous" disabled={at.start} onClick={() => go(-1)}
              style={{ left: paddleX, top: paddleY, width: 80, height: 80 }}>
        <Chevron dir={-1} />
      </button>
      <button className="paddle" aria-label="Next" disabled={at.end} onClick={() => go(1)}
              style={{ left: paddleX + 126, top: paddleY, width: 80, height: 80 }}>
        <Chevron dir={1} />
      </button>
    </>
  )
}
