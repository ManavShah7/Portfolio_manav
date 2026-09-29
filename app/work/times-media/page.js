import { Page, Lines, Outro, para } from '@/components/Chrome'
import { CaseHero } from '@/components/Case'
import Frame from '@/components/Frame'
import OtherWork from '@/components/OtherWork'
import { Media, Video } from '@/components/Media'
import { media, slots } from '@/lib/clips'
import * as C from '@/lib/times-copy'

export const metadata = {
  title: 'Times Media',
  description: 'Times Media - one system, three platforms, for 660+ billboards across Gujarat. Case study by Manav Shah.',
}

const V = slots('times')
const waves = media('times-waves')
const RED = '#F5222D'

// Built to Manav's frame in design units, the same way Peak is: `--u` is one
// design px, so every number below is read straight off the export and the
// laptop sees the frame in proportion. Type pitches measured off it:
// intro 57, headlines 72, the solution line 85, body 45, quotes 41 - and
// Figma's auto leading means size = pitch / 1.2.
const cap = (lead, rest) => <><b>{lead}</b>{rest}</>

export default function TimesMedia() {
  return (
    <Page title="Times Media" dark>
      <div className="tm du cine">
        <CaseHero clip={media('times-court')} className="tm-hero">
          {C.intro.map((lines, i) => (
            <p key={i} className="p48 tm-intro" data-reveal>{para(lines)}</p>
          ))}
        </CaseHero>

        {/* ---- research ---- */}
        <section className="du-sec" style={{ '--pt': 185, '--pb': 62 }}>
          <div className="du-w" style={{ '--mw': 1400 }}>
            <h2 className="p60 center" style={{ '--ac': RED }} data-reveal>
              <Lines lines={C.research.headline} />
            </h2>
          </div>
          <div className="du-w tm-owner" style={{ '--mw': 1161, '--mt': 229 }} data-reveal>
            <Media clip={V('owner')} ratio="1 / 1" className="tm-owner-shot" />
            <blockquote className="p34 tm-owner-quote">{para(C.research.quote)}</blockquote>
          </div>
          <div className="du-w tm-voices" style={{ '--mw': 1161, '--mt': 97 }} data-stagger>
            {C.research.voices.map((v, i) => (
              <figure key={i} className="tm-voice" data-reveal>
                <blockquote className="p34">{para(v.lines)}</blockquote>
                <figcaption className="p24 c-2"><Lines lines={v.who} /></figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ---- the four ways it broke. The deck holds still while all four
                scroll past it, across the white/black seam - one sticky frame
                spanning both sections. ---- */}
        <div className="tm-run">
          <section className="du-sec" style={{ '--pt': 185, '--pb': 104 }}>
            <h2 className="p70 du-x" style={{ '--x': 237 }} data-reveal>
              <Lines lines={C.problem.headline} />
            </h2>
            <div className="tm-broke-copy" data-stagger>
              {C.problem.items.slice(0, 2).map((it, i) => (
                <p key={i} className="p38 lit" data-reveal>{cap(para(it.lead), para(it.lines))}</p>
              ))}
            </div>
          </section>

          <section className="du-sec bg-dark" style={{ '--pt': 102, '--pb': 170 }}>
            <div className="tm-broke-copy" data-stagger>
              {C.problem.items.slice(2).map((it, i) => (
                <p key={i} className="p38 lit" data-reveal>{cap(para(it.lead), para(it.lines))}</p>
              ))}
            </div>
          </section>

          <div className="tm-run-pin" aria-hidden="true">
            <Frame kind="ipad" w={703} />
          </div>
        </div>

        <section className="du-sec bg-dark" style={{ '--pt': 0, '--pb': 0 }}>
          {/* ---- the solution ---- */}
          <div className="du-w" style={{ '--mw': 1400, '--mt': 445 }}>
            <h2 className="p70 center" style={{ '--ac': RED }} data-reveal>
              <Lines lines={C.solution.headline} />
            </h2>
          </div>

          <div className="du-w" style={{ '--mw': 1230, '--mt': 202 }} data-reveal>
            <Frame kind="ipad" w={1300} data-sv="rise" />
          </div>
          <p className="p38 lit center du-w" style={{ '--mw': 1100, '--mt': 116 }} data-reveal>
            {cap(C.solution.admin.lead, C.solution.admin.line)}
          </p>

          <h3 className="p60 du-x" style={{ '--x': 273, marginTop: 'calc(344 * var(--u))' }} data-reveal>
            <Lines lines={C.solution.siteHead} />
          </h3>
          <div className="tm-site">
            <div className="tm-site-media" data-reveal>
              <Frame kind="mac" w={905} />
            </div>
            <p className="p38 tm-site-copy" data-reveal>{para(C.solution.site)}</p>
          </div>
        </section>

        {/* ---- the red band. The film holds while the line scrolls up over it,
                the way apple.com/macbook-pro pins its performance film. ---- */}
        {/* The red band, as apple.com/macbook-pro does its chip film: the
            video plays full-bleed and a black layer over it in `multiply`
            carries the line in white, so the film shows only through the
            letterforms. The text starts at scale 400 - one stroke filling the
            screen, which reads as the film itself - and shrinks to 1 as you
            scroll. Nothing is clipped; it is all the blend. */}
        <section className="mx tm-waves" style={{ '--mx-origin': '47.6% 47.6%', '--mx-em': 12.0 }}>
          <div className="mx-stage">
            <div className="mx-still"
                 style={waves?.poster ? { backgroundImage: `url(${waves.poster})` } : undefined} />
            {waves?.video && <Video src={waves.src} poster={waves.poster} className="mx-film" />}
            <div className="mx-mask" aria-hidden="true">
              <p className="mx-text"><Lines lines={C.waves} /></p>
            </div>
          </div>
          {/* the line again, in the ink the frame gives it, for anyone whose
              browser has no scroll timeline and for screen readers */}
          <div className="mx-read">
            <p className="p70 center" style={{ color: RED }}><Lines lines={C.waves} /></p>
          </div>
        </section>

        {/* ---- 3D street view. The updated frame turns the ground back to
                white here and keeps it white all the way to the foot. ---- */}
        <section className="du-sec" style={{ '--pt': 437, '--pb': 240 }}>
          <h2 className="p70 du-x" style={{ '--x': 256 }} data-reveal>
            <Lines lines={C.street.headline} />
          </h2>
          {C.street.shots.map((sh, i) => (
            <div key={sh.slot} className="du-w tm-shot" style={{ '--mw': 1221, '--mt': i ? 342 : 225 }} data-reveal>
              <Frame kind="ipad" w={1221} />
              <p className="p38 center tm-cap">{para(sh.line)}</p>
            </div>
          ))}
          <div className="du-w tm-field" style={{ '--mw': 1296, '--mt': 281 }} data-stagger>
            <div data-reveal><Frame kind="ipad" w={883} /></div>
            <div data-reveal><Frame kind="phone" w={251} /></div>
          </div>
          <p className="p38 lit center du-w" style={{ '--mw': 1100, '--mt': 116 }} data-reveal>
            {cap(C.street.field.lead, C.street.field.line)}
          </p>
        </section>

        {/* ---- impact ---- */}
        <section className="du-sec" style={{ '--pt': 233, '--pb': 0 }}>
          <div className="du-w" style={{ '--mw': 1400 }}>
            <p className="p65 center" style={{ color: RED }} data-reveal><Lines lines={C.impact} /></p>
          </div>
        </section>

        <OtherWork slug="times-media" head={C.other} headX={403} other={{ pt: 164, pb: 0 }} />
        <Outro x={164} pt={225} pb={267} />
      </div>
    </Page>
  )
}
