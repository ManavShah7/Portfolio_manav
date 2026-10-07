'use client'

import { useEffect, useRef, useState } from 'react'

// The section bar every case study carries - apple.com's own local nav, which
// sits under the global one on a product page: the project's name on the left,
// its sections on the right, and a hairline under whichever one you are
// reading. It stays out of the way until the hero is behind you.
//
// It reads the page rather than being told about it: the chrome's height comes
// off the real elements, so nothing here repeats the breakpoint maths, and the
// live section is the last target whose top has gone under the chrome.
//
// backdrop-filter is set inline, like the global bar - from a stylesheet the
// minifier only emits the -webkit- form (see .gnav in globals.css).
const GLASS = { backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)' }

export default function LocalNav({ name, items }) {
  const bar = useRef(null)
  const row = useRef(null)
  const [i, setI] = useState(-1)
  const [on, setOn] = useState(false)
  const [ink, setInk] = useState(null)

  useEffect(() => {
    let raf = 0
    const tick = () => {
      raf = 0
      const nav = document.querySelector('.nav')
      const chrome = (nav?.offsetHeight || 0) + (bar.current?.offsetHeight || 0)
      // the bar arrives when the hero leaves, not when the first section
      // does - Lighthouse opens on two full-bleed films before its first
      // anchored section, which left half the page with no navigation
      const hero = document.querySelector('.pin')
      let show = hero ? hero.getBoundingClientRect().bottom <= chrome : scrollY > innerHeight
      // -1 until a section has actually gone under the chrome, so the first
      // link is not lit while you are still above it
      let cur = -1
      items.forEach((it, n) => {
        const el = document.getElementById(it.id)
        if (el && el.getBoundingClientRect().top <= chrome + 8) cur = n
      })
      // and it goes away again over the foot, so the last line and the
      // contact band are read on a clean page
      const foot = document.querySelector('.ft-outro') || document.querySelector('.ft')
      if (foot && foot.getBoundingClientRect().top < innerHeight * 0.6) show = false
      setI(cur)
      setOn(show)
    }
    const go = () => { if (!raf) raf = requestAnimationFrame(tick) }
    addEventListener('scroll', go, { passive: true })
    addEventListener('resize', go)
    go()
    return () => {
      removeEventListener('scroll', go)
      removeEventListener('resize', go)
      cancelAnimationFrame(raf)
    }
  }, [items])

  // the hairline slides to the live link, and on a phone - where the row
  // scrolls sideways - the live link is brought into the middle of it
  useEffect(() => {
    const el = i < 0 ? null : row.current?.children[i]
    if (!el) { setInk(null); return }
    const soft = !document.documentElement.classList.contains('reduced-motion')
    const move = () => {
      setInk({ left: el.offsetLeft, width: el.offsetWidth })
      const r = row.current
      if (r && r.scrollWidth > r.clientWidth) {
        r.scrollTo({ left: el.offsetLeft - (r.clientWidth - el.offsetWidth) / 2,
                     behavior: soft ? 'smooth' : 'auto' })
      }
    }
    const f = requestAnimationFrame(move)
    return () => cancelAnimationFrame(f)
  }, [i])

  return (
    <div className={`lnav${on ? ' on' : ''}`} ref={bar} style={GLASS}>
      <div className="lnav-in">
        <span className="lnav-name">{name}</span>
        <nav className="lnav-links" ref={row} aria-label={`${name} sections`}>
          {items.map((it, n) => (
            <a key={it.id} href={`#${it.id}`} aria-current={n === i ? 'true' : undefined}>
              {it.label}
            </a>
          ))}
          {/* drawn only once there is something to measure, so it never
              starts life at the left edge and slides in from nowhere */}
          {ink && <span className="lnav-ink" style={{ left: ink.left, width: ink.width }} aria-hidden="true" />}
        </nav>
      </div>
    </div>
  )
}
