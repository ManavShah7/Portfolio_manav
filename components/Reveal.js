'use client'
import { useEffect } from 'react'

// Entrances - apple.com's StaggeredFadeIn.
//
// Anything with `data-reveal` rises and fades in once, when its top crosses
// 85% of the viewport. Inside a `data-stagger` group the items step through
// 150ms apart, in document order, and the group triggers as one. It is
// one-shot: scrolling back up leaves the page finished, as Apple's does.
//
// Two safety nets, both learned the hard way on the canvas build:
//   - IntersectionObserver only reports threshold CROSSINGS, so a fast flick can
//     carry a block past the trigger inside one frame and it never fires. Once
//     the scroll settles, anything above the trigger is played or shown.
//   - Anything already above the viewport on load (a deep link, a restored
//     scroll) is shown outright, with no performance.
const STEP = 0.15      // seconds between items in a group
const TRIGGER = 0.85   // fraction of viewport height

export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement
    if (root.classList.contains('reduced-motion')) return

    const items = [...document.querySelectorAll('[data-reveal]')]
    if (!items.length) return

    // one trigger per group; a lone item is its own group
    const groups = new Map()
    for (const el of items) {
      const g = el.closest('[data-stagger]') || el
      if (!groups.has(g)) groups.set(g, [])
      groups.get(g).push(el)
    }

    const show = (els, animate) => {
      els.forEach((el, i) => {
        if (el.classList.contains('in')) return
        if (animate) {
          el.style.setProperty('--d', `${i * STEP}s`)
          el.classList.add('moving')
          el.addEventListener('transitionend', () => el.classList.remove('moving'), { once: true })
        } else {
          el.style.setProperty('--d', '0s')
          el.style.transition = 'none'
          requestAnimationFrame(() => { el.style.transition = '' })
        }
        el.classList.add('in')
      })
    }

    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        show(groups.get(e.target), true)
        io.unobserve(e.target)
      }
    }, { rootMargin: `0px 0px -${Math.round((1 - TRIGGER) * 100)}% 0px` })

    const settle = first => {
      for (const [g, els] of groups) {
        if (els.every(el => el.classList.contains('in'))) continue
        const r = g.getBoundingClientRect()
        if (r.bottom <= 0) { show(els, false); io.unobserve(g) }
        else if (r.top < innerHeight * TRIGGER) { show(els, !first); io.unobserve(g) }
      }
    }
    settle(true)
    groups.forEach((_, g) => io.observe(g))

    let t
    const onScroll = () => { clearTimeout(t); t = setTimeout(() => settle(false), 120) }
    addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); removeEventListener('scroll', onScroll); clearTimeout(t) }
  }, [])
  return null
}
