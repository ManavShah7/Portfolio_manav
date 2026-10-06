// The facts on the hero's title card. MANAV: the timeline is the one thing
// I do not have - fill the empty string and the column appears.
// The hero the updated frame draws: the name, the line, and three facts as
// pills on the film. MANAV: the pills replaced the Role/Timeline credit row,
// so "June 2026 - Ongoing" is no longer anywhere on the page - say the word
// and it goes back as a fourth pill.
export const hero = {
  name: 'Peak',
  line: ['No more juggling 3 apps.', 'One that actually does it all.'],
  tags: ['Consumer iOS app', 'Solo Designer & Builder', 'In beta with 20 users'],
}

// kept for the Role/Timeline row, which the hero no longer shows
export const credits = [
  { label: 'Role', value: 'Founding Product Designer' },
  { label: 'Duration', value: 'June 2026 - Ongoing' },
  // MANAV: the skills line is mine, read off what this case study actually
  // shows you doing. One string to change.
  { label: 'Skills', value: 'Product Design \u00b7 UX Research \u00b7 AI Product Design \u00b7 Brand \u00b7 iOS Build' },
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
  // Heading at the top, the drawn graphic in the middle, this body at the
  // bottom - which is exactly how the updated frame lays the two cards out.
  cards: [
    { head: ['Same Questions.', 'Same Answers.'],
      body: ['Height, weight, target, and that was it. Generic inputs gave',
             'generic plans, which is how I ended up designing Peak.'] },
    { head: ['No room to miss.', 'No one to miss with.'],
      body: ['Miss one day and the streak resets. No flexibility for real life',
             'and no one pushing alongside you, so motivation ran out fast.'] },
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
    { lines: ['“I’ve got one app for food, one', 'for workouts, and none of them',
              'talk to each other. I end up', 'guessing anyway.”'], who: 'Isha Joshi, Beginner' },
  ],
  redditHead: ['Then I checked *Reddit.*', 'They had something to say about this too.'],
  redditBody: ['My friends did confirm the pattern but I',
               'wanted a wider sample. So, I went to Reddit',
               'to look for strangers with complaints.'],
  // Drawn as what they are - three Reddit posts. `hi` is the half of each one
  // he highlights, which is the line that actually carries the complaint.
  redditQuotes: [
    { sub: 'r/fitness', age: '2y', votes: '1.2k',
      lead: ['I screenshot MyFitnessPal', 'and paste it into ChatGPT', 'every night.'],
      hi: ['There has to be a', 'better way.'] },
    { sub: 'r/weightroom', age: '8mo', votes: '1.6k',
      lead: ['Lost 15 kg and half my', 'strength with it.'],
      hi: ['Nobody told', 'me cutting could do that.'] },
    { sub: 'r/loseit', age: '1y', votes: '2.2k',
      lead: ['Every app asks height,', 'weight, goal.'],
      hi: ['That\u2019s not a', 'plan, that\u2019s a calculator.'] },
  ],
}

// `headline` and `cards` here are superseded by `stages` - the updated frame
// turns this section into a held heading with five boxes running past it. They
// are kept rather than deleted because they are his words and the old layout
// is one import away. `ceiling` is still live.
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

