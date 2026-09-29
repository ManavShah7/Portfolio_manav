import Link from 'next/link'

import Reveal from './Reveal'

export const RESUME = '/ManavShah_ProductDesigner_Resume.pdf'
export const EMAIL = 'mailto:shah.manavd@northeastern.edu'

// The site's one navigation bar. Glass, sticky, 48px - apple.com's global nav.
// backdrop-filter is set inline (see .gnav in globals.css for why).
const GLASS = { backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)' }

// One bar on every page but home, which draws its own header. Left is always
// the way back - his name, with a chevron so it reads as "up a level" rather
// than as a logo. Right is where anyone actually wants to go next.
export function Nav({ here }) {
  return (
    <nav className="nav" style={GLASS} aria-label="Site">
      <div className="nav-in">
        <Link href="/" className="nav-back">
          <span className="nav-back-chev" aria-hidden="true">‹</span>
          <span>Manav Shah</span>
        </Link>
        <div className="nav-links">
          <Link href="/about" aria-current={here === 'about' ? 'page' : undefined}>About</Link>
          <a href={RESUME} download>Resume</a>
          <a href={EMAIL}>Contact</a>
        </div>
      </div>
    </nav>
  )
}

export const LINKEDIN = 'https://www.linkedin.com/in/manavshah177'
export const PHONE = 'tel:+16177498140'

// The foot of every case study, as the updated frames draw it: "Like my work?
// / Get in contact." on the page's own ground, then a #F5F5F7 band carrying
// four columns. Measured off liveasy.png - band 567 tall, labels 48 at 189
// from its top, the note under them 34, columns at x 146 / 519 / 1120 / 1479.
const FEET = [
  { label: 'Resume',   note: 'View & Download',             href: RESUME, download: true },
  { label: 'Email',    note: 'shah.manavd@northeastern.edu', href: EMAIL },
  { label: 'Linkedin', note: 'Let\u2019s connect',              href: LINKEDIN, blank: true },
  { label: 'Contact',  note: '+1 (617)749-8140',            href: PHONE },
]

export function Footer() {
  return (
    <footer className="ft du" aria-label="Contact">
      <div className="ft-row" data-stagger>
        {FEET.map(f => (
          <a key={f.label} className="ft-col" href={f.href}
             {...(f.download ? { download: true } : null)}
             {...(f.blank ? { target: '_blank', rel: 'noreferrer' } : null)} data-reveal>
            <span className="p48 ft-label">{f.label} <Chev /></span>
            <span className="p34 ft-note">{f.note}</span>
          </a>
        ))}
      </div>
    </footer>
  )
}

// "Like my work? / Get in contact." - the last thing on the page above the
// footer band. 70, left at 156, on whatever ground the section sits on.
export function Outro({ x = 156, pt = 300, pb = 298, lines = ['Like my work?', 'Get in contact.'] }) {
  return (
    <section className="du-sec ft-outro" style={{ '--pt': pt, '--pb': pb }}>
      <p className="p70 du-x" style={{ '--x': x }} data-reveal>
        <span className="ln">{lines[0]}</span>
        <a className="ln ft-contact" href={EMAIL}>{lines[1]}</a>
      </p>
    </section>
  )
}

// Every case study: the page, the foot the updated frames draw, and the
// entrance driver. There is still no global nav - a case study opens on its
// film - so `Nav` is kept here but not mounted. `title` and `dark` stay in the
// signature so the pages do not all have to change.
export function Page({ title, dark, here, children }) {
  return (
    <>
      <Nav here={here} />
      <main>{children}</main>
      <Footer />
      <Reveal />
    </>
  )
}

// Authored line breaks. Kept as rows on large and medium screens, reflowed on
// small ones (see .ln in globals.css).
// `*word*` inside a line is an accent - the frames colour one word in a
// headline ("Before jumping to *Figma,*"). The colour comes from --ac on an
// ancestor, so the copy stays free of it.
const mark = l => typeof l === 'string' && l.includes('*')
  ? l.split(/\*([^*]+)\*/).map((part, i) => i % 2 ? <span key={i} className="ac">{part}</span> : part)
  : l

// `swipe` nests the content in a second span, which the clipped line reveal
// needs: `.ln` does the clipping and the inner span is what rises. Off by
// default, because it changes the DOM every headline on the site renders into.
export function Lines({ lines, as: Tag = 'span', className, swipe }) {
  const rows = Array.isArray(lines) ? lines : [lines]
  return rows.map((l, i) => (
    <Tag key={i} className={`ln${className ? ' ' + className : ''}`}>
      {swipe ? <span>{mark(l)}</span> : mark(l)}
    </Tag>
  ))
}

// A paragraph authored as a line array for the canvas build. On a page that
// reflows, those breaks were only ever about the old fixed measure, so the
// lines are joined and the browser sets the paragraph.
// A trailing space is meaningful: `cap()` runs a bold opener straight on into
// the grey that follows, and trimming it welded the two words together
// ("...to scroll through.No credibility"). Leading space is still dropped.
export const para = lines => {
  const raw = Array.isArray(lines) ? lines.join(' ') : lines
  const one = raw.replace(/\s+/g, ' ').trim()
  return /\s$/.test(raw) ? `${one} ` : one
}

export function Chev() {
  return <span className="chev" aria-hidden="true">›</span>
}
