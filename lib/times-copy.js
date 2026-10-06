// Times Media, rewritten to Manav's new frame. Line breaks are authored - the
// frame draws them and the browser must not re-wrap (rule 2).

// The facts on the hero's title card. The role is his own, from lib/work.js.
// MANAV: the duration is the one thing I do not have anywhere. Put it in the
// empty string below and the Timeline column appears on the film; left empty
// it is simply not drawn, rather than shipping "Add the dates" to anyone who
// opens the page.
// The hero the updated frame draws: the line centred on the film, three facts
// as pills in a row under it, and a tablet standing below them.
export const hero = {
  line: ['Rebuilding how an', 'outdoor advertising company runs.'],
  tags: ['B2B operations platform', 'Solo Designer & Builder', 'Shipped & in use'],
}

// kept for the Role/Timeline row, which the hero no longer shows
export const credits = [
  { label: 'Role', value: 'Founding Product Designer' },
  { label: 'Duration', value: 'January 2026 - Ongoing' },
  // MANAV: mine, off what the case study shows. One string.
  { label: 'Skills', value: 'Product Design \u00b7 UX Research \u00b7 Design Systems \u00b7 AI-assisted Development' },
]

export const intro = [
  ['My dad runs an OOH advertising', 'company called Times Media.', '600+ boards across Gujarat, India.'],
  ['All of them lives in one PowerPoint.', 'One guy maintaining it, everyday.'],
  ['Data all over the place. Lease lapses,', 'nobody notices - a big fine shows up.'],
  ['Clients are sent “updated pdf”.', 'No time, no data to chase new business.'],
]

export const research = {
  headline: ["A website wasn't the fix.", 'Talked to everyone, from the',
             '*owners to the crew.*'],
  // the quote on the red panel beside the photo
  quote: ['"Managing 660+ boards on a', 'PowerPoint is tedious enough.',
          'Add in fines from things slipping', "through, and it's a system that's",
          'actively costing us."'],
  voices: [
    { lines: ['"Walking a client through', "a PowerPoint doesn't say",
              'much about who we are.', "Everything's manual,",
              "nothing's data-backed - I", 'build strategies on a deck',
              'and whatever I', 'remember."'],
      who: ['Ritesh Jain, Sales Manager'] },
    { lines: ['"I\u2019ve shown up to a board', "and found someone else's",
              'print already there - their', 'lease ended, nobody told',
              'me. With this many boards,', "I'm mostly just guessing at",
              'maintenance."'],
      who: ['Kishan Kalavadiya,', 'On-field agent'] },
  ],
}


export const problem = {
  headline: ['Same PowerPoint.', 'Four different ways it was', 'breaking things.'],
  // each is a lit opener that runs on into the grey
  items: [
    { lead: ['600+ boards, 600+ slides. Every rental, every repair, every lease change - '],
      lines: ["someone's updating it by hand, every single day."] },
    { lead: ['No fixed process for tracking due dates and maintenance. '],
      lines: ['A lease lapses, nobody notices until fines comes up.'] },
    { lead: ["Client's first impression of the business - 600+ slides to scroll through. "],
      lines: ['No credibility, no experience just a PowerPoint.'] },
    { lead: ['The system has to be simple, '],
      lines: ['especially for on-field agents, who needed zero learning curve.'] },
  ],
}


export const solution = {
  headline: ['No more slides. No more friction.', '*One system, three platforms.*'],
  admin: { lead: 'Everything an admin needs to run 660+ boards, ',
           line: "not spread across a slide deck, a phone, and someone's memory." },
  siteHead: ['A modern website that sells.', 'No more scrolling through slides.'],
  site: ['A modern landing page with a', 'live map, credibility elements',
         'built in, and CTAs that push', 'clients straight to booking.'],
}


// The red band: the film holds while this scrolls up over it, the way
// apple.com/macbook-pro pins its performance film.
export const waves = ['New experience.', 'New business opportunities.']

// The screens, as captures rather than empty frames. `r` is each shot's own
// width/height, which Frame turns into the scroll travel.
export const shots = {
  admin:      { src: '/media/times-admin-shot.webp',  r: 1700 / 1062 },
  maint:      { src: '/media/times-maint.webp',       r: 1700 / 1062 },
  // cropped to exactly the phone screen's 0.469, so it fills rather than
  // rolling 18% and reading as a mistake - the capture is a full-page scroll,
  // taller than any real phone
  maintPhone: { src: '/media/times-maint-phone.webp', r: 760 / 1645 },
}

export const street = {
  headline: ['See it live with 3D Street View.', 'Know your reach before you commit.'],
  shots: [
    { slot: 'street', line: ["With 3D Street View, see the board live before it\u2019s actually live."] },
    { slot: 'reach',  line: ['Know your reach before you commit with real traffic data around it.'] },
  ],
  field: { lead: 'On field agent scans the QR code at the back of board and raises a request. ',
           line: "The request gets to the admin\u2019s panel to get approved." },
}

export const impact = ['100% decrease in fines.', 'Hours saved. Money saved.',
                       'Unlocking new opportunities.']

