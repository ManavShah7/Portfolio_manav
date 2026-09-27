import { Page, Lines, para } from '@/components/Chrome'
import { CaseHero, NextProject } from '@/components/Case'
import { Media, Video } from '@/components/Media'
import { media, slots } from '@/lib/clips'
import * as C from '@/lib/times-copy'

export const metadata = {
  title: 'Times Media',
  description: 'Times Media - one system, three platforms, for 660+ billboards across Gujarat. Case study by Manav Shah.',
}

const V = slots('times')
const waves = media('times-waves')
const RED = '#F04250'
const SCREEN = '2476 / 1568'

// A copy block whose first run is in full ink and the rest in the quiet grey -
// the setting the frame already draws for these, and apple.com's "lit" copy.
const Lit = ({ lead, lines, className = 't-lead' }) => (
  <p className={`${className} lit`}><b>{para(lead)}</b> {para(lines)}</p>
)

// a line authored as styled segments: plain strings are the grey run,
// segments with a weight are the lit phrase
const segs = rows => rows.flat().map((s, i) =>
  typeof s === 'string' ? <span key={i}>{s} </span> : <b key={i}>{s.t} </b>)

// A feature: a screen recording beside its copy, alternating sides.
function Feature({ clip, flip, children }) {
  return (
    <div className={`grid feature${flip ? ' flip' : ''}`}>
      <div className="span-7 feature-media">
        <Media clip={clip} ratio={SCREEN} className="screen" data-sv="rise" />
      </div>
      <div className="span-5 feature-copy" data-reveal>{children}</div>
    </div>
  )
}

export default function TimesMedia() {
  return (
    <Page title="Times Media" dark>
      <CaseHero clip={media('times-pink')} className="tm-hero">
        {C.intro.map((lines, i) => (
          <p key={i} className="t-title intro-line tm-intro" data-reveal>{para(lines)}</p>
        ))}
      </CaseHero>

      {/* ---- research ---- */}
      <section className="section bg-fill">
        <div className="wrap">
          <div className="center head-gap">
            <h2 className="t-headline" style={{ '--ac': RED }} data-reveal>
              <Lines lines={C.research.headline} />
            </h2>
          </div>

          {/* the owner, and his words on the red beside him */}
          <div className="tm-owner card" data-reveal>
            <Media clip={V('owner')} ratio="1 / 1" className="tm-owner-shot" />
            <blockquote className="t-body tm-owner-quote">{para(C.research.quote)}</blockquote>
          </div>

          <div className="grid tm-voices" data-stagger>
            {C.research.voices.map((v, i) => (
              <figure key={i} className="span-6 card white tm-voice" data-reveal>
                <blockquote className="t-body">{para(v.lines)}</blockquote>
                <figcaption className="t-fine c-2"><Lines lines={v.who} /></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---- the four ways it broke: the deck holds still while they pass ---- */}
      <section className="section">
        <div className="wrap">
          <h2 className="t-headline head-gap" data-reveal><Lines lines={C.problem.headline} /></h2>
          <div className="hold">
            <div className="hold-media">
              <Media clip={V('problem')} ratio="912 / 550" className="screen"
                     alt="The PowerPoint: slide 246 of 550, one board per slide" />
            </div>
            <div className="hold-copy">
              {C.problem.items.map((it, i) => (
                <div key={i} data-reveal>
                  <span className="t-eyebrow problem-n" style={{ color: RED }}>{String(i + 1).padStart(2, '0')}</span>
                  <Lit lead={it.lead} lines={it.lines} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---- the solution ---- */}
      <section className="section bg-dark">
        <div className="wrap">
          <h2 className="t-hero center solution-head" data-reveal><Lines lines={C.solution.headline} /></h2>

          <Feature clip={V('admin')}>
            <p className="t-eyebrow c-3 eyebrow">Admin</p>
            <Lit lead={C.solution.admin.lead} lines={C.solution.admin.lines} />
          </Feature>
          <Feature clip={V('analytics')} flip>
            <p className="t-eyebrow c-3 eyebrow">Analytics</p>
            <p className="t-lead lit">{segs(C.solution.data)}</p>
          </Feature>

          <h3 className="t-headline center sub-head" data-reveal><Lines lines={C.solution.fieldHead} /></h3>
          <div className="grid" data-stagger>
            <div className="span-4" data-reveal>
              <Media clip={V('field')} ratio="3 / 4" className="screen field" />
              <p className="t-eyebrow c-3 cap">Field agents</p>
            </div>
            <div className="span-8" data-reveal>
              <Media clip={V('maintenance')} ratio="1.54" className="screen" />
              <p className="t-eyebrow c-3 cap">Maintenance</p>
            </div>
          </div>

          <h3 className="t-headline center sub-head" data-reveal><Lines lines={C.solution.siteHead} /></h3>
          <Media clip={V('hero')} ratio="3800 / 1664" className="screen" data-sv="grow" />
          <p className="t-lead lit center measure site-cap" data-reveal>
            <b>{para(C.solution.site)}</b>
          </p>
        </div>
      </section>

      {/* ---- the red band. The film holds while the line scrolls up over it,
              the way apple.com/macbook-pro pins its performance film: sticky
              stage, copy in normal flow above it, scrim darkening on scroll. */}
      <section className="pin tm-waves">
        <div className="pin-stage">
          <div className="pin-still" style={waves?.poster ? { backgroundImage: `url(${waves.poster})` } : undefined} />
          {waves?.video && <Video src={waves.src} poster={waves.poster} />}
          <div className="pin-scrim" />
        </div>
        <div className="wrap pin-copy tm-waves-copy">
          <p className="t-hero center" style={{ color: RED }} data-reveal>
            <Lines lines={C.waves} />
          </p>
        </div>
      </section>

      {/* ---- 3D street view ---- */}
      <section className="section bg-dark">
        <div className="wrap">
          <h2 className="t-headline head-gap" data-reveal><Lines lines={C.street.headline} /></h2>
          {C.street.shots.map(sh => (
            <div key={sh.slot} className="tm-shot" data-reveal>
              <Media clip={V(sh.slot)} ratio={SCREEN} className="screen" />
              <p className="t-body center measure tm-shot-cap">{para(sh.line)}</p>
            </div>
          ))}
          <div className="grid tm-field" data-stagger>
            <div className="span-8" data-reveal><Media clip={V('maintenance')} ratio="1.54" className="screen" /></div>
            <div className="span-4" data-reveal><Media clip={V('field')} ratio="3 / 4" className="screen field" /></div>
          </div>
          <p className="t-body lit center measure tm-shot-cap" data-reveal>
            <b>{C.street.field.lead}</b>{C.street.field.line}
          </p>
        </div>
      </section>

      {/* ---- impact ---- */}
      <section className="section">
        <div className="wrap center">
          <p className="t-hero impact" style={{ color: RED }} data-reveal><Lines lines={C.impact} /></p>
        </div>
      </section>

      <section className="section" style={{ paddingBottom: 0 }}>
        <div className="wrap"><h2 className="t-headline" data-reveal><Lines lines={C.other} /></h2></div>
      </section>
      <NextProject slug="times-media" />
    </Page>
  )
}
