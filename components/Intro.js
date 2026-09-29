'use client'
import { useEffect } from 'react'

// The home page opens on its own film, full screen, carrying the one line -
// then the film contracts into the band it lives in and the header arrives
// above it. There is no overlay and no hand-off: the band IS the intro, so it
// only ever animates its own height, which lets the film's `cover` reframe
// continuously instead of being squashed by a transform.
//
// `html.intro` is set before first paint (app/layout.js) so the settled
// layout never flashes; removing it is what plays the contraction, because the
// transitions live on the base rules. Once a session, and never when motion is
// unwelcome or JS never ran - both of those get the page as designed.
const HOLD = 1500   // long enough to read the line once the swipe has landed

export default function Intro() {
  useEffect(() => {
    const root = document.documentElement
    if (!root.classList.contains('intro')) return
    try { sessionStorage.setItem('intro', '1') } catch {}

    // hold the film, then let it settle
    const t1 = setTimeout(() => root.classList.remove('intro'), HOLD)

    // A reader who scrolls, taps or hits a key has opted out, so let them
    // past. Deliberately NOT a scroll lock: holding the page still for two
    // and a half seconds fights whoever is already reaching for the wheel,
    // and releasing the class animates rather than snapping, so leaving
    // early still looks intentional.
    const skip = () => { root.classList.remove('intro'); clearTimeout(t1); off() }
    const off = () => {
      removeEventListener('wheel', skip); removeEventListener('touchstart', skip)
      removeEventListener('keydown', skip); removeEventListener('pointerdown', skip)
    }
    addEventListener('wheel', skip, { passive: true })
    addEventListener('touchstart', skip, { passive: true })
    addEventListener('keydown', skip)
    addEventListener('pointerdown', skip)

    return () => { clearTimeout(t1); off() }
  }, [])
  return null
}
