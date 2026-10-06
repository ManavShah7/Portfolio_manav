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
    { head: ['Same roadmap', 'for everyone.'],
      body: ['Generic advice ignored where someone was actually starting',
             'from.'] },
    { head: ['Knowledge is', 'everywhere.'],
      body: ['Too many options turned into decision fatigue, not progress.'] },
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
    { label: 'The career switcher', who: 'Ronaldo, 26',
      line: ['Business analyst trying to move into product. Learning nights',
             'and weekends, never sure which advice applies to him.'] },
    { label: 'The overloaded student', who: 'Bruno, 21',
      line: ['Final-year CS student. Has the knowledge, but can\u2019t tell if he\u2019s',
             'industry-ready or how to show it.'] },
    { label: 'The builder without a market', who: 'Madison, 25',
      line: ['Freelance designer who builds great things but doesn\u2019t know how',
             'to turn them into paid work.'] },
  ],
}

export const insight = {
  eyebrow: 'Key insight',
  // re-broken for the held column, which is 660 wide - the words are his, the
  // line breaks are mine
  head: ['Not every problem', 'needs a practical', 'answer. Some need',
         'emotional grounding', 'first.'],
  aside: ['On Reddit, well-meant advice failed most often when it didn’t match',
          'how the person was feeling.'],
  ledTo: 'Led to',
  cards: [
    { head: ['Readiness before solutions.'],
      body: ['Many people needed reassurance before they were ready to act.'],
      led: ['Navi adapts its tone, offering reassurance first and steps once',
            'you’re ready.'] },
    { head: ['Vague doesn’t mean lost.'],
      body: ['Vague questions usually signaled overload, not lack of intent.'],
      led: ['Onboarding that understands messy, half-formed answers.'] },
    { head: ['Timing beats content.'],
      body: ['The right advice, too early, made people more overwhelmed.'],
      led: ['One focused next step at a time, not the whole roadmap at once.'] },
  ],
}

export const core = {
  head: ['Not another resource.', 'Something that keeps you', 'on the *right path.*'],
  lead: ['Lighthouse AI starts with three questions:'],
  questions: ['What do you want to become?',
              'Where do you stand right now?',
              'How much time do you have?'],
  body: ['From those answers, Navi, Lighthouse’s AI guide, builds a personalized',
         'playbook: a path from where you are to where you want to be.'],
  steps: [
    { head: 'Input', body: ['goals, background, constraints, even when', 'answers are vague'] },
    { head: 'Interpretation', body: ['grounded in your skills, timeline and limits'] },
    { head: 'Direction', body: ['focused next steps instead of endless options'] },
    { head: 'Feedback loop', body: ['progress and changing priorities keep', 'refining the path'] },
  ],
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
    { head: ['Everything you learn, gets saved', 'and sorted at *Knowledge Base*'],
      body: null, shot: null },
    { head: ['A guide that makes sure you\u2019re on', 'the *right path.*'], body: null,
      shot: { src: '/media/lighthouse-guide.webp', w: 1800, h: 965 } },
  ],
}

// Section 8 (iterations) and 9 (results) were entirely [FILL], so they are not
// rendered. They go in here when he has them.
export const iterations = null
export const results = null

// His draft heading, and two of three card directions - all marked as "not
// final copy" in the spec, so the cards render as placeholders.
export const learned = {
  eyebrow: 'Learnings',
  head: null,            // draft: "What designing an AI product taught me."
  cards: [null, null, null],
  drafts: ['Emotion before instruction', 'Design for messy input', null],
}

export const faq = {
  eyebrow: 'FAQ',
  head: ['Questions I get', 'about this one.'],
  items: [
    { q: 'What did you own as an intern?', a: null },
    { q: 'What’s different about designing for AI?', a: null },
    { q: 'Did it ship?', a: null },
  ],
}

export const other = ['Check out my', 'other work.']
