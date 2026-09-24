// Every line break below is drawn by hand in the Figma - the lines all stop
// well short of their column - so headlines and paragraphs are stored as
// arrays of lines, never as one string that the browser would re-wrap.
export const rail = ['Overview', 'Problem', 'Research', 'Solution', "What's Next?"]

export const overview = {
  headline: [
    'Trying to get fit. No plan. A gym membership and 3 apps.',
    "That's were Peak started.",
  ],
  p1: [
    'So, I was at 100kg when it hit me that I needed to get fit. I started hitting gym with no clue, eating less',
    'food and praying it would work out. Well, it did but not in the way I wanted because I lost muscle while',
    'losing weight. I came to understand, I was in the wrong direction. So, I started looking for a plan or a',
    'direction, but I realize every platform just asked me basic details like weight, height and target weight.',
    "What about the context of me losing muscle? They were basically giving generic plans like ‘eat less,",
    "work more’.",
  ],
  p2: [
    'I turned to Claude to get a direction for lifting and tracking food then. I had three apps, one for',
    'tracking nutrients, one for tracking workouts and Claude to make sure I was going in right direction. I',
    'used to take screenshots from the diet app and the workout app and show it to Claude to make sure I',
    'am doing right things. Then I wondered, what if these apps could talk to each other without any need',
    "of screenshots? Well, here we are with Peak. The most ‘peak’ app you need to get fit.",
  ],
  meta: [
    { label: 'Role', values: ['Product Designer &', 'Product Developer'] },
    { label: 'Current Status', values: ['In testing with 20', 'TestFlight Users'] },
    { label: 'Skills', values: ['Product Designing', 'AI-Assisted Developing', 'Branding', 'Marketing'] },
  ],
}

export const problem = {
  headline: [
    'Three different apps track something about you.',
    'None of them actually know you.',
  ],
  body: [
    'Three apps, three separate pieces of me, food in one, lifts in another, weight in',
    'a third. Each one technically had data. None of them had enough of the picture',
    'to actually know what any of it meant.',
  ],
  cards: [
    {
      head: ['Same Questions.', 'Same Answers.'],
      body: ['Weight. Height. Target. That was it.',
             'Generic inputs gave generic plans.',
             'Every body is different and reacts',
             'differently to everything. One common',
             'plan does not work. Everyone has',
             'different goals, different requirements.'],
    },
    {
      head: ['No room to miss.', 'No one to miss with.'],
      body: ['Every tracker had me on gunpoint. Miss',
             'a day and a bullet goes right through',
             'your head. Fitness is a journey and no',
             'one can be 100% perfect everyday. Also,',
             'it would be better if I had a friend',
             'pushing me and vice versa.'],
    },
  ],
}

export const research = {
  headline: ["Before jumping to Figma, I wanted to see if it’s just me.",
             "Turns out, I wasn’t the only one."],
  cardHead: ["I wasn’t the only one ranting.", 'My friends and Reddit felt the same.'],
  cardBody: ['I talked to friends who lift and track, and went through fitness',
             "subreddits to see other’s experiences. Different people, different",
             'goals, different apps but it kept boiling down to the same few things.',
             'Here are four of them that generalize everyone I came across.'],
  quotes: [
    ["“You’d think I was", 'always an expert. I', 'might be now, but',
     "it’s because of", 'constant trials and', 'errors. I had no',
     'specific plan or a', 'platform that', 'adapts to my',
     'progress. It was', 'generic advice and', "me figuring out”"],
    ["“I wanna get lean", 'and strong so I', 'started getting',
     'lifting but even', "though it’s been 5", 'months, my',
     'strength is not', 'going up. This', 'demotivates me',
     "and it’s very hard", 'to do this alone', "sometimes.”"],
    ["“Bro, every app", 'wants me to log', 'rice down to every',
     'gram. Sorry, but I', 'have a life. I just', 'want to hit my',
     'protein and lift', 'hard. Trying to live', 'a very low cortisol',
     "life”"],
    ["“I’ve three", 'different report', 'cards. My watch',
     "says I’m recovered,", 'nutrition app says', "I’m under eating,",
     'my workout', 'tracker says I', 'should lift heavier. I',
     'am an athlete man', 'I need to stay as', "light”"],
  ],
  name: 'Preksha, 28',
  role: 'Advanced Lifter',
}

export const ceiling = {
  headline: "Where the ‘smart-tracking’ apps stop.",
  cardHead: ['All these apps are perfect in their own lanes.',
             'But this specialization is their ceiling.'],
}

export const solution = {
  headline: ['Not another app to keep up with.', 'The only app that keeps up with you.'],
  liftHead: ['Lift. Tap. Done.', 'Not just logging but unlocking insights.'],
  liftBody: ['Build your own routine or start from one built for you. Tap through',
             'your sets at the gym, and Peak reads it against your food timing,',
             "sleep and training history to show you where you’re improving and",
             "where you’re lacking."],
  catalogHead: ['Build Catalog once.', 'Tap it, type it, scan it - forever.'],
  catalogBody: ["Add a food once, in whatever way’s fastest and most",
                'convenient - type it, click the label, or scan the barcode.',
                'Peak logs it and remembers it, so you never have to enter',
                'the same thing twice.'],
  // Four now, each saying its own thing. They used to share one paragraph,
  // which printed the same 16 words six times down the page.
  cards: [
    { title: ['Build a catalog of your staple foods', 'in minutes.'],
      body:  ['Peak remembers it and lets you log', 'food however you like.'] },
    { title: ['Type it however you want.'],
      body:  ["Peak gets it, and if it doesn’t, it just asks -", 'no guessing on either end.'] },
    { title: ['Click and upload the nutrition label.'],
      body:  ['Peak reads it and logs it in seconds,', 'backed by a huge food database',
              'built for real-world accuracy.'] },
    { title: ['Scan the barcode.'],
      body:  ['Peak pulls the same accuracy straight', 'off the label and logs it in a tap.'] },
  ],
}


export const social = {
  // Two full-bleed bands now, each with its line over the footage, and the
  // headline on white between them - the way Manav's new frame draws it.
  headline: ['Not a solo grind anymore.', 'Push your friend and '],
  headlineAccent: 'grow together.',
  bands: [
    { lines: ['Add your friend', 'by just sharing a code.'], align: 'right' },
    { lines: ['Send nudges to keep', 'your friend on track.'], align: 'left' },
  ],
}


export const adapts = {
  headline: ["You don’t need to be perfect.",
             'All you need is a system that perfectly adapts',
             'and grows with you.'],
  body: ['Your bad weeks, your heavy family dinners, your great workouts,',
         'your changing metabolism, your actual habits - Peak reads all of it',
         'and adjusts to your speed. The system is built for you, around you',
         'and by you.'],
}

export const whatsNext = {
  headline: ["There’s no finish line with Peak.",
             "There’s limitless opportunities.",
             'Step by step, iteration by iteration - it grows.'],
  cards: [
    { title: 'Fix bugs and expand the beta',
      body: ['Build your own routine or start from one',
             'built for you. Tap through your sets at the',
             'gym'] },
    { title: 'Pre-launch marketing',
      body: ['Building the hype and the story before the',
             'launch, focusing on getting Peak to people',
             'it was built for.'] },
    // The third card runs off the right edge of the 1900 frame; the tail of
    // each line is not in the export and is reconstructed here.
    { title: 'Launch',
      body: ['Screenshots, listing copy and review',
             'prep. Turning a private Testflight app',
             'into something on AppStore.'] },
  ],
}
