'use client'
import { useEffect } from 'react'

// Entrances. Two systems, which is what apple.com actually ships
// (~/.claude/refs/apple-motion-2026.md, measured off their live pages).
//
// ONE-SHOT - the default. `data-reveal` rises and fades once when its top
// crosses 85% of the viewport; inside `data-stagger` the group fires together
// and steps 150ms apart. This is arcade's and books' `.has-fade`.
//
// FOLLOWER - inside a `.cine` scope. This is the one that feels expensive, and
// it is what the airpods and music pages use:
//
//   progress = clamp((108vh - elementTop) / 40vh, 0, 1)      linear, no easing
//   current += (target - current) * 0.15                     every frame
//
// All the softness is the value chasing the target with weight, so it stays
// attached to the scroll instead of being played back at you, and a fast flick
// overshoots gracefully instead of snapping. Opacity rides the same progress.
//
// The stagger is DISTANCE, not delay: neighbours travel 60 or 80px, so they
// arrive at different times no matter how fast the page is scrolled - which a
// transition-delay cannot do.
//
// Two safety nets on the one-shot path, both learned the hard way:
//   - IntersectionObserver only reports threshold CROSSINGS, so a fast flick
//     can carry a block past the trigger inside one frame and it never fires.
//     Once the scroll settles, anything above the trigger is played or shown.
//   - Anything already above the viewport on load (a deep link, a restored
//     scroll) is shown outright, with no performance.
const STEP = 0.15      // seconds between items in a one-shot group
const TRIGGER = 0.85   // fraction of viewport height

// the follower, all four numbers theirs
const START = 1.08     // progress opens with the top at 108% of the viewport
const WINDOW = 0.40    // and completes over the next 40%
const CHASE = 0.15     // decay per frame at 60fps; time constant ~100ms
const AMP = [60, 80]   // travel, alternating down a group

export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement
    if (root.classList.contains('reduced-motion')) return

    // --------------------------------------------------------------- follower
    // `data-swipe` wants the clipped line reveal instead, which is a CSS
    // transition driven by `.in` - so it stays on the one-shot path. Running
    // both on one element would fade the block while its lines slide.
    const cine = [...document.querySelectorAll('.cine [data-reveal]:not([data-swipe])')]
    let raf = 0
    if (cine.length) {
      const tracked = cine.map(el => {
        // amplitude alternates among siblings that share a parent, so a row of
        // cards breaks lockstep; a lone block takes the shorter travel
        const sibs = [...el.parentElement.children].filter(n => n.hasAttribute('data-reveal'))
        const i = Math.max(0, sibs.indexOf(el))
        const amp = Number(el.dataset.amp) || AMP[i % AMP.length]
        el.style.willChange = 'opacity, transform'
        return { el, amp, cur: 0, live: false, done: false }
      })

      // Arrive outright if the element is already past. The frame loop only
      // runs for elements near the viewport, so a flick that carries a block
      // clean past it would otherwise leave it at opacity 0 for good - the
      // same trap the one-shot path has a settle sweep for. The observer
      // entry carries the rect, so this costs nothing.
      // The target. Apple's mapping completes when the top reaches 68% of the
      // viewport, which assumes there is always more page below. Two places
      // here break that, and both showed up as blocks stuck part-faded:
      //   - the last row of home's wall sits at the very bottom of the
      //     document, so the scroll runs out before its top gets that high;
      //   - a carousel slide scrolled out sideways never intersects, so the
      //     frame loop never touches it at all.
      // Seeing the whole of something is the honest completion test, so a
      // bottom edge that is on screen counts as arrived either way.
      const progressOf = (r, h) => (r.bottom <= h ? 1
        : Math.min(1, Math.max(0, (START * h - r.top) / (WINDOW * h))))

      const arrive = t => {
        t.done = true; t.cur = 1
        t.el.style.opacity = ''; t.el.style.transform = ''; t.el.style.willChange = ''
        t.el.classList.add('in')
      }
      const io = new IntersectionObserver(es => {
        for (const e of es) {
          const t = tracked.find(x => x.el === e.target)
          if (!t || t.done) continue
          t.live = e.isIntersecting
          if (!e.isIntersecting && e.boundingClientRect.bottom < 0) arrive(t)
        }
        if (!raf) raf = requestAnimationFrame(tick)
      }, { rootMargin: '25% 0px 25% 0px' })
      tracked.forEach(t => io.observe(t.el))

      // Read every rect first, then write every style. Interleaving them makes
      // each write invalidate layout and each following read force it back -
      // measured at 46fps with a third of frames over 24ms. Split, it is two
      // layouts a frame instead of two per element.
      const tick = () => {
        raf = 0
        let busy = false
        const h = innerHeight
        const live = tracked.filter(t => t.live && !t.done)
        const rects = live.map(t => t.el.getBoundingClientRect())      // read
        for (let i = 0; i < live.length; i++) {                        // write
          const t = live[i]
          const target = progressOf(rects[i], h)
          t.cur += (target - t.cur) * CHASE
          const settled = Math.abs(target - t.cur) < 0.0015
          if (settled) t.cur = target
          // once it has arrived it stays arrived - scrolling back up must not
          // undo the page, same as the one-shot path. `.in` marks it so the
          // guard's "entrance never played" check reads this path too.
          if (t.cur > 0.999) { arrive(t); continue }
          t.el.style.opacity = String(t.cur)
          t.el.style.transform = `translate3d(0,${((1 - t.cur) * t.amp).toFixed(2)}px,0)`
          if (!settled) busy = true
        }
        if (busy) raf = requestAnimationFrame(tick)
      }
      // The observer is not enough on its own. A flick from above an element
      // to below it never crosses a threshold - not intersecting before, not
      // intersecting after - so no callback is delivered and the block would
      // sit at opacity 0 for good. Sweep once the scroll settles, exactly as
      // the one-shot path does, over the shrinking set that has not arrived.
      let ct
      const sweepCine = () => {
        const h = innerHeight
        // The foot of the document is the last word: if the page cannot scroll
        // any further, anything on screen has to be finished. Home's last wall
        // tile ends 25px below the fold at maximum scroll, so no position test
        // alone can ever complete it.
        const atEnd = scrollY + h >= document.documentElement.scrollHeight - 2
        for (const t of tracked) {
          if (t.done) continue
          const r = t.el.getBoundingClientRect()
          if (r.bottom < 0 || progressOf(r, h) >= 1 || (atEnd && r.top < h)) arrive(t)
        }
      }
      const onScrollCine = () => {
        if (!raf) raf = requestAnimationFrame(tick)
        clearTimeout(ct); ct = setTimeout(sweepCine, 120)
      }
      addEventListener('scroll', onScrollCine, { passive: true })
      addEventListener('resize', onScrollCine, { passive: true })
      sweepCine()
      raf = requestAnimationFrame(tick)

      var teardownCine = () => {
        io.disconnect()
        removeEventListener('scroll', onScrollCine)
        removeEventListener('resize', onScrollCine)
        if (raf) cancelAnimationFrame(raf)
        clearTimeout(ct)
      }
    }

    // --------------------------------------------------------------- one-shot
    const items = [...document.querySelectorAll('[data-reveal]')]
      .filter(el => !el.closest('.cine') || el.hasAttribute('data-swipe'))
    if (!items.length) return teardownCine

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
    return () => {
      io.disconnect(); removeEventListener('scroll', onScroll); clearTimeout(t)
      if (teardownCine) teardownCine()
    }
  }, [])
  return null
}
