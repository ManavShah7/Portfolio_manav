'use client'
import { useEffect, useRef, useState } from 'react'

// Drag to look around a board, the way apple.com spins a product: frames from
// the pan in his own Street View capture, so this is the actual view from that
// hoarding rather than a render.
//
// The frames are one sheet, moved by `transform: translate3d`. The first
// version set `background-position` on a `background-size: 400% 600%` backdrop
// of a 9-megapixel sheet, which made the browser rescale and REPAINT that
// image on every single frame - which is exactly why it felt glitchy. A
// transform on an <img> is composited instead: no repaint, no rescale, and the
// sheet is only fetched when the section is close.
export default function Orbit({ src, poster, frames, cols, tile, alt, className = '' }) {
  const box = useRef(null)
  const iRef = useRef(0)
  const [i, setI] = useState(0)
  const put = n => { iRef.current = n; setI(n) }
  const [on, setOn] = useState(false)
  const [held, setHeld] = useState(false)
  const rows = Math.ceil(frames / cols)

  useEffect(() => {
    const el = box.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const img = new Image()
      img.onload = () => setOn(true)
      img.src = src
    }, { rootMargin: '400px 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [src])

  // Horizontal only, and the page keeps the gesture until the movement is
  // clearly sideways, so a thumb scrolling past is never trapped. `i` is
  // deliberately NOT a dependency: it would re-subscribe on the first frame
  // change and drop the pointer mid-gesture.
  useEffect(() => {
    const el = box.current
    if (!el || !on) return
    let id = null, x0 = 0, y0 = 0, base = 0, claimed = false
    const down = e => {
      if (id !== null) return
      id = e.pointerId; x0 = e.clientX; y0 = e.clientY; base = iRef.current; claimed = false
      setHeld(true)
    }
    const move = e => {
      if (e.pointerId !== id) return
      const dx = e.clientX - x0, dy = e.clientY - y0
      if (!claimed) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
        if (Math.abs(dy) > Math.abs(dx)) { up(e); return }
        claimed = true
        el.setPointerCapture?.(id)
      }
      const span = el.clientWidth || 1
      let n = Math.round(base - (dx / span) * frames)
      put(((n % frames) + frames) % frames)
      e.preventDefault()
    }
    const up = e => {
      if (e && e.pointerId !== id) return
      if (id !== null) el.releasePointerCapture?.(id)
      id = null; claimed = false; setHeld(false)
    }
    const key = e => {
      if (e.key === 'ArrowRight') { put((iRef.current + 1) % frames); e.preventDefault() }
      if (e.key === 'ArrowLeft') { put((iRef.current - 1 + frames) % frames); e.preventDefault() }
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    el.addEventListener('keydown', key)
    return () => {
      el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up)
      el.removeEventListener('keydown', key)
    }
  }, [on, frames])

  const c = i % cols, r = Math.floor(i / cols)
  return (
    <div ref={box} className={`orbit ${className}${held ? ' held' : ''}${on ? ' ready' : ''}`}
         role="img" aria-label={alt} tabIndex={0} style={{ aspectRatio: tile }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="orbit-still" src={poster} alt="" aria-hidden="true" />
      {on && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img className="orbit-sheet" src={src} alt="" aria-hidden="true"
             style={{ width: `${cols * 100}%`, height: `${rows * 100}%`,
                      transform: `translate3d(${-c * (100 / cols)}%, ${-r * (100 / rows)}%, 0)` }} />
      )}
      <span className="orbit-hint" aria-hidden="true">Drag to look around</span>
    </div>
  )
}
