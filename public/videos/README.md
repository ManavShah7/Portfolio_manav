Video slots.

Drop a file named `<page>-<slot>.mp4` in here and the matching frame on the page
plays it instead of the still. Nothing else needs changing - the slot is
resolved at build time, so a file that is not here is simply the still.

Run `node scripts/slots.mjs` for the current list with the exact pixel size to
export each one at.

A slot is a whole-frame replacement, not a clip composited inside a bezel: the
screen rectangles in the device PNGs cannot be detected reliably, and a video a
few px out inside a bezel looks broken. So export the device mockup itself -
what Figma or Rotato gives you - at the size the list prints. The clip is fitted
with `object-fit: contain`, so a slightly different aspect letterboxes rather
than crops.

Everything here autoplays muted and loops, and is hidden for anyone with
prefers-reduced-motion, who gets the still instead.
