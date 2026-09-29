import { Lines, Footer, Nav, RESUME } from '@/components/Chrome'
import Reveal from '@/components/Reveal'
import Gallery from '@/components/Gallery'
import { Video } from '@/components/Media'
import { media } from '@/lib/clips'
import * as C from '@/lib/about-copy'

export const metadata = {
  title: 'About',
  description: 'Manav Shah - product designer, Masters in Information Systems at Northeastern. What he works on, and what he does when he is not.',
}

const INK = n => `/media/about/${n}.webp`
const PINK = '#EF3888'
const band = media('about-band')

// Built to Manav's frame in design units: `--u` is one design px, so every
// number below is read straight off Desktop - 9.png. Type pitches measured on
// it - the opening quote 60, the headings 55, the body 54, "My Design Pillars"
// 67, the life line 77 - and Figma's auto leading means size = pitch / 1.2.
export default function About() {
  return (
    <>
      <Nav here="about" />
      <main className="ab du cine">
        {/* ---- the opening, on its own film ---- */}
        <section className="ab-band">
          <div className="ab-band-film" aria-hidden="true">
            {band?.poster && <span style={{ backgroundImage: `url(${band.poster})` }} />}
            {band?.video && <Video src={band.src} poster={band.poster} eager />}
          </div>
          <p className="p50 center ab-quote" data-reveal><Lines lines={C.quote} /></p>
        </section>

        {/* ---- about, beside the university ---- */}
        <section className="du-sec ab-two" style={{ '--pt': 159, '--pb': 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ab-logo" src={C.about.logo.src} alt={C.about.logo.alt} data-reveal />
          <div data-reveal>
            <h2 className="p55 ab-head" style={{ color: PINK }}>{C.about.head}</h2>
            <p className="p45 ab-body"><Lines lines={C.about.body} /></p>
          </div>
        </section>

        {/* ---- experience, beside where it happened ---- */}
        <section className="du-sec ab-two" style={{ '--pt': 287, '--pb': 0 }}>
          <div className="ab-jobs" data-stagger>
            <div className="ab-job ab-job-now" data-reveal
                 style={{ backgroundImage: `url(${INK(C.experience.now.ink)})` }}>
              <p className="p40 ab-job-name">{C.experience.now.name}</p>
              <p className="p26 ab-job-meta">
                <span>{C.experience.now.role}</span><span>{C.experience.now.when}</span>
              </p>
            </div>
            <div className="ab-job-row">
              {C.experience.past.map(j => (
                <div key={j.name.join(' ')} className="ab-job" data-reveal
                     style={{ backgroundImage: `url(${INK(j.ink)})` }}>
                  <p className="p32 ab-job-name"><Lines lines={j.name} /></p>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal>
            <h2 className="p55 ab-head" style={{ color: PINK }}>{C.experience.head}</h2>
            <p className="p45 ab-body"><Lines lines={C.experience.body} /></p>
            <a className="p45 ab-cta" href={RESUME} download>{C.experience.cta}</a>
          </div>
        </section>

        {/* ---- the pillars ---- */}
        <section className="du-sec" style={{ '--pt': 248, '--pb': 0 }}>
          <h2 className="p65 du-x" style={{ '--x': 161, color: PINK }} data-reveal>
            {C.pillars.head}
          </h2>
          <Gallery label="Design pillars" className="ab-gallery pk-light-paddles" paddles="right" always>
            {C.pillars.cards.map(c => (
              <article key={c.title.join(' ')} className="ab-pillar" data-reveal>
                <span className="ab-pillar-ink" style={{ backgroundImage: `url(${INK(c.ink)})` }} />
                <div className="ab-pillar-copy">
                  <h3 className="p32"><Lines lines={c.title} /></h3>
                  <p className="p24">{c.body.join(' ')}</p>
                </div>
              </article>
            ))}
          </Gallery>
        </section>

        {/* ---- and the rest of it ---- */}
        <section className="du-sec" style={{ '--pt': 179, '--pb': 0 }}>
          <h2 className="p80 center" style={{ color: PINK }} data-reveal>{C.life.head}</h2>
          <div className="ab-collage" style={{ '--ch': C.life.height, '--mt': 153 }} data-stagger>
            {C.life.shots.map(s => {
              const [x, y, w, h] = s.r
              return (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img key={s.n} src={INK(s.n)} alt={s.alt} loading="lazy" data-reveal
                     style={{ '--x': x, '--y': y, '--w': w, '--h': h,
                              ...(s.pos ? { objectPosition: s.pos } : null) }} />
              )
            })}
          </div>
        </section>
      </main>
      <Footer />
      <Reveal />
    </>
  )
}
