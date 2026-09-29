import { Page, Lines, Outro } from '@/components/Chrome'
import { CaseHero } from '@/components/Case'
import Frame from '@/components/Frame'
import { Video } from '@/components/Media'
import { media } from '@/lib/clips'
import * as C from '@/lib/liveasy-copy'

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
    <Page title="Liveasy" dark>
      <div className="lv du">
        <CaseHero clip={media('liveasy-hero') || media('times-court')} className="lv-hero">
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

          <section className="du-sec bg-dark" style={{ '--pt': 0, '--pb': 0 }}>
            <div className="lv-points lv-points-dark">
              {C.problem.items.slice(2).map((lines, i) => (
                <p key={i} className="p38" data-reveal><Lines lines={lines} /></p>
              ))}
            </div>

            {/* ---- the four pillars ---- */}
            <h2 className="p64 du-x lv-res-head" style={{ '--x': 261 }} data-reveal>
              <Lines lines={C.research.headline} />
            </h2>
            <div className="lv-cards" data-stagger>
              {C.research.cards.map((lines, i) => (
                <div key={i} className="lv-card" data-reveal>
                  <p className="p38"><Lines lines={lines} /></p>
                </div>
              ))}
            </div>
          </section>

          <div className="lv-run-pin" aria-hidden="true"><Frame kind="mac" w={760} /></div>
        </div>

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
            <p className="p80 center" style={{ color: ORANGE }}><Lines lines={C.band} /></p>
          </div>
        </section>

        {/* ---- the redesign, one device a row. The copy comes first in the
                middle row, which is the one the frame draws mirrored. ---- */}
        <section className="du-sec" style={{ '--pt': 0, '--pb': 0 }}>
          {C.solution.map((row, i) => {
            const dev = <div key="d" className="lv-row-dev" data-reveal><Frame kind={row.dev} w={row.w} /></div>
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

        <Outro x={156} pt={334} pb={267} />
      </div>
    </Page>
  )
}
