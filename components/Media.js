'use client'
import { useEffect, useRef } from 'react'

// A clip or a still, resolved at build time by lib/clips.js.
//
// Clips behave the way apple.com's inline media does: nothing downloads until
// the clip is close to the viewport, it plays only while it is on screen and
// pauses when it leaves, and a reader who asked for less motion gets the still
// instead of a loop. The still always hangs on the wrapper as a background, so
// hiding the <video> never leaves a hole.
export function Video({ src, poster, className = '', style, label, eager = false, ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    // Less motion means the still, and the still alone. CSS already hides the
    // clip, but a hidden <video preload="auto" autoplay> still pulls megabytes
    // down - the eager ones start before React is even on the page. Cut the
    // source so the download stops rather than merely goes unwatched.
    if (document.documentElement.classList.contains('reduced-motion')) {
      v.pause()
      v.removeAttribute('autoplay')
      v.preload = 'none'
      if (v.getAttribute('src')) { v.removeAttribute('src'); v.load() }
      return
    }
    // Two rings, because "near enough to have ready" and "near enough to be
    // worth decoding" are different distances. One 200px ring had SIX clips
    // decoding at once on Peak - which stands fifteen on a page, two of them
    // over 1600px wide - and that is felt as stutter while scrolling, not as
    // anything anybody is watching.
    const warm = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && v.preload !== 'auto') v.preload = 'auto'
    }, { rootMargin: '500px 0px' })
    // Play only while a decent part of THIS clip is on screen, not merely
    // while it clips the fold. Lighthouse stacks two full-screen sticky films
    // back to back under a sticky hero, and a bare `isIntersecting` test had
    // three of them decoding at once, which is what glitching looks like.
    // Measured at 0.35 it was still three: in the hand-over between two
    // full-screen films the outgoing one, the incoming one and the hero were
    // each more than a third visible at the same scroll position. At 0.6 only
    // the clip actually filling the screen runs. The pair of numbers is
    // hysteresis - start at 0.6, stop at 0.25 - so a clip resting on the fold
    // cannot flap on every notch of the wheel.
    const run = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio >= 0.6) v.play().catch(() => {})
      else if (e.intersectionRatio <= 0.25) v.pause()
    }, { rootMargin: '64px 0px', threshold: [0, 0.25, 0.6, 1] })
    warm.observe(v); run.observe(v)
    return () => { warm.disconnect(); run.disconnect() }
  }, [])
  return (
    <video ref={ref} className={`loop ${className}`} src={src} poster={poster}
           muted loop playsInline preload={eager ? 'auto' : 'none'} autoPlay={eager}
           aria-label={label} role={label ? 'img' : undefined} style={style} {...rest} />
  )
}

// A media frame. `clip` is { src, video } from lib/clips.js, or null.
// With nothing dropped in, it renders nothing - the layouts around it are
// written so the section still reads as finished without it.
export function Media({ clip, poster, alt = '', className = '', style, ratio, eager, children, ...rest }) {
  poster = poster || clip?.poster
  if (!clip && !poster) return null
  const still = clip && !clip.video ? clip.src : poster
  const box = {
    ...(ratio ? { aspectRatio: ratio } : {}),
    ...(still ? { background: `url(${still}) center/cover no-repeat` } : {}),
    ...style,
  }
  return (
    <div className={`media ${className}`} style={box} role={alt && !clip?.video ? 'img' : undefined}
         aria-label={alt && !clip?.video ? alt : undefined} {...rest}>
      {clip?.video && <Video src={clip.src} poster={poster} label={alt || undefined} eager={eager} />}
      {children}
    </div>
  )
}
