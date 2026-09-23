# manavshah-v6

An exact reproduction of the Figma frames in
`~/Desktop/newportfolio /new design/`:

| page | export | design frame |
|---|---|---|
| `/` | `MacBook Air - 6.png` | 1900 x 2701 |
| `/work/peak` | `MacBook Air - 7.png` | 1900 x 14866 |
| `/work/times-media` | `times media.png` | 1900 x 11737 |
| `/work/lighthouse` | `lighthouse.png` | 1900 x 11737 |

All are 2x exports of a **1900-wide** frame, so every number in this repo is
that frame's design px and every export pixel is two of them.

**The device strip on the home page is the navigation** - the iPhone opens
Peak, the small MacBook opens Times Media, the large MacBook opens Lighthouse.
The iPad has no case study behind it yet and stays as artwork. The link has to carry the
absolute box, not wrap the image: an `<a>` round an absolutely positioned
`<img>` collapses to zero size and cannot be clicked.

```
npm run dev      # http://localhost:3000
npm run build
npm run lint
```

## How the layout works

The frame is a fixed 1900px canvas (`components/Frame.js`) that scales as one
piece to fit the viewport, so the proportions hold at any width and nothing
reflows. Inside it everything is absolutely positioned at its measured
coordinate — the Figma is hand-placed and disagrees with itself in a dozen
places (the two Problem cards sit 3px apart vertically; the section column is
at x420 in one band and x415 in the next; the left margin drops to x357 from
the purple section on), and those are reproduced rather than tidied up.

**Text is authored by its ink position**, not its CSS box. `components/Nodes.js`
takes the top-left of the actual pixels as measured off the export and derives
the CSS `top`/`left` from the font's own metrics (`lib/metrics.json`, generated
by `scripts/metrics.py`): the vertical offset depends on which glyphs are on the
line, the horizontal one on the first glyph's side bearing. Getting this from
metrics rather than by eye is what keeps the whole 14,866px page within a pixel.

**Every line break is manual.** The lines in the Figma all stop well short of
their column, so `lib/peak-copy.js` stores headlines and paragraphs as arrays of
lines. Never join them into one string — the browser would re-wrap and every
measurement below that point would move.

## Type

SF Pro Display, self-hosted from `public/fonts`. `font-synthesis-weight: none`
is set so a missing weight can never be faked into looking correct. Sizes and
weights in `lib/styles.js` were fitted per word against the export (pixel
correlation for the size, stem width ÷ em for the weight — ink mass does not
reliably separate Medium from Semibold).

## Assets

`public/figma/` holds slices cut straight out of the 2x export: the device
mockups, the home quote gradient, and the purple photo band. The two image
backgrounds had their text painted out with `cv2.inpaint` and the real text is
drawn back on top at the same place, so any residue sits under the glyphs.
The coral and purple ramps are pure vertical gradients and are CSS, not images.

## Verifying a change

```
npx next start -p 3111
node scripts/shoot.mjs http://localhost:3111/work/peak /tmp/peak.png 14866
python3 scripts/sweep.py "<export>.png" /tmp/peak.png 1000   # residual per slab
python3 scripts/align.py "<export>.png" /tmp/peak.png jobs.json  # per-element shift
python3 scripts/diff.py  "<export>.png" /tmp/peak.png y0 y1 bg   # line by line
```

`align.py` reports the shift in design px that would best line an element up, so
its output goes straight back into the coordinate. `diff.py` compares ink line
by line: a width mismatch means a wrong size or a wrong wrap point, a line-count
mismatch means the text frame is the wrong width. Screenshots are taken at DPR 2
so they are directly comparable with the export.

## The section rail

The one place this departs from the Figma on purpose. The Figma draws
Overview / Problem / Research / Solution / What's Next once, at the top of the
Overview; here it stays pinned as you scroll and flips between `#5A5A5A` and
`#A9A9A9` over the dark bands, and the items scroll to their section on click.
Unscrolled it is still exactly where the Figma puts it, so the reproduction
still verifies.

It is pinned with **real CSS `position: sticky`**, so the browser holds it in
place and it can never lag the page. That is only possible because the rail
renders *outside* the scaled canvas, via `<Frame overlay>`: a
`transform: scale()` ancestor makes sticky resolve its offsets in unscaled
layout coordinates, so inside the frame it pins at the wrong scroll position and
drifts below 1900px. The rail therefore multiplies every design-px number by the
scale once, on resize, and reads that scale from `useScale()`.
`scripts/rail.mjs` checks the pin position and colour at three viewport widths.

