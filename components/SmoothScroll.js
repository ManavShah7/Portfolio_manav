'use client'
import { useEffect } from 'react'
import Lenis from 'lenis'

// Eased wheel/touch scrolling for the whole page. Lenis animates the real
// scroll position rather than translating a wrapper, so position: sticky and
// the browser's own scrollbar keep working - which matters here, because the
// section rail is pinned with native sticky.
export default function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reduced.matches) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: t => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.6,
    })
    window.__lenis = lenis

    let raf = requestAnimationFrame(function tick(t) {
      lenis.raf(t)
      raf = requestAnimationFrame(tick)
    })
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      delete window.__lenis
    }
  }, [])
  return null
}
