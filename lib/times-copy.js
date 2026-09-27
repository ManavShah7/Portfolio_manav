// Times Media, rewritten to Manav's new frame. Line breaks are authored - the
// frame draws them and the browser must not re-wrap (rule 2).

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

export const other = ['Check out my', 'other work.']

export const end = { next: 'View next project', contact: 'Contact' }
