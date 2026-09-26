# Working in this repo

manavshah.me - Manav's portfolio. A normal responsive Next.js site, built to the
type, layout and motion measured off apple.com product pages. It **replaced** a
1900px absolutely-positioned canvas that was scaled to fit the window (that
build is still on `main` in git history). None of the canvas rules apply any
more: no design px, no ink coordinates, no `<Frame overlay>`, no line arrays
that must never be joined. Read `README.md` before changing anything.

Rules that are easy to break by accident:

1. **Type comes from the ramp in `app/globals.css`, never from a one-off
   font-size.** `.t-hero` ... `.t-fine` carry Apple's measured size, leading and
   tracking, and restate all three at 1068 and 734. Tracking is a function of
   size; leading depends on the job (reading copy is looser than a label at the
   same size). A new size is a new rung, added at all three breakpoints.
2. **Layout is `.wrap` (1260) / `.wrap-text` (980), `.section` padding and the
   12-column `.grid`.** No absolute positioning for content, no px offsets to
   line things up.
3. **Copy stays in `lib/*-copy.js`, as Manav wrote it - line arrays and all.**
   Headlines render through `<Lines>` (rows on large screens, reflowed on
   phones); paragraphs go through `para()` and reflow. Do not rewrite his words
   to fit a layout; flag it instead. `lib/work.js` only quotes the copy files.
4. **Media is optional everywhere.** `media()` / `slots()` in `lib/clips.js`
   resolve `public/media/<page>-<slot>.<ext>` at build time and return null if
   nothing is there; `<Media>` renders nothing for null. Every section must read
   as finished with its media missing. Never ship an empty placeholder box.
5. **Every clip needs a still**: `public/media/<name>-poster.webp`, which
   `media()` picks up. It is shown before the clip loads and instead of it for
   `prefers-reduced-motion`. ffmpeg here has no WebP encoder - extract a JPEG
   and convert it with Pillow.
6. **Two kinds of motion, never both on one element.** `data-reveal` is a
   one-shot entrance (components/Reveal.js, 150ms stagger inside
   `data-stagger`). `data-sv` is scroll-linked through `animation-timeline:
   view()` in CSS. Both set `transform` on the element, so combining them kills
   the entrance. Put them on parent and child instead.
7. **No smooth-scroll library.** The page scroll stays native, like apple.com.
8. **`backdrop-filter` is set inline** (see `GLASS` in components/Chrome.js).
   From a stylesheet the minifier only emits the `-webkit-` form.
9. **Reduced motion and no-JS get a finished page.** Hidden states are written
   as `html.js.no-reduced-motion [data-reveal]`; scroll-linked motion sits
   inside `@supports (animation-timeline: view())` and `html.no-reduced-motion`.
10. **Run `node scripts/check.mjs <url>` after any change.** It loads every page
    at 1440, 1024 and 390 and fails on console errors, failed requests,
    sideways scroll, text under 12px, and entrances left hidden after a normal
    read or a flick.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