// ---- competitive analysis --------------------------------------------------
// Three capabilities each of the incumbents owns, four more that none of them
// do. The cells carry one of three states - 'y' has it, 'p' partly, 'n' does
// not - rather than the export's mix of a dot, a dash and the WORD "Partial",
// which was three encodings for one scale.
export const compare = {
  eyebrow: 'Competitive Analysis',
  head: ['Every app is best in their class.', 'But nobody owns the full picture.'],
  aside: ['I mapped the apps people already use against',
          'what they actually needed. Each one nails its',
          'own job, but none of them can see what the',
          'others know.'],
  cols: [
    { name: 'Nutrition', eg: 'MyFitnessPal, Cronometer' },
    { name: 'Workout',   eg: 'Hevy, Strong' },
    { name: 'Wearables', eg: 'Whoop, Apple Health' },
    { name: 'Peak',      eg: '', us: true },
  ],
  rows: [
    { label: 'Tracks food',             cells: ['y', 'n', 'n', 'y'] },
    { label: 'Tracks training',         cells: ['n', 'y', 'p', 'y'] },
    { label: 'Tracks recovery',         cells: ['n', 'n', 'y', 'y'], note: 'via sync' },
    { label: 'Reads all three together', cells: ['n', 'n', 'n', 'y'] },
    { label: 'Explains the why',        cells: ['n', 'n', 'p', 'y'] },
    { label: 'Flexible tracking effort', cells: ['n', 'n', 'n', 'y'] },
    { label: 'Friends in it with you',  cells: ['n', 'p', 'p', 'y'] },
  ],
  // one quiet line under the table, instead of a word inside the cells
  key: [['y', 'Has it'], ['p', 'Partly'], ['n', 'Doesn\u2019t']],
}

// ---- the five patterns -----------------------------------------------------
// The heading and its aside hold still on the left while these run past on the
// right, the way Times Media pins its deck. The chart card leads, then the
// four written findings.
export const stages = {
  head: ['Different people.', 'Different stages.', 'Same patterns.'],
  aside: ['Beginners, advanced lifters, and a',
          'lot of Reddit threads. The goals',
          'were all different, but the same 5',
          'things kept coming up.'],
  chart: {
    head: ['Relationship between', 'Motivation and Results.'],
    body: ['Most people quit in the gap between the two, right when progress is',
           'happening but can\u2019t be seen yet.'],
    // the band over the crossing, which is the whole point of the graphic
    quit: 'Where people quit',
    from: 'Week 1',
    to: '6 months',
  },
  cards: [
    { head: ['People don\u2019t just want the', 'plan. They want the why.'],
      body: ['Once someone understands why a change works, sticking to it',
             'stops feeling like guesswork.'] },
    { head: ['Apparently getting fit is a', '\u2018solo cold winter arc\u2019.'],
      body: ['It\u2019s treated like a grind you survive alone. But fitness isn\u2019t a',
             'phase, it\u2019s a lifestyle, and lifestyles stick when the people',
             'around you are in it too.'] },
    { head: ['You grow but plans', 'don\u2019t grow with you.'],
      body: ['A beginner and someone two years in need different things, but',
             'the plan never changes. Progress came from trial and error, not',
             'the app.'] },
    { head: ['The data\u2019s there. The', 'connection isn\u2019t.'],
      body: ['Food, lifts and recovery were all tracked, just in separate apps.',
             'Nobody was missing data. They were missing one place that put',
             'it together.'] },
  ],
}

export const adapts = {
  headline: ["You don’t need to be perfect.",
             'All you need is a system that perfectly',
             'adapts and grows with you.'],
}

// ---- testing ---------------------------------------------------------------
// His, word for word off the updated frame, and now with the before/after pair
// each change produced - which is the thing the case study was missing.
//
// The four screens are optional media (rule 4): drop a recording at
// public/media/peak-t1v1 / -t1v2 / -t2v1 / -t2v2 and the outlines fill. Until
// then they are empty phones with their captions, exactly as the frame draws.
export const testing = {
  eyebrow: 'Testing',
  headline: ['I put it in front of people.', 'Two things came straight back.'],
  aside: ['20 testers on TestFlight, and two complaints',
          'kept repeating. Both were the same problem',
          'in different clothes: a system that assumed',
          'everyone tracks alike.'],
  changed: 'What changed',
  notes: [
    { slot: 't1',
      quote: ['\u201cI\u2019ve a life, I just wanna log my', 'protein and lift hard. I\u2019m not',
              'living a miserable life.\u201d'],
      body: ['Tracking stopped being one-size-fits-all. You pick a mode: Chill',
             '(just the essentials, like protein and lifts), Detailed (every',
             'macro), or Custom (choose exactly what you track). Same app,',
             'your level of effort.'],
      shots: [['v1 log everything'], ['v2 \u2018chill\u2019, \u2018detailed\u2019 and', '\u2018custom\u2019 modes']] },
    { slot: 't2',
      quote: ['\u201cI wanna log my weight in', 'kg, but the lifting weights', 'in pounds.\u201d'],
      body: ['Units stopped being one switch for the whole app. Body weight',
             'and lifting weight each carry their own.'],
      shots: [['v1 one switch'], ['v2 per metric']] },
  ],
}

