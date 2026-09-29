'use client'
import { useEffect, useRef, useState } from 'react'

// Drag to look around a board, the way apple.com spins a product: a sprite
// sheet of frames swapped by `background-position`, not a video seek. The
// frames come from the pan in his own Street View capture, so this is the
// actual view from that hoarding rather than a render.
//
// A sheet rather than 21 separate requests, and background-position rather
// than `video.currentTime`, because a drag has to answer instantly - a seek
// can stall on the first frames of a decode and a stuttering "interactive"
// view is worse than none. The sheet is only fetched when the section is
// close, so it costs nothing to anyone who does not reach it.
export default function Orbit({ src, poster, frames, cols, tile, alt, className = '' }) {
  const box = useRef(null)
  const [i, setI] = useState(0)
  // the live index lives in a ref as well as state: the drag handlers must not
  // be in a effect that re-subscribes when `i` changes, or the first frame
  // change tears the listeners down mid-gesture and the drag freezes
  const iRef = useRef(0)
  const put = n => { iRef.current = n; setI(n) }
  const [on, setOn] = useState(false)     // sheet loaded and ready
  const [held, setHeld] = useState(false)

  // only load the sheet when it is near
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

  // the drag. Horizontal only, and the page keeps the gesture until the
  // movement is clearly sideways, so a thumb scrolling past is never trapped.
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
        if (Math.abs(dy) > Math.abs(dx)) { up(e); return }   // they are scrolling
        claimed = true
        el.setPointerCapture?.(id)
      }
      // a full sweep of the box is one full pan
      const span = el.clientWidth || 1
      let n = Math.round(base - (dx / span) * frames)
      n = ((n % frames) + frames) % frames
      put(n)
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

  const rows = Math.ceil(frames / cols)
  return (
    <div ref={box} className={`orbit ${className}${held ? ' held' : ''}${on ? ' ready' : ''}`}
         role="img" aria-label={alt} tabIndex={0}
         style={{
           backgroundImage: `url(${on ? src : poster})`,
           backgroundSize: on ? `${cols * 100}% ${rows * 100}%` : 'cover',
           backgroundPosition: on
             ? `${(i % cols) * (100 / (cols - 1))}% ${Math.floor(i / cols) * (100 / (rows - 1))}%`
             : 'center',
           aspectRatio: tile,
         }}>
      <span className="orbit-hint" aria-hidden="true">Drag to look around</span>
    </div>
  )
}
