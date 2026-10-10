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
// seconds between items in a one-shot group - halved on a phone, where a long
// stagger reads as the page struggling to keep up
const STEP = 0.15
const step = () => (innerWidth <= 734 ? STEP / 2 : STEP)
const TRIGGER = 0.85   // fraction of viewport height

// the follower, all four numbers theirs
const START = 1.08     // progress opens with the top at 108% of the viewport
const WINDOW = 0.40    // and completes over the next 40%
// The reference fits "current += (target - current) * 0.15" and notes it is
// 0.15 AT 60FPS - a time constant of ~100ms. Written as a per-frame constant
// it is not that: it is 0.15 per frame at whatever rate the display happens to
// be running. On a ProMotion Mac that rate CHANGES DURING A SCROLL (120 down
// to 80 or 60 and back), so the damping changed speed mid-move, which is what
// made the motion look broken. Measured here: the whole decay finished in
// 143ms against the reference's ~690ms. So decay against real elapsed time.
const TAU = 0.1        // seconds; the reference's ~100ms, now actually that
const DT_MAX = 0.05    // a tab-switch must not arrive as one enormous step
const AMP = [60, 80]   // travel, alternating down a group
// A phone is a fifth of the width and the travel was written for a laptop, so
// 60-80px of it there is a lurch rather than a lift. Everything moves less.
const PHONE = 734
const softness = () => (innerWidth <= PHONE ? 0.45 : 1)

// ---------------------------------------------------------------- the modes
// One damped value, several ways of spending it. Every mode below is driven by
// the SAME `cur` the follower already computes, so none of them is a second
// animation: they stay attached to the scroll exactly as the rise does, and a
// flick overshoots them all the same way.
//
// `data-in` on the element picks one. Without it a block rises, which is what
// the whole site did before and still does wherever nothing else is better.
//   lift  - rises half as far and settles out of a slight scale: for devices
//           and screens, where a long travel reads as the picture sliding
//   side  - comes in from its own side of a row, alternating down the group
//   blur  - the defocus apple.com uses on a held frame; t^1.7, measured
//   scale - no travel at all, just opens out. For something already centred.
//   mask  - wipes up behind its own edge. Theatrical, so: full-bleed only.
const MODES = {
  lift: (u, amp) => ({ tf: `translate3d(0,${(u * amp * 0.5).toFixed(2)}px,0) scale(${(1 - 0.05 * u).toFixed(4)})` }),
  side: (u, amp, dir) => ({ tf: `translate3d(${(u * amp * 0.8 * dir).toFixed(2)}px,0,0)` }),
  blur: (u, amp) => ({ tf: `translate3d(0,${(u * amp * 0.55).toFixed(2)}px,0)`,
                       filter: `blur(${(Math.pow(u, 1.7) * 11).toFixed(2)}px)` }),
  scale: u => ({ tf: `scale(${(1 - 0.075 * u).toFixed(4)})` }),
  mask: (u, amp) => ({ tf: `translate3d(0,${(u * amp * 0.3).toFixed(2)}px,0)`,
                       clip: `inset(0 0 ${(u * 100).toFixed(1)}% 0)` }),
}

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
        const amp = (Number(el.dataset.amp) || AMP[i % AMP.length]) * softness()
        // which way a `side` block comes from: its own side of the row
        const dir = i % 2 ? 1 : -1
        const mode = MODES[el.dataset.in] ? el.dataset.in : null
        // will-change is NOT set here. The reference switches it on only while
        // the element is near and off again when it has arrived; setting it on
        // every tracked element at load promoted 40 layers at once on Peak,
        // which costs GPU memory and causes the jank it is meant to avoid.
        return { el, amp, dir, mode, cur: 0, live: false, done: false, forced: false }
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
        // every mode's own property, cleared with the rest
        t.el.style.filter = ''; t.el.style.clipPath = ''
        t.el.classList.add('in')
      }
      const byEl = new Map(tracked.map(t => [t.el, t]))
      const io = new IntersectionObserver(es => {
        for (const e of es) {
          const t = byEl.get(e.target)
          if (!t || t.done) continue
          t.live = e.isIntersecting
          // on only while it is near, off the moment it is not
          t.el.style.willChange = e.isIntersecting
            ? (t.mode === 'blur' ? 'opacity, transform, filter' : 'opacity, transform') : ''
          if (!e.isIntersecting && e.boundingClientRect.bottom < 0) arrive(t)
        }
        schedule()
      }, { rootMargin: '25% 0px 25% 0px' })
      tracked.forEach(t => io.observe(t.el))

      // Read every rect first, then write every style. Interleaving them makes
      // each write invalidate layout and each following read force it back -
      // measured at 46fps with a third of frames over 24ms. Split, it is two
      // layouts a frame instead of two per element.
      let last = 0
      const schedule = () => {
        // `last` is reset on the way in, never on the way out: a loop that has
        // been idle for a second must not resume with a one-second step.
        if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick) }
      }
      const tick = now => {
        raf = 0
        const dt = Math.min((now - last) / 1000, DT_MAX)
        last = now
        // exponential decay over real elapsed time: the same curve at 60Hz,
        // 90Hz and 120Hz, and unchanged by a dropped frame
        const chase = 1 - Math.exp(-dt / TAU)
        let busy = false
        const h = innerHeight
        const live = tracked.filter(t => (t.live || t.forced) && !t.done)
        const rects = live.map(t => t.el.getBoundingClientRect())      // read
        for (let i = 0; i < live.length; i++) {                        // write
          const t = live[i]
          const target = t.forced ? 1 : progressOf(rects[i], h)
          t.cur += (target - t.cur) * chase
          const settled = Math.abs(target - t.cur) < 0.0015
          if (settled) t.cur = target
          // once it has arrived it stays arrived - scrolling back up must not
          // undo the page, same as the one-shot path. `.in` marks it so the
          // guard's "entrance never played" check reads this path too.
          if (t.cur > 0.999) { arrive(t); continue }
          t.el.style.opacity = String(t.cur)
          const u = 1 - t.cur
          if (t.mode) {
            const m = MODES[t.mode](u, t.amp, t.dir)
            t.el.style.transform = m.tf
            if (m.filter) t.el.style.filter = m.filter
            if (m.clip) t.el.style.clipPath = m.clip
          } else {
            t.el.style.transform = `translate3d(0,${(u * t.amp).toFixed(2)}px,0)`
          }
          if (!settled) busy = true
        }
        if (busy) { last = now; raf = requestAnimationFrame(tick) }
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
          // gone above the fold - nobody is watching, finish it outright
          if (r.bottom < 0) { arrive(t); continue }
          // Everything else the sweep catches is FORCED, not arrived: the
          // frame loop still walks it in on its own curve. arrive() here was
          // a hard cut to the finished state 120ms after the scroll stopped,
          // which chopped the damping off half way through - measured, the
          // whole move was over in 143ms instead of settling over ~650ms.
          if (progressOf(r, h) >= 1 || (atEnd && r.top < h)) {
            t.forced = true
            t.el.style.willChange = 'opacity, transform'
            schedule()
          }
        }
      }
      const onScrollCine = () => {
        schedule()
        clearTimeout(ct); ct = setTimeout(sweepCine, 120)
      }
      addEventListener('scroll', onScrollCine, { passive: true })
      addEventListener('resize', onScrollCine, { passive: true })
      sweepCine()
      schedule()

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
          el.style.setProperty('--d', `${i * step()}s`)
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
