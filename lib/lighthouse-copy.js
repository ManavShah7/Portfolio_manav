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
    { label: 'Team', value: 'Remote, California' },
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
          'me how they actually talk when they’re stuck.'],
  // personas built from the research, so no quote marks
  personas: [
    { who: 'Ronaldo, 26', label: 'The career switcher',
      line: ['Business analyst trying to move into product. Learning nights',
             'and weekends, never sure which advice applies to him.'] },
    { who: 'Bruno, 21', label: 'The overloaded student',
      line: ['Final-year CS student. Has the knowledge, but can’t tell if he’s',
             'industry-ready or how to show it.'] },
    { who: 'Madison, 25', label: 'The builder without a market',
      line: ['Freelance designer who builds great things but doesn’t know how',
             'to turn them into paid work.'] },
  ],
}

export const insight = {
  eyebrow: 'Key insight',
  head: ['Not every problem needs a practical', 'answer. Some need emotional',
         'grounding first.'],
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
export const solution = {
  blocks: [
    { head: ['An onboarding that', 'understands you.'],
      body: ['Navi opens a conversation instead of a form, and handles a vague',
             'answer or a frustrated one the way a person would.'],
      shot: null },
    { head: ['A plan made for you,', 'that grows with you.'], body: null, shot: null },
    { head: ['Everything you learn, saved', 'in your Knowledge Base.'], body: null, shot: null },
    { head: ['A guide that keeps you', 'on the right path.'], body: null, shot: null },
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
