// The home page, as Manav's frame draws it.
export const me = { kind: 'Product Designer', name: 'Manav Shah' }

// The same three the site-wide bar carries, in the same order - home is the
// only page that draws its own header, so this is the one place the two could
// drift apart. "Reflections" used to sit here and pointed at `/#reflections`,
// an anchor that does not exist on this page or any other.
export const nav = [
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/ManavShah_ProductDesigner_Resume.pdf', download: true },
  { label: 'Contact', href: 'mailto:shah.manavd@northeastern.edu' },
]

export const hero = ['Solve the problem. Make it beautiful to use.', "That’s design."]

export const purpose = {
  head: ['Purpose or', 'Aesthetics? Both.'],
  body: ['If function was all that', 'mattered, the world would be',
         'grey - no green grass, no blue', 'sky. The smartest solution',
         'needs people to look at it.'],
}

// The four screens the frame draws, each one a case study. `screen` is where
// that project sits inside its device image, measured off the device itself:
// left / top / width / height as a percentage of the image.
//
// The phone's was wrong: a naive read put its top at 6.29%, which is the
// NOTCH, not the screen. Sampling a column at 20% across - past the corner
// radius and clear of the notch - puts the screen at 2.56% and makes the
// rectangle 376x816, an aspect of 0.461. A real iPhone screen is 0.462.
export const devices = [
  { cls: 'hm-d1', img: 'ipad-landscape', slug: 'times-media', name: 'Times Media',
    clip: 'times-admin', screen: [5.31, 7.38, 90.41, 87.52] },
  { cls: 'hm-d2', img: 'iphone', slug: 'peak', name: 'Peak',
    clip: 'peak-workout', screen: [6.51, 2.56, 87.44, 95.10] },
  { cls: 'hm-d3', img: 'ipad-portrait', slug: 'liveasy', name: 'Liveasy',
    clip: null, still: '/media/home/transport.webp', screen: [7.35, 4.34, 83.76, 90.34] },
  { cls: 'hm-d4', img: 'macbook', slug: 'lighthouse', name: 'Lighthouse AI',
    clip: 'lighthouse-green', screen: [9.66, 3.33, 80.68, 84.74] },
]

// ---- the questions that come up ------------------------------------------
// His, word for word, and the five he picked in the order he picked them. The
// AI answer is the one with structure: a lead, three labelled ways, and a line
// to close - so an item may carry `list` and `tail` as well as `a`.
//
// The "white monster" question is cut, which means nothing on the page
// explains the easter eggs in app/layout.js any more. That is fine for an
// easter egg; it is only worth knowing.
export const faq = {
  eyebrow: 'FAQ',
  head: ['Questions I get', 'before the work.'],
  items: [
    { q: 'What kind of designer are you?',
      a: ['The kind who thinks products are losing their soul. AI is making',
          'everything smarter and faster, and somehow less human. I use AI to',
          'build faster than ever, but I spend that time on what it can\u2019t do:',
          'giving products a story, a feeling, and a reason to open them. The',
          'smartest tool still fails if it doesn\u2019t make you want to use it.'] },
    { q: 'What are your strengths?',
      a: ['Taste and empathy, backed by the ability to build. I research users',
          'obsessively, I notice what people feel but don\u2019t say, and I can take',
          'that all the way to a live product without losing it in handoff.'] },
    { q: 'What\u2019s your weakness?',
      a: ['I\u2019m ambitious, obsessive over products, and a perfectionist. I want',
          'everything to be right, from the first interview to the last pixel. It',
          'pushes me to do great work, but it also means I can hold onto things',
          'longer than I should. I\u2019ve learned to let real users decide what\u2019s',
          'worth perfecting, and to ship the rest.'] },
    { q: 'How do you use AI?',
      a: ['Three ways.'],
      list: [
        { label: 'To think:',
          lines: ['finding patterns across hundreds of user conversations and',
                  'stress-testing my assumptions.'] },
        { label: 'To build:',
          lines: ['turning designs into working products in days, so I test with',
                  'real people instead of guessing.'] },
        { label: 'As a material:',
          lines: ['designing how AI behaves, like when it speaks, how it sounds,',
                  'and when it should just reassure you.'] },
      ],
      tail: ['AI is my fastest teammate. Taste is still my job.'] },
    { q: 'What do you care about most?',
      a: ['That a product makes you want to use it. Features get you downloaded.',
          'Feeling gets you used. If something feels cold, generic or judgmental,',
          'people leave quietly, so I design the experience first and let the',
          'features serve it.'] },
  ],
}

// The wall of UI work. It used to be thirteen rectangles placed by hand off
// the frame, which overlapped each other at any width but the frame's own and
// cropped half the tiles - ROSETTE lost its wordmark, OL’HY lost its logo.
//
// It is three justified rows now. Each tile carries its image's OWN width and
// height, so nothing is cropped, and inside a row the tiles share their width
// in proportion to those aspects - which is what makes every tile in a row
// exactly the same height and every row flush at both ends. The rows are
// grouped so their aspect sums land within 5% of each other (4.97 / 5.03 /
// 4.81), which is what keeps the three row heights within 5% too.
// `d` is how far the tile drifts against the scroll, so the wall reads as
// layers rather than one flat picture.
export const wall = [
  [
    { n: 'portugal',    r: [1116, 815],  d: 30 },
    { n: 'ristorante',  r: [527, 1170],  d: 70 },
    { n: 'meridian-a',  r: [1152, 802],  d: 60 },
    { n: 'raptor-dark', r: [638, 832],   d: 40 },
    { n: 'decorus',     r: [413, 435],   d: 40 },
  ],
  [
    { n: 'raptor-wide', r: [992, 616],   d: 50 },
    { n: 'peak',        r: [350, 756],   d: 90 },
    { n: 'rosette',     r: [781, 448],   d: 80 },
    { n: 'olhy',        r: [485, 399],   d: 35 },
  ],
  [
    { n: 'meridian-b',  r: [1237, 874],  d: 45 },
    { n: 'blueprint',   r: [401, 566],   d: 65 },
    { n: 'ronaldo',     r: [790, 629],   d: 25 },
    { n: 'transport',   r: [621, 435],   d: 55 },
  ],
]
