import { Page, Lines, para, Outro } from '@/components/Chrome'
import { CaseHero } from '@/components/Case'
import OtherWork from '@/components/OtherWork'
import Faq from '@/components/Faq'
import Fill from '@/components/Fill'
import Frame from '@/components/Frame'
import Lockup from '@/components/Lockup'
import { Video } from '@/components/Media'
import { media } from '@/lib/clips'
import * as C from '@/lib/lighthouse-copy'

export const metadata = {
  title: 'Lighthouse AI',
  description: 'Lighthouse AI - designing an AI career coach that turns endless advice into one clear path. Case study by Manav Shah.',
  // MANAV: the spec says to drop this, and it should go - but the page still
  // renders 17 visible [FILL] / [ASSET] blocks, and an indexed portfolio page
  // full of dashed to-do boxes is worse than one search cannot see yet. Delete
  // these two lines and the `wip: true` in lib/work.js the day the holes are
  // filled and it is in search the next deploy.
  robots: { index: false, follow: true },
}

const GREEN = '#029322'
const V = n => media(`lighthouse-${n}`)

// A screen, flat and unframed, as the spec asks: no mockup, a hairline and a
// 16px radius, and a long capture scrolls inside a fixed height rather than
// being cropped. With no asset yet it is a placeholder of the same size, so
// the layout is already the real one.
function Screen({ shot, alt }) {
  if (!shot) return <Fill what="[ASSET] screen" h={620} />
  // In a device, like every other case study on the site. The screens are
  // 1.72-1.87 against the landscape iPad's screen aspect of 1.7556, so they
  // fill it with almost nothing cropped.
  return <Frame kind="ipad-h" w={1220} still={shot.src} alt={alt} />
}

