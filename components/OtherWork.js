import Link from 'next/link'

import { Lines, EMAIL } from './Chrome'
import Gallery from './Gallery'
import { WORK } from '@/lib/work'

// The close every case study frame draws: "Check out my other work." over the
// other projects, one iPad at a time, then "Like my work? Get in contact."
// Spacing is in design px (--pt / --pb on .du-sec), passed by the page.
// The frame draws each project as an empty iPad - a white screen, nothing on
// it - so that is what this is. It still links to the case study.
function Slide({ w }) {
  return (
    <Link href={`/work/${w.slug}`} className="pk-ipad" aria-label={`${w.name} case study`} data-reveal>
      <div className="pk-ipad-screen" style={{ background: '#FFFFFF' }} />
    </Link>
  )
}

export default function OtherWork({ slug, head = ['Check out my', 'other work.'],
                                    contact = ['Like my work?', 'Get in contact.'],
                                    headX = 195, contactX = 240,
                                    other = { pt: 236, pb: 0 }, end = { pt: 219, pb: 751 } }) {
  const others = WORK.filter(w => w.slug !== slug)
  return (
    <>
      <section className="du-sec" style={{ '--pt': other.pt, '--pb': other.pb }}>
        <h2 className="p70 du-x pk-other" style={{ '--x': headX }} data-reveal><Lines lines={head} /></h2>
        <Gallery label="Other projects" className="pk-gallery pk-light-paddles pk-projects" paddles="center" always>
          {others.map(w => <Slide key={w.slug} w={w} />)}
        </Gallery>
      </section>
      <section className="du-sec" style={{ '--pt': end.pt, '--pb': end.pb }}>
        <p className="p70 du-x" style={{ '--x': contactX }} data-reveal>
          <span className="ln">{contact[0]}</span>
          <a className="ln pk-contact" href={EMAIL}>{contact[1]}</a>
        </p>
      </section>
    </>
  )
}
