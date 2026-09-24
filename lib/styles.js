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
  // --- Peak's new frame -----------------------------------------------------
  introW:       { size: 40,  weight: 600, lh: 52,   color: '#FFFFFF' },
  eyebrow:      { size: 24,  weight: 500, lh: 31,   color: '#6E6E73' },
  eyebrowD:     { size: 24,  weight: 500, lh: 31,   color: '#86868B' },
  cardHeadW:    { size: 30,  weight: 600, lh: 43,   color: '#FFFFFF' },
  aside:        { size: 27,  weight: 500, lh: 36,   color: '#5A5A5A' },
  ceiling:      { size: 30,  weight: 600, lh: 40,   color: '#1C1C1E' },
  findCard:     { size: 32,  weight: 600, lh: 45,   color: '#1C1C1E' },
  solHead:      { size: 60,  weight: 700, lh: 78,   color: '#FFFFFF' },
  bandHead:     { size: 58,  weight: 700, lh: 78,   color: '#FFFFFF' },
  liftHead:     { size: 55,  weight: 700, lh: 72,   color: '#FFFFFF' },
  // Peak's quotes are set much larger than the other case studies', so they
  // get their own rungs rather than moving the shared ones.
  pkQuote:      { size: 30,  weight: 500, lh: 43,   color: '#1C1C1E' },
  pkWho:        { size: 26,  weight: 500, lh: 34,   color: '#5A5A5A' },
  liftCap:      { size: 24,  weight: 500, lh: 33,   color: '#A9A9A9' },
  catBody:      { size: 30,  weight: 500, lh: 38.3, color: '#A9A9A9' },
  catLead:      { size: 26,  weight: 600, lh: 33,   color: '#FFFFFF' },
  catRest:      { size: 26,  weight: 500, lh: 33,   color: '#9A9A9A' },

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

  // --- the About block on the home page. Sizes and weights measured off the
  // frame: the heading and the principle are both 50/700 (stem/em .150) and the
  // company name on the big card is 40/600 (.125).
  aboutHead:    { size: 50,  weight: 700, lh: 60,  color: 'gradient' },
  aboutQuote:   { size: 50,  weight: 700, lh: 60,  color: 'gradient' },
  aboutLead:    { size: 26,  weight: 500, lh: 36,  color: '#3A3A3A' },
  coBig:        { size: 40,  weight: 600, lh: 48,  color: '#1CBC45' },
  coSmall:      { size: 25,  weight: 600, lh: 30,  color: '#1C1C1E' },
  coRole:       { size: 26,  weight: 500, lh: 31,  color: '#1C1C1E' },
  coRoleSm:     { size: 20,  weight: 500, lh: 25,  color: '#1C1C1E' },
  coMeta:       { size: 22,  weight: 500, lh: 26,  color: '#6E6E73' },
  coMetaSm:     { size: 18,  weight: 500, lh: 23,  color: '#8A8A8E' },
  coBody:       { size: 24,  weight: 500, lh: 34,  color: '#000C32' },
  aboutWhy:     { size: 26,  weight: 500, lh: 36,  color: '#3A3A3A' },
  eduSchool:    { size: 26,  weight: 600, lh: 32,  color: '#1C1C1E' },
  eduDegree:    { size: 24,  weight: 500, lh: 30,  color: '#3A3A3A' },
  eduMeta:      { size: 20,  weight: 500, lh: 26,  color: '#8A8A8E' },
}
export default S
