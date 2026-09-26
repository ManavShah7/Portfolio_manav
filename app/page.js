import Link from 'next/link'

import { Page, para, Chev, RESUME } from '@/components/Chrome'
import { Media, Video } from '@/components/Media'
import { media } from '@/lib/clips'
import { about as A } from '@/lib/home-copy'
import { WORK } from '@/lib/work'

export const metadata = { title: { absolute: 'Manav Shah - Product Designer' } }

// The lead is his own paragraph from the About block; its first sentence is
// the thing the hero says, the rest stays with the About section.
const [LEAD_1, ...LEAD_REST] = para(A.lead).split(/(?<=\.)\s/)

function WorkTile({ w, i }) {
  const clip = w.clip ? media(w.clip) : null
  return (
    <Link href={`/work/${w.slug}`} className={`tile${i === 0 ? ' tile-wide' : ''}`}
          style={{ '--accent': w.accent }} data-reveal>
      <div className="tile-media"
           style={clip ? { background: `url(${clip.poster}) center/cover no-repeat` } : undefined}>
        {clip?.video && <Video src={clip.src} poster={clip.poster} />}
      </div>
      <div className="tile-copy">
        <span className="t-eyebrow tile-kind">{w.kind}</span>
        <h3 className="t-title">{w.name}</h3>
        <p className="t-body-lg tile-line">{w.line}</p>
        <span className="t-body tile-cta">Read the case study <Chev /></span>
      </div>
    </Link>
  )
}

export default function Home() {
  const kanye = media('home-kanye')
  const collage = media('home-collage')

  return (
    <Page>
      {/* ---- hero ---- */}
      <section className="section home-hero">
        <div className="wrap">
          <p className="t-eyebrow c-2 eyebrow" data-reveal>Product Designer</p>
          <h1 className="t-hero grad-name home-name" data-reveal>Manav Shah</h1>
          <p className="t-lead c-2 home-intro" data-reveal>{LEAD_1}</p>
          <div className="home-actions" data-reveal>
            <Link href="#work" className="btn">See the work</Link>
            <a href={RESUME} download className="link t-body">Download resume <Chev /></a>
          </div>
        </div>
      </section>

      {/* ---- work ---- */}
      <section id="work" className="section flush-top">
        <div className="wrap">
          <div className="tiles" data-stagger>
            {WORK.map((w, i) => <WorkTile key={w.slug} w={w} i={i} />)}
          </div>
        </div>
      </section>

      {/* ---- the quote: an inset panel that grows to the full width as it
              arrives, the way apple.com opens its product films ---- */}
      <section className="quote-band">
        <div className="quote-panel" data-sv="grow"
             style={kanye ? { background: `url(${kanye.poster}) center/cover no-repeat` } : undefined}>
          {kanye?.video && <Video src={kanye.src} poster={kanye.poster} />}
          <blockquote className="quote-copy">
            <p className="t-headline">“The world can be saved through design”</p>
            <cite className="t-eyebrow">Kanye West</cite>
          </blockquote>
        </div>
      </section>

      {/* ---- about ---- */}
      <section id="about" className="section">
        <div className="wrap">
          <h2 className="t-headline grad-pink eyebrow-gap" data-reveal>{A.heading}</h2>
          <p className="t-lead measure-wide" data-reveal>
            {LEAD_1} <span className="c-2">{LEAD_REST.join(' ')}</span>
          </p>

          <div className="grid exp" data-stagger>
            <article className="card span-12 exp-lead" data-reveal>
              <div className="exp-lead-head">
                <h3 className="t-title" style={{ color: '#1CBC45' }}>{A.headline.company}</h3>
                <p className="t-body-lg">{A.headline.role}</p>
                <p className="t-caption c-2">{A.headline.meta.replace(/\s+·\s+/, ' · ')}</p>
              </div>
              <p className="t-body-lg c-2 exp-lead-body">{para(A.headline.body)}</p>
            </article>
            {A.roles.map(r => (
              <article key={r.company} className="card span-4 exp-role" data-reveal>
                <h3 className="t-card" style={{ color: r.colour }}>{r.company}</h3>
                <p className="t-body">{para(r.role)}</p>
                <p className="t-caption c-2">{para(r.meta)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---- the principle ---- */}
      <section className="section bg-fill motto">
        <div className="wrap-text center">
          <p className="t-headline grad-pink motto-line" data-sv="drift" style={{ '--drift': '30px' }}>
            {para(A.motto)}
          </p>
          <p className="t-body-lg c-2 measure motto-why" data-reveal>{para(A.why)}</p>
        </div>
      </section>

      {/* the iPad holds his collage; until it is dropped in there is nothing to
          show, so the section is left out rather than shown with a blank screen */}
      {collage && (
        <section className="section flush-bottom">
          <div className="wrap">
            <Media clip={collage} alt="A collage of Manav's design work" ratio="16 / 10" data-sv="tilt" />
          </div>
        </section>
      )}

      {/* ---- education + resume ---- */}
      <section className="section end">
        <div className="wrap grid edu">
          <h2 className="t-eyebrow c-2 span-4" data-reveal>{A.eduLabel}</h2>
          <div className="span-8 edu-list" data-stagger>
            {A.education.map(e => (
              <div key={e.school} className="edu-item" data-reveal>
                <h3 className="t-card">{e.school}</h3>
                <p className="t-body-lg c-2">{e.degree}</p>
                <p className="t-caption c-3">{e.meta.replace(/\s+·\s+/, ' · ')}</p>
              </div>
            ))}
            <div data-reveal>
              <a href={RESUME} download className="btn pink">
                {A.resume}
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 2.5v8M4.5 7.5 8 11l3.5-3.5M3 13.5h10" /></svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}
