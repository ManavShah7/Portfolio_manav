import { Page, Lines, para, Outro } from '@/components/Chrome'
import { CaseHero } from '@/components/Case'
import OtherWork from '@/components/OtherWork'
import Faq from '@/components/Faq'
import Fill from '@/components/Fill'
import Frame from '@/components/Frame'
import Lockup from '@/components/Lockup'
import { SameRoadmap, Everywhere } from '@/components/LighthouseProblem'
import { Video } from '@/components/Media'
import { media } from '@/lib/clips'
import * as C from '@/lib/lighthouse-copy'
import LocalNav from '@/components/LocalNav'

export const metadata = {
  title: 'Lighthouse AI',
  description: 'Lighthouse AI - designing an AI career coach that turns endless advice into one clear path. Case study by Manav Shah.',
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
  return <Frame kind="ipad-h" w={1220} still={shot.src} alt={alt} data-sv="tilt" />
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

// The section bar's list. It lives next to the page rather than in the copy
// file because these are navigation labels, not his words - and each id below
// is on a section in the JSX.
const SECS = [
  { id: 'problem', label: 'Problem' },
  { id: 'research', label: 'Research' },
  { id: 'the-idea', label: 'The idea' },
  { id: 'product', label: 'Product' },
  { id: 'what-didnt-work', label: 'What didn\u2019t work' },
  { id: 'team', label: 'Team' },
  { id: 'learnings', label: 'Learnings' },
  { id: 'faq', label: 'FAQ' },
]

export default function Lighthouse() {
  return (
    <Page title="Lighthouse AI" dark here="lighthouse">
      <LocalNav name="Lighthouse AI" items={SECS} />
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
        <section className="du-sec bg-fill" id="problem" style={{ '--pt': 200, '--pb': 200 }}>
          <h2 className="p96 center du-w" style={{ '--mw': 1300 }} data-reveal>
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
                {c.steps && <SameRoadmap steps={c.steps} />}
                {c.sources && <Everywhere sources={c.sources} />}
              </div>
            ))}
          </div>
        </section>

        {/* ---- research ---- */}
        <section className="du-sec" id="research" style={{ '--pt': 240, '--pb': 0 }}>
          <div className="du-x" style={{ '--x': 240 }}>
            <p className="p28 w500" data-reveal>{C.research.eyebrow}</p>
            <h2 className="p96" data-reveal><Lines lines={C.research.head} /></h2>
            <p className="p25 w500 lh-aside" data-reveal>{para(C.research.aside)}</p>
          </div>
          <div className="du-w lh-people" style={{ '--mw': 1448, '--mt': 96 }} data-stagger>
            {C.research.personas.map((pp, i) => (
              <div key={pp.who} className="lh-person" data-reveal data-in="side" data-amp={i % 2 ? 76 : 52}>
                <p className="p42 lh-person-label">
                  {pp.label}
                  <span className="p24 lh-person-who">{pp.who}</span>
                </p>
                <p className="p26 w500 lh-person-line">{para(pp.line)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- the core idea, and the system behind it ---- */}
        <section className="du-sec" id="the-idea" style={{ '--pt': 240, '--pb': 0 }}>
          {/* centred, like every other section head on the site, and the three
              questions are the section now rather than a bulleted list under
              it - each one a column with a green rule over it */}
          <div className="du-w" style={{ '--mw': 1400, '--ac': GREEN }}>
            <h2 className="p96 center ac-i" data-reveal><Lines lines={C.core.head} /></h2>
            <p className="p30 w500 center lh-core-lead" data-reveal>{para(C.core.lead)}</p>
          </div>
          <ul className="du-w lh-qs" style={{ '--mw': 1400, '--mt': 110 }} data-stagger>
            {C.core.questions.map(q => (
              <li key={q} className="lh-q" data-reveal data-in="lift">
                <span className="lh-q-rule" style={{ background: GREEN }} aria-hidden="true" />
                <span className="p42 lh-q-t">{q}</span>
              </li>
            ))}
          </ul>
          <p className="p30 w500 center du-w lh-core-body" style={{ '--mw': 1100, '--mt': 110 }}
             data-reveal>{para(C.core.body)}</p>
        </section>

        {/* ---- the solution, flat screens, text alternating side ---- */}
        <section className="du-sec" id="product" style={{ '--pt': 240, '--pb': 0 }}>
          <div className="du-w lh-sols" style={{ '--mw': 1300 }} data-stagger>
            {C.solution.blocks.map((b, i) => (
              <div key={i} className="lh-sol">
                <div className="lh-sol-copy" data-reveal data-amp={50}
                     style={{ '--ac': GREEN }}>
                  <h3 className="p70 lh-sol-h"><Lines lines={b.head} /></h3>
                  {b.body && <p className="p26 w500 lh-sol-b">{para(b.body)}</p>}
                </div>
                <div className="lh-sol-shot" data-reveal data-in="lift" data-amp={76}>
                  <Screen shot={b.shot} alt={b.head.join(' ')} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- where it fell short. Renders only once Manav has written the
                reasons - an empty section is not a section (rule 4). ---- */}
        {C.failed.reasons.length > 0 && (
          <section className="du-sec bg-dark" id="what-didnt-work" style={{ '--pt': 240, '--pb': 240 }}>
            <div className="du-x" style={{ '--x': 240 }}>
              <p className="p28 w500" data-reveal>{C.failed.eyebrow}</p>
              <h2 className="p96" data-reveal><Lines lines={C.failed.head} /></h2>
              <p className="p25 w500 lh-aside" data-reveal>{para(C.failed.aside)}</p>
            </div>
            <div className="du-w lh-fails" style={{ '--mw': 1448, '--mt': 110 }} data-stagger>
              {C.failed.reasons.map((r, i) => (
                <div key={i} className="lh-fail" data-reveal data-in="side" data-amp={i % 2 ? 76 : 52}>
                  <h3 className="p32 lh-fail-h"><Lines lines={r.head} /></h3>
                  <p className="p26 w500 lh-fail-b">{para(r.body)}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ---- the people. Short on purpose: it was an internship on a small
                team, and saying so is better than inflating it. ---- */}
        <section className="du-sec" id="team" style={{ '--pt': 240, '--pb': 0 }}>
          <div className="du-x" style={{ '--x': 240 }}>
            <p className="p28 w500" data-reveal>{C.team.eyebrow}</p>
            <h2 className="p80" data-reveal><Lines lines={C.team.head} /></h2>
          </div>
          <div className="du-w lh-team" style={{ '--mw': 1448, '--mt': 96 }} data-stagger>
            {C.team.people.map((t, i) => (
              <div key={t.who} className="lh-team-c" data-reveal data-in="lift"
                   data-amp={i % 2 ? 76 : 52}>
                <span className="lh-team-rule" style={{ background: GREEN }} aria-hidden="true" />
                <p className="p32 lh-team-who">{t.who}</p>
                <p className="p23 w500 lh-team-role">{t.role}</p>
                <p className="p24 lh-team-line">{para(t.line)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- learnings. His three card directions are marked "not final
                copy" in the spec, so they are holes, not drafts I shipped. ---- */}
        <section className="du-sec" id="learnings" style={{ '--pt': 240, '--pb': 0 }}>
          <p className="p28 w500 center" data-reveal>{C.learned.eyebrow}</p>
          <h2 className="p80 center lh-learn-head" data-reveal><Lines lines={C.learned.head} /></h2>
          <div className="du-w lh-learn" style={{ '--mw': 1560, '--mt': 110 }} data-stagger>
            {C.learned.cards.map((c, i) => (
              <div key={c.n} className="lh-learn-c" data-reveal data-amp={[52, 76, 52][i]}>
                <h3 className="p28 lh-learn-h"><Lines lines={c.head} /></h3>
                <p className="p24 lh-learn-b">{para(c.body)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- FAQ. The questions are his; the answers are holes. ---- */}
        <Faq eyebrow={C.faq.eyebrow} head={C.faq.head} items={C.faq.items} id="faq" x={240} pt={240} />

        <OtherWork slug="lighthouse" head={C.other} headX={240} other={{ pt: 240, pb: 0 }} />
        <Outro x={240} pt={164} pb={220} />
      </div>
    </Page>
  )
}