function FlatScreen({ shot, alt }) {
  if (!shot) return <Fill what="[ASSET] screen" h={620} />
  return (
    <div className="lh-screen">
      {/* width and height are load-bearing, not decoration: these are lazy, and
          without them the browser reserves no space, so the page is short until
          each one loads and everything below it jumps down. The guard caught it
          as eight entrances that never played - the footer was never reached
          because it kept moving. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={shot.src} alt={alt || ''} loading="lazy"
           width={shot.w} height={shot.h} />
    </div>
  )
}

export default function Lighthouse() {
  return (
    <Page title="Lighthouse AI" dark here="lighthouse">
      <div className="lh du cine">
        <CaseHero clip={V('hero')} className="lh-hero" title={
          <Lockup eyebrow={C.hero.eyebrow} head={C.hero.head}
                  tags={C.hero.tags} meta={C.hero.meta} />
        }>
          {C.context.map((lines, i) => (
            <p key={i} className="p45 lh-context" data-reveal><Lines lines={lines} /></p>
          ))}
        </CaseHero>

        {/* ---- 3a: access to information, full bleed ---- */}
        {V('info') && (
          <section className="lh-bleed">
            <div className="lh-bleed-hold">
              <div className="lh-bleed-film"
                   style={{ background: `url(${V('info').poster}) center/cover no-repeat` }}>
                {V('info').video && <Video src={V('info').src} poster={V('info').poster} />}
              </div>
              <p className="p65 center lh-bleed-line" data-reveal data-swipe>
                <Lines lines={C.access} swipe />
              </p>
            </div>
          </section>
        )}

        {/* ---- 3b: but without direction ---- */}
        {V('ocean') && (
          <section className="lh-bleed lh-bleed-2">
            <div className="lh-bleed-hold">
              <div className="lh-bleed-film"
                   style={{ background: `url(${V('ocean').poster}) center/cover no-repeat` }}>
                {V('ocean').video && <Video src={V('ocean').src} poster={V('ocean').poster} />}
              </div>
              <p className="p65 center lh-bleed-line" data-reveal data-swipe>
                <Lines lines={C.lost} swipe />
              </p>
            </div>
          </section>
        )}

        {/* ---- 3c: the problem, on light ---- */}
        <section className="du-sec bg-fill" style={{ '--pt': 200, '--pb': 200 }}>
          <h2 className="p60 center du-w" style={{ '--mw': 1020 }} data-reveal>
            <Lines lines={C.problem.head} />
          </h2>
          <div className="du-w lh-probs" style={{ '--mw': 1020, '--mt': 110 }} data-stagger>
            {C.problem.cards.map((c, i) => (
              <div key={i} className={`lh-prob${i === 0 ? ' lh-prob-lead' : ''}`}
                   data-reveal data-amp={i % 2 ? 76 : 52}>
                {i === 0 && (c.photo
                  ? <span className="lh-prob-lead-film">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.photo} alt="" loading="lazy" />
                    </span>
                  : <Fill what="[ASSET] photo" />)}
                <h3 className="p32 lh-prob-h"><Lines lines={c.head} /></h3>
                {i > 0 && <p className="p26 w500 lh-prob-b">{para(c.body)}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* ---- research ---- */}
        <section className="du-sec" style={{ '--pt': 240, '--pb': 0 }}>
          <div className="du-x" style={{ '--x': 240 }}>
            <p className="p28 w500" data-reveal>{C.research.eyebrow}</p>
            <h2 className="p70" data-reveal><Lines lines={C.research.head} /></h2>
            <p className="p25 w500 lh-aside" data-reveal>{para(C.research.aside)}</p>
          </div>
          <div className="du-w lh-people" style={{ '--mw': 1448, '--mt': 96 }} data-stagger>
            {C.research.personas.map((pp, i) => (
              <div key={pp.who} className="lh-person" data-reveal data-amp={i % 2 ? 76 : 52}>
                <span className="lh-person-rule" style={{ background: GREEN }} aria-hidden="true" />
                <p className="p32 lh-person-label">{pp.label}</p>
                <p className="p23 w500 lh-person-who">{pp.who}</p>
                <p className="p26 w500 lh-person-line">{para(pp.line)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- key insight, on black ---- */}
        {/* the one section that does not stack a heading over a row of cards:
            the heading holds while the three patterns run past it, which is
            the mechanism Peak's five patterns use */}
        <section className="du-sec bg-dark" style={{ '--pt': 240, '--pb': 240 }}>
          <div className="lh-held">
            <div className="lh-held-head">
              <p className="p28 w500" data-reveal>{C.insight.eyebrow}</p>
              <h2 className="p65" data-reveal><Lines lines={C.insight.head} /></h2>
              <p className="p25 w500 lh-aside" data-reveal>{para(C.insight.aside)}</p>
            </div>
          <div className="lh-pats" data-stagger>
            {C.insight.cards.map((c, i) => (
              <div key={i} className="lh-pat" data-reveal data-amp={i % 2 ? 76 : 52}>
                <h3 className="p32 lh-pat-h"><Lines lines={c.head} /></h3>
                <p className="p26 w500 lh-pat-b">{para(c.body)}</p>
                <p className="p23 w500 lh-pat-led">
                  <span style={{ color: GREEN }}>{C.insight.ledTo} &rarr;</span> {para(c.led)}
                </p>
              </div>
            ))}
          </div>
          </div>
        </section>

        {/* ---- the core idea, and the system behind it ---- */}
        <section className="du-sec" style={{ '--pt': 240, '--pb': 0 }}>
          <div className="du-x" style={{ '--x': 240, '--ac': GREEN }}>
            <h2 className="p70 ac-i" data-reveal><Lines lines={C.core.head} /></h2>
            <p className="p30 w500 lh-core-lead" data-reveal>{para(C.core.lead)}</p>
            <ul className="lh-qs" data-stagger>
              {C.core.questions.map(q => (
                <li key={q} className="p32 lh-q" data-reveal>{q}</li>
              ))}
            </ul>
            <p className="p30 w500 lh-core-body" data-reveal>{para(C.core.body)}</p>
          </div>
          <div className="du-w lh-flow" style={{ '--mw': 1448, '--mt': 120 }} data-stagger>
            {C.core.steps.map((st, i) => (
              <div key={st.head} className="lh-step" data-reveal data-amp={i % 2 ? 70 : 50}>
                <span className="p20 lh-step-n" style={{ color: GREEN }}>{`0${i + 1}`}</span>
                <h3 className="p28 lh-step-h">{st.head}</h3>
                <p className="p23 w500 lh-step-b">{para(st.body)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- the solution, flat screens, text alternating side ---- */}
        <section className="du-sec" style={{ '--pt': 240, '--pb': 0 }}>
          <div className="du-w lh-sols" style={{ '--mw': 1300 }} data-stagger>
            {C.solution.blocks.map((b, i) => (
              <div key={i} className="lh-sol">
                <div className="lh-sol-copy" data-reveal data-amp={50}
                     style={{ '--ac': GREEN }}>
                  <h3 className="p42 lh-sol-h"><Lines lines={b.head} /></h3>
                  {b.body && <p className="p26 w500 lh-sol-b">{para(b.body)}</p>}
                </div>
                <div className="lh-sol-shot" data-reveal data-amp={76}>
                  <Screen shot={b.shot} alt={b.head.join(' ')} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- learnings. His three card directions are marked "not final
                copy" in the spec, so they are holes, not drafts I shipped. ---- */}
        <section className="du-sec" style={{ '--pt': 240, '--pb': 0 }}>
          <p className="p28 w500 center" data-reveal>{C.learned.eyebrow}</p>
          <h2 className="p60 center lh-learn-head" data-reveal><Lines lines={C.learned.head} /></h2>
          <div className="du-w lh-learn" style={{ '--mw': 1560, '--mt': 110 }} data-stagger>
            {C.learned.cards.map((c, i) => (
              <div key={c.n} className="lh-learn-c" data-reveal data-amp={[52, 76, 52][i]}>
                <h3 className="p32 lh-learn-h"><Lines lines={c.head} /></h3>
                <p className="p26 w500 lh-learn-b">{para(c.body)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- FAQ. The questions are his; the answers are holes. ---- */}
        <Faq eyebrow={C.faq.eyebrow} head={C.faq.head} items={C.faq.items} x={240} pt={240} />

        <OtherWork slug="lighthouse" head={C.other} headX={240} other={{ pt: 240, pb: 0 }} />
        <Outro x={240} pt={164} pb={220} />
      </div>
    </Page>
  )
}