// ---- the same people, afterwards ------------------------------------------
// The two testers who raised the complaints above, on the other side of them.
// Their photos are the research section's own: peak-voice1 and peak-voice3.
export const progress = {
  head: ['Same people.', 'Now they\u2019re *progressing.*'],
  aside: ['The same people who flagged the problems',
          'were the first to feel the difference.'],
  quotes: [
    { who: 'Rishabh Tiwari, using Peak since July', ink: 'voice1',
      lines: ['\u201cTurns out I wasn\u2019t eating enough', 'carbs to grow. Now I know, and',
              'I\u2019ve got people checking if I', 'showed up.\u201d'] },
    { who: 'Isha Joshi, Beginner', ink: 'voice3',
      lines: ['\u201cDeleted two apps. One app, and', 'it actually connects the dots. I',
              'don\u2019t guess anymore.\u201d'] },
  ],
}

// ---- what I learned -------------------------------------------------------
// His, word for word off the updated frame - the placeholders I wrote are gone.
export const learned = {
  eyebrow: 'Learnings',
  head: 'What I learned building Peak.',
  aside: ['Not from a course or a brief. From 20 testers, a lot of Reddit',
          'threads, and my own wrong assumptions.'],
  cards: [
    { head: ['Design. Ship.', 'Listen. Repeat.'],
      body: ['My first version felt finished until 20 people used it. The two',
             'biggest changes came straight from testers, not from me. Getting',
             'it into real hands fast taught me more than another week in Figma',
             'would have.'] },
    { head: ['Not one fixed system.', 'Let people make it theirs.'],
      body: ['One tester wanted every macro, another just protein, another kg',
             'for body weight and pounds for lifts. Every fixed system picks who',
             'the app is for. Chill, Detailed and Custom exist because I stopped',
             'picking.'] },
    { head: ['Emotions shape behavior.', 'Design for them first.'],
      body: ['Emotions drive everything. People didn\u2019t quit over missing',
             'features. They quit feeling stuck, judged, or alone. Designing for',
             'that shaped the nudges, the modes, even the growth rings.'] },
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
// His text, from the foot of the updated frame. He wrote it as one run-on
// block; all I have done is split it into question and answer and close the
// sentences. No wording changed.
//
// MANAV: the last one is the exception - you wrote the question ("where is it
// now? and can I try it?") and no answer, so the answer below is mine, built
// from "In beta with 20 users" in your hero and the what's-next cards.
export const faq = {
  eyebrow: 'FAQ',
  head: ['Questions I get', 'about this one.'],
  items: [
    { q: 'Are you building this alone?',
      a: ['Yes. Research, design, brand, and the iOS build. Claude and caffeine',
          'was my coding partner for the build, and 20 testers kept me honest.'] },
    { q: 'How did you use AI?',
      a: ['Two ways. Inside the product, AI is the brain that reads your food,',
          'training and recovery together. In my process, Claude helped me build',
          'faster, so I could test real flows with real people instead of',
          'guessing in Figma.'] },
    { q: 'Why build a new app instead of improving an existing one?',
      a: ['Every app I tried was great in its own lane. The problem was the gaps',
          'between them, and you can\u2019t fix a gap from inside one lane.'] },
    { q: 'Where is it now? And can I try it?',
      a: ['In beta with 20 users, fixing what they find, ahead of an App Store',
          'launch.'] },
  ],
}
