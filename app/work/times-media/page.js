import { Page, Lines, Outro, para } from '@/components/Chrome'
import { CaseHero } from '@/components/Case'
import Frame from '@/components/Frame'
import OtherWork from '@/components/OtherWork'
import Flip from '@/components/Flip'
import Faq from '@/components/Faq'
import Lockup from '@/components/Lockup'
import { Media, Video } from '@/components/Media'
import { media, slots } from '@/lib/clips'
import * as C from '@/lib/times-copy'
import LocalNav from '@/components/LocalNav'

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

// The section bar's list. It lives next to the page rather than in the copy
// file because these are navigation labels, not his words - and each id below
// is on a section in the JSX.
const SECS = [
  { id: 'research', label: 'Research' },
  { id: 'problem', label: 'Problem' },
  { id: 'solution', label: 'Solution' },
  { id: 'in-the-field', label: 'In the field' },
  { id: 'impact', label: 'Impact' },
  { id: 'feedback', label: 'Feedback' },
  { id: 'learnings', label: 'Learnings' },
  { id: 'faq', label: 'FAQ' },
]

export default function TimesMedia() {
  return (
    <Page title="Times Media" dark here="times-media">
      <LocalNav name="Times Media" items={SECS} />
      <div className="tm du cine">
        <CaseHero clip={media('times-court')} className="tm-hero" title={
          <Lockup eyebrow="Times Media" head={C.hero.line}
                  tags={C.hero.tags} meta={C.credits} />
        }>
          {/* each line rises out of its own box, a beat apart, over the film */}
          {C.intro.map((lines, i) => (
            <p key={i} className="p48 tm-intro" data-reveal data-swipe>
              <Lines lines={lines} swipe />
            </p>
          ))}
        </CaseHero>

        {/* ---- research ---- */}
        <section className="du-sec" id="research" style={{ '--pt': 185, '--pb': 62 }}>
          <div className="du-w" style={{ '--mw': 1400 }}>
            <h2 className="p80 center" style={{ '--ac': RED }} data-reveal data-swipe>
              <Lines lines={C.research.headline} swipe />
            </h2>
          </div>
          <div className="du-w tm-owner" style={{ '--mw': 1161, '--mt': 150 }} data-reveal data-in="scale">
            {/* no forced ratio: the column is 500 wide and the card 532 tall,
                so a 1:1 square overflowed it by 32px and shoved the quote
                across. It fills its own column and crops instead. */}
            <Media clip={V('owner')} className="tm-owner-shot"
                   alt="Dipesh Shah, who runs Times Media, on a call at a client event" />
            <blockquote className="p34 tm-owner-quote">{para(C.research.quote)}</blockquote>
          </div>
          {/* plain cards again - the turn belongs further down the page, on
              the iteration section, where there is a v1 and a v2 to turn
              between */}
          <div className="du-w tm-voices" style={{ '--mw': 1161, '--mt': 97 }} data-stagger>
            {C.research.voices.map((v, i) => (
              <figure key={i} className="tm-voice" data-reveal data-in="blur" data-amp={i % 2 ? 76 : 52}>
                <blockquote className="p34">{para(v.lines)}</blockquote>
                <figcaption className="p24 c-2"><Lines lines={v.who} /></figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ---- the four ways it broke. The deck holds still while all four
                scroll past it, across the white/black seam - one sticky frame
                spanning both sections. ---- */}
        <div className="tm-run" id="problem">
          <section className="du-sec" style={{ '--pt': 185, '--pb': 104 }}>
            <h2 className="p80 du-x" style={{ '--x': 237 }} data-reveal data-swipe>
              <Lines lines={C.problem.headline} swipe />
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
            <Frame kind="ipad" w={703} clip={V('problem')}
                   alt="The PowerPoint deck every board used to live in, scrolling slide by slide" />
          </div>
        </div>

        <section className="du-sec bg-dark" id="solution" style={{ '--pt': 0, '--pb': 0 }}>
          {/* ---- the solution ---- */}
          <div className="du-w" style={{ '--mw': 1400, '--mt': 445 }}>
            <h2 className="p96 center" style={{ '--ac': RED }} data-reveal data-swipe>
              <Lines lines={C.solution.headline} swipe />
            </h2>
          </div>

          <div className="du-w" style={{ '--mw': 1230, '--mt': 202 }} data-reveal>
            <Frame kind="ipad" w={1300} shot={C.shots.admin} alt="The admin panel" data-sv="tilt" />
          </div>
          <p className="p38 lit center du-w" style={{ '--mw': 1100, '--mt': 116 }} data-reveal>
            {cap(C.solution.admin.lead, C.solution.admin.line)}
          </p>

          <h3 className="p60 du-x" style={{ '--x': 273, marginTop: 'calc(344 * var(--u))' }} data-reveal>
            <Lines lines={C.solution.siteHead} />
          </h3>
          <div className="tm-site">
            <div className="tm-site-media" data-reveal data-in="lift">
              <Frame kind="mac" w={905} clip={V('hero')} data-sv="tilt"
                     alt="The new Times Media site, with its live board map and booking call to action" />
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
            <p className="p70 center mx-line" style={{ '--band-ink': RED }}><Lines lines={C.waves} /></p>
          </div>
        </section>

        {/* ---- 3D street view. The updated frame turns the ground back to
                white here and keeps it white all the way to the foot. ---- */}
        <section className="du-sec" id="in-the-field" style={{ '--pt': 437, '--pb': 240 }}>
          <div className="du-w" style={{ '--mw': 1400 }}>
            <h2 className="p80 center" data-reveal data-swipe>
              <Lines lines={C.street.headline} swipe />
            </h2>
          </div>
          <div className="du-w tm-shot" style={{ '--mw': 1221, '--mt': 150 }} data-reveal data-in="mask">
            <Frame kind="ipad" w={1221} clip={V('street')} data-sv="tilt"
                   alt="A board previewed in 3D Street View, from the road a driver would see it from" />
            <p className="p38 center tm-cap">{para(C.street.shots[0].line)}</p>
          </div>
          {/* the score the booking map puts on every board - the one piece of
              original product thinking on this page the copy never named.
              The screen that USES it holds on the left while the four inputs
              behind it run past on the right, the same way the deck holds for
              the four ways it broke further up the page. */}
          <div className="du-w tm-score-run" style={{ '--mw': 1448, '--mt': 280 }}>
            <div className="tm-score-pin">
              <div className="tm-score-pin-in">
                <Frame kind="ipad" w={703} clip={V('reach')}
                       alt="The reach panel for a board, with the traffic around it" />
                <p className="p23 w500 tm-score-cap">{para(C.street.shots[1].line)}</p>
              </div>
            </div>
            <div className="tm-score-list" data-stagger>
              <div className="tm-score-head">
                <h3 className="p60" data-reveal><Lines lines={C.street.score.head} /></h3>
                <p className="p26 w500 tm-score-lead" data-reveal>{para(C.street.score.lead)}</p>
              </div>
              {C.street.score.inputs.map((it, i) => (
                <div key={it.label} className="tm-score-c" data-reveal data-in="side" data-amp={i % 2 ? 76 : 52}>
                  <p className="p48 tm-score-h">{it.label}</p>
                  <p className="p26 w500 tm-score-b">{it.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="du-w tm-field" style={{ '--mw': 1296, '--mt': 281 }} data-stagger>
            <div data-reveal data-in="lift"><Frame kind="ipad" w={883} shot={C.shots.maint} alt="Maintenance requests in the admin panel" data-sv="tilt" /></div>
            <div data-reveal data-in="lift"><Frame kind="phone" w={251} shot={C.shots.maintPhone} alt="The field agent raising a request" data-sv="tilt" /></div>
          </div>
          <p className="p38 lit center du-w" style={{ '--mw': 1100, '--mt': 116 }} data-reveal>
            {cap(C.street.field.lead, C.street.field.line)}
          </p>
        </section>

        {/* ---- impact. Four figures, each with the line that makes it true
                underneath - his three slogans stay, but as the close rather
                than as the whole section. ---- */}
        <section className="du-sec" id="impact" style={{ '--pt': 233, '--pb': 200 }}>
          <p className="p28 w500 center" data-reveal>{C.impact.eyebrow}</p>
          <h2 className="p80 center tm-learn-head" data-reveal><Lines lines={C.impact.head} /></h2>
          {/* the slogans lead the figures rather than closing them - they are
              the claim, and the four numbers under them are the evidence */}
          <div className="du-w tm-impact-close" style={{ '--mw': 1400 }}>
            <p className="p48 center" style={{ color: RED }} data-reveal data-swipe>
              <Lines lines={C.impact.close} swipe />
            </p>
          </div>
          <div className="du-w tm-metrics" style={{ '--mw': 1448, '--mt': 110 }} data-stagger>
            {C.impact.figures.map((f, i) => (
              <div key={f.label} className="tm-metric" data-reveal data-in="scale" data-amp={i % 2 ? 76 : 52}>
                <p className="p70 tm-metric-n">{f.n}</p>
                <p className="p28 tm-metric-l">{f.label}</p>
                <p className="p23 w500 tm-metric-b">{para(f.note)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- feedbacks and iterations: each complaint turns over to what
                changed because of it. The turn lives here and not on the
                research quotes, because here there is a v1 and a v2 to turn
                between. ---- */}
        <section className="du-sec bg-fill tm-iter-sec" id="feedback" style={{ '--pt': 120, '--pb': 200 }}>
          <div className="du-x" style={{ '--x': 240 }}>
            <p className="p28 w500" data-reveal>{C.iterate.eyebrow}</p>
            <h2 className="p80" data-reveal><Lines lines={C.iterate.head} /></h2>
            <p className="p25 w500 tm-iter-aside" data-reveal><Lines lines={C.iterate.aside} /></p>
          </div>
          <div className="du-w tm-iters" style={{ '--mw': 1448, '--mt': 80 }} data-stagger>
            {C.iterate.cards.map((c, i) => (
              <div key={i} data-reveal data-in="lift" data-amp={i % 2 ? 76 : 52}>
                <Flip label={`what changed for ${c.who}`}
                  front={
                    <div className="tm-iter">
                      <div className="tm-iter-copy">
                        <blockquote className="p34 tm-iter-quote">{para(c.quote)}</blockquote>
                        <p className="p24 c-2 tm-iter-who">{c.who}</p>
                      </div>
                      <figure className="tm-iter-shot">
                        <Frame kind={c.dev} w={c.dev === 'phone' ? 290 : 620}
                               clip={media(`times-${c.slot}v1`)} alt={`Before: ${c.v1.replace(/^v1 /, '')}`} />
                        <figcaption className="p23 w500 tm-iter-cap">{c.v1}</figcaption>
                      </figure>
                    </div>
                  }
                  back={
                    <div className="tm-iter tm-iter-fix">
                      <div className="tm-iter-copy">
                        <p className="p24 tm-iter-label">{C.iterate.changed}</p>
                        <p className="p34 tm-iter-body">{para(c.body)}</p>
                      </div>
                      <figure className="tm-iter-shot">
                        <Frame kind={c.dev} w={c.dev === 'phone' ? 290 : 620}
                               clip={media(`times-${c.slot}v2`)}
                               alt={`After: ${c.v2.join(' ').replace(/^v2 /, '')}`} />
                        <figcaption className="p23 w500 tm-iter-cap"><Lines lines={c.v2} /></figcaption>
                      </figure>
                    </div>
                  } />
              </div>
            ))}
          </div>
        </section>

        {/* ---- hearing it back: the heading takes the first cell of the
                grid and the three quotes take the other three ---- */}
        <section className="du-sec bg-fill" style={{ '--pt': 0, '--pb': 200 }}>
          <div className="du-w tm-heard" style={{ '--mw': 1448 }} data-stagger>
            <div className="tm-heard-head" data-reveal>
              <h2 className="p70"><Lines lines={C.heard.head} /></h2>
            </div>
            {C.heard.quotes.map((q, i) => (
              <figure key={i} className="tm-heard-card" data-reveal data-in="blur" data-amp={i % 2 ? 76 : 52}>
                <blockquote className="p28"><Lines lines={q.lines} /></blockquote>
                <figcaption className="p23 w500 tm-heard-who"><Lines lines={q.who} /></figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ---- learnings ---- */}
        <section className="du-sec bg-fill" id="learnings" style={{ '--pt': 0, '--pb': 120 }}>
          <p className="p28 w500 center" data-reveal>{C.learned.eyebrow}</p>
          <h2 className="p80 center tm-learn-head" data-reveal><Lines lines={C.learned.head} /></h2>
          <p className="p26 w500 center tm-learn-aside" data-reveal>{para(C.learned.aside)}</p>
          <div className="du-w tm-learn" style={{ '--mw': 1560, '--mt': 96 }} data-stagger>
            {C.learned.cards.map((c, i) => (
              <div key={i} className="tm-learn-c" data-reveal data-in="lift" data-amp={[52, 76, 52][i]}>
                <h3 className="p28 tm-learn-h"><Lines lines={c.head} /></h3>
                <p className="p24 tm-learn-b">{para(c.body)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- FAQ ---- */}
        <Faq eyebrow={C.faq.eyebrow} head={C.faq.head} items={C.faq.items} id="faq" x={240} pt={190} />

        <OtherWork slug="times-media" head={C.other} headX={403} other={{ pt: 164, pb: 0 }} />
        <Outro x={164} pt={225} pb={267} />
      </div>
    </Page>
  )
}