The colour crossovers are the points where the mean luminance of the page behind
the rail's own column passes the mid point, sampled off the export rather than
guessed. Only the colour follows the scroll, and it sets state on a crossing
rather than on every frame - it changes twice in 14,866px.

## Smooth scrolling

`components/SmoothScroll.js` runs Lenis over the whole document. It animates
the real scroll position rather than translating a wrapper, which is why
`position: sticky`, the native scrollbar and the carousels all still work. It
is disabled under `prefers-reduced-motion`, so the screenshot scripts (which
set `reducedMotion: 'reduce'`) capture the page with native scrolling and the
verification is unaffected.

## Motion

The page is annotated with **blocks, not elements**: `block="ov"` ties a
headline, its paragraphs and its cards together so they share one trigger and
perform in sequence. Fifteen blocks cover the case study. An earlier pass
animated all 94 parts independently against scroll position, which read as
drift rather than choreography - blocks are the fix.

Three entrances, each with its own character:

| `rv` | what it does | used for |
|---|---|---|
| `lines` | each line swings up from behind its own clip box, 110ms apart, 1s | headlines |
| `rise` | 44px lift and fade, .9s `cubic-bezier(.26,.67,.48,.91)` | copy, meta |
| `card` | 110px, 1.15s `cubic-bezier(.16,1,.3,1)` - further and weightier | cards, imagery |

`cubic-bezier(.16,1,.3,1)` is an exponential-out: the settle shape of the
damped follower measured on apple.com, declared rather than integrated per
frame. **A card and everything sitting on it share one `rv` and one `at`**, so
the card arrives as a rigid slab; give the contents their own delay and they
visibly slide against the card they are supposed to be printed on.

`at={ms}` sequences parts within a block. A block plays when its topmost part
crosses 88% of viewport height, and **rewinds** when it drops back below the
viewport, so scrolling up has something to watch too. The exit is the
transition on the base rule and the entrance is the one on `.in`, which is why
a block arrives over ~1.2s but tidies itself away in 0.4s with no stagger -
retreating rather than performing a second time. Leaving off the *top* of the
viewport is not a rewind; that just means you have scrolled past.

The masked line reveal needs `.ln` to clip and `.w` to slide, and `.ln` carries
a `padding`/negative-`margin` pair so the clip box sits off the glyphs without
moving the layout by a hair.

Reveals are hidden by `html.js.no-reduced-motion [data-rv]`, with those classes
set by an inline script before first paint. No JS, or reduced motion, and the
page is simply finished - `scripts/motion-check.mjs` asserts 0 of 94 parts away
from their final state, prints the block inventory and traces a headline
frame by frame.

## The section rail's colour

Each of the five items is coloured for the background behind **itself**,
recomputed every frame from its own position, and ramped over 70 design px
either side of a crossover with a smoothstep. The rail is 270px tall, so
crossing a band recolours the items one after another rather than flipping all
five on a timer. Measured mid-crossing: `169 160 119 91 90`.

## Seams

Two joins in the Figma land on a visible step: the purple photo meets the ramp
below it at a 39-level jump, and that ramp stops on `#F3E3FC` where white
begins, a 29-level jump. `<Seam>` dissolves each over 140px with a `t^1.7`
alpha ramp, taking both to a step of 1-2.

The hard cuts between sections - white to coral (189), white to black (239) -
are **left alone**. Those are the composition, not a defect. The gradients
themselves needed nothing: measured max single-step of 1 level with no flat run
wider than 6 design px.

## Progressive blur

One `<Scrim>` sits over the purple photo section, where white type meets a busy
image: `backdrop-filter: blur(20px)` plus a 16-stop mask whose alpha follows
**t^1.7** (generated into `--scrim-ramp`). A two-stop linear mask bands
visibly; this doesn't. Not in the Figma - `SCRIM = false` at the top of the
page removes it.

`backdrop-filter` is set inline rather than in the stylesheet: the CSS
minifier rewrites it to `-webkit-backdrop-filter` only, and **Chrome does not
support the prefixed form**, so from a stylesheet the blur silently does
nothing. Verified against Chrome 153.

## Additions that are not in the Figma

All of these are Manav's asks, and all are cheap to remove:

- the pinned **section rail** and its per-item colour
- the **entrance choreography** and Lenis smooth scrolling
- the **progressive-blur scrim** over the purple section (`SCRIM = false`)
- two **seam softeners** in the purple bands (`<Seam>`)
- **chevrons** in the carousel paddles
- **depth of field** in the Build Catalog carousel: `depth` on `<Carousel>`
  blurs each card by its distance behind the left edge, 2.6px per card up to
  7px, so a paddle press racks focus
