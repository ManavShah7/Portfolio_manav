// About me, transcribed from ~/Desktop/Final Design/hero/About me/Desktop - 9.png
// (3800 wide, so 2x of a 1900 frame; 7900 design px tall). Line breaks are the
// frame's own.

export const quote = [
  'There should be no limits to creativity and delusion. Limit',
  "ourselves, and we'd still be in caves, hunting with spears.",
  'We reached Mars and beyond because someone asked',
  'one question: how far can we go?',
]

export const about = {
  head: 'About Me',
  body: ['I am pursuing Masters in', 'Information Systems with a focus on',
         'Product Design at Northeastern', 'University, Boston.'],
  logo: { src: '/media/about/northeastern.webp', alt: 'Northeastern University' },
}

export const experience = {
  head: 'Experience',
  body: ['I started as a Web Dev intern.', 'Somewhere in the middle of writing',
         'code, I got curious - why did things look', 'and feel this way? What problem was I',
         'even solving? I picked up design', 'courses, and slowly, it became my thing.'],
  cta: 'Download resume',
  // the one he is on now takes the full width of the column; the three before
  // it sit in a row underneath
  now: { name: 'Lighthouse AI', role: 'Product Design Intern',
         when: 'February 2025- July 2025', ink: 'ink-green' },
  past: [
    { name: ['Brackets'],       ink: 'ink-teal' },
    { name: ['Nexus', 'Info'],  ink: 'ink-magenta' },
    { name: ['TatvaSoft'],      ink: 'ink-blue' },
  ],
}

// NOTE for Manav: the four pillar cards are drawn EMPTY in the export - the
// gradient is there, the words are not. These are your four pillars from the
// Liveasy case study, which is where you already state them; swap them here if
// the About page was meant to say something else. Two of the four inks are cut
// from the pillar cards themselves, the other two from the experience cards,
// because only two were drawn.
export const pillars = {
  head: 'My Design Pillars',
  cards: [
    { title: ['Clarity before', 'aesthetics.'], ink: 'ink-violet',
      body: ['If a buyer cannot tell what you do in three seconds,',
             'nothing else on the page gets a chance to matter.'] },
    { title: ['Proof before', 'pitch.'], ink: 'ink-magenta',
      body: ['Logos, numbers, real evidence - before a single',
             'feature gets mentioned. Earn the trust, then make',
             'the case.'] },
    { title: ['Don’t let your', 'users wander.'], ink: 'ink-jade',
      body: ['Guide the user, do not make them think. Every step',
             'should feel obvious, not obstructive - the smoother',
             'the path, the more it pays off.'] },
    { title: ['Good design is', 'good business.'], ink: 'ink-green',
      body: ['Good design does not make people think. It just',
             'points them to what they need - and to what you',
             'need.'] },
  ],
}

export const life = {
  head: 'My life apart from Designing.',
  // the collage, as the frame lays it: [x, y, w, h] in design px from the top
  // of the collage, which is why they butt and overlap rather than sit in a grid
  // Measured off the export by finding where each column region goes white:
  // the left column ends at 7458 and the right at 7563, 105 lower, and the
  // split in the bottom band is at x827. `pos` is object-position where the
  // frame's crop is not the centred one cover would pick.
  shots: [
    { n: 'ferrari', r: [0, 0, 1900, 1018],      pos: '50% 84%', alt: 'A Ferrari through the spray at Spa' },
    { n: 'neymar',  r: [0, 1018, 684, 1297],    alt: 'Night football' },
    { n: 'ronaldo', r: [684, 1018, 1216, 1297], alt: 'Ronaldo, blurred' },
    { n: 'music',   r: [0, 2315, 827, 1394],    alt: 'A wall of album art' },
    { n: 'madrid',  r: [827, 2315, 1073, 1499], alt: 'God blesses the Real Madrid' },
  ],
  height: 3814,
}
