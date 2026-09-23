# Working in this repo

This is a deliberate 1:1 reproduction of a Figma frame, with motion and a few
additions layered on top. It is not a design system. Before changing anything,
read `README.md` — especially *How the layout works* and *Motion*.

Rules that are easy to break by accident:

1. **Do not "fix" the inconsistencies - except spacing, which Manav asked to be
   fixed.** The source frames are hand-placed: cards that should line up don't,
   column margins change between bands, and Peak centres twenty "centred" blocks
   on twenty different axes. Everything else about them is still reproduced on
   purpose, so if something looks wrong, check the export before changing it -
   but **position comes from `lib/grid.js` now, not from the export**. One grid
   per page: `L` left column, `W` measure, `C` centre axis, `GUT` gutter, plus a
   set of vertical gaps. `scripts/grid-check.mjs` measures the rendered page and
   fails if a card row does not span exactly L..R, or if the dominant left edge
   or centre axis is not L or C. Multi-column rows are fine - it checks the row,
   not each card. Because of this the pages no longer diff clean against the
   exports; `align.py`/`diff.py`/`sweep.py` are for checking type, not position.
2. **Never join a line array into a single string.** Line breaks are manual in
   the Figma; letting the browser wrap moves everything below.
3. **Coordinates are ink positions**, not CSS box positions. Pass the measured
   top-left of the pixels and let `components/Nodes.js` do the conversion.
4. **Verify with a screenshot diff**, not by eye. `scripts/align.py` gives you
   the correction in design px; apply it to the coordinate and re-run.
   `scripts/sweep.py` must stay clean outside the listed additions.
5. Design px = export px ÷ 2. The frame is 1900 wide; the exports are 3800.
6. **`position: sticky` and `position: fixed` do not work as expected inside
   the canvas** — it is `transform: scale()`d, which makes it the containing
   block for fixed and makes sticky resolve its offsets unscaled. Render pinned
   things through `<Frame overlay>`, which puts them outside the transform, and
   scale their numbers by hand via `useScale()`.
7. **Do not reposition anything on every scroll frame** — it will visibly lag.
   Let the compositor do it, and keep scroll listeners for state that changes
   rarely, like the rail's colour.
8. **Animate blocks, not elements.** A card and everything printed on it must
   share one `rv` and one `at`, or the contents slide against the card.
9. **`backdrop-filter` must be set inline.** From a stylesheet the CSS minifier
   emits only `-webkit-backdrop-filter`, which Chrome does not support, so the
   blur silently does nothing.
10. `node:fs` cannot be imported into `components/Nodes.js` — client components
    import from it. Do build-time file checks in the page, which is a server
    component, and pass the result down.
11. **Whichever element carries the absolute box must carry `data-rv`.** Put it
    on a wrapper that generates no box (`display: contents`, or an `<a>` round
    an absolutely positioned child) and the entrance silently does nothing —
    worse, the block picks that zero-sized element as its trigger and never
    fires. `scripts/motion-check.mjs` now asserts `box-less parts: 0`.
12. **After inpainting text out of a background, check that it is gone.** Count
    the bright pixels left in the text band. A mask aimed at the wrong rows
    leaves the old text baked in, the live text renders on top of it, and you
    get a doubled headline that no static screenshot diff will catch — the
    reduced-motion capture looks identical either way.

13. **`/work/liveasy` is composed, not reproduced.** There is no Figma frame
    for it, so there is nothing to diff it against and `scripts/align.py` and
    `scripts/diff.py` do not apply. It borrows the Lighthouse frame's band
    stops, grid and vertical rhythm so it reads as one of the set. Its guard is
    `scripts/fit-check.mjs`, which asserts nothing runs past the frame and
    nothing printed on a card leaves it.
14. **Never hand-place a second column.** If two things sit side by side, they
    come from `G.col(i, n)`, and if they are printed ON a card they come from
    `G.inset(pad).col(i, n)` so they land inside its padding rather than flush
    to its edge. Hand-placed columns are what made the frames ragged.
15. **A device frame has its background baked into the PNG.** There is no alpha
    in any of them, so `-grey` cutouts (#F5F5F7) only work on grey cards and
    `-white` ones only on white. Put the wrong one down and you get a visible
    rectangle around the device.

16. **Video goes in as a whole-frame replacement.** `<Shot>` and `<Cover>` take
    a `clip` resolved by `lib/clips.js` at build time; drop
    `public/videos/<page>-<slot>.mp4` and the frame plays it, drop nothing and
    it is the still. `scripts/slots.mjs` prints the list with export sizes. Do
    not try to composite a clip inside a bezel - the screen rectangles in these
    PNGs defeat every edge test (the macbook wallpaper and the dark phone
    screens especially), and a few px out looks broken. Both components put the
    still on the PARENT as a background, because `prefers-reduced-motion` hides
    the `<video>` and without that there would be a hole where the frame was.

The section rail, the scroll-triggered motion, the progressive-blur scrim, the
seam softeners, the paddle chevrons, the card icons, the integrations row and
the footer are deliberate departures from the Figma, at Manav's request. See
*Motion*, *Progressive blur*, *Seams* and *Known gaps* in the README.
Everything else is still a 1:1 reproduction.

Sources: `~/Desktop/newportfolio /new design/MacBook Air - 6.png` (home,
3800x5402) and `MacBook Air - 7.png` (case study, 3800x29732).
