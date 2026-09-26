# manavshah.me

Manav Shah's portfolio. Next.js 16 (App Router), React 19, plain CSS, no
Tailwind, no animation or scroll libraries.

    npm run dev              # http://localhost:3000
    npm run build && npm start
    node scripts/check.mjs http://localhost:3000

## Where the numbers come from

The type ramp, containers, section padding, radii and easing curves are taken
from apple.com product pages, measured in a browser (iPhone Duo, Apple Watch
Series 12, Vision Pro, iPad Pro, iPhone 17e). The write-ups live outside the
repo in `~/.claude/refs/apple-2026-product-pages.md`,
`apple-iphone-17e-type.md` and `apple-motion-2026.md`. Colour, copy and voice
are Manav's.

| | value |
|---|---|
| breakpoints | large > 1068, medium 735-1068, small <= 734 |
| containers | `.wrap` 1260, `.wrap-text` 980, 40px min margin (24 on phones) |
| section padding | 144 / 112 / 80, closing section 224 / 160 / 112 |
| grid | 12 columns, 20px gutter, 24px row gap (12/12 on phones) |
| radius | 28 / 24 / 20; screens 18; buttons pill |
| font | `-apple-system` first (system SF, with its own Display/Text optical switch), self-hosted SF Pro Display as the fallback |

## The type ramp

In `app/globals.css`. Tracking crosses zero between 48 and 32 and goes negative
again below 19. On phones the top of the ramp shrinks hard (80 to 48) and the
bottom barely moves (21 to 17, 12 stays 12).

| class | large | medium | small | use |
|---|---|---|---|---|
| `.t-hero` | 80/1.05 | 64 | 48 | page and statement headlines |
| `.t-display` | 64 | 48 | 40 | next-project name |
| `.t-headline` | 56 | 48 | 40 | section headlines |
| `.t-head` | 48 | 40 | 32 | secondary headlines |
| `.t-title` | 40 | 32 | 28 | intro lines, big quotes |
| `.t-sub` | 32 | 28 | 24 | card statements |
| `.t-card` | 28 | 24 | 21 | card headings |
| `.t-lead` | 24/600 | 21 | 19 | lead copy |
| `.t-body-lg` | 21/1.381/600 | 19 | 17 | copy; add `.regular` for long reading |
| `.t-eyebrow` | 21/600 | 21 | 17 | eyebrows, labels |
| `.t-body` | 17/1.47/400 | 17 | 17 | body |
| `.t-caption` | 14 | 14 | 14 | meta |
| `.t-fine` | 12 | 12 | 12 | footer |

`.lit` is apple.com's grey-paragraph-with-a-lit-phrase: the paragraph in the
quiet grey, `<b>` in full ink. The case studies use it wherever Manav's copy
has a bold lead running into grey.

## Pages

- `/` - hero, the four case studies as film tiles (`lib/work.js`), the quote,
  About (experience, principle, education, resume). The iPad collage section
  appears only once `public/media/home-collage.*` exists.
- `/work/peak` - built to Manav's frame (`~/Desktop/Final Design/Peak.png`, a
  1900-wide frame Figma exported at 1.9026x because it hit the 32768px height
  limit). Everything is in **design units**: numbers are design px, multiplied
  by `--u` (1px at 1900 wide, scaling with the window down to 1069), so every
  laptop sees the frame in proportion while the page stays native and
  reflowing. Tablet and phone get their own sizes (`.pk` in globals.css).
  Authored lines never re-wrap on a laptop - they are the frame's breaks.
- `/work/times-media` - bespoke page on the Apple ramp.
- `/work/lighthouse`, `/work/liveasy` - share `components/Story.js`, since the
  two copy files have the same shape.

Every case study opens with `<CaseHero>` and ends with `<NextProject>`
(components/Case.js).

## Components

- `Chrome.js` - `<Page>` (nav, main, footer, Reveal), `<Nav>` (sticky glass
  bar), `<Lines>`, `para()`.
- `Case.js` - `<CaseHero>`, the pinned hero: the film is `position: sticky`,
  the product name sits on the first screen, the opening lines scroll over it,
  and a black scrim darkens on a linear ramp driven by the section's view
  timeline (0.12 to 0.9). `<NextProject>`. `<Glyph>` line icons.
- `Media.js` - `<Media>` and `<Video>`. Clips download only when near the
  viewport, play only while on screen, and are swapped for their still under
  reduced motion.
- `Gallery.js` - horizontal gallery: native scroll with snap, paddles below.
- `Reveal.js` - entrances, including the settle-sweep that rescues blocks a
  fast flick carried past their trigger.
- `Story.js` - the long-form case study template.

## Motion

- **Entrances** (`data-reveal`, optional `data-reveal="fade"` / `"far"`): rise
  40px and fade, `cubic-bezier(0.28,0.11,0.32,1)`, 0.8s opacity / 1s transform,
  150ms apart inside a `data-stagger` group. One-shot.
- **Scroll-linked** (`data-sv`): `grow` (an inset panel scales to full size,
  used for films), `rise`, `drift` (slow parallax), `tilt`, `fade`. Linear in
  scroll, run by the compositor through `animation-timeline: view()`.
- **Sticky**: `.hold` puts media beside copy and holds it while the copy
  scrolls past (Times Media's PowerPoint).

## Media

Drop `public/media/<page>-<slot>.mp4` (or `.webm`, `.png`, `.webp`, `.jpg`)
and the page picks it up on the next build. Add a
`<page>-<slot>-poster.webp` beside any clip. Slots in use:

- home: `kanye`, `collage`
- peak: `hero`, `problem`, `voice1`/`voice2` (the two portraits, cut from the
  frame), `globe`, `ceiling` (the wave behind "All these apps..."),
  `friends1`, `friends2`. Sources are in `~/Desktop/Final Design/`.
- times: `pink` (hero and home tile), `problem`, `admin`,
  `analytics`, `field`, `maintenance`, `hero` (the website). `client` is in the folder but unused
- lighthouse: `hero` (falls back to `green`), `green`, `navi`, `playbook`,
  `extension`
- liveasy: `hero`, `bronze`, `pillars`, `hero-screen`, `proof`

Big exports: `scripts/encode-band.sh <src> <out> <w> <h>` re-encodes at CRF 26.
Originals go in `media-src/` (gitignored).

## Known gaps

- No screenshots yet for Peak, Lighthouse or Liveasy - those sections run on
  copy alone until the clips are dropped in.
- Lighthouse's research headline is still Times Media's ("Same PowerPoint...")
  and Peak's first what's-next card repeats a solution caption. Both are in the
  copy files as Manav wrote them.
- The SF Pro fallback files are unsubset OTFs (~1.4MB); Apple devices never
  download them.
