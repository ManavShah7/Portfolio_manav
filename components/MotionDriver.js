'use client'
import { useEffect } from 'react'

// Entrance choreography.
//
// The page is annotated with BLOCKS, not elements: `block="ov"` ties a
// headline, its paragraphs and its cards together so they share one trigger
// and perform in sequence. One block arriving reads as a composed move; forty
// elements each tracking the scroll independently just reads as drift, which
// is what this replaces.
//
// Everything is a one-shot CSS transition here rather than a scroll-linked
// value. The block plays when it arrives and then it is finished and still -
// no part of the page is ever mid-animation because you happen to be scrolling
// slowly. `cubic-bezier(.16,1,.3,1)` is an exponential-out, which is the same
// settle shape as the damped follower on apple.com, just declared instead of
// integrated.

const TRIGGER = 0.88   // block top crosses this fraction of viewport height
const LINE_STEP = 110  // ms between the lines of one headline

export default function MotionDriver() {
  useEffect(() => {
    const root = document.documentElement
    if (root.classList.contains('reduced-motion')) return

    const els = [...document.querySelectorAll('[data-rv]')]
    if (!els.length) return

    // per-line stagger inside a masked headline
    for (const el of els) {
      if (el.dataset.rv !== 'lines') continue
      const base = +(el.dataset.at || 0)
      el.querySelectorAll('.w').forEach((w, i) => {
        w.style.transitionDelay = `${base + i * LINE_STEP}ms`
      })
    }

    const blocks = new Map()
    for (const el of els) {
      const id = el.dataset.rvBlock || el.dataset.rv + Math.random()
      if (!blocks.has(id)) blocks.set(id, [])
      blocks.get(id).push(el)
    }

    const leads = new Map()
    for (const [, members] of blocks) {
      // trigger on whichever member sits highest on the page
      const lead = members.reduce((a, b) =>
        a.getBoundingClientRect().top <= b.getBoundingClientRect().top ? a : b)
      leads.set(lead, members)
    }

    const play = members => {
      for (const el of members) {
        if (el.dataset.rv !== 'lines') el.style.transitionDelay = `${+(el.dataset.at || 0)}ms`
        el.classList.add('in')
      }
    }
    // Going back up, the block tidies itself away in reverse order and with no
    // delays, so it feels like retreating rather than a second performance.
    const reset = members => {
      for (const el of members) {
        el.style.transitionDelay = '0ms'
        el.querySelectorAll('.w').forEach(w => { w.style.transitionDelay = '0ms' })
        el.classList.remove('in')
      }
    }
    const restage = members => {
      for (const el of members) {
        if (el.dataset.rv !== 'lines') continue
        const base = +(el.dataset.at || 0)
        el.querySelectorAll('.w').forEach((w, i) => {
          w.style.transitionDelay = `${base + i * LINE_STEP}ms`
        })
      }
    }

    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        const members = leads.get(e.target)
        if (!members) continue
        if (e.isIntersecting) { restage(members); play(members) }
        // only reset when the block has dropped back BELOW the viewport;
        // leaving off the top means you have simply scrolled past it
        else if (e.boundingClientRect.top > 0) reset(members)
      }
    }, { rootMargin: `0px 0px -${Math.round((1 - TRIGGER) * 100)}% 0px` })

    leads.forEach((_, lead) => io.observe(lead))
    return () => io.disconnect()
  }, [])
  return null
}
