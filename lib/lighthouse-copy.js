// Lighthouse AI, written to Manav's build spec.
//
// Anything he marked [FILL] or [ASSET] in that spec is `null` here, and the
// page renders a visible placeholder for it rather than copy I made up. The
// two sections that were entirely [FILL] - iterations and results - are not
// rendered at all, which is what the spec asks for.
//
// MANAV: every `null` below is a hole only you can fill. Search this file for
// `null` and you have the whole list.

export const hero = {
  eyebrow: 'Lighthouse AI',
  head: ['Turning endless career advice', 'into one clear path.'],
  tags: ['AI career coaching', 'Product design intern'],
  meta: [
    { label: 'Role', value: 'Product Design Intern' },
    { label: 'Duration', value: 'Feb - Jul 2025' },
    { label: 'Skills', value: 'Product Design · UX Research · AI Product Design · Prototyping' },
  ],
}

// the opening lines, on black
export const context = [
  ['I joined Lighthouse AI as a Product', 'Design Intern during my undergrad.'],
  ['An AI career coach for people who know', 'where they want to go, but not how to', 'get there.'],
  ['Courses, blogs, videos, advice.', 'Everything is one click away.'],
  ['And still, most people feel stuck.'],
]

export const access = ['Access to information has never been easier.',
                       'We’re one click away from almost anything.']
export const lost = ['But without direction,', 'it’s easy to get lost.']

export const problem = {
  head: ['There’s no lack of information.', 'There’s a lack of direction.'],
  cards: [
    { head: ['Putting in hours.', 'Direction? Unclear.'],
      // recovered from the old portfolio's git history - it is the same photo
      // the Figma frame lays this card over
      photo: '/media/lighthouse-hours.webp',
      body: ['People were working hard, but couldn’t tell if any of it was',
             'moving them forward.'] },
    // the two drawn graphics under these headings are in
    // components/LighthouseProblem.js; the words in them are copy, so they
    // live here
    { head: ['Same roadmap', 'for everyone.'],
      body: ['Generic advice ignored where someone was actually starting',
             'from.'],
      steps: ['Learn the basics', 'Build a project', 'Start applying'] },
    { head: ['Knowledge is', 'everywhere.'],
      body: ['Too many options turned into decision fatigue, not progress.'],
      sources: ['Courses', 'Blogs', 'YouTube', 'Threads', 'Newsletters',
                'Podcasts', 'Bootcamps', 'Mentors', 'Webinars'] },
  ],
}

export const research = {
  eyebrow: 'User research',
  head: ['I talked to people at different', 'stages of their careers.'],
  aside: ['Interviews and surveys told me what people wanted. Reddit showed',
          'me how they actually talk when they\u2019re stuck.'],
  // No photographs of these three exist, and a stock face would be a lie about
  // a persona anyway - so the archetype leads and carries the colour, and the
  // card is type the whole way down.
  personas: [
    { label: 'The career switcher', who: 'Adam, 26',
      line: ['Business analyst trying to move into product. Learning nights',
             'and weekends, never sure which advice applies to him.'] },
    { label: 'The overloaded student', who: 'Megana, 21',
      line: ['Final-year CS student at the University of Maryland. Has the',
             'knowledge, but can\u2019t tell if she\u2019s industry-ready or how to',
             'show it.'] },
    { label: 'The builder without a market', who: 'Madison, 25',
      line: ['Freelance designer who builds great things but doesn\u2019t know how',
             'to turn them into paid work.'] },
  ],
}

export const core = {
  head: ['Not another resource.', 'Something that keeps you', 'on the *right path.*'],
  lead: ['Lighthouse AI starts with three questions:'],
  questions: ['What do you want to become?',
              'Where do you stand right now?',
              'How much time do you have?'],
  body: ['From those answers, Navi, Lighthouse\u2019s AI guide, builds a personalized',
         'playbook: a path from where you are to where you want to be.'],
}

