// Peak, rewritten to Manav's new frame (the long export he sent).
//
// The page it replaces opened with two 90-odd-word paragraphs. This one opens
// with four short lines on black, and the whole case study is about a third of
// the words. Line breaks are authored throughout - never join these (rule 2).

export const intro = [
  ['At 100kg, I decided to get fit. No clue', 'what I was doing.'],
  ['A gym membership. 3 apps to track my', 'routines. Claude tying it together.'],
  ['Every app asked the same questions and', 'gave same generic plans.'],
  ['Workouts in one app, nutrition in another.', 'None of them talked to each other.'],
]

export const problem = {
  eyebrow: 'Problems',
  headline: ['Three different apps track something about you.',
             'None of them actually know you.'],
  cards: [
    ['Same Questions.', 'Same Answers.'],
    ['No room to miss.', 'No one to miss with.'],
  ],
  // The onboarding every one of them opens with, drawn inside the first card.
  // 100kg is from the intro; Manav - the height and age are placeholders,
  // change them here and the graphic follows.
  onboarding: {
    head: 'Set up your plan',
    fields: [
      { q: 'Height', a: '178', unit: 'cm' },
      { q: 'Weight', a: '100', unit: 'kg' },
      { q: 'Age', a: '21', unit: 'yrs' },
      { q: 'Target weight', a: '78', unit: 'kg' },
    ],
  },
  // the streak in the second card: five days kept, one missed, one still open
  streak: { label: 'Current streak', was: '12', now: '0',
            days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            state: ['done', 'done', 'done', 'done', 'done', 'miss', 'open'],
            friends: 'No one training with you' },
}

export const research = {
  eyebrow: 'User Research',
  headline: ['Before jumping to *Figma,*', 'I talked to people.'],
  aside: ['I talked to people at different', 'fitness stages, but same', 'recurring frustration.'],
  quotes: [
    { lines: ['“Five months in and my strength', "still isn’t moving. It’s demotivating",
              "and it’s harder to push alone.”"], who: 'Rishabh Tiwari, Beginner' },
    { lines: ['“Wasn’t born knowing this, years', 'of trial and error got me here.',
              'Always had a generic plan.”'], who: 'Prem Patel, Advanced Lifter' },
  ],
  redditHead: ['Then I checked *Reddit.*', 'They had something to say about this too.'],
  redditBody: ['My friends did confirm the pattern but I',
               'wanted a wider sample. So, I went to Reddit',
               'to look for strangers with complaints.'],
  redditQuotes: [
    { lines: ['“Every app wants rice', 'logged down to the', 'gram. I just want to hit',
              'my protein and lift', 'hard.”'], who: 'Rishabh Tiwari, 22' },
    { lines: ['“I play football, I need', 'lean and athletic body,', 'not bulky. Every app',
              'and plan wants me to', 'bulk up.”'], who: 'Preksha Praveen, 26' },
  ],
}

export const findings = {
  headline: ['Different people. Different stages.', 'Same patterns.'],
  // Each card carries its heading and, under it, what the research found. The
  // middle one carries the curve instead - see components/MotivationChart.js.
  cards: [
    { head: ['People want', '\u2018The Why\u2019.'],
      body: ['There is a lack of understanding the science behind how everything',
             'works. Once understood, it gets pretty straightforward and less',
             'frustrating.'] },
    { head: ['Relationship between', '*Motivation and Results.*'], chart: true },
    { head: ['Tracking enough is', 'different for everyone.'],
      body: ['Someone wants to track everything and someone wants to just track',
             'workouts and protein intake. A single system for all, is not the',
             'solution here.'] },
  ],
  // the four phases the curve passes through
  phases: [
    { dot: '#8A9A1F', title: 'The Start',
      body: "Motivation is at its peak. You\u2019re full of energy and ready to go." },
    { dot: '#E8A33D', title: 'The Dip',
      body: 'Motivation fades. Progress feels slow, and life gets in the way.' },
    { dot: '#D3058B', title: 'The Build',
      body: 'You keep showing up. Results start to appear, physically and mentally.' },
    { dot: '#7A5AF8', title: 'The Payoff',
      body: "You\u2019ve built the habit. Results are real, and motivation feels steady again - just calmer than day one." },
  ],
  ceiling: ['All these apps are perfect in their own lanes.',
            'But this specialization is their ceiling.'],
}


export const solution = {
  headline: ['Not another app to keep up with.', 'The only app that '],
  headAccent: 'keeps up with you.',
  liftHead: ['Lift. Tap. Done.', 'Not just logging but', 'unlocking *insights.*'],
  // one caption under each phone, not a shared paragraph
  // Both captions read the same in the frame, so both read the same here.
  liftCaps: [
    { lines: ['Build your own workout routine or', 'start from one built for you.'], bold: 'workout routine' },
    { lines: ['Build your own workout routine or', 'start from one built for you.'], bold: 'workout routine' },
  ],
  catalogHead: ['Build Catalog once.', 'Tap it, type it, scan it - forever.'],
  // The frame prints the same caption on all four cards, so this does too.
  cards: [
    { lead: ['Build a catalog'], lines: ['of your staple foods in minutes.'] },
    { lead: ['Build a catalog'], lines: ['of your staple foods in minutes.'] },
    { lead: ['Build a catalog'], lines: ['of your staple foods in minutes.'] },
    { lead: ['Build a catalog'], lines: ['of your staple foods in minutes.'] },
  ],
}

export const social = {
  head: ['Power of friendship.', 'Added to Peak.'],
  headAccent: 'Power of friendship',
  mid: ['Not a solo grind anymore.', 'Push your friend and '],
  midAccent: 'grow together.',
  bands: [
    { lines: ['Add your friend', 'by just sharing a code.'], align: 'right' },
    { lines: ['Send nudges to keep', 'your friend on track.'], align: 'left' },
  ],
}

export const adapts = {
  headline: ["You don’t need to be perfect.",
             'All you need is a system that perfectly',
             'adapts and grows with you.'],
}

export const whatsNext = {
  headline: ["There\u2019s no finish line.", 'Peak grows with each iteration.'],
  cards: [
    { title: 'Fix bugs and expand the beta',
      body: ['Being in loop with testers to fix bugs in order to provide a',
             'smoother and better experience.'] },
    { title: 'Pre-launch marketing',
      body: ['Building the hype and the story before the launch, focusing on',
             'getting Peak to people it was built for.'] },
    { title: 'Launch and iterations.',
      body: ['Launch on AppStore and iterate, improve the app with real user',
             'feedback and experiences.'] },
  ],
  other: ['Check out my', 'other work.'],
}


export const end = {
  contact: ['Like my work?', 'Get in contact.'],
}
