import { Page, Lines, Outro, para } from '@/components/Chrome'
import { CaseHero } from '@/components/Case'
import OtherWork from '@/components/OtherWork'
import Frame from '@/components/Frame'
import { Video } from '@/components/Media'
import { media } from '@/lib/clips'
import * as C from '@/lib/liveasy-copy'
import { WORK } from '@/lib/work'

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
export default function Liveasy() {
  return (
    <Page title="Liveasy" dark here="liveasy">
      <div className="lv du cine">
        <CaseHero clip={media('liveasy-hero') || media('times-court')} className="lv-hero"
                  name={ME.name} line={ME.line} credits={C.credits}>
          {C.intro.map((lines, i) => (
            <p key={i} className="p45 lv-intro" data-reveal><Lines lines={lines} /></p>
          ))}
        </CaseHero>

        {/* ---- why the redesign was necessary. The laptop holds still while
                all four points run past it, across the white/black seam. ---- */}
        <div className="lv-run">
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
        <section className="du-sec bg-dark" style={{ '--pt': 0, '--pb': 150 }}>
          <h2 className="p64 du-x lv-res-head" style={{ '--x': 261 }} data-reveal>
            <Lines lines={C.research.headline} />
          </h2>
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

        {/* ---- the redesign, one device a row. The copy comes first in the
                middle row, which is the one the frame draws mirrored. ---- */}
        <section className="du-sec" style={{ '--pt': 0, '--pb': 0 }}>
          {C.solution.map((row, i) => {
            const dev = (
              <div key="d" className="lv-row-dev" data-reveal>
                <Frame kind={row.dev} w={row.w} shot={C.shots[row.shot]} alt={row.alt} />
              </div>
            )
            const copy = <p key="c" className="p50 lv-row-copy" data-reveal><Lines lines={row.lines} /></p>
            return (
              <div key={i} className="lv-row" data-stagger
                   style={{ '--mt': row.mt, '--dx': row.dx, '--dw': row.w,
                            '--cgap': row.cgap, '--cw': row.cw, '--cy': row.cy }}>
                {row.copyFirst ? [copy, dev] : [dev, copy]}
              </div>
            )
          })}
        </section>

        <OtherWork slug="liveasy" headX={156} other={{ pt: 334, pb: 0 }} />
        <Outro x={156} pt={164} pb={267} />
      </div>
    </Page>
  )
}
