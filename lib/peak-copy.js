// The facts on the hero's title card. MANAV: the timeline is the one thing
// I do not have - fill the empty string and the column appears.
export const credits = [
  { label: 'Role', value: 'Founding Product Designer' },
  { label: 'Timeline', value: 'June 2026 - Ongoing' },
]

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
  friction: ['Too much friction in maintaining', 'three apps everyday.'],
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
  // One caption under each phone. The frame printed the SAME sentence under
  // both, the way it printed one caption on all four catalog cards - and the
  // two phones are not the same screen: the first is the workout builder, the
  // second is insights. The first line below is his, word for word. The
  // second is mine, written to what its phone actually shows, in the voice of
  // the section head above it ("Not just logging but unlocking insights").
  // MANAV: replace it with your own and it is a one-line change.
  liftCaps: [
    { lines: ['Build your own workout routine or', 'start from one built for you.'], bold: 'workout routine' },
    { lines: ['Every set you log turns into insights', 'you can actually act on.'], bold: 'insights' },
  ],
  catalogHead: ['Build Catalog once.', 'Tap it, type it, scan it - forever.'],
  // The four real captions, one per way of logging. The frame printed the
  // same one on all four cards; these are his.
  cards: [
    { lead: ['Build a catalog '],        lines: ['of your staple foods in minutes.'] },
    { lead: ['Type what you ate '],      lines: ['however you want.'] },
    { lead: ['Quickly log your macros '], lines: ['by scanning barcode.'] },
    { lead: ['Click a photo '],          lines: ['of nutrition label of the food item.'] },
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

// ---- testing ---------------------------------------------------------------
// The case study showed the finished screens and not how they got there. These
// are Manav's own two pieces of tester feedback, word for word, and what each
// one changed in the design.
//
// MANAV: the two quotes are yours. The "what changed" paragraphs under them
// are mine, written to what the screens actually do - correct either if I have
// read your design wrong.
export const testing = {
  eyebrow: 'Testing',
  headline: ['I put it in front of people.', 'Two things came straight back.'],
  aside: ['Both were the same complaint wearing', 'different clothes: a system that', 'assumes everyone tracks alike.'],
  notes: [
    { quote: ['\u201cI wanna log my weight in kg,', 'but the lifting weights in pounds.\u201d'],
      body: ['Units stopped being one switch for the whole app. Body weight and',
             'lifting weight each carry their own, so nobody converts in their',
             'head to read their own numbers.'] },
    { quote: ['\u201cI just wanna log my protein.', 'Not the other stuff.\u201d'],
      body: ['Tracking became something you opt into, one field at a time. Log',
             'protein alone and the rest stays out of the way - the catalog is',
             'still there the day you want it.'] },
  ],
  changed: 'What changed',
}

// ---- what I learned --------------------------------------------------------
// MANAV: these three are mine, drawn from what the case study above already
// shows. This is the one section that should sound like you and nobody else -
// rewrite them and the page is done.
export const learned = {
  eyebrow: 'What I learned',
  headline: ['Building it taught me more', 'than planning it did.'],
  points: [
    { title: 'A single system for everyone is the easy answer.',
      body: ['Research said it, and then testing said it twice more - once about',
             'units, once about macros. The second time I stopped arguing with it.'] },
    { title: 'Two sentences beat a survey.',
      body: ['Neither change came from a score. Both came from somebody saying,',
             'in their own words, the one thing that was in their way.'] },
    { title: 'Shipping it finds what a prototype hides.',
      body: ['A flow can look finished in Figma and still ask something awkward',
             'of whoever uses it every single day. Building it is how I found out.'] },
  ],
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

// ---- the questions this one gets -------------------------------------------
// A reviewer asked for the things a case study never says out loud: who built
// it, how, and where it actually is. Plain <details>, so it needs no script
// and opens fine with a keyboard.
//
// MANAV: every answer here is drawn from your resume and from the copy above -
// nothing invented - but they are my sentences, not yours. Worth a pass.
export const faq = {
  eyebrow: 'FAQ',
  head: ['Questions I get', 'about this one.'],
  items: [
    { q: 'Are you building this on your own?',
      a: ['Yes - design, build, brand and the pre-launch story. Founding product',
          'designer is the honest title for it, because there is nobody to hand',
          'a file to.'] },
    { q: 'How are you using AI in the process?',
      a: ['Through the whole of it rather than at the end of it: synthesising',
          'interviews, pushing on ideas, and building the thing itself with',
          'Claude Code and Figma MCP so a flow can be used before it is agreed.'] },
    { q: 'Why build it instead of handing over a prototype?',
      a: ['Because a prototype answers whether the design reads. Only a build',
          'answers whether it holds up on the fourth day, when logging has to',
          'cost almost nothing.'] },
    { q: 'Where is it now?',
      a: ['In beta with testers, fixing what they find, ahead of an App Store',
          'launch.'] },
  ],
}