// Flat, large, unframed screens - one per block, text alternating side.
// `body: null` and `shot: null` are his [FILL] / [ASSET] markers.
// Three of these four screens came back out of the old portfolio's git
// history, where they had been committed as public/work/lighthouse/1-3.png.
// The Knowledge Base one was never in that build, so it is still a hole.
//
// Headings centred above the screen and stacked, as his frame draws it -
// `*...*` marks the words that take the green.
export const solution = {
  blocks: [
    { head: ['An onboarding that', 'understands you.'],
      body: ['Navi opens a conversation instead of a form, and handles a vague',
             'answer or a frustrated one the way a person would.'],
      shot: { src: '/media/lighthouse-onboarding.webp', w: 1800, h: 1044 } },
    { head: ['A plan that is made for you', 'and grows with you.'], body: null,
      shot: { src: '/media/lighthouse-playbook.webp', w: 1800, h: 1041 } },
    // MANAV: the Knowledge Base screen is gone - it was never in the old
    // portfolio's history either, so there is nothing to recover. The block is
    // out rather than standing as a hole between three framed screens. The
    // feature is not invisible: the Playbooks screen above shows
    // "Knowledgebase" in its own left nav. Put the capture back in public/media
    // as lighthouse-kb.webp, uncomment this, and it returns.
    // { head: ['Everything you learn, gets saved', 'and sorted at *Knowledge Base*'],
    //   body: null, shot: { src: '/media/lighthouse-kb.webp', w: 1800, h: 1040 } },
    { head: ['A guide that makes sure you\u2019re on', 'the *right path.*'], body: null,
      shot: { src: '/media/lighthouse-guide.webp', w: 1800, h: 965 } },
  ],
}

// ---- the team ---------------------------------------------------------------
// A short section, because it IS short: an internship on a small team. The
// names and roles are Manav's.
export const team = {
  eyebrow: 'Who I built it with',
  head: ['A small team, and the', 'people who taught me.'],
  people: [
    { who: 'Grace Shieh', role: 'Product Designer',
      line: ['I worked under Grace. Most of what I know about taking a',
             'half-formed idea and arguing it into a design, I learned',
             'watching her do it.'] },
    { who: 'Keyur Shah', role: 'Founder & Product Manager',
      line: ['Set the direction and kept the scope honest.'] },
    { who: 'The engineers', role: 'Build',
      line: ['Who told me early which parts of a design were going to be hard,',
             'which changed what I drew.'] },
  ],
}

// ---- why it did not go the distance -----------------------------------------
// MANAV: this is the one section I will not write for you. The heading and the
// shape are here; the three reasons have to be yours, because they are claims
// about why a real product at a real company did not work, and I cannot know
// them. Fill `reasons` below - a head and a body each - and the section
// appears. Left empty it does not render at all (rule 4), so nothing fake
// ships in the meantime.
export const failed = {
  eyebrow: 'What did not work',
  head: ['Honest about where', 'it fell short.'],
  aside: ['The product did not go the distance, and the reasons are more useful',
          'than the screens.'],
  reasons: [
    // { head: ['...'], body: ['...'] },
  ],
}

// Section 8 (iterations) and 9 (results) were entirely [FILL], so they are not
// rendered. They go in here when he has them.
export const iterations = null
export const results = null

// His, word for word. The numbers are his too - he wrote them as "01 ·".
export const learned = {
  eyebrow: 'Learnings',
  head: ['What designing an AI', 'product taught me.'],
  cards: [
    { n: '01', head: ['Advice only works when', 'someone\u2019s ready for it.'],
      body: ['Reddit showed me that good advice failed when it didn\u2019t match how',
             'someone felt. People who felt overwhelmed needed reassurance',
             'before a plan. That changed how Navi speaks: steady first, specific',
             'when you\u2019re ready.'] },
    { n: '02', head: ['More backgrounds,', 'more perspective.'],
      body: ['A career switcher, an overloaded student and a builder without a',
             'market all wanted direction, for completely different reasons.',
             'Talking to people at different stages kept me from designing for',
             'just one of them.'] },
    { n: '03', head: ['Nobody starts', 'with a map.'],
      body: ['At the start of a career, no one knows exactly what to do. People',
             'figure it out by walking the path. So Lighthouse doesn\u2019t hand you',
             'the whole roadmap upfront. It gives you the next step and adjusts',
             'as you go.'] },
  ],
}

// His, word for word.
export const faq = {
  eyebrow: 'FAQ',
  head: ['Questions I get', 'about this one.'],
  items: [
    { q: 'What\u2019s the hardest part of designing for AI?',
      a: ['You\u2019re designing a personality, not just screens. When Navi speaks,',
          'how much it says, and how it sounds when someone\u2019s frustrated all',
          'matter. The same advice can help one person and overwhelm another,',
          'depending on timing and tone.'] },
    { q: 'What did you take from this into your later work?',
      a: ['Designing for emotion first. The same idea shows up in Peak, where',
          'people quit apps because they feel stuck, not because a feature is',
          'missing. Lighthouse is where I learned it.'] },
    { q: 'Why Reddit for research?',
      a: ['Interviews tell you what people think they want. Reddit shows how',
          'they actually talk when they\u2019re stuck, with no designer in the room.',
          'It\u2019s where I found the emotional patterns that shaped the whole',
          'product.'] },
  ],
}

export const other = ['Check out my', 'other work.']
