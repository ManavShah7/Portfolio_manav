// The About block on the home page. Manav asked for this one rather than
// drawing it: his design principle, his education, and a link to the resume,
// with the iPad holding a collage he will send later.
//
// The motto is his own, the one the frame draws. The explanation under it is
// the thing he actually described when he asked for this: "if everything was
// purpose only driven the sky wouldnt be blue, grass wouldnt be green".
//
// The roles and the education are taken from the resume the download button
// serves - ManavShah_ProductDesigner_Resume.pdf - so the two cannot drift.
//
// Line breaks are authored. The big card is 856 wide less 68 of padding a side,
// which is about 60 characters at coBody; the small cards are 274 less 32 a
// side, which is about 22 at coRoleSm. Nothing here may be joined into a string.

export const about = {
  heading: 'About Me',

  headline: {
    company: 'Lighthouse AI',
    role: 'Product Design Intern',
    meta: 'February 2025 - July 2025   ·   California, remote',
    body: [
      'Led the AI Playbook feature end to end: five high-fidelity',
      'prototypes on a twenty-component system the product then',
      'adopted. Fifty surveys, twenty interviews and a few hundred',
      'Reddit threads behind it. Onboarding moved downloads 40%.',
    ],
  },

  // the note each of these used to carry is cut - at 274 wide it was three
  // lines of 17px that nobody was going to read
  roles: [
    { company: 'Times Media OOH', colour: '#F04250',
      role: ['Founding Product', 'Designer'], meta: ['January 2025 -', 'Present'] },
    { company: 'Peak', colour: '#6B00A8',
      role: ['Founding Product', 'Designer'], meta: ['June 2025 -', 'Present'] },
    { company: 'Brackets', colour: '#0069AF',
      role: ['Product Design', 'Intern'], meta: ['November 2024 -', 'February 2025'] },
  ],

  // his motto, as the frame draws it
  motto: [
    'Purpose over aesthetics is the wrong',
    "question. It's purpose and aesthetics, the",
    'most purposeful thing in the world still',
    'needs someone to want to look at it.',
  ],

  // and the part he described when he asked for it
  why: [
    'If purpose were the only thing that mattered the sky would not be blue, and',
    'the grass would not be green. None of it is load-bearing. It is there anyway -',
    'and it is the reason anyone looks up.',
  ],

  lead: [
    'I design products end to end and then build enough of them to find out where the',
    'design was lying to me. Research, the screens, the system underneath, and the part',
    'most decks skip - whether any of it held up once someone who was not in the room',
    'had to use it.',
  ],

  eduLabel: 'Education',
  education: [
    { school: 'Northeastern University',
      degree: 'Master of Science, Information Systems',
      meta: 'September 2025 - December 2027 (expected)   ·   Boston, MA' },
    { school: 'A.D. Patel Institute of Technology',
      degree: 'B.Tech, Computer Science and Design',
      meta: 'September 2021 - May 2025   ·   Gujarat, India' },
  ],

  resume: 'Download resume',
  resumeFile: '/ManavShah_ProductDesigner_Resume.pdf',
}
