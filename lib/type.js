import metrics from './metrics.json'

// Distance from the top of an absolutely-positioned line box down to the ink
// top of its tallest glyph. The browser builds the line box as
// half-leading + ascent, so this is fully determined by the font's hhea
// metrics plus which glyphs the line actually contains.
export function inkOffset(text, { size, weight, lh }) {
  const m = metrics[weight]
  const halfLeading = (lh - size * (m.asc + m.desc)) / 2
  let top = 0
  for (const ch of text) {
    const t = m.top[ch]
    if (t !== undefined && t > top) top = t
  }
  if (!top) top = m.top['x']
  return halfLeading + size * (m.asc - top)
}

// Distance from the line box's left edge to the ink left of its first glyph.
export function sideBearing(text, { size, weight }) {
  const m = metrics[weight]
  for (const ch of text) {
    const b = m.lsb[ch]
    if (b !== undefined) return size * b
  }
  return 0
}
