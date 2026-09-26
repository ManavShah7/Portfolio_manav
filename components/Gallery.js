'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

// A horizontal gallery: native scroll with snap, paddles beneath on the right.
// Cards pass their own width; the track steps one card at a time.
// `paddles`: 'right' (default) or 'center'; `always` keeps them on screen even
// when everything fits, disabled - some frames draw them regardless.
export default function Gallery({ children, label, className = '', style, paddles = 'right', always = false }) {
  const ref = useRef(null)
  const [at, setAt] = useState({ start: true, end: false })

  const read = useCallback(() => {
    const el = ref.current
    if (!el) return
    setAt({ start: el.scrollLeft <= 2, end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 2 })
  }, [])
  useEffect(() => {
    read()
    addEventListener('resize', read)
    return () => removeEventListener('resize', read)
  }, [read])

  const go = d => {
    const el = ref.current
    const card = el?.firstElementChild
    if (!card) return
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(el).columnGap || 20)
    el.scrollBy({ left: d * step, behavior: 'smooth' })
  }

  return (
    <div className={`gallery ${className}`} role="region" aria-label={label} style={style}>
      <div ref={ref} className="gallery-track" onScroll={read}>{children}</div>
      {(always || !(at.start && at.end)) && (
        <div className={`wrap paddles${paddles === 'center' ? ' center' : ''}`}>
          <button className="paddle" aria-label="Previous" disabled={at.start} onClick={() => go(-1)}>
            <svg viewBox="0 0 18 18"><path d="M11 3.5 5.5 9l5.5 5.5" /></svg>
          </button>
          <button className="paddle" aria-label="Next" disabled={at.end} onClick={() => go(1)}>
            <svg viewBox="0 0 18 18"><path d="M7 3.5 12.5 9 7 14.5" /></svg>
          </button>
        </div>
      )}
    </div>
  )
}
