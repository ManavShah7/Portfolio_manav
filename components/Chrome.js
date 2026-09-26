import Link from 'next/link'

import Reveal from './Reveal'

export const RESUME = '/ManavShah_ProductDesigner_Resume.pdf'
export const EMAIL = 'mailto:shah.manavd@northeastern.edu'

// The site's one navigation bar. Glass, sticky, 48px - apple.com's global nav.
// backdrop-filter is set inline (see .gnav in globals.css for why).
const GLASS = { backdropFilter: 'saturate(180%) blur(20px)', WebkitBackdropFilter: 'saturate(180%) blur(20px)' }

export function Nav({ title, dark = false }) {
  return (
    <nav className={`gnav${dark ? ' dark' : ''}`} style={GLASS} aria-label="Site">
      <div className="wrap gnav-in">
        <Link href="/" className="gnav-brand">{title || 'Manav Shah'}</Link>
        <div className="gnav-links">
          <Link href="/#work">Work</Link>
          <Link href="/#about" className="gnav-hide-sm">About</Link>
          <a href={EMAIL} className="gnav-hide-sm">Contact</a>
          <a href={RESUME} download className="gnav-cta">Resume</a>
        </div>
      </div>
    </nav>
  )
}

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap foot-in">
        <span>Designed and built by Manav Shah. <span className="egg">god bless the white monster</span></span>
        <span className="foot-links">
          <a href={EMAIL}>Email</a>
          <a href="https://www.linkedin.com/in/manavshah177" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={RESUME} download>Resume</a>
        </span>
      </div>
    </footer>
  )
}

// Every page: the page and the entrance driver. The frames draw no global nav
// and no footer - a case study opens on its film and ends on its own contact
// line - so `Nav` and `Footer` are kept here but not mounted. `title` and
// `dark` stay in the signature so the pages do not all have to change.
export function Page({ title, dark, children }) {
  return (
    <>
      <main>{children}</main>
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

export function Lines({ lines, as: Tag = 'span', className }) {
  const rows = Array.isArray(lines) ? lines : [lines]
  return rows.map((l, i) => <Tag key={i} className={`ln${className ? ' ' + className : ''}`}>{mark(l)}</Tag>)
}

// A paragraph authored as a line array for the canvas build. On a page that
// reflows, those breaks were only ever about the old fixed measure, so the
// lines are joined and the browser sets the paragraph.
export const para = lines => (Array.isArray(lines) ? lines.join(' ') : lines).replace(/\s+/g, ' ').trim()

export function Chev() {
  return <span className="chev" aria-hidden="true">›</span>
}
