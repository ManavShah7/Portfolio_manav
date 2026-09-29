// The home page, as Manav's frame draws it.
export const me = { kind: 'Product Designer', name: 'Manav Shah' }

export const nav = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: 'mailto:shah.manavd@northeastern.edu' },
  { label: 'Resume', href: '/ManavShah_ProductDesigner_Resume.pdf' },
  { label: 'Reflections', href: '/#reflections' },
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
export const devices = [
  { cls: 'hm-d1', img: 'ipad-landscape', slug: 'times-media', name: 'Times Media',
    clip: 'times-admin', screen: [5.31, 7.38, 90.41, 87.52] },
  { cls: 'hm-d2', img: 'iphone', slug: 'peak', name: 'Peak',
    clip: 'peak-workout', screen: [6.28, 6.29, 87.67, 91.26] },
  { cls: 'hm-d3', img: 'ipad-portrait', slug: 'liveasy', name: 'Liveasy',
    clip: null, still: '/media/home/transport.webp', screen: [7.35, 4.34, 83.76, 90.34] },
  { cls: 'hm-d4', img: 'macbook', slug: 'lighthouse', name: 'Lighthouse AI',
    clip: 'lighthouse-green', screen: [9.66, 3.33, 80.68, 84.74] },
]

// The wall, exactly as the frame lays it: [x, y, w, h] in design px, y from
// the top of the grey band. `d` is how far the tile drifts against the scroll,
// so the wall reads as layers rather than one flat picture.
export const work = [
  { n: 'portugal',    r: [0, 0, 560, 392],      d: 30 },
  { n: 'meridian-a',  r: [564, 0, 556, 396],    d: 60 },
  { n: 'raptor-dark', r: [1126, 0, 304, 418],   d: 40 },
  { n: 'ristorante',  r: [1632, 0, 268, 580],   d: 70 },
  { n: 'raptor-wide', r: [2, 400, 496, 328],    d: 50 },
  { n: 'rosette',     r: [500, 400, 352, 250],  d: 80 },
  { n: 'olhy',        r: [892, 430, 316, 204],  d: 35 },
  { n: 'peak',        r: [1114, 642, 172, 374], d: 90 },
  { n: 'meridian-b',  r: [1290, 582, 604, 430], d: 45 },
  // the bottom row is three tiles, not two: the VR piece sits left of DECORUS
  { n: 'blueprint',   r: [0, 700, 228, 322],    d: 65 },
  { n: 'decorus',     r: [228, 700, 186, 322],  d: 40 },
  { n: 'ronaldo',     r: [414, 700, 376, 322],  d: 25 },
  { n: 'transport',   r: [808, 718, 316, 194],  d: 55 },
]
