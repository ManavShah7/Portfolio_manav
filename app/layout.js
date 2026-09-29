import './globals.css'

export const metadata = {
  metadataBase: new URL('https://manavshah.me'),
  title: { default: 'Manav Shah - Product Designer', template: '%s - Manav Shah' },
  description: 'Product designer who designs end to end and builds enough to find out where the design was lying.',
  openGraph: { siteName: 'Manav Shah', type: 'website' },
}

export const viewport = { themeColor: '#FFFFFF' }

// Set before first paint, Apple-style: the hidden state of an entrance is
// written as `html.js.no-reduced-motion [data-reveal]`, so if JS never runs -
// or the reader has asked for less motion - the page is simply finished.
//
// No smooth-scroll library. apple.com never eases the page scroll itself; wheel
// and trackpad input stay native, and the damping lives on the things that move.
const BOOT = `(function(){var d=document.documentElement;d.classList.add('js');
d.classList.add(matchMedia('(prefers-reduced-motion: reduce)').matches?'reduced-motion':'no-reduced-motion');
/* hover effects are gated on this the way apple.com gates theirs, so a phone
   never lands in a stuck hover state after a tap */
if(!matchMedia('(hover: hover) and (pointer: fine)').matches)d.classList.add('touch');
else d.classList.add('no-touch')})()`

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: BOOT }} /></head>
      <body>{children}</body>
    </html>
  )
}
