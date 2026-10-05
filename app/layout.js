import './globals.css'

export const metadata = {
  metadataBase: new URL('https://manavshah.me'),
  title: { default: 'Manav Shah - Product Designer', template: '%s - Manav Shah' },
  description: 'Product designer who designs end to end and builds enough to find out where the design was lying.',
  // Every page inherits this card unless it sets its own. Without an image, a
  // link to the site pasted anywhere - Slack, LinkedIn, iMessage - came out as
  // a bare grey rectangle.
  openGraph: {
    siteName: 'Manav Shah', type: 'website', locale: 'en_US',
    images: [{ url: '/media/og.jpg', width: 1200, height: 630,
               alt: 'Manav Shah, product designer' }],
  },
  twitter: { card: 'summary_large_image', images: ['/media/og.jpg'] },
}

export const viewport = { themeColor: '#FFFFFF' }

// Set before first paint, Apple-style: the hidden state of an entrance is
// written as `html.js.no-reduced-motion [data-reveal]`, so if JS never runs -
// or the reader has asked for less motion - the page is simply finished.
//
// No smooth-scroll library. apple.com never eases the page scroll itself; wheel
// and trackpad input stay native, and the damping lives on the things that move.
const BOOT = `/* god bless the white monster */
(function(){var d=document.documentElement;d.classList.add('js');
/* for whoever opens the console. Not on the page, not in the way, and the FAQ
   answers it properly for anyone who asks out loud. */
try{console.log('%c god bless the white monster ',
  'background:#0A0A0A;color:#EDEDED;padding:6px 12px;border-radius:999px;'
  +'font:500 12px/1.7 -apple-system,BlinkMacSystemFont,sans-serif')}catch(e){}
d.setAttribute('data-fuel','monster ultra white');
d.classList.add(matchMedia('(prefers-reduced-motion: reduce)').matches?'reduced-motion':'no-reduced-motion');
/* hover effects are gated on this the way apple.com gates theirs, so a phone
   never lands in a stuck hover state after a tap */
if(!matchMedia('(hover: hover) and (pointer: fine)').matches)d.classList.add('touch');
else d.classList.add('no-touch');
/* The home page opens on its film full-screen and then contracts into its
   band. Set BEFORE first paint or the settled layout flashes first. Once a
   session, on the home page only, and never when motion is unwelcome. */
try{ if(location.pathname==='/'&&sessionStorage.getItem('intro')!=='1'
  &&!matchMedia('(prefers-reduced-motion: reduce)').matches) d.classList.add('intro') }catch(e){}
})()`

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: BOOT }} /></head>
      <body>{children}</body>
    </html>
  )
}
