// Lighthouse AI, read off ~/Desktop/newportfolio /new design/lighthouse.png.
// Reproduced verbatim, including the two things that look like leftovers from
// the Times Media frame this one was duplicated from - see `problem.headline`
// and the trailing comma in `insight.headline`. Line breaks are authored.
export const rail = ['Overview', 'Problem', 'Research', 'Solution', "What's Next?"]

export const overview = {
  headline: ['40 hours of courses watch yet no idea what to do next.',
             `That's the sentence I kept reading.`],
  p1: [
    'It was my final semester of my bachelors in Computer Science and Design when I joined Lighthouse',
    'AI as a Product Design Intern. The idea was to help students, early professionals and professionals',
    'figure out their next move without drowning in information. I helped designing this from the inside',
    'out. As a student myself, going through the exact same overwhelm I was designing for, talking to',
    'peers about problems I was living through in real time.',
  ],
  p2: [
    'Over five months, working alongside design,PM and engineering, I went end-to-end: research',
    'product direction, screens, and the actual proof of whether any of it worked. Shipped 5 high-fidelity',
    'prototypes across onboarding, the coaching flow, and the Chrome extension, backed by 70+',
    'research participants and hundreds of Reddit threads dug through for what people actually felt, not',
    'just what they said in an interview.',
  ],
  meta: [
    { label: 'Role', values: ['Product Design Intern'] },
    { label: 'Duration', values: ['February 2025 -', 'July 2025'] },
    { label: 'Skills', values: ['Product Designing', 'AI-Assisted Developing', 'Branding', 'Marketing'] },
  ],
}

export const insight = {
  // the trailing comma is in the Figma
  headline: ['There is no lack of information.', 'There is lack of direction,'],
  body: [
    'Courses, blogs, videos, projects roadmaps - Internet is full of it. Access to',
    'information has never been this easy till now. But what do we do with all that',
    'information? None of it tells us what to do next.',
  ],
  wide: {
    head: ['Putting in hours.', 'Direction? Unclear.'],
    body: ['People weren\u2019t stuck because they weren\u2019t trying. They watched the content,',
           'made notes, followed advice, put in the hours but still couldn\u2019t tell if any of it',
           'was moving them anywhere.'],
  },
  cards: [
    { head: ['Same recipes to', 'everyone.'],
      body: [`Generic roadmaps didn't care about`, 'your background, your goals, or your',
             'timeline, everyone got the same plan,', 'regardless of where they actually', 'stood.'] },
    { head: ['Knowledge is all over', 'the place.'],
      body: ['Every resource carried the same weight.', 'Nothing separated what actually',
             'mattered right now from everything else', 'competing for attention. There was a',
             'clear need for a base that consists of all', 'the knowledge you gain.'] },
  ],
}

export const research = {
  // NOTE: this is still the Times Media headline. Left as drawn.
  headline: ['Same PowerPoint.', 'Four different ways it was breaking things.'],
  // Three frames for the carousel in the green band, exported separately at 2x.
  // Only the first has a tablet on it. Apostrophes and double quotes are all
  // straight here, and the double space after 'r/ExperiencedDevs,' is drawn.
  cards: [
    {
      head: ['Students. Early professionals. Experts.', 'I talked to people at every stage.'],
      body: [
        '50 survey responses and 20 structured interviews across students,',
        'early-career professionals, and people further along- all circling the',
        'same wall: plenty of resources, no clear next step. Structured',
        'conversations gave us the polished version of the problem. It was a',
        'start, but not the whole picture.',
      ],
    },
    {
      head: ['Then I went where people stop performing.', 'Reddit. A wild ride.'],
      body: [
        'Hundreds of threads across r/cscareerquestions, r/ProductManagement,',
        'r/careerguidance, and r/ExperiencedDevs,  nobody there is being',
        "interviewed, so nobody's filtering themselves. That's where the real",
        'frustration showed up, unfiltered and specific.',
      ],
    },
    {
      head: ['Detailed. Vague. Emotional.', 'People gave context in all kinds.'],
      body: [
        'Some people gave a full, structured breakdown of where they stood.',
        'Others gave a single vague line. Some just vented, frustration first,',
        'facts second. All three were the same underlying need, said',
        'differently - which meant the product couldn\'t wait for a "good"',
        'input. It had to work with whatever context someone actually gave it,',
        'and still get to a real, personalized direction from there.',
      ],
    },
  ],
}

export const solution = {
  headline: ['Not another resource.', `But something making sure that you're in`, 'the right path.'],
  navi: {
    head: ['Talks and understands you.', 'Not just another form.'],
    body: ['No drop downs, no sliders. Just a conversation that',
           'understands your context and your goals in whatever', 'way you say it.'],
    caption: [
      'Navi opens a conversation instead of a form -background, current',
      'role, goals, timeline -reading a detailed answer, a vague one, or a',
      'frustrated one the same way a person would. That context builds a',
      'week-by-week playbook made for the individual, not the goal. Two',
      'people chasing "break into product design" walk away with two',
      'completely different plans.',
    ],
  },
  playbook: {
    head: ['A plan that knows where your starting point.', 'Grows with you, for you.'],
    body: [
      'The playbook lays out what to do week by week, in order, based on the',
      `context Navi actually gathered from you. It's not a generic list of`,
      `"things to do to break into product design" - it's built around your`,
      `background, your timeline, and where you're actually starting from.`,
    ],
  },
  ext: {
    head: ['Redesigned the existing browser extension.', 'Audited entire workflow to uncover value.'],
    body: ['The Chrome extension already logged activity in the',
           'background and checked it against your playbook. But it',
           'required a redesign to unlock its true potential. Result: a',
           '40% increase in downloads and giving true value.'],
  },
}

export const impact = {
  headline: ['40% more downloads.', '5 high-fidelity screens shipped.',
             'A product that gives direction, finally.'],
}
