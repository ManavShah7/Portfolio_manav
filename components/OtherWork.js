import Link from 'next/link'

import { Lines, Chev } from './Chrome'
import Frame from './Frame'
import { media } from '@/lib/clips'
import Gallery from './Gallery'
import { WORK } from '@/lib/work'

// The close every case study frame draws: "Check out my other work." over the
// other projects, one iPad at a time. Spacing is in design px (--pt / --pb on
// .du-sec), passed by the page. The frame draws each project as an empty iPad,
// 778 x 498, so that is what this is. It still links to the case study.
function Slide({ w }) {
  return (
    <Link href={`/work/${w.slug}`} className="ow-slide" aria-label={`${w.name} case study`} data-reveal>
      <Frame kind="ipad" w={778} clip={media(`other-${w.slug}`)} />
      <span className="ow-name p30">{w.name} <Chev /></span>
    </Link>
  )
}

// The contact line and the foot below it now come from <Outro> and <Footer>,
// so this is only the "Check out my other work." carousel.
export default function OtherWork({ slug, head = ['Check out my', 'other work.'],
                                    headX = 195, other = { pt: 236, pb: 0 } }) {
  const others = WORK.filter(w => w.slug !== slug)
  return (
    <section className="du-sec" style={{ '--pt': other.pt, '--pb': other.pb }}>
      <h2 className="p70 du-x pk-other" style={{ '--x': headX }} data-reveal><Lines lines={head} /></h2>
      <Gallery label="Other projects" className="pk-gallery pk-light-paddles pk-projects" paddles="center" always>
        {others.map(w => <Slide key={w.slug} w={w} />)}
      </Gallery>
    </section>
  )
}
