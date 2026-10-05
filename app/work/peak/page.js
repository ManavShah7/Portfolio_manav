import Link from 'next/link'

import { Page, Lines, para, EMAIL, Outro } from '@/components/Chrome'
import { CaseHero } from '@/components/Case'
import { Media, Video } from '@/components/Media'
import Gallery from '@/components/Gallery'
import Frame from '@/components/Frame'
import OtherWork from '@/components/OtherWork'
import MotivationChart from '@/components/MotivationChart'
import Compare from '@/components/Compare'
import Faq from '@/components/Faq'
import Lockup from '@/components/Lockup'
import { SameQuestions, NoRoomToMiss, PhoneApp } from '@/components/PeakProblem'
import { media, slots } from '@/lib/clips'
import { WORK } from '@/lib/work'

const ME = WORK.find(w => w.slug === 'peak')
import * as C from '@/lib/peak-copy'

export const metadata = {
  title: 'Peak',
  description: 'Peak - an iOS fitness app that keeps up with you. Case study by Manav Shah.',
}

// Peak, to Manav's frame (~/Desktop/Final Design/Peak.png, a 1900-wide frame
// that Figma exported at 1.9026x because it hit the 32768px height limit).
//
// Every number below is a design px in that frame, handed to CSS as a custom
// property and multiplied by --u, which is 1px at 1900 wide and scales with
// the window down to 1069 - so at any laptop width this is the frame, in
// proportion, but reflowing and native. Below 1069 the page drops to its own
// tablet and phone layout (see .pk in app/globals.css).
const V = slots('peak')

// The phone the frame draws: an outline (the lift and catalog sections) or a
// see-through device (the friendship films).
// The phone outlines the frame draws. `slot` fills one with a screen recording
// of the app - the file is optional, so an empty slot is still just the outline.
function Phone({ kind = 'line', w, h, slot, style }) {
  const clip = slot ? media(`peak-${slot}`) : null
  return (
    <div className={`pk-phone ${kind}`} style={{ '--w': w, '--h': h, ...style }} aria-hidden="true">
      {clip && (clip.video
        ? <Video className="pk-phone-screen" src={clip.src} poster={clip.poster} />
        : <span className="pk-phone-screen" style={{ backgroundImage: `url(${clip.src})` }} />)}
    </div>
  )
}

// the lead of a caption in full ink, the rest in grey
const cap = (lead, rest) => <><b>{lead}</b> {rest}</>

function NextSlide({ w }) {
  const clip = w.clip ? media(w.clip) : null
  const still = w.still || clip?.poster
  return (
    <Link href={`/work/${w.slug}`} className="pk-ipad" data-reveal>
      <div className="pk-ipad-screen" style={still ? { background: `url(${still}) center/cover no-repeat` } : { background: 'radial-gradient(120% 100% at 30% 0%,#F2C27A 0%,#C2893A 36%,#6E4516 76%,#2A1905 100%)' }}>
        {!w.still && clip?.video && <Video src={clip.src} poster={clip.poster} />}
        <div className="pk-ipad-copy">
          <p className="p40">{w.name}</p>
          <p className="p24">{w.lines ? <Lines lines={w.lines} /> : w.line}</p>
          <span className="p20">Read case study</span>
        </div>
      </div>
    </Link>
  )
}

