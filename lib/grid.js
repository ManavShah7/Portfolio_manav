// One grid per page.
//
// The Figma frames are hand-placed and disagree with themselves: Lighthouse
// starts its left column at 449, 470, 494 and 499 in four different sections,
// Peak at 357, 415, 419, 420, 424.5 and 426, and Peak centres twenty "centred"
// blocks on twenty different axes. Manav asked for that tidied - per page, each
// page keeping its own margin - so these are the single values everything on a
// page now snaps to. This is a deliberate departure from the exports; see rule
// 1 in CLAUDE.md, which no longer applies to spacing.
//
// L   left column. Every left-aligned block and every card starts here.
// W   content measure. Every full-width card is this wide, so every right edge
//     lands on the same line.
// GUT gutter between anything sitting side by side.

const page = (L, W, GUT = 24) => ({
  L, W, GUT,
  R: L + W,                     // content right edge
  C: L + W / 2,                 // centre axis for anything centred full-width
  HALF: (W - GUT) / 2,          // width of a card in a two-up row
  // left edge of column i in an n-up row
  col: (i, n) => L + i * (W - GUT * (n - 1)) / n + i * GUT,
  // width of a column in an n-up row
  colW: n => (W - GUT * (n - 1)) / n,
  // centre of column i in an n-up row
  colC(i, n) { return this.col(i, n) + this.colW(n) / 2 },
  // the same grid again, inside a card's padding - so columns printed ON a card
  // sit within it rather than running flush to its edge
  inset(pad) { return page(L + pad, W - 2 * pad, GUT) },
})

export const PEAK = page(420, 1217)
export const TIMES = page(470, 1238)
export const LH = page(470, 1238)
export const LV = page(470, 1238)

// Padding inside a card. It scales with the card: a 1238-wide carousel card
// with 66px of padding looks unlined, a 607-wide one with 115 looks cramped.
export const PAD_LG = 115   // full-measure cards
export const PAD_SM = 66    // two-up cards

// Vertical rhythm. Each gap is measured from the ink top of a block's LAST line
// to the ink top of what follows, so a two-line and a one-line headline leave
// the same air beneath them - which the frames do not: the same
// headline-to-body relationship is drawn at 65.5, 74.5, 91.5 and 106.5.
export const HEAD_GAP = 90    // headline -> its body
export const PARA_GAP = 62    // paragraph -> paragraph
export const CARD_GAP = 59    // a card's heading -> the copy on it
export const META_GAP = 82    // last paragraph -> the Role/Duration/Skills row
export const META_VAL = 46    // a meta label -> its values
export const FOOT_GAP = 100   // "View next project" -> "Contact"

// y of the body that follows a headline block: the last headline line sits at
// y + (lines - 1) * lh, and the body starts `gap` below that ink top.
export const under = (y, style, lines, gap = HEAD_GAP) =>
  y + (lines - 1) * style.lh + gap
