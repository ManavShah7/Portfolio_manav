// Liveasy. Unlike Peak, Times Media and Lighthouse there is no Figma frame for
// this one - it is composed in the same language as the others rather than
// reproduced, so there is nothing to diff it against. Line breaks are still
// authored: the widths below are set to the same measured limits the other case
// studies sit inside (~100 chars at lvBody, ~68 in a carousel card, ~43 in a
// 521-wide card), so nothing here may be joined into a single string.
export const rail = ['Overview', 'Problem', 'Research', 'Solution', "What's Next?"]

export const overview = {
  headline: ['A homepage that looked fine.', 'Nobody trusted it enough to click.'],
  p1: [
    'It was my second year of my bachelors when I landed my first UI design internship, working on',
    'Liveasy - a logistics Transport Management System - at Nexus Info. The brief I was handed was a',
    'visual one: the homepage is not converting, make it look better. I spent the first week reading',
    'that page the way a transporter would read it, and the problem stopped looking visual fast.',
  ],
  p2: [
    'In logistics nobody buys a feature list. People hand over their freight, their money and their',
    'deadlines, and they want to know who they are handing it to. What I was actually looking at was',
    "a credibility problem wearing a visual problem's clothes. Over six weeks I redesigned six core",
    'pages around that single idea, and click-through went up 20%.',
  ],
  meta: [
    { label: 'Role', values: ['UI Design Intern'] },
    { label: 'Duration', values: ['July 2024 -', 'August 2024'] },
    { label: 'Skills', values: ['UI Design', 'Competitive Analysis', 'Visual Hierarchy', 'Design Systems'] },
  ],
}

export const insight = {
  headline: ['Users here do not evaluate features.', 'They evaluate risk.'],
  body: [
    'A transporter putting a hundred trucks on a platform is not asking whether the interface is',
    'pretty. They are asking whether this company will still exist next quarter, and whether anyone',
    'they recognise is already trusting it. The old homepage answered neither question.',
  ],
  wide: {
    head: ['Looks fine.', 'Says nothing.'],
    body: [
      'The hero was a wall of text with no headline, no value proposition and no call to action.',
      'Three seconds in, a buyer still could not tell you what Liveasy does. Below it, cartoon',
      'illustrations and a zigzag dashed line carried a product that moves real freight.',
    ],
  },
  cards: [
    { head: ['Nothing vouching', 'for them.'],
      body: ['No client logos. No numbers. No proof of',
             'any kind above the fold. To a buyer',
             'weighing risk an empty page is not',
             'neutral, it reads as a company with',
             'nothing to show. The proof existed. It',
             'never made it onto the page.'] },
    { head: ['Four calls to action.', 'No direction.'],
      body: ['Every section ended with a different',
             'button competing for the same click, so',
             'none of them won. No primary path, no',
             'sense of what to do next. The result was',
             'not a wrong decision, it was no decision.'] },
  ],
}

export const research = {
  headline: ['Everyone had the same homepage.', 'Nobody finished the sentence.'],
  cards: [
    {
      head: ['What the good ones got right.', 'They proved it early.'],
      body: [
        'Every platform worth studying said what it did above the fold, in',
        'one line, with no jargon in it. Client logos sat inside the first',
        'scroll rather than buried on an about page. One primary action,',
        'repeated, never competing with three others. The pattern was',
        'consistent enough that ignoring it would have been the real risk.',
      ],
    },
    {
      head: ['Where all of them fell short.', 'Features, never outcomes.'],
      body: [
        'Past the fold every one of them turned into a specification list.',
        'Fleet tracking, e-POD, route optimisation - all true, and all',
        'meaningless to someone deciding whether to move their freight',
        'here. Nobody finished the sentence. Nobody said what any of it',
        'was actually worth to the person reading it.',
      ],
    },
    {
      head: ['So the gap was not visual.', 'It was the argument.'],
      body: [
        'The competition had the credibility furniture and none of the',
        'reasoning. Liveasy had neither. That handed the redesign its',
        'shape: earn the trust first, the way everybody else does, then',
        'do the part none of them bothered with and tie every feature to',
        'the outcome it produces for a transporter. Proof, then payoff.',
      ],
    },
  ],
}

export const solution = {
  headline: ['Not a prettier homepage.', 'A page that earns the click', 'before it asks for one.'],
  pillars: {
    head: ['Every decision ran through', 'the same four questions.'],
    body: ['Clarity before aesthetics. Trust is the product.',
           'Guide, do not let people wander. And does any',
           'of this actually move the business.'],
    caption: [
      'Clarity before aesthetics gave the hero one job: say what Liveasy',
      'does in a single line, in under three seconds. Trust is the product',
      'moved client logos and real numbers above the features instead of',
      'below them. Guide, do not let people wander collapsed four',
      'competing buttons into one primary action. And the last question',
      'quietly killed everything that could not answer it.',
    ],
  },
  hero: {
    head: ['The hero stopped describing.', 'It started saying one thing.'],
    body: ['One headline, one primary action, and a photograph of the',
           'thing the product actually moves. Everything else went below.'],
  },
  proof: {
    head: ['Proof before features.', 'Logos, numbers, then the pitch.'],
    body: ['Client logos and the usage numbers moved into the first',
           'scroll, ahead of any feature copy at all. The cartoon',
           'illustrations came out and a plain card grid went in, each',
           'card leading with the outcome rather than the capability.'],
  },
}

export const impact = {
  headline: ['20% lift in click-through.', 'Six core pages redesigned.',
             'A homepage that finally makes its case.'],
}

export const reflection = {
  head: ['What the first internship', 'actually taught me.'],
  cards: [
    { head: ['Context changes', 'everything.'],
      body: ['Logistics buyers weigh risk, not features.',
             'Once I understood the emotional context',
             'the user was sitting in, every decision on',
             'the page had a different answer. I have',
             'started every project that way since.'] },
    { head: ['Pillars beat', 'opinions.'],
      body: ['"Does this build trust?" turned out to be a',
             'far more useful question than "does this',
             'look good?". Written down in advance, the',
             'pillars settled arguments before they',
             'started and gave every choice a reason.'] },
  ],
}
