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
    if (document.documentElement.classList.contains('reduced-motion')) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (v.preload !== 'auto') { v.preload = 'auto' }
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    }, { rootMargin: '200px 0px' })
    io.observe(v)
    return () => io.disconnect()
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
