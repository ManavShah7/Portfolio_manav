// Liveasy, transcribed from ~/Desktop/Final Design/liveasy.png (3800 wide, so
// 2x of a 1900 frame; 11051 design px tall). Line breaks are the frame's own
// and must not be re-wrapped on a laptop.

// The facts on the hero's title card. MANAV: the timeline is the one thing
// I do not have - fill the empty string and the column appears.
// The hero the updated frame draws: the line on the left of the film, three
// facts as pills stacked under it, and a laptop standing to the right.
export const hero = {
  line: ['Redesigning a logistics', 'homepage to look modern', 'and feel trustworthy.'],
  tags: ['Marketing site redesign', 'UI Design Intern', '2 months'],
}

// kept for the Role/Timeline row, which the hero no longer shows
export const credits = [
  { label: 'Role', value: 'UI Design Intern' },
  { label: 'Duration', value: '2 months' },
  // MANAV: mine, off what the case study shows. One string.
  { label: 'Skills', value: 'UI Design \u00b7 Visual Design \u00b7 Web Redesign' },
]

export const intro = [
  ['During my first internship at Nexus Info,', 'I was given a task to redesign Liveasy.'],
  ['Liveasy - a logistics company, had a landing', 'page that was dated and didn’t make the impact.'],
  ['No proper information hierarchy.', 'No credibility. Everything, everywhere.'],
  ['Sat with it, found real problems and', 'redesigned it on my design pillars.'],
]

export const problem = {
  headline: ['Understanding why the redesign', 'was necessary.'],
  // four points running past the laptop, across the white/black seam
  items: [
    ['Information scattered with no real', 'hierarchy.  Just walls of texts.'],
    ['No logos, no proof, no credibility', 'elements that earns the trust of', 'clients.'],
    ['No proper placement of CTAs. They', 'are randomly placed.'],
    ['Outdated UI. The interface looked like', 'it had been abandoned, not', 'maintained.'],
  ],
}

export const research = {
  eyebrow: 'Design Pillars',
  headline: ['I researched and learned what', 'makes a website good.'],
  aside: ['Before touching a single screen, I wrote down what the redesign',
          'had to do. If an idea couldn\u2019t pass all four, it didn\u2019t make the page.'],
  cards: [
    { title: ['Clarity before', 'aesthetics.'],
      body: ['If a buyer can\u2019t tell what Liveasy does in three seconds,',
             'nothing else on the page gets a chance to matter.'] },
    { title: ['Proof before pitch.'],
      body: ['Logos, numbers and real evidence come before a single',
             'feature. Earn the trust, then make the case.'] },
    { title: ['One path, not four.'],
      body: ['Every section points to the same next step. No competing',
             'buttons, no wandering.'] },
    { title: ['Outcomes over', 'features.'],
      body: ['Don\u2019t say what it does. Say what it gets you. "Fleet tracking"',
             'means nothing; "know where every truck is" sells.'] },
  ],
}

// The orange band: the film holds while this shrinks down into it.
export const band = ['Redesigning Liveasy, not just for', 'a better look but for a better', 'business.']

// Each row is a device and its line. Everything is read off the frame:
// `dx` is the device's left edge, `cgap` the space to the copy, `cy` how far
// the copy sits below the top of the device, `mt` the gap above the row.
// `copyFirst` is the middle row, which has the copy on the left.
// The redesign, one screen a row - all three in laptops, carrying the actual
// captures. `shot.r` is the image's own width/height, which Frame turns into
// the travel; only the hero fits a screen without scrolling.
// ---- the redesign, three screens deep ------------------------------------
// Full-width laptops, one per screen, each with its line underneath.
//
// MANAV: the frame prints the SAME caption on the second and the third -
// "Proof before features. Proper credibility elements placed to earn trust."
// Now that the third laptop carries features.jpg, that caption is describing
// the wrong screen, but it is your line and I am not writing one for you. One
// line here fixes it.
export const screens = [
  { shot: 'hero',        lines: ['Setting the first impression with modern and',
                                 'clean visual appeal with direct CTAs'] },
  { shot: 'credibility', lines: ['Proof before features. Proper credibility elements placed to earn trust.'] },
  { shot: 'features',    lines: ['Proof before features. Proper credibility elements placed to earn trust.'] },
]

// ---- learnings ------------------------------------------------------------
export const learned = {
  eyebrow: 'Learnings',
  head: ['What my first internship', 'taught me.'],
  aside: ['Six weeks, six pages, and lessons I\u2019ve used on every project since.'],
  cards: [
    { head: ['Look current or', 'look gone.'],
      body: ['In a fast-moving industry, an outdated site reads as a company',
             'that might not be around next quarter. A modern look turned out',
             'to be part of the trust, not separate from it.'] },
    { head: ['Don\u2019t let people', 'wander.'],
      body: ['Four competing buttons meant no decision at all. One clear path,',
             'repeated through the page, did more for conversion than any',
             'visual change.'] },
    { head: ['Decoding the feedback', 'is part of my job.'],
      body: ['I\u2019d get notes like "add a circle here" or "make it pop." Doing it',
             'literally never worked. Figuring out what was actually bothering',
             'them (balance, focus, hierarchy) almost always led to a better fix',
             'than the one they asked for.'] },
  ],
}

// ---- the questions this one gets ------------------------------------------
// MANAV: the frame gives the three QUESTIONS and no answers, so the answers
// below are mine, built from what this page and your resume already say -
// Nexus Info, your first internship, six weeks, six pages. Replace them.
export const faq = {
  eyebrow: 'FAQ',
  head: ['Questions I get', 'about this one.'],
  items: [
    { q: 'What was your role on the team?',
      a: ['UI design intern at Nexus Info, and the homepage redesign was mine',
          'end to end - the research, the pillars, and every screen.'] },
    { q: 'Was this your first real project?',
      a: ['Yes. Six weeks, six pages, and the first time my work was going in',
          'front of somebody\u2019s actual customers rather than a class.'] },
    { q: 'What would you do differently now?',
      a: ['Put it in front of people sooner. I argued the pillars from research',
          'and judgement, which held up - but I would rather have had a real',
          'buyer tell me than be right on paper.'] },
  ],
}

export const shots = {
  old:         { src: '/media/liveasy-old.webp',         r: 1500 / 4550 },
  hero:        { src: '/media/liveasy-hero.webp',        r: 1600 / 979 },
  credibility: { src: '/media/liveasy-credibility.webp', r: 1500 / 3662 },
  features:    { src: '/media/liveasy-features.webp',    r: 1500 / 1994 },
}

export const solution = [
  { dev: 'mac', w: 760, dx: 190, cgap: 169, cw: 545, cy: 72,  mt: 400, shot: 'hero',
    alt: 'The redesigned Liveasy homepage hero',
    lines: ['Setting the first', 'impression with modern', 'and clean visual appeal', 'with direct CTAs'] },
  { dev: 'mac', w: 760, dx: 272, cgap: 152, cw: 530, cy: 119, mt: 389, copyFirst: true, shot: 'credibility',
    alt: 'Client logos, milestones and the Why Us section',
    lines: ['Proof before features.', 'Proper credibility', 'elements placed to earn', 'trust.'] },
  { dev: 'mac', w: 760, dx: 190, cgap: 169, cw: 545, cy: 72,  mt: 381, shot: 'features',
    alt: 'The automated solutions grid and How it Works',
    lines: ['Instead of overwhelming', 'users, features were', 'organized to highlight', 'practical outcomes.'] },
]