// ---- feedbacks and iterations ----------------------------------------------
// The two complaints that came back after it shipped, each one turning over to
// what changed because of it. His words off the updated frame.
//
// MANAX: the aside read "watching the them use it" in the frame - I dropped
// the duplicated word and changed nothing else.
//
// The four screens are optional media: drop recordings at
// public/media/times-i1v1 / -i1v2 / -i2v1 / -i2v2 and the empty devices fill.
export const iterate = {
  eyebrow: 'Feedbacks & Iterations',
  head: ['Built it. Shipped.', 'Listened. Iterated.'],
  aside: ['Being in loop with the team and watching',
          'them use it showed me where my first',
          'version fell short.'],
  changed: 'What changed',
  cards: [
    { slot: 'i1', dev: 'phone',
      quote: ['"My English isn\u2019t great, so I\u2019d type', 'whatever I could, and the admin',
              "couldn\u2019t understand it. I can", 'explain it much better in Gujarati."'],
      who: 'Kishan Kalavadiya, On-field agent',
      v1: 'v1 Typed form, English only',
      body: ['Voice notes in any language, so field agents explain problems',
             'the way they actually talk. Everything else got stripped down',
             'to scan, snap, and one tap for severity.'],
      v2: ['v2 Scan, snap, speak in any', 'language'] },
    { slot: 'i2', dev: 'ipad-h',
      quote: ['"We\u2019ve been in this business for', 'years, and every decision still',
              'came from memory. Nothing told', 'us where to grow next."'],
      who: 'Ritesh Jain, Sales Manager',
      v1: 'Data stored in Excel',
      body: ['The data stopped just sitting in sheets. One live database now',
             'surfaces patterns, like preferred areas, top-performing boards',
             'and client trends, so the business plans from data instead of',
             'memory.'],
      v2: ['v2 Patterns, not just records'] },
  ],
}

// ---- hearing it back ------------------------------------------------------
export const heard = {
  head: ['Hearing this reminds', 'me why I design.'],
  aside: ['Hearing what changed for the people using',
          'it every day reminded me why I love solving',
          'problems.'],
  quotes: [
    { lines: ['"Zero fines since we switched. The time we',
              'used to lose on the deck now goes into',
              'finding new business."'],
      who: ['- Dipesh Shah, Owner'] },
    { lines: ['"It\u2019s very straightforward for me.', 'Manav kept coming back to',
              'understand how I work, and it shows."'],
      who: ['- Kishan Kalavadiya,', 'On-field agent'] },
    { lines: ['"I pitch with more confidence now. I\u2019ve got a',
              'real system backing me up."'],
      who: ['- Ritesh Jain,', 'Sales Manager'] },
  ],
}

// ---- learnings ------------------------------------------------------------
export const learned = {
  eyebrow: 'Learnings',
  head: ['What rebuilding a real', 'business taught me.'],
  aside: ['Designing for my dad\u2019s company meant the stakes were real, and so',
          'were the lessons.'],
  cards: [
    { head: ['Walk in every', 'user\u2019s shoes.'],
      body: ['The admin needed clean, sorted data. Clients needed a real',
             'experience, not a 600-slide PowerPoint. Field agents, many less',
             'comfortable with tech, needed something simple and',
             'straightforward. Same database, three different designs.'] },
    { head: ['Design for the business', 'it\u2019s becoming.'],
      body: ['Replacing the PowerPoint solved today\u2019s problem. Building the data',
             'infrastructure opened up tomorrow\u2019s: patterns in what clients want,',
             'which boards perform, and where the business should grow next.'] },
    { head: ['A business that looks', 'good sells better.'],
      body: ['A PowerPoint said nothing about who Times Media was. A modern',
             'client experience made the company look as credible as it actually',
             'is, and gave sales something worth pitching.'] },
  ],
}

// ---- the questions this one gets ------------------------------------------
// His text off the foot of the frame, split into question and answer. Nothing
// reworded.
export const faq = {
  eyebrow: 'FAQ',
  head: ['Questions I get', 'about this one.'],
  items: [
    { q: 'It\u2019s your dad\u2019s company. Wasn\u2019t the feedback biased?',
      a: ['Fair question. But the numbers aren\u2019t biased. Fines went from 3-4 a',
          'month to zero, and that\u2019s on paper, not opinion. And being family made',
          'it harder, not easier. If it didn\u2019t work, I\u2019d hear about it at dinner.'] },
    { q: 'Did you design and build it alone?',
      a: ['Yes. Research, design, and the build. I used AI-assisted development',
          'to go from Figma to a working system fast enough to test with the',
          'team.'] },
    { q: 'What\u2019s it built on?',
      a: ['Next.js and React, Supabase for the database and auth, Google Maps',
          'for the board map, Claude for AI triage, and WhatsApp for alerts.'] },
    { q: 'How did you use AI?',
      a: ['Two ways. In the product, AI helps triage field reports and find',
          'patterns in client data. In my process, it helped me build fast enough',
          'to put real flows in front of real users instead of guessing.'] },
    { q: 'Is it still being used?',
      a: ['Every day.'] },
  ],
}

export const other = ['Check out my', 'other work.']

export const end = { next: 'View next project', contact: 'Contact' }
