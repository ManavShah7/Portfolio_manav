// Every type style measured off the 2x Figma export, in 1900-frame design px.
// size/weight came from per-word pixel fitting plus stem-width checks;
// lh is the measured ink-top pitch between lines of the same block.
const S = {
  heroEyebrow:  { size: 32,  weight: 500, lh: 38,  color: '#626262' },
  heroName:     { size: 50,  weight: 600, lh: 60,  color: 'gradient' },
  nav:          { size: 32,  weight: 600, lh: 38,  color: '#626262' },
  quote:        { size: 50,  weight: 600, lh: 60,  color: '#FFFFFF' },
  quoteAttrib:  { size: 39.5, weight: 600, lh: 47,  color: '#FFFFFF' },

  rail:         { size: 24,  weight: 500, lh: 29,  color: '#5A5A5A' },
  headline:     { size: 50,  weight: 700, lh: 61,  color: '#1C1C1E' },
  headlineW:    { size: 50,  weight: 700, lh: 61,  color: '#FFFFFF' },
  headlineLime: { size: 55,  weight: 700, lh: 66,  color: '#C7D13D' },
  body:         { size: 26,  weight: 600, lh: 31,  color: '#000C32' },
  bodyW:        { size: 26,  weight: 600, lh: 31,  color: '#FFFFFF' },
  metaLabel:    { size: 28,  weight: 500, lh: 34,  color: '#5A5A5A' },
  metaValue:    { size: 26,  weight: 500, lh: 31.5, color: '#1C1C1E' },
  cardHead:     { size: 40,  weight: 600, lh: 48,  color: '#1C1C1E' },
  cardBody:     { size: 22,  weight: 500, lh: 26,  color: '#000C32' },
  quoteBody:    { size: 20,  weight: 500, lh: 24,  color: '#000C32' },
  quoteName:    { size: 22,  weight: 500, lh: 26,  color: '#000C32' },
  quoteRole:    { size: 14,  weight: 500, lh: 17,  color: '#5A5A5A' },
  featTitle:    { size: 30,  weight: 600, lh: 36,  color: '#FFFFFF' },
  featBody:     { size: 26,  weight: 500, lh: 31,  color: '#D6D6D6' },
  caption:      { size: 27,  weight: 600, lh: 32,  color: '#1C1C1E' },
  captionBody:  { size: 26,  weight: 500, lh: 31,  color: '#000C32' },
  nextTitle:    { size: 30,  weight: 600, lh: 36,  color: '#000000' },
  footLink:     { size: 50,  weight: 700, lh: 60,  color: '#1C1C1E' },
  footLinkAlt:  { size: 50,  weight: 700, lh: 60,  color: '#5A5A5A' },
  egg:          { size: 14,  weight: 500, lh: 17,  color: '#ECECEE' },
  captionW:     { size: 27,  weight: 600, lh: 32,  color: '#FFFFFF' },

  // --- Times Media. Its black is #111111, not Peak's #101010, and the ink on
  // it is #CCCCCC / #9C9C9C rather than white - all measured off the export.
  tmRail:       { size: 24,  weight: 500, lh: 29,  color: '#FFFFFF' },
  tmHead:       { size: 50,  weight: 700, lh: 60,  color: '#CCCCCC' },
  tmBody:       { size: 26,  weight: 600, lh: 31,  color: '#9C9C9C' },
  tmMetaLabel:  { size: 28,  weight: 500, lh: 34,  color: '#9C9C9C' },
  tmMetaValue:  { size: 26,  weight: 500, lh: 31,  color: '#CCCCCC' },
  tmQuote:      { size: 30,  weight: 500, lh: 36,  color: '#CCCCCC' },
  tmQuoteName:  { size: 28,  weight: 600, lh: 34,  color: '#CCCCCC' },
  tmQuoteRole:  { size: 20,  weight: 500, lh: 24,  color: '#9C9C9C' },
  tmHeadW:      { size: 50,  weight: 700, lh: 60,  color: '#FFFFFF' },
  tmBigHead:    { size: 60,  weight: 700, lh: 73,  color: '#FFFFFF' },
  tmCardHead:   { size: 40,  weight: 600, lh: 48,  color: '#1C1C1E' },
  tmCardBody:   { size: 22,  weight: 500, lh: 26,  color: '#000C32' },
  tmBodyW:      { size: 40,  weight: 600, lh: 48,  color: '#FFFFFF' },
  tmHeadD:      { size: 50,  weight: 700, lh: 60,  color: '#3A3A3A' },
  tmBodyD:      { size: 40,  weight: 600, lh: 48,  color: '#272727' },
  tmImpact:     { size: 50,  weight: 700, lh: 60,  color: '#F04250' },
  tmImpactSub:  { size: 26,  weight: 600, lh: 31,  color: '#9C9C9C' },
  tmFQ:         { size: 30,  weight: 500, lh: 36,  color: '#1C1C1E' },
  tmFQName:     { size: 30,  weight: 600, lh: 36,  color: '#1C1C1E' },
  tmFQRole:     { size: 20,  weight: 500, lh: 24,  color: '#9C9C9C' },

  // --- Lighthouse. Shares Peak's ink on white; its own green for the band
  // and the closing metric.
  lhHead:       { size: 50,  weight: 700, lh: 60,  color: '#1C1C1E' },
  lhHeadW:      { size: 50,  weight: 700, lh: 60,  color: '#FFFFFF' },
  lhHeadGrey:   { size: 50,  weight: 700, lh: 60,  color: '#3A3A3A' },
  lhBigHead:    { size: 60,  weight: 700, lh: 71,  color: '#FFFFFF' },
  lhBody:       { size: 26,  weight: 600, lh: 31,  color: '#000C32' },
  lhCardHead:   { size: 40,  weight: 600, lh: 48,  color: '#1C1C1E' },
  lhCardBody:   { size: 22,  weight: 500, lh: 26,  color: '#000C32' },
  lhBig:        { size: 40,  weight: 600, lh: 48,  color: '#272727' },
  lhBigW:       { size: 40,  weight: 600, lh: 48,  color: '#FFFFFF' },
  lhImpact:     { size: 50,  weight: 700, lh: 60,  color: '#34C759' },
  nextBody:     { size: 26,  weight: 500, lh: 31,  color: '#000000' },

  // --- Liveasy. Composed rather than measured - there is no Figma frame for
  // this one - so it borrows Lighthouse's ink and metrics exactly and differs
  // only in the accent, the bronze the old Liveasy site was built around.
  lvHead:       { size: 50,  weight: 700, lh: 60,  color: '#1C1C1E' },
  lvHeadW:      { size: 50,  weight: 700, lh: 59.5, color: '#FFFFFF' },
  lvHeadGrey:   { size: 50,  weight: 700, lh: 60,  color: '#3A3A3A' },
  lvBigHead:    { size: 60,  weight: 700, lh: 71,  color: '#FFFFFF' },
  lvBody:       { size: 26,  weight: 600, lh: 31,  color: '#000C32' },
  lvCardHead:   { size: 40,  weight: 600, lh: 48,  color: '#1C1C1E' },
  lvCardBody:   { size: 22,  weight: 500, lh: 26,  color: '#000C32' },
  lvBig:        { size: 40,  weight: 600, lh: 48,  color: '#272727' },
  lvBigW:       { size: 40,  weight: 600, lh: 48,  color: '#FFFFFF' },
  lvImpact:     { size: 50,  weight: 700, lh: 60,  color: '#C2893A' },
}
export default S