export default function Peak() {
  const friends = [V('friends1'), V('friends2')]
  const others = WORK.filter(w => w.slug !== 'peak')

  return (
    <Page title="Peak" dark here="peak">
      <div className="pk du cine">
        {/* ---- the film, and the four opening lines on black ----
                The updated frame drops the centred title card for a lockup on
                the left of the film - name, line, and three facts as pills -
                with two phones standing to the right of it. */}
        <CaseHero clip={media('peak-hero')} className="pk-hero" title={
          <Lockup eyebrow={C.hero.name} head={C.hero.line}
                  tags={C.hero.tags} meta={C.credits} />
        }>
          {C.intro.map((lines, i) => (
            <p key={i} className="p45 pk-intro" data-reveal><Lines lines={lines} /></p>
          ))}
        </CaseHero>

        {/* ---- problems ---- */}
        <section className="pk-sec pk-problems" style={{ '--pt': 150, '--pb': 140 }}>
          <h2 className="p60 center" data-reveal><Lines lines={C.problem.headline} /></h2>
          <div className="pk-w" style={{ '--mw': 886, '--mt': 60 }}>
            {/* three apps, three phones - the card said it in words and drew
                nothing, so it says it with the devices */}
            <div className="pk-card black pk-problem-big" data-reveal>
              <p className="p27 center pk-problem-head"><Lines lines={C.problem.friction} /></p>
              <div className="pk-trio" aria-hidden="true">
                <Frame kind="phone" w={196}><PhoneApp n={1} /></Frame>
                <Frame kind="phone" w={232}><PhoneApp n={2} /></Frame>
                <Frame kind="phone" w={196}><PhoneApp n={3} /></Frame>
              </div>
            </div>
            <div className="pk-two" data-stagger>
              {C.problem.cards.map((c, i) => (
                <div key={i} className="pk-card black pk-problem-card" data-reveal>
                  <p className="p27"><Lines lines={c.head} /></p>
                  {/* the frame leaves these cards empty under the heading;
                      each graphic says what its heading claims */}
                  {i === 0
                    ? <SameQuestions {...C.problem.onboarding} />
                    : <NoRoomToMiss {...C.problem.streak} />}
                  {/* the frame prints this under the graphic, which is what
                      makes the card an argument rather than a label */}
                  <p className="p26 w500 pk-problem-body">{para(c.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- research ---- */}
        <section className="pk-sec" style={{ '--pt': 200, '--pb': 0 }}>
          <div className="pk-x" style={{ '--x': 240 }}>
            <p className="p28 w500" data-reveal>{C.research.eyebrow}</p>
            <h2 className="p70" style={{ '--ac': '#E01D85' }} data-reveal><Lines lines={C.research.headline} /></h2>
            <p className="p25 w500 pk-aside" data-reveal><Lines lines={C.research.aside} /></p>
          </div>
          <div className="pk-w pk-trio-voices" style={{ '--mw': 1420, '--mt': 96 }} data-stagger>
            {C.research.quotes.map((q, i) => (
              <figure key={i} className="pk-voice" data-reveal data-amp={i % 2 ? 76 : 52}>
                <Media clip={V(`voice${i + 1}`)} className="pk-voice-photo" alt={q.who} />
                <figcaption className="p23 w500">{q.who}</figcaption>
                <blockquote className="p28"><Lines lines={q.lines} /></blockquote>
              </figure>
            ))}
          </div>

          <h3 className="p60 center pk-reddit" style={{ '--ac': '#FF383C' }} data-reveal><Lines lines={C.research.redditHead} /></h3>
          {/* drawn as what they are: three posts, each with the half he
              highlighted carrying the complaint */}
          <div className="pk-w pk-posts" style={{ '--mw': 1420, '--mt': 96 }} data-stagger>
            {C.research.redditQuotes.map((q, i) => (
              <div key={q.sub} className="pk-post" data-reveal data-amp={i % 2 ? 76 : 52}>
                <p className="p24 pk-post-sub">
                  <span>{q.sub}</span><i aria-hidden="true">·</i><span>{q.age}</span>
                </p>
                <p className="p28 pk-post-body">
                  {para(q.lead)} <span className="pk-post-hi">{para(q.hi)}</span>
                </p>
                <p className="p26 pk-post-votes">
                  <svg viewBox="0 0 12 10" aria-hidden="true"><path d="M6 0l6 10H0z" /></svg>
                  {q.votes}<span className="vh"> upvotes</span>
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- competitive analysis ---- */}
        <section className="pk-sec" style={{ '--pt': 240, '--pb': 0 }}>
          <div className="pk-x" style={{ '--x': 240 }}>
            <p className="p28 w500" data-reveal>{C.compare.eyebrow}</p>
            <h2 className="p70" data-reveal><Lines lines={C.compare.head} /></h2>
            <p className="p25 w500 pk-aside pk-aside-wide" data-reveal><Lines lines={C.compare.aside} /></p>
          </div>
          <div className="pk-w" style={{ '--mw': 1320, '--mt': 96 }}>
            <Compare cols={C.compare.cols} rows={C.compare.rows} keys={C.compare.key} />
          </div>
        </section>

        {/* ---- the five patterns. The heading and its aside hold still while
                the boxes run past them, the way Times Media pins its deck -
                sticky inside a grid cell, so it is CSS and no script. The
                chart card leads because it is the finding the other four sit
                under. ---- */}
        <section className="pk-sec bg-fill" style={{ '--pt': 200, '--pb': 200 }}>
          <div className="pk-stages">
            <div className="pk-stages-head">
              <h2 className="p70" data-reveal><Lines lines={C.stages.head} /></h2>
              <p className="p25 w500 pk-stages-aside" data-reveal><Lines lines={C.stages.aside} /></p>
            </div>
            <div className="pk-stages-run" data-stagger>
              <div className="pk-card white pk-stage pk-stage-chart" data-reveal data-amp="44">
                <p className="p32 pk-stage-h" style={{ '--ac': '#0B8A3D' }}>
                  <span className="ln">{C.stages.chart.head[0]}</span>
                  <span className="ln ac">{C.stages.chart.head[1]}</span>
                </p>
                <p className="p26 w500 pk-stage-b">{para(C.stages.chart.body)}</p>
                <MotivationChart quit={C.stages.chart.quit} from={C.stages.chart.from}
                                 to={C.stages.chart.to} />
              </div>
              <div className="pk-stages-grid">
                {C.stages.cards.map((c, i) => (
                  <div key={i} className="pk-card white pk-stage" data-reveal
                       data-amp={i % 2 ? 76 : 52}>
                    <p className="p32 pk-stage-h"><Lines lines={c.head} /></p>
                    <p className="p26 w500 pk-stage-b">{para(c.body)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pk-w" style={{ '--mw': 1180 }}>
            <div className="pk-card pk-ceiling" data-reveal
                 style={V('ceiling')?.poster ? { background: `url(${V('ceiling').poster}) center/cover` } : undefined}>
              {V('ceiling')?.video && <Video src={V('ceiling').src} poster={V('ceiling').poster} />}
              <p className="p42 center"><Lines lines={C.findings.ceiling} /></p>
            </div>
          </div>
        </section>

        {/* ---- solution ---- */}
        <section className="pk-sec bg-dark pk-solution" style={{ '--pt': 200, '--pb': 0 }}>
          <h2 className="p70 center" data-reveal>
            <span className="ln">{C.solution.headline[0]}</span>
            <span className="ln">{C.solution.headline[1]}<span className="pk-orange">{C.solution.headAccent}</span></span>
          </h2>
          {V('globe') && (
            <div className="pk-globe" data-sv="grow"
                 style={{ background: `url(${V('globe').poster}) center/cover no-repeat` }}>
              <Video src={V('globe').src} poster={V('globe').poster} />
            </div>
          )}
        </section>

        {/* ---- lift: headline left, the two phones right ---- */}
        <section className="pk-sec pk-lift" style={{ '--pt': 240, '--pb': 280 }}>
          <div className="pk-lift-row">
            <h3 className="p65 pk-x ac-i" style={{ '--x': 191, '--ac': '#D3058B' }} data-reveal><Lines lines={C.solution.liftHead} /></h3>
            <div className="pk-lift-phones" data-stagger>
              {C.solution.liftCaps.map((c, i) => {
                const text = para(c.lines)
                const [a, b] = c.bold ? text.split(c.bold) : [null, null]
                const [lead, ...rest] = text.split(/(?<=,)\s/)
                return (
                  <figure key={i} data-reveal>
                    <Phone w={226} h={461} slot={['workout', 'insights'][i]} />
                    <figcaption className="p32 w500 pk-cap">
                      {c.bold ? <>{a}<b>{c.bold}</b>{b}</> : cap(lead, rest.join(' '))}
                    </figcaption>
                  </figure>
                )
              })}
            </div>
          </div>
        </section>

        {/* ---- catalog ---- */}
        <section className="pk-sec pk-catalog" style={{ '--pt': 0, '--pb': 240 }}>
          <h3 className="p65 pk-x" style={{ '--x': 301 }} data-reveal><Lines lines={C.solution.catalogHead} /></h3>
          <Gallery label="Four ways to log food" className="pk-gallery pk-dark-paddles" always
                   style={{ '--inset': 'calc(298 * var(--u))' }}>
            {C.solution.cards.map((c, i) => (
              <article key={i} className="pk-cat" data-reveal>
                <div className="pk-card black pk-cat-card">
                  <Phone w={206} h={420} slot={['catalog', 'food', 'disambig', 'integrations'][i]} />
                </div>
                <p className="p32 w500 pk-cap">{cap(para(c.lead), para(c.lines))}</p>
              </article>
            ))}
          </Gallery>
        </section>

        {/* ---- friendship ---- */}
        <section className="pk-sec" style={{ '--pt': 240, '--pb': 240 }}>
          <h2 className="p80 center" data-reveal>
            <span className="ln pk-magenta">{C.social.head[0]}</span>
            <span className="ln">{C.social.head[1]}</span>
          </h2>
        </section>
        {/* It was the other way round: the phone held still and the footage
            changed behind it, which meant the films were the thing moving and
            they pulled the eye off the screens. Now the film holds - ONE
            sticky layer under the whole run - and the phone and its line are
            what change as you scroll. The film layer is absolute over the
            wrapper with a sticky child, so the hold is CSS; the slides sit
            above it in normal flow. */}
        {friends[0] && (
          <div className="pk-social">
            <div className="pk-social-film" aria-hidden="true">
              {/* the zoom is on the CLIP, not on this layer. This layer is
                  the one holding sticky, so it cannot be inside anything that
                  clips - and scaling it to 1.18 therefore hung 18% of the page
                  width off the side, which WebKit let you scroll to. The clip
                  sits inside `overflow:hidden`, so scaling it is contained. */}
              <span className="pk-social-film-in"
                    style={{ background: `url(${friends[0].poster}) center/cover no-repeat` }}>
                <Video src={friends[0].src} poster={friends[0].poster} data-sv="zoom" />
              </span>
            </div>
            {C.social.bands.map((b, i) => (
              <section key={i} className="pk-slide">
                <div className="pk-slide-phone" data-reveal data-amp="70" aria-hidden="true">
                  {/* a second recording at peak-social2 gives each slide its
                      own screen; until then both carry the first (rule 4) */}
                  <Phone kind="device" w={305} h={631}
                         slot={V(`social${i + 1}`) ? `social${i + 1}` : 'social'} />
                </div>
                <p className="p65 pk-slide-copy" data-reveal data-amp="44">
                  <Lines lines={b.lines} />
                </p>
              </section>
            ))}
          </div>
        )}

        {/* ---- testing: his own two pieces of tester feedback, and what
                each one changed. The case study used to run finished screens
                straight into "what's next", which read as a product launch
                rather than a design process. ---- */}
        <section className="pk-sec bg-fill" style={{ '--pt': 200, '--pb': 200 }}>
          <div className="pk-x" style={{ '--x': 240 }}>
            <p className="p28 w500" data-reveal>{C.testing.eyebrow}</p>
            <h2 className="p70" data-reveal><Lines lines={C.testing.headline} /></h2>
            <p className="p25 w500 pk-aside pk-aside-wide" data-reveal><Lines lines={C.testing.aside} /></p>
          </div>
          <div className="pk-w pk-tests" style={{ '--mw': 1448, '--mt': 96 }} data-stagger>
            {C.testing.notes.map((n, i) => (
              <div key={i} className="pk-card white pk-test" data-reveal data-amp={i % 2 ? 76 : 52}>
                <div className="pk-test-copy">
                  <blockquote className="p38 pk-test-quote"><Lines lines={n.quote} /></blockquote>
                  <p className="p23 w500 pk-test-label">{C.testing.changed}</p>
                  <p className="p26 w500 pk-test-body">{para(n.body)}</p>
                </div>
                {/* the before and the after, which is what makes this an
                    iteration rather than an anecdote. Empty until he drops the
                    recordings in at peak-<slot>v1 / v2 (rule 4). */}
                <div className="pk-test-shots">
                  {n.shots.map((cap, k) => (
                    <figure key={k} className="pk-test-shot">
                      <Phone kind="line" w={196} h={394} slot={`${n.slot}v${k + 1}`} />
                      <figcaption className="p23 w500 pk-test-cap"><Lines lines={cap} /></figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ---- the same two testers, on the other side of the changes ---- */}
        <section className="pk-sec" style={{ '--pt': 240, '--pb': 0 }}>
          <h2 className="p60 center" style={{ '--ac': '#E01D85' }} data-reveal>
            <Lines lines={C.progress.head} />
          </h2>
          <p className="p26 w500 center pk-prog-aside" data-reveal>{para(C.progress.aside)}</p>
          <div className="pk-w pk-prog" style={{ '--mw': 1180, '--mt': 96 }} data-stagger>
            {C.progress.quotes.map((q, i) => (
              <figure key={q.who} className="pk-voice" data-reveal data-amp={i % 2 ? 76 : 52}>
                <Media clip={V(q.ink)} className="pk-voice-photo" alt={q.who} />
                <figcaption className="p23 w500">{q.who}</figcaption>
                <blockquote className="p28"><Lines lines={q.lines} /></blockquote>
              </figure>
            ))}
          </div>
        </section>

        {/* ---- what I learned: centred head, three black cards, as the
                updated frame draws it ---- */}
        <section className="pk-sec" style={{ '--pt': 240, '--pb': 0 }}>
          <p className="p28 w500 center" data-reveal>{C.learned.eyebrow}</p>
          <h2 className="p60 center pk-learn-head" data-reveal>{C.learned.head}</h2>
          <p className="p26 w500 center pk-learn-aside" data-reveal>{para(C.learned.aside)}</p>
          <div className="pk-w pk-learn" style={{ '--mw': 1560, '--mt': 120 }} data-stagger>
            {C.learned.cards.map((c, i) => (
              <div key={i} className="pk-card black pk-learn-c" data-reveal
                   data-amp={[52, 76, 52][i]}>
                <h3 className="p32 pk-learn-h"><Lines lines={c.head} /></h3>
                <p className="p26 w500 pk-learn-b">{para(c.body)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ---- what's next ---- */}
        <section className="pk-sec" style={{ '--pt': 240, '--pb': 0 }}>
          <h2 className="p55 pk-x" style={{ '--x': 148 }} data-reveal><Lines lines={C.whatsNext.headline} /></h2>
          <Gallery label="What's next" className="pk-gallery pk-light-paddles pk-next-cards" always
                   style={{ '--inset': 'calc(149 * var(--u))' }}>
            {C.whatsNext.cards.map(c => (
              <div key={c.title} className="pk-card pk-wn" data-reveal>
                <h3 className="p28">{c.title}</h3>
                <p className="p26 w500">{para(c.body)}</p>
              </div>
            ))}
          </Gallery>
        </section>

        {/* ---- FAQ ---- */}
        <Faq eyebrow={C.faq.eyebrow} head={C.faq.head} items={C.faq.items} x={240} pt={240} />

        <OtherWork slug="peak" head={C.whatsNext.other} headX={195} other={{ pt: 236, pb: 0 }} />
        <Outro x={195} pt={164} pb={220} />
      </div>
    </Page>
  )
}
