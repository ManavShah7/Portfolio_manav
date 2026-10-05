import Link from 'next/link'

import Reveal from '@/components/Reveal'
import Intro from '@/components/Intro'
import { Lines, Footer, Outro } from '@/components/Chrome'
import Faq from '@/components/Faq'
import { Video } from '@/components/Media'
import { media } from '@/lib/clips'
import * as C from '@/lib/home-copy'
import { WORK } from '@/lib/work'

// Built to Manav's frame in design units (.du), the same as the case studies:
// --u is one design px, so every number here is read straight off the export.
const IMG = n => `/media/home/${n}.webp`
// the film behind the opening line, if he has dropped one in - the frame's
// gradient is the fallback and the poster
const heroFilm = media('home-hero')
const kindOf = slug => WORK.find(w => w.slug === slug)?.kind

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
            {C.nav.map(n => (
              <a key={n.label} className="p30 c-2" href={n.href}
                 {...(n.download ? { download: true } : null)}>{n.label}</a>
            ))}
          </nav>
        </header>

        {/* ---- the line, on his film. The film is its own layer so it can
                breathe as the band crosses the screen, and the poster stays on
                the layer as a background - so it reads the same before the
                clip loads and instead of it under reduced motion (rule 5).
                The still is the frame's own gradient where no clip is. ---- */}
        <section className="hm-band">
          <span className="hm-band-bg" aria-hidden="true" data-sv="zoom"
                style={{ backgroundImage: `url(${heroFilm?.poster || IMG('home-gradient')})` }}>
            {heroFilm?.video && <Video src={heroFilm.src} poster={heroFilm.poster} eager />}
          </span>
          {/* the clipped line reveal, Apple Music's .swipe-up-reveal: each
              line rises out of its own box, 300ms apart. Theatrical, so it is
              used here and nowhere else - this is the first line anyone reads. */}
          {/* the page's h1: it is the first and largest thing anyone reads,
              and the site had no h1 at all before */}
          <h1 className="p46 center hm-band-line" data-reveal data-swipe>
            <Lines lines={C.hero} swipe />
          </h1>
        </section>

        {/* ---- the work: every screen the frame draws is a case study ---- */}
        {/* Every screen is still its case study, but the updated frame draws
            them empty, so the mockups carry their own blank screens and
            nothing is composited on top. */}
        <section className="hm-devices" aria-label="Selected work" data-stagger>
          {C.devices.map(d => {
            // each device plays its own case study's film - the same clip the
            // project's slide carries at the foot of every case study
            const clip = media(`other-${d.slug}`) || (d.still ? { src: d.still } : null)
            // The screen rectangle is measured off the mockup, and the mockup's
            // inner edge is antialiased - so a rectangle that stops exactly at
            // the last fully-white pixel leaves a pale hairline all the way
            // round. OVER grows the box by a little under 1% of its own size on
            // every side; the corner radii are percentages of the box, so they
            // grow with it and the film still lands inside the rounded screen.
            const OVER = 0.009
            const [sl, st, sw, sh] = d.screen
            const l = sl - sw * OVER, t = st - sh * OVER
            const w = sw * (1 + 2 * OVER), h = sh * (1 + 2 * OVER)
            return (
              <Link key={d.slug} href={`/work/${d.slug}`} className={`hm-dev ${d.cls}`}
                    aria-label={`${d.name} case study`} data-reveal>
                {clip && (
                  <span className="hm-dev-screen"
                        style={{ left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%`,
                                 backgroundImage: `url(${clip.poster || clip.src})` }}>
                    {clip.video && <Video src={clip.src} poster={clip.poster} />}
                    {/* just the name, on the screen. It used to appear on
                        hover, which meant a phone saw four unlabelled
                        mockups. It lives inside the screen, not the device,
                        because the bezel is a different width on each. */}
                    {/* name, and under it what the thing actually IS. The
                        tiles used to be four names on four mockups, which
                        asked whoever is reading to open all four to find out
                        which one was relevant to them. `kind` comes from
                        lib/work.js so the home page and the case study can
                        never disagree. */}
                    <span className="hm-dev-tag">
                      <span className="hm-dev-name p30">{d.name}</span>
                      <span className="hm-dev-kind p20">{kindOf(d.slug)}</span>
                    </span>
                  </span>
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG(d.img)} alt="" />
              </Link>
            )
          })}
        </section>

        {/* ---- purpose ---- */}
        <section className="hm-purpose">
          <h2 className="p59 hm-pink hm-purpose-head" data-reveal><Lines lines={C.purpose.head} /></h2>
          <p className="p45 hm-purpose-body" data-reveal><Lines lines={C.purpose.body} /></p>
        </section>

        {/* ---- the wall: three justified rows of the UI work. Inside a row
                the tiles share the width in proportion to their own aspect,
                so every tile in a row is the same height and both ends of the
                row are flush - no overlaps, no crops, equal gaps. ---- */}
        <section className="hm-wall" aria-label="Other design work" data-stagger>
          {C.wall.map((row, i) => (
            <div key={i} className="hm-wall-row">
              {row.map(({ n, r: [w, h], d }) => (
                <figure key={n} className="hm-wall-item" data-reveal
                        style={{ '--w': w, '--h': h, '--a': (w / h).toFixed(4) }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMG(n)} alt="" loading="lazy" data-sv="drift"
                       style={{ '--drift': `${Math.round(d / 8)}px` }} />
                </figure>
              ))}
            </div>
          ))}
        </section>
        {/* the same accordion every case study closes on */}
        <Faq eyebrow={C.faq.eyebrow} head={C.faq.head} items={C.faq.items}
             x={190} pt={200} mw={1180} />

        {/* the same close every other page has: home used to end on the
            collage with no way to reach him */}
        <Outro x={190} pt={196} pb={216} />
      </main>
      <Footer />
      <Intro />
      <Reveal />
    </>
  )
}