- an **icon** in the empty lower half of each Problem card
- the **integrations row** under "You don't need to be perfect", using the real
  brand marks from `lib/brand-icons.js` - single-path 24x24 glyphs from
  [Simple Icons](https://simpleicons.org) (CC0; the trademarks are their
  owners', and naming a product you integrate with is nominative use). `k` on
  each entry is an optical scale, because Strava is a tall triangle and Hevy is
  wide. Fitbit is in the registry unused if you want a fifth.

  Two label choices worth knowing: **Health Connect**, not Google Fit - the Fit
  APIs are deprecated and supported only to the end of 2026, and Health Connect
  is what an Android app reads from now. **Apple Health**, not Apple Fitness -
  Fitness+ is a workout-video subscription; Health is the data store.
- the **footer**: two links and the easter egg

## Video

The purple section takes a looping clip. **Drop it at
`public/figma/cs-purple.mp4`** and it plays on the next build - the page checks
for the file at build time, so until it is there the band is just the still and
there is no 404. The still doubles as the poster, and reduced motion keeps the
still rather than the clip.

## Times Media

Same system, its own palette: black is `#111111` (not Peak's `#101010`) and
the ink on it is `#CCCCCC` / `#9C9C9C` rather than white. Six rail stops
instead of five, so `<SectionRail>` takes a `config` - Peak's is the default.

It is hand-placed in the same way and the drift is reproduced: the three meta
columns each start at a different y and Skills runs a half pixel tighter per
line; the middle line of *A website wasn't the fix* is centred 6px right of the
other two; the third quote attribution is set a size larger than the other two.

Its pink is a mesh at the top (an image, text painted out with `cv2.inpaint`)
and a flat vertical ramp below. The join between them steps up to 95 levels in
places, so a `<Seam>` dissolves the last 120px of the mesh into the ramp's own
opening colour. Unlike Peak there is no faint second card queued behind either
carousel, so the tracks do not overflow and the paddles sit disabled, as drawn.

## Lighthouse

Reproduced from `lighthouse.png` like the other two - an earlier pass composed
it from the old manavshah.me page, and that is gone. Its own colour: a green
mesh over a green ramp, `#34C759` for the closing metric, everything else on
Peak's ink.

**Two things in the export look like leftovers from the Times Media frame this
one was duplicated from, and are reproduced as drawn:** the green band's
headline still reads *"Same PowerPoint. Four different ways it was breaking
things."*, and the second problem headline ends on a comma. Both are one line
each in `lib/lighthouse-copy.js`.

Like Times Media, its mesh sits over a flat ramp and the join steps by up to
152 levels across the width, so a `<Seam>` dissolves the mesh's last 120px into
the ramp's opening colour.

Apostrophes are **mixed in the source** - the wide problem card uses curly,
the card below it uses straight. Both are measured rather than assumed: a
curly apostrophe is about 3 export px wider, which shows up immediately as a
`dw` in `scripts/diff.py`.

## Known gaps

- **Home**: the 800px `#D9D9D9` block at the bottom is empty in the Figma and is
  reproduced as-is. Nothing on the home page links to the case study, because
  the Figma draws no link; `/work/peak` is reachable only by URL today.
- **Both case studies** open with an empty 832px checkerboard in the export and
  are reproduced as such. Times Media's three big image areas - the admin
  dashboard, the client landing page and the field-agent screen - are empty
  frames in the Figma too; screenshots drop into those rects.
- **Peak**: the first 832px is an empty checkerboard in the export and is
  reproduced as such. The `#F5F5F7` footer is empty in the Figma; the two links
  and the easter egg in it are Manav's ask, not the design. **"View next
  project" points at `/` because there is no next project yet**, and "Contact"
  is a `mailto:` - swap the address if it should not be the .edu one.
- About / Contact / Reflections are drawn but have no frames, so they are plain
  text rather than links to pages that do not exist.
- Every device mockup in the Figma is an empty screen. Real app screenshots drop
  straight into `public/figma/`.
- The third "What's Next" card runs off the right edge of the frame; the tail of
  its copy is reconstructed in `lib/peak-copy.js` and marked there.
- The carousels (Where the smart-tracking apps stop / Build Catalog / What's
  Next) are real scrollable tracks with working paddles. In the Figma the card
  after the last visible one is drawn at about 2% opacity and, where it is
  visible at all, is empty - so the second card in *Where the smart-tracking
  apps stop* is a blank card here. Fill it in when you have its content.
- Desktop only so far. Below 1900px the canvas scales down proportionally, which
  holds the design together but leaves phone text small — a hand-built mobile
  layout needs mobile frames.
