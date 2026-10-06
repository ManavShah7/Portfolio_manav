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
  // Four jobs, one card each. Whichever one is selected takes the big slot and
  // shows its role and dates; the other three sit in the row underneath and
  // swap in when you pick one (components/Jobs.js). The first is selected when
  // the page loads.
  // Lighthouse and Brackets are word for word off the resume PDF the site
  // serves at /ManavShah_ProductDesigner_Resume.pdf, so the two never disagree.
  // Nexus Info's title comes from the site's own Liveasy credits - that
  // internship is where Liveasy happened.
  // MANAV: the resume does not list Nexus Info or TatvaSoft, so their dates -
  // and TatvaSoft's title - are still blank. An empty string is simply not
  // drawn, so a card shows only what is true. Fill them in and they appear.
  jobs: [
    { name: ['Lighthouse AI'], role: 'Product Design Intern',
      when: 'February 2025 - July 2025', ink: 'ink-green' },
    { name: ['Brackets'],      role: 'Product Design Intern',
      when: 'November 2024 - February 2025', ink: 'ink-teal' },
    { name: ['Nexus', 'Info'], role: 'UI Design Intern', when: '', ink: 'ink-magenta' },
    { name: ['TatvaSoft'],     role: '', when: '', ink: 'ink-blue' },
  ],
}

// NOTE for Manav: the four pillar cards are drawn EMPTY in the export - the
// gradient is there, the words are not. These are your four pillars from the
// Liveasy case study, which is where you already state them; swap them here if
// the About page was meant to say something else. Two of the four inks are cut
// from the pillar cards themselves, the other two from the experience cards,
// because only two were drawn.
//
// The ink is the FALLBACK. Drop a clip at public/media/about-pillar-1.mp4 ..
// -4.mp4 (plus its -poster.webp, rule 5) and that card plays it instead - the
// numbers follow the order below. Nothing else has to change.
// These are now word for word off the Liveasy frame, where he wrote them - the
// one change is the first line: on that page it names Liveasy, here it has to
// hold for anything, so it says "what you do".
export const pillars = {
  head: 'My Design Pillars',
  cards: [
    { title: ['Clarity before', 'aesthetics.'], ink: 'ink-violet',
      body: ['If a buyer can’t tell what you do in three seconds,',
             'nothing else on the page gets a chance to matter.'] },
    { title: ['Proof before', 'pitch.'], ink: 'ink-magenta',
      body: ['Logos, numbers, real evidence - before a single',
             'feature gets mentioned. Earn the trust, then make',
             'the case.'] },
    { title: ['Don’t let your', 'users wander.'], ink: 'ink-jade',
      body: ['Guide the user, don’t make them think. Every step',
             'should feel obvious, not obstructive - the smoother',
             'the path, the more it pays off.'] },
    { title: ['Good design is', 'good business.'], ink: 'ink-green',
      body: ['Good design doesn’t make people think. It just',
             'points them to what they need - and to what you',
             'need.'] },
  ],
}

export const life = {
  head: 'My life apart from Designing.',
  // Three justified rows, the same mechanism the home wall uses: inside a row
  // the tiles share the width in proportion to their own aspect, so every tile
  // in a row is exactly the same height and both ends of the row are flush.
  //
  // It used to be the frame's absolute coordinates - 1900 x 3814 design px,
  // which came out 2891px tall at 1440 with three bands of 772, 983 and 1136.
  // Nothing was flush and nothing shared a height.
  // Two rows, not three. Three put two portraits side by side and that row
  // alone came out 1280px tall at 1440 - the whole collage was 3256. The wide
  // one leads and the four uprights share a single row beneath it, which is
  // about 1540 all in.
  rows: [
    [{ n: 'ferrari', r: [735, 490],  pos: '50% 84%', alt: 'A Ferrari through the spray at Spa' }],
    [{ n: 'neymar',  r: [675, 1200], alt: 'Night football' },
     { n: 'ronaldo', r: [736, 856],  alt: 'Ronaldo, blurred' },
     { n: 'music',   r: [736, 1308], alt: 'A wall of album art' },
     { n: 'madrid',  r: [736, 1308], alt: 'God blesses the Real Madrid' }],
  ],
}
