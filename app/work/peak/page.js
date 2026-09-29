import Link from 'next/link'

import { Page, Lines, para, EMAIL } from '@/components/Chrome'
import { CaseHero } from '@/components/Case'
import { Media, Video } from '@/components/Media'
import Gallery from '@/components/Gallery'
import MotivationChart from '@/components/MotivationChart'
import { SameQuestions, NoRoomToMiss } from '@/components/PeakProblem'
import { media, slots } from '@/lib/clips'
import { WORK } from '@/lib/work'
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
    <Page title="Peak" dark>
      <div className="pk du">
        {/* ---- the film, and the four opening lines on black ---- */}
        <CaseHero clip={media('peak-hero')} className="pk-hero">
          {C.intro.map((lines, i) => (
            <p key={i} className="p45 pk-intro" data-reveal><Lines lines={lines} /></p>
          ))}
        </CaseHero>

        {/* ---- problems ---- */}
        <section className="pk-sec pk-problems" style={{ '--pt': 138, '--pb': 93 }}>
          <h2 className="p60 center" data-reveal><Lines lines={C.problem.headline} /></h2>
          <div className="pk-w" style={{ '--mw': 886, '--mt': 60 }}>
            {V('problem')
              ? <Media clip={V('problem')} className="pk-card pk-problem-big" data-sv="grow" />
              : <div className="pk-card black pk-problem-big" data-reveal />}
            <div className="pk-two" data-stagger>
              {C.problem.cards.map((lines, i) => (
                <div key={i} className="pk-card black pk-problem-card" data-reveal>
                  <p className="p27"><Lines lines={lines} /></p>
                  {/* the frame leaves these cards empty under the heading;
                      each graphic says what its heading claims */}
                  {i === 0
                    ? <SameQuestions {...C.problem.onboarding} />
                    : <NoRoomToMiss {...C.problem.streak} />}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---- research ---- */}
        <section className="pk-sec" style={{ '--pt': 180, '--pb': 115 }}>
          <div className="pk-x" style={{ '--x': 240 }}>
            <p className="p28 w500" data-reveal>{C.research.eyebrow}</p>
            <h2 className="p70" style={{ '--ac': '#E01D85' }} data-reveal><Lines lines={C.research.headline} /></h2>
            <p className="p25 w500 pk-aside" data-reveal><Lines lines={C.research.aside} /></p>
          </div>
          <div className="pk-w pk-pair" style={{ '--mw': 966, '--mt': 86 }} data-stagger>
            {C.research.quotes.map((q, i) => (
              <figure key={i} className="pk-voice" data-reveal>
                <Media clip={V(`voice${i + 1}`)} className="pk-voice-photo" alt={q.who} />
                <figcaption className="p23 w500">{q.who}</figcaption>
                <blockquote className="p28"><Lines lines={q.lines} /></blockquote>
              </figure>
            ))}
          </div>

          <h3 className="p60 center pk-reddit" style={{ '--ac': '#FF383C' }} data-reveal><Lines lines={C.research.redditHead} /></h3>
        </section>

        {/* ---- findings: two stacked on the left, one tall on the right ---- */}
        <section className="pk-sec bg-fill" style={{ '--pt': 173, '--pb': 183 }}>
          <div className="pk-w" style={{ '--mw': 1180 }}>
            <h2 className="p70 pk-inset" data-reveal><Lines lines={C.findings.headline} /></h2>
            <div className="pk-bento" data-stagger>
              {C.findings.cards.map((c, i) => (
                <div key={i} className={`pk-card white pk-find pk-find-${i}`} style={{ '--ac': '#077B67' }} data-reveal>
                  <p className="p38"><Lines lines={c.head} /></p>
                  {c.body && <p className="p26 w500 pk-find-body">{para(c.body)}</p>}
                  {c.chart && <>
                    <MotivationChart />
                    <div className="pk-phase">
                      {C.findings.phases.map(ph => (
                        <div key={ph.title}>
                          <span style={{ background: ph.dot }} aria-hidden="true" />
                          <h4>{ph.title}</h4>
                          <p>{ph.body}</p>
                        </div>
                      ))}
                    </div>
                  </>}
                </div>
              ))}
            </div>
            <div className="pk-card pk-ceiling" data-reveal
                 style={V('ceiling')?.poster ? { background: `url(${V('ceiling').poster}) center/cover` } : undefined}>
              {V('ceiling')?.video && <Video src={V('ceiling').src} poster={V('ceiling').poster} />}
              <p className="p42 center"><Lines lines={C.findings.ceiling} /></p>
            </div>
          </div>
        </section>

        {/* ---- solution ---- */}
        <section className="pk-sec bg-dark pk-solution" style={{ '--pt': 209, '--pb': 0 }}>
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
        <section className="pk-sec pk-lift" style={{ '--pt': 288, '--pb': 380 }}>
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
        <section className="pk-sec pk-catalog" style={{ '--pt': 0, '--pb': 226 }}>
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
        <section className="pk-sec" style={{ '--pt': 360, '--pb': 617 }}>
          <h2 className="p80 center" data-reveal>
            <span className="ln pk-magenta">{C.social.head[0]}</span>
            <span className="ln">{C.social.head[1]}</span>
          </h2>
        </section>
        {/* The phone holds still while the footage and the copy change behind
            it - one sticky frame spanning both bands, which is what the frame
            draws now that it puts the phone in the same place in each. */}
        <div className="pk-bands">
          {C.social.bands.map((b, i) => friends[i] && (
            <section key={i} className={`pk-band pk-band-${i}`}
                     style={{ background: `url(${friends[i].poster}) center/cover no-repeat` }}>
              <Video src={friends[i].src} poster={friends[i].poster} className="pk-band-film" />
              <p className="p65 pk-band-copy" data-reveal><Lines lines={b.lines} /></p>
            </section>
          ))}
          {friends[0] && (
            <div className="pk-bands-pin" aria-hidden="true">
              <Phone kind="device" w={305} h={631} slot="social" />
            </div>
          )}
        </div>

        {/* ---- what's next ---- */}
        <section className="pk-sec" style={{ '--pt': 179, '--pb': 0 }}>
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

        {/* ---- the other projects, each on an iPad ---- */}
        <section className="pk-sec" style={{ '--pt': 236, '--pb': 0 }}>
          <h2 className="p70 pk-x pk-other" style={{ '--x': 195 }} data-reveal><Lines lines={C.whatsNext.other} /></h2>
          <Gallery label="Other projects" className="pk-gallery pk-light-paddles pk-projects" paddles="center" always>
            {others.map(w => <NextSlide key={w.slug} w={w} />)}
          </Gallery>
        </section>

        {/* ---- contact ---- */}
        <section className="pk-sec" style={{ '--pt': 219, '--pb': 751 }}>
          <p className="p70 pk-x" style={{ '--x': 240 }} data-reveal>
            <span className="ln">{C.end.contact[0]}</span>
            <a className="ln pk-contact" href={EMAIL}>{C.end.contact[1]}</a>
          </p>
        </section>
      </div>
    </Page>
  )
}
