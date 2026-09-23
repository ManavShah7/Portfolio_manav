// Times Media case study. Every line break here is drawn by hand in the Figma
// - see the note in peak-copy.js. Do not join these into strings.
export const rail = ['Overview', 'Problem', 'Research', 'Solution', 'Impact', "What's Next?"]

export const overview = {
  headline: ['600+ Billboards. One PowerPoint.',
             'One guy updating it everyday everyday. Had to fix.'],
  p1: [
    'So, my dad runs DV Outdoor Advertising- 600+ billboards, hoardings, unipoles and LED screens',
    'across Gujarat, mostly concentrated in Saurashtra. And the entire business runs on a PowerPoint.',
    'One deck, one slide per board, and one guy whose full-time job is keeping it current, a board gets',
    'rented, someone updates a slide. A lease ends, someone updates a slide. Something breaks,',
    `someone updates a slide. When a client asks what's available, someone manually cuts them a slice of`,
    'that deck and emails it over.',
  ],
  p2: [
    `There's no live source of truth. No history. You can't ask "how many boards has Audi rented from us`,
    `over the years" without someone digging through old files by hand. And nobody knows a permit or`,
    `lease is about to lapse until it already has. I sat with that for a while and realized this isn't a "make it`,
    `prettier" problem- it's a "there is no system here at all" problem. So I'm building one: one database,`,
    'three different doors into it depending on who you are - a client, an admin, or a guy standing in front',
    'of a billboard with a phone.',
  ],
  meta: [
    { label: 'Role', values: ['Product Designer &', 'Product Developer'] },
    { label: 'Current Status', values: ['Currently being used', 'by the company'] },
    { label: 'Skills', values: ['Product Designing', 'AI-Assisted Developing', 'Branding', 'Marketing'] },
  ],
}

export const research = {
  headline: [`A website wasn't the fix.`, 'Talked to everyone, from the owners to',
             'the guys on the ground.'],
  body: [`A simple website with a simple database wasn't the fix needed. I sat down with my dad and his partners`,
         'at all levels to find out what was exactly the problems they were facing at their respective positions.'],
  quotes: [
    { lines: [`"Managing 660+ boards`, 'on a PowerPoint is', `beyond tedious, data's`,
              'inconsistent because so', 'many hands touch it, and', `we've eaten fines more`,
              'than once for something', 'slipping through with no', 'one catching it in time.'],
      name: 'Dipesh Shah', role: 'Owner of Times Media' },
    { lines: [`"Walking a client through a`, `PowerPoint doesn't say much`, 'about who we are. Finding new',
              'business is already hard', `enough, everything's manual,`, `nothing's data-backed so I`,
              'build strategies with- just a', 'PowerPoint and whatever I', `remember."`],
      name: 'Ritesh Jain', role: 'Sales Manager at Times Media' },
    { lines: [`"I've shown up to put a print on a`, 'board and found someone', `else's print already there \u2014 their`,
              'lease had ended and nobody', 'told me. And with this many', 'boards, keeping track of which',
              'ones actually need maintenance', `versus which ones I'm just`, `guessing about is a mess."`],
      name: 'Kishan Kalavadiya', role: 'On - field agent at Times Media' },
  ],
}

export const problem = {
  headline: ['Same PowerPoint.', 'Four different ways it was breaking things.'],
  cardHead: ['Tedious to maintain 600+ boards.', 'Update the slide. Repeat forever.'],
  cardBody: ['600+ boards, one PPT, one slider per board. Every rental, every',
             'lease change, every repair requires a manual edit, every day.'],
}

export const solution = {
  headline: ['One system. Three doors.', 'Everyone gets the one they actually need.'],
  admin: {
    head: 'Run the business, not the deck.',
    body: ['Everything an admin needs to run 660+ boards, in one',
           'login- not spread across a slide deck, a phone, and',
           `someone's memory.`],
    caption: ['A live map of every board - every detail attached, from',
              'booking status to a full 3D view of the exact spot.',
              'Creating a new board is as simple as possible - drop a',
              'pin or type the coordinates.'],
  },
  client: {
    head: 'Built to sell, not to show.',
    body: ['No more sending a bulky and unattractive PowerPoint.'],
    caption: [`A modern landing page with relevant and direct CTA's`,
              'and credibility elements. Consists of a live map - search',
              'by road, area, size, lighting types. View a board live with',
              'Street View and get a proper experience before sending',
              'a booking request.'],
  },
  field: {
    head: ['Scan it. Click a photo. Type it or', 'Say it. Report it. Done.'],
    body: ['Built for on field agents, with zero learning curve',
           'because that was the whole point.'],
    caption: ['Simple and straight forward process. Scan the QR code',
              'stuck on the board and land straight on its page. Take a',
              'photo, add a note or a voice note in whatever language',
              'you want, pick a color for severity and submit. Entire',
              'interaction, done in a minute.'],
  },
}

export const impact = {
  headline: ['100% decrease in fines.', 'Hours saved. Money Saved.',
             'New opportunities on the way.'],
  sub: ['The same people, months later talked about how this has brought a positive impact in their operations',
        'and business.'],
  quotes: [
    { colour: '#F04250', name: 'Dipesh Shah', role: 'Owner of Times Media',
      lines: ['“No more downloading', "100s of 'updated ppt' and", 'spending hours in going',
              'through it. The dashboard', 'is already accurate when I', 'open it. We have seen',
              '100% decrease in fines', 'since switching, at one', 'time we saw 3-4 fines a',
              'month. We are already', 'building new business', 'strategies based on the',
              'new patterns we are', 'seeing.”'] },
    { colour: '#00A51C', name: 'Ritesh Jain', role: 'Sales Manager at Times Media',
      lines: ['“Half my day used to', 'disappear in managing the', "decks just to answer a client’s",
              'question. Now I can do that in', "two clicks. I’ve probably gotten", 'back 2-3 hours a day, and I',
              'spend that saved time and', 'energy in creating new', 'opportunities.'] },
    { colour: '#0069AF', name: 'Kishan Kalavadiya', role: 'On - field agent at Times Media',
      lines: ['“This is very easy and', 'simple to use. I just have to', 'open camera, scan the QR',
              'code and report. I can leave', 'voice note in Gujarati to', 'describe the problem which',
              'is very helpful for me. Cut', 'my wasted trips by more', 'than half”.'] },
  ],
}
