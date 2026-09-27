import Reveal from '@/components/Reveal'
import { Lines } from '@/components/Chrome'
import * as C from '@/lib/home-copy'

// Built to Manav's frame in design units (.du), the same as the case studies:
// --u is one design px, so every number here is read straight off the export.
const IMG = n => `/media/home/${n}.webp`

export default function Home() {
  return (
    <>
      <main className="hm du">
        {/* ---- header ---- */}
        <header className="hm-top">
          <div className="hm-me" data-reveal>
            <p className="p30 c-2">{C.me.kind}</p>
            <p className="p48 hm-pink">{C.me.name}</p>
          </div>
          <nav className="hm-nav" aria-label="Site" data-reveal>
            {C.nav.map(n => <a key={n.label} className="p30 c-2" href={n.href}>{n.label}</a>)}
          </nav>
        </header>

        {/* ---- the line, on the gradient the frame draws ---- */}
        <section className="hm-band">
          <p className="p46 center" data-reveal><Lines lines={C.hero} /></p>
        </section>

        {/* ---- the work, on four screens ---- */}
        <section className="hm-devices" aria-hidden="true" data-stagger>
          {/* eslint-disable @next/next/no-img-element */}
          <img className="hm-d1" src={IMG('ipad-landscape')} alt="" data-reveal />
          <img className="hm-d2" src={IMG('iphone')} alt="" data-reveal />
          <img className="hm-d3" src={IMG('ipad-portrait')} alt="" data-reveal />
          <img className="hm-d4" src={IMG('macbook')} alt="" data-reveal />
        </section>

        {/* ---- purpose ---- */}
        <section className="hm-purpose">
          <h2 className="p59 hm-pink hm-purpose-head" data-reveal><Lines lines={C.purpose.head} /></h2>
          <p className="p45 hm-purpose-body" data-reveal><Lines lines={C.purpose.body} /></p>
        </section>

        {/* ---- the wall ---- */}
        <section className="hm-wall" aria-label="Selected work">
          {C.work.map(n => (
            <figure key={n} className="hm-wall-item" data-reveal>
              <img src={IMG(n)} alt="" loading="lazy" />
            </figure>
          ))}
        </section>
      </main>
      <Reveal />
    </>
  )
}
