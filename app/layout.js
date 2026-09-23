import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'

export const metadata = {
  title: 'Manav Shah - Product Designer',
  description: 'Product designer. Portfolio and case studies.',
}

// Set before first paint, Apple-style: the hidden state of a reveal is written
// as `html.js.no-reduced-motion [data-reveal]`, so if JS never runs - or the
// reader has asked for less motion - the page is simply finished, never blank.
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');
d.classList.add(matchMedia('(prefers-reduced-motion: reduce)').matches?'reduced-motion':'no-reduced-motion')})()`

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><script dangerouslySetInnerHTML={{ __html: BOOT }} /></head>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  )
}
