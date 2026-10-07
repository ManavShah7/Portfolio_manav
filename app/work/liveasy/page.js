import { Page, Lines, Outro, para } from '@/components/Chrome'
import { CaseHero } from '@/components/Case'
import OtherWork from '@/components/OtherWork'
import Frame from '@/components/Frame'
import Faq from '@/components/Faq'
import Lockup from '@/components/Lockup'
import { Video } from '@/components/Media'
import { media } from '@/lib/clips'
import * as C from '@/lib/liveasy-copy'
import { WORK } from '@/lib/work'
import LocalNav from '@/components/LocalNav'

const ME = WORK.find(w => w.slug === 'liveasy')

export const metadata = {
  title: 'Liveasy',
  description: 'Liveasy - a dated logistics landing page, redesigned on four design pillars. Case study by Manav Shah.',
}

const band = media('liveasy-band')
const ORANGE = '#E03000'

// Built to Manav's frame in design units: `--u` is one design px, so every
// number below is read straight off liveasy.png. Type pitches measured on it -
// intro 54, headline 84, the points 45, the band line 96, the captions 60 -
// and Figma's auto leading means size = pitch / 1.2.
//
// Every device is drawn empty, which is how the frame has it.

// The section bar's list. It lives next to the page rather than in the copy
// file because these are navigation labels, not his words - and each id below
// is on a section in the JSX.
const SECS = [
  { id: 'why', label: 'Why' },
  { id: 'pillars', label: 'Pillars' },
  { id: 'redesign', label: 'Redesign' },
  { id: 'learnings', label: 'Learnings' },
  { id: 'faq', label: 'FAQ' },
]

export default function Liveasy() {
  return (
    <Page title="Liveasy" dark here="liveasy">
      <LocalNav name="Liveasy" items={SECS} />
      <div className="lv du cine">
        <CaseHero clip={media('liveasy-hero') || media('times-court')} className="lv-hero" title={
          <Lockup eyebrow="Liveasy" head={C.hero.line}
                  tags={C.hero.tags} meta={C.credits} />
        }>
          {C.intro.map((lines, i) => (
            <p key={i} className="p45 lv-intro" data-reveal><Lines lines={lines} /></p>
          ))}
        </CaseHero>

        {/* ---- why the redesign was necessary. The laptop holds still while
                all four points run past it, across the white/black seam. ---- */}
        <div className="lv-run" id="why">
          <section className="du-sec" style={{ '--pt': 264, '--pb': 155 }}>
            <h2 className="p70 center du-w" style={{ '--mw': 1400 }} data-reveal>
              <Lines lines={C.problem.headline} />
            </h2>
            <div className="lv-points">
              {C.problem.items.slice(0, 2).map((lines, i) => (
                <p key={i} className="p38" data-reveal><Lines lines={lines} /></p>
              ))}
            </div>
          </section>

          {/* The pinned run ENDS here, with the fourth point. It used to run
              on through the pillars below, and since the pin box is
              `bottom:0` of this wrapper the laptop stayed stuck to the
              screen all the way down them. */}
          <section className="du-sec bg-dark" style={{ '--pt': 0, '--pb': 210 }}>
            <div className="lv-points lv-points-dark">
              {C.problem.items.slice(2).map((lines, i) => (
                <p key={i} className="p38" data-reveal><Lines lines={lines} /></p>
              ))}
            </div>
          </section>

          {/* the page it replaced, scrolling past inside the laptop while the
              four points that describe it scroll past on the right */}
          <div className="lv-run-pin" aria-hidden="true">
            <Frame kind="mac" w={760} shot={C.shots.old} />
          </div>
        </div>

        {/* ---- the four pillars. Same black ground, so the seam with the
                section above does not show. ---- */}
        {/* --pb was 0, so the last pair of cards ended exactly on the orange
            band's first pixel - no gap at all, the cards read as sitting on
            top of it rather than above it. */}
        <section className="du-sec bg-dark" id="pillars" style={{ '--pt': 0, '--pb': 150 }}>
          <div className="du-x lv-res-head" style={{ '--x': 261 }}>
            <p className="p28 w500" data-reveal>{C.research.eyebrow}</p>
            <h2 className="p64" data-reveal><Lines lines={C.research.headline} /></h2>
            <p className="p26 w500 lv-res-aside" data-reveal>{para(C.research.aside)}</p>
          </div>
          <div className="lv-cards" data-stagger>
            {C.research.cards.map((c, i) => (
              <div key={i} className="lv-card" data-reveal>
                <p className="p38"><Lines lines={c.title} /></p>
                <p className="p32 w500 lv-card-body">{para(c.body)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- the orange band: the film plays full bleed and the line shrinks
                down into it, the way apple.com/macbook-pro does its chip film.
                Nothing is clipped - a black layer in `multiply` over the film
                carries the line in white, so the film shows only through the
                letterforms. ---- */}
        <section className="mx lv-band" style={{ '--mx-origin': '50.7% 50.8%', '--mx-em': 13.4 }}>
          <div className="mx-stage">
            <div className="mx-still"
                 style={band?.poster ? { backgroundImage: `url(${band.poster})` } : undefined} />
            {band?.video && <Video src={band.src} poster={band.poster} className="mx-film" />}
            <div className="mx-mask" aria-hidden="true">
              <p className="mx-text"><Lines lines={C.band} /></p>
            </div>
          </div>
          <div className="mx-read">
            <p className="p80 center mx-line" style={{ '--band-ink': ORANGE }}><Lines lines={C.band} /></p>
          </div>
        </section>

        {/* ---- the redesign, three screens deep. One laptop a row, each with
                its line centred underneath. ---- */}
        <section className="du-sec" id="redesign" style={{ '--pt': 200, '--pb': 0 }}>
          <div className="du-w lv-screens" style={{ '--mw': 1300 }} data-stagger>
            {C.screens.map((sc, i) => (
              <figure key={i} className="lv-screen" data-reveal data-amp={i % 2 ? 76 : 52}>
                <Frame kind="mac" w={1300} shot={C.shots[sc.shot]} />
                <figcaption className="p32 w500 lv-screen-cap">
                  <Lines lines={sc.lines} />
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ---- learnings ---- */}
        <section className="du-sec" id="learnings" style={{ '--pt': 240, '--pb': 0 }}>
          <p className="p28 w500 center" data-reveal>{C.learned.eyebrow}</p>
          <h2 className="p60 center lv-learn-head" data-reveal><Lines lines={C.learned.head} /></h2>
          <p className="p26 w500 center lv-learn-aside" data-reveal>{para(C.learned.aside)}</p>
          <div className="du-w lv-learn" style={{ '--mw': 1560, '--mt': 120 }} data-stagger>
            {C.learned.cards.map((c, i) => (
              <div key={i} className="lv-learn-c" data-reveal data-amp={[52, 76, 52][i]}>
                <h3 className="p32 lv-learn-h"><Lines lines={c.head} /></h3>
                <p className="p26 w500 lv-learn-b">{para(c.body)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <Faq eyebrow={C.faq.eyebrow} head={C.faq.head} items={C.faq.items} id="faq" x={240} pt={240} />

        <OtherWork slug="liveasy" headX={156} other={{ pt: 334, pb: 0 }} />
        <Outro x={156} pt={164} pb={267} />
      </div>
    </Page>
  )
}
