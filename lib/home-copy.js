// The home page, as Manav's frame draws it.
export const me = { kind: 'Product Designer', name: 'Manav Shah' }

export const nav = [
  { label: 'About', href: '/#about' },
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
    clip: null, screen: [7.35, 4.34, 83.76, 90.34] },
  { cls: 'hm-d4', img: 'macbook', slug: 'lighthouse', name: 'Lighthouse AI',
    clip: 'lighthouse-green', screen: [9.66, 3.33, 80.68, 84.74] },
]

// Every piece in the wall, in the order the frame stacks them.
export const work = [
  'portugal', 'meridian-a', 'raptor-dark', 'ristorante', 'raptor-wide',
  'rosette', 'olhy', 'peak', 'meridian-b', 'blueprint', 'decorus',
  'ronaldo', 'transport',
]
