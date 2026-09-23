import fs from 'node:fs'
import path from 'node:path'

// Video slots.
//
// Drop a file at public/videos/<name>.mp4 and the matching slot plays it; until
// then the slot is the still it has always been. Resolved here, at build time,
// because only the pages are server components - never import this from
// components/Nodes.js, which the client bundles (CLAUDE.md rule 10).
//
// `scripts/slots.mjs` prints every slot with the exact pixel size to export at.
export function clip(name) {
  const rel = `videos/${name}.mp4`
  return fs.existsSync(path.join(process.cwd(), 'public', rel)) ? `/${rel}` : null
}

// every slot for one page, as `slot('navi')` -> '/videos/lighthouse-navi.mp4'
export const slots = page => name => clip(`${page}-${name}`)
