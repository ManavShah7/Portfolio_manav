Media slots.

Drop a file named `<page>-<slot>.<ext>` in here and the matching frame on the
page uses it instead of the placeholder. Nothing else needs changing - the slot
is resolved at build time, so a file that is not here is simply the placeholder.

Either works in any slot:

    .mp4 / .webm   a clip. Autoplays muted, loops, and is swapped for the still
                   for anyone with prefers-reduced-motion.
    .png / .webp / .jpg   a still.

First extension found wins, in the order mp4, webm, png, webp, jpg, jpeg.

Run `node scripts/slots.mjs` for the current list with the exact pixel size to
export each one at.

A slot is a whole-frame replacement, not something composited inside a bezel:
the screen rectangles in the device PNGs cannot be detected reliably, and a few
px out inside a bezel looks broken. So export the device mockup itself - what
Figma or Rotato gives you - at the size the list prints. Everything is fitted
with `object-fit: contain`, so a slightly different aspect letterboxes rather
than crops.
