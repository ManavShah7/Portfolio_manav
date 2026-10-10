import { Lines, Footer, Nav, RESUME } from '@/components/Chrome'
import Jobs from '@/components/Jobs'
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
// a pillar's film, if he has dropped one in yet - null until then
const pillarClip = i => media(`about-pillar-${i + 1}`)
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
          <p className="p50 center ab-quote" data-reveal data-in="blur"><Lines lines={C.quote} /></p>
        </section>

        {/* ---- about, beside the university ---- */}
        <section className="du-sec ab-two" style={{ '--pt': 159, '--pb': 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ab-logo" src={C.about.logo.src} alt={C.about.logo.alt} data-reveal />
          <div data-reveal>
            {/* the page's h1 - "About Me" is what this page is, and the page
                had no h1 at all before */}
            <h1 className="p55 ab-head" style={{ color: PINK }}>{C.about.head}</h1>
            <p className="p45 ab-body"><Lines lines={C.about.body} /></p>
          </div>
        </section>

        {/* ---- experience, beside where it happened ---- */}
        <section className="du-sec ab-two" style={{ '--pt': 287, '--pb': 0 }}>
          {/* the ink URLs are resolved here: a function cannot cross from a
              server component into a client one */}
          <Jobs jobs={C.experience.jobs.map(j => ({ ...j, img: INK(j.ink) }))} />
          <div data-reveal>
            <h2 className="p55 ab-head" style={{ color: PINK }}>{C.experience.head}</h2>
            <p className="p45 ab-body"><Lines lines={C.experience.body} /></p>
            <a className="p26 ab-cta" href={RESUME} download>{C.experience.cta}</a>
          </div>
        </section>

        {/* ---- the pillars ---- */}
        <section className="du-sec" style={{ '--pt': 248, '--pb': 0 }}>
          <h2 className="p65 du-x" style={{ '--x': 161, color: PINK }} data-reveal>
            {C.pillars.head}
          </h2>
          <Gallery label="Design pillars" className="ab-gallery pk-light-paddles" paddles="right" always>
            {C.pillars.cards.map((c, i) => (
              <article key={c.title.join(' ')} className="ab-pillar" data-reveal data-in="lift">
                {/* the ink is the fallback; a clip at about-pillar-N takes its
                    place the moment the file is there (lib/about-copy.js) */}
                <span className="ab-pillar-ink" style={{ backgroundImage: `url(${pillarClip(i)?.poster || INK(c.ink)})` }}>
                  {pillarClip(i)?.video &&
                    <Video src={pillarClip(i).src} poster={pillarClip(i).poster} />}
                </span>
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
          <div className="ab-collage" style={{ '--mt': 153 }} data-stagger>
            {C.life.rows.map((row, i) => (
              <div key={i} className="ab-row">
                {row.map(s => {
                  const [w, h] = s.r
                  return (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img key={s.n} src={INK(s.n)} alt={s.alt} loading="lazy" data-reveal
                         width={w} height={h}
                         style={{ '--a': (w / h).toFixed(4), '--w': w, '--h': h,
                                  ...(s.pos ? { objectPosition: s.pos } : null) }} />
                  )
                })}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer seed="about" />
      <Reveal />
    </>
  )
}
