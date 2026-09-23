// The About block on the home page. Manav asked for this one rather than
// drawing it: "i wanna talk about a simple and short design principle that - if
// everything was purpose only driven the sky wouldnt be blue, grass wouldnt be
// green. purpose is necessary but the product that works good, looks good,
// sells good", plus his education and a link to the resume.
//
// The roles and the education are taken from the resume the download link
// serves - ManavShah_ProductDesigner_Resume.pdf - so the two cannot drift.
//
// Line breaks are authored, as everywhere else in this build. The three small
// cards are 274 wide less 28 of padding a side, which is about 20 characters at
// coRoleSm and 24 at coNote; nothing here may be joined into a single string.

export const about = {
  heading: 'About Me',

  // the big card. The frame draws the green company name and leaves the rest of
  // the card empty, so everything under it is new.
  headline: {
    company: 'Lighthouse AI',
    role: 'Product Design Intern',
    meta: 'February 2025 - July 2025   ·   California, remote',
    body: [
      'Led the AI Playbook feature end to end and shipped five high-fidelity',
      'prototypes on a twenty-component system the rest of the product then',
      'adopted. Ran the research behind it - fifty surveys, twenty interviews,',
      'and a few hundred Reddit threads where nobody was performing for an',
      'interviewer. Redesigning onboarding moved extension downloads 40%.',
    ],
  },

  roles: [
    { company: 'Times Media OOH', colour: '#F04250',
      role: ['Founding Product', 'Designer'],
      meta: ['January 2025 -', 'Present'],
      note: ['660+ boards, off a', 'PowerPoint and into', 'three real portals.'] },
    { company: 'Peak', colour: '#6B00A8',
      role: ['Founding Product', 'Designer'],
      meta: ['June 2025 -', 'Present'],
      note: ['An AI fitness app,', 'built end to end.', 'Brand included.'] },
    { company: 'Brackets', colour: '#0069AF',
      role: ['Product Design', 'Intern'],
      meta: ['November 2024 -', 'February 2025'],
      note: ['35 research sessions', 'into a 50-component', 'system, two surfaces.'] },
  ],

  // the principle, in the pink the frame draws it in
  quote: [
    'Purpose alone never made the sky blue.',
    'It has to work, and it has to be worth',
    'looking at. The second one is not',
    'decoration. It is what makes it sell.',
  ],

  // the closing block, under the iPad - none of this is in the frame
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

  resume: 'Download my resume',
  resumeFile: '/ManavShah_ProductDesigner_Resume.pdf',
}
