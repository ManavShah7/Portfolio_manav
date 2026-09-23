import fs from 'node:fs'
import path from 'node:path'

// Media slots.
//
// Drop a file at public/media/<page>-<slot>.<ext> and the matching frame on the
// page uses it instead of the placeholder still. Video and stills both work -
// a screenshot is as valid a thing to drop in as a screen recording - and the
// first extension found wins, in this order.
//
// Resolved here, at build time, because only the pages are server components:
// never import this from components/Nodes.js, which the client bundles
// (CLAUDE.md rule 10).
//
// `node scripts/slots.mjs` prints every slot with the exact size to export at.
const EXT = ['mp4', 'webm', 'png', 'webp', 'jpg', 'jpeg']
const VIDEO = new Set(['mp4', 'webm'])

export function media(name) {
  for (const ext of EXT) {
    const rel = `media/${name}.${ext}`
    if (fs.existsSync(path.join(process.cwd(), 'public', rel)))
      return { src: `/${rel}`, video: VIDEO.has(ext) }
  }
  return null
}

// every slot for one page: `slot('navi')` -> { src, video } or null
export const slots = page => name => media(`${page}-${name}`)
