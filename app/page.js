import Link from 'next/link'

import Reveal from '@/components/Reveal'
import { Lines } from '@/components/Chrome'
import { Video } from '@/components/Media'
import { media } from '@/lib/clips'
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

        {/* ---- the work: every screen the frame draws is a case study ---- */}
        <section className="hm-devices" aria-label="Selected work" data-stagger>
          {C.devices.map(d => {
            const clip = d.clip ? media(d.clip) : null
            const [l, t, w, h] = d.screen
            return (
              <Link key={d.slug} href={`/work/${d.slug}`} className={`hm-dev ${d.cls}`}
                    aria-label={`${d.name} case study`} data-reveal>
                {/* the project, sitting in the device's own screen rectangle */}
                <span className="hm-dev-screen"
                      style={{ left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%`,
                               backgroundImage: clip?.poster ? `url(${clip.poster})` : undefined }}>
                  {clip?.video && <Video src={clip.src} poster={clip.poster} />}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG(d.img)} alt="" />
                <span className="hm-dev-name p30">{d.name}</span>
              </Link>
            )
          })}
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
              {/* cut from the export at the size they are shown - next/image
                  would re-encode and pick its own widths */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG(n)} alt="" loading="lazy" />
            </figure>
          ))}
        </section>
      </main>
      <Reveal />
    </>
  )
}
