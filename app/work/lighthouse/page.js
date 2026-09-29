import { Page, Lines, Outro, para } from '@/components/Chrome'
import { CaseHero } from '@/components/Case'
import OtherWork from '@/components/OtherWork'
import Frame from '@/components/Frame'
import { media } from '@/lib/clips'
import * as C from '@/lib/lighthouse-copy'

export const metadata = {
  title: 'Lighthouse AI',
  description: 'Lighthouse AI - Navi, a plan that grows with you, and a Knowledge Base. Case study by Manav Shah.',
}

const IMG = n => `/media/lighthouse-${n}.webp`
const GREEN = '#029322'

// Built to Manav's frame in design units: `--u` is one design px, so every
// number below is read straight off lighthouse.png. Type pitches measured on
// it - intro 57, the photo copy 60, the statement 94, the headings 85, the
// captions 48 - and Figma's auto leading means size = pitch / 1.2.
//
// Every device is drawn empty, which is how the frame has it. The photography
// is cut out of the export itself; where the frame set type over a photo, the
// words were painted back out so they can be live text here.
// Manav has pulled this one back to rework it. The whole case study below is
// still here and still correct - flip this one switch and it returns exactly
// as it was. Until then the route answers honestly instead of 404ing, and
// hands people the rest of the work.
const MAINTENANCE = true

function Maintenance() {
  return (
    <Page title="Lighthouse AI" here="lighthouse">
      <div className="lh-wip du cine">
        <section className="du-sec" style={{ '--pt': 300, '--pb': 40 }}>
          <div className="du-x" style={{ '--x': 190 }}>
            <p className="p28 w500 lh-wip-eyebrow" data-reveal>Lighthouse AI</p>
            <h1 className="p70 lh-wip-head" data-reveal>
              <Lines lines={['This case study is', 'being rewritten.']} />
            </h1>
            <p className="p30 w500 lh-wip-body" data-reveal>
              {para(['It will be back here shortly. In the meantime, the rest of',
                     'the work is below.'])}
            </p>
          </div>
        </section>

        <OtherWork slug="lighthouse" headX={190} other={{ pt: 180, pb: 0 }} />
        <Outro x={190} pt={164} pb={220} />
      </div>
    </Page>
  )
}

export default function Lighthouse() {
  if (MAINTENANCE) return <Maintenance />
  return (
    <Page title="Lighthouse AI" dark here="lighthouse">
      <div className="lh du cine">
        <CaseHero clip={media('lighthouse-hero') || media('times-court')} className="lh-hero">
          {C.intro.map((lines, i) => (
            <p key={i} className="p48 lh-intro" data-reveal><Lines lines={lines} /></p>
          ))}
        </CaseHero>

        {/* ---- the laptop at night: the photo holds the right half, the line
                sits on the black beside it ---- */}
        <section className="lh-desk">
          <p className="p50 lh-desk-copy" data-reveal><Lines lines={C.access} /></p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lh-desk-shot" src={IMG('desk')} alt="" loading="lazy" />
        </section>

        {/* ---- the turn, on the water the sea photo comes out of ---- */}
        <section className="lh-turn">
          <p className="p70 center" data-reveal><Lines lines={C.lost} /></p>
        </section>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="lh-sea" src={IMG('buoy')} alt="" loading="lazy" />

        {/* ---- research ---- */}
        <section className="du-sec bg-fill" style={{ '--pt': 170, '--pb': 241 }}>
          <h2 className="p65 center du-w" style={{ '--mw': 1400 }} data-reveal>
            <Lines lines={C.research.headline} />
          </h2>
          <figure className="lh-shot du-w" style={{ '--mw': 884, '--mt': 160 }} data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG('hours')} alt="" loading="lazy" />
            <figcaption className="p45"><Lines lines={C.research.shot} /></figcaption>
          </figure>
          <div className="du-w lh-cards" style={{ '--mw': 888, '--mt': 31 }} data-stagger>
            {C.research.cards.map((lines, i) => (
              <div key={i} className="lh-card" data-reveal>
                <p className="p32"><Lines lines={lines} /></p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- the people, on the green ---- */}
        <section className="lh-green">
          <h2 className="p60 lh-green-head" data-reveal><Lines lines={C.talked} /></h2>
        </section>

        {/* ---- the solution ---- */}
        <section className="du-sec" style={{ '--pt': 362, '--pb': 0 }}>
          <h2 className="p80 center du-w" style={{ '--mw': 1400, color: GREEN }} data-reveal>
            <Lines lines={C.solution.headline} />
          </h2>

          <h3 className="p70 du-x" style={{ '--x': 234, marginTop: 'calc(363 * var(--u))' }} data-reveal>
            <Lines lines={C.solution.navi.head} />
          </h3>
          <div className="du-w" style={{ '--mw': 1215, '--mt': 113 }} data-reveal>
            <Frame kind="ipad" w={1215} />
          </div>
          <p className="p40 center du-w" style={{ '--mw': 1100, '--mt': 78 }} data-reveal>
            {para(C.solution.navi.caption)}
          </p>

          {C.solution.rows.map((row, i) => {
            const dev = <div key="d" className="lh-row-dev" data-reveal><Frame kind="ipad" w={row.dw} /></div>
            const copy = <p key="c" className="p60 lh-row-copy" style={{ '--ac': GREEN }} data-reveal>
              <Lines lines={row.lines} /></p>
            return (
              <div key={i} className="lh-row" data-stagger
                   style={{ '--mt': row.mt, '--dx': row.dx, '--dw': row.dw,
                            '--cx': row.cx, '--cgap': row.cgap, '--cw': row.cw, '--cy': row.cy }}>
                {row.copyFirst ? [copy, dev] : [dev, copy]}
              </div>
            )
          })}

          <h3 className="p70 center du-w" style={{ '--mw': 1400, '--mt': 317, '--ac': GREEN }} data-reveal>
            <Lines lines={C.solution.guide} />
          </h3>
          <div className="du-w" style={{ '--mw': 882, '--mt': 107 }} data-reveal>
            <Frame kind="ipad" w={882} />
          </div>
        </section>

        <Outro x={156} pt={1864} pb={299} />
      </div>
    </Page>
  )
}
