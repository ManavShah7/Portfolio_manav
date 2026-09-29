import Link from 'next/link'

import Reveal from '@/components/Reveal'
import Intro from '@/components/Intro'
import { Lines } from '@/components/Chrome'
import * as C from '@/lib/home-copy'

// Built to Manav's frame in design units (.du), the same as the case studies:
// --u is one design px, so every number here is read straight off the export.
const IMG = n => `/media/home/${n}.webp`

export default function Home() {
  return (
    <>
      <main className="hm du cine">
        {/* ---- header ---- */}
        <header className="hm-top">
          <div className="hm-me" data-reveal>
            <p className="p30 c-2">{C.me.kind}</p>
            <p className="p48 hm-pink">{C.me.name}</p>
          </div>
          <nav className="hm-nav" aria-label="Site" data-reveal>
            {C.nav.map(n => <a key={n.label} className="p30 c-2" href={n.href}>{n.label}</a>)}
          </nav>
        </header>

        {/* ---- the line, on the gradient the frame draws. The gradient is
                its own layer so it can breathe as the band crosses the screen;
                without it the band was white and so was the line. ---- */}
        <section className="hm-band">
          <span className="hm-band-bg" aria-hidden="true" data-sv="zoom" />
          {/* the clipped line reveal, Apple Music's .swipe-up-reveal: each
              line rises out of its own box, 300ms apart. Theatrical, so it is
              used here and nowhere else - this is the first line anyone reads. */}
          <p className="p46 center" data-reveal data-swipe>
            <Lines lines={C.hero} swipe />
          </p>
        </section>

        {/* ---- the work: every screen the frame draws is a case study ---- */}
        {/* Every screen is still its case study, but the updated frame draws
            them empty, so the mockups carry their own blank screens and
            nothing is composited on top. */}
        <section className="hm-devices" aria-label="Selected work" data-stagger>
          {C.devices.map(d => (
            <Link key={d.slug} href={`/work/${d.slug}`} className={`hm-dev ${d.cls}`}
                  aria-label={`${d.name} case study`} data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG(d.img)} alt="" />
              <span className="hm-dev-name p30">{d.name}</span>
            </Link>
          ))}
        </section>

        {/* ---- purpose ---- */}
        <section className="hm-purpose">
          <h2 className="p59 hm-pink hm-purpose-head" data-reveal><Lines lines={C.purpose.head} /></h2>
          <p className="p45 hm-purpose-body" data-reveal><Lines lines={C.purpose.body} /></p>
        </section>

        {/* ---- the wall: the frame's collage, tile for tile. Each tile rises
                in with the stagger and then drifts at its own rate while the
                wall crosses the screen ---- */}
        <section className="hm-wall" aria-label="Selected work" data-stagger>
          {C.work.map(({ n, r: [x, y, w, h], d }) => (
            <figure key={n} className="hm-wall-item" data-reveal
                    style={{ '--x': x, '--y': y, '--w': w, '--h': h }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG(n)} alt="" loading="lazy" data-sv="drift"
                   style={{ '--drift': `${Math.round(d / 6)}px` }} />
            </figure>
          ))}
        </section>
      </main>
      <Intro />
      <Reveal />
    </>
  )
}
