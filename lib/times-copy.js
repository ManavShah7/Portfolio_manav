// Times Media, rewritten to Manav's new frame. Line breaks are authored - the
// frame draws them and the browser must not re-wrap (rule 2).

export const intro = [
  ['My dad runs an OOH advertising', 'company - Times Media. 600+ boards', 'across Gujarat, India.'],
  ['All of them lives in one PowerPoint.', 'One guy maintaining it, everyday.'],
  ['Data all over the place. Lease lapses,', 'nobody notices - a big fine shows up.'],
  ['Clients are sent “updated pdf”.', 'No time, no data to chase new business.'],
]

export const research = {
  eyebrow: 'User Research',
  headline: ["A website wasn't the fix.", 'Talked to everyone, from the owners to',
             'the guys on the ground.'],
  quote: ['"Managing 660+ boards on a', 'PowerPoint is tedious enough. Add',
          'in fines from things slipping', "through, and it's a system that's",
          'actively costing us."'],
}

export const problem = {
  headline: ['Same PowerPoint.', 'Four different ways it was', 'breaking things.'],
  // each is a bold opener that runs on into grey
  items: [
    { lead: ['600+ boards, 600+ slides. Every', 'rental, every repair, every lease', 'change - '],
      lines: ["someone's updating it by", 'hand, every single day. Hours gone',
              "just keeping the deck alive, and it's", 'still a mess.'] },
    { lead: ['No fixed process for tracking due', 'dates and maintenance. '],
      lines: ['A lease', 'lapses, nobody notices until fines and',
              'lost revenue showing up after the', 'accounting.'] },
    { lead: ["Client's first impression of the", 'business - 600+ slides to scroll', 'through. '],
      lines: ['No credibility, no experience', 'just a PowerPoint.'] },
    { lead: ['The system has to be simple, '],
      lines: ['especially for on-field agents, who', 'needed zero learning curve.'] },
  ],
}

export const solution = {
  headline: ['No more slides. No more friction.', 'One system, three platforms.'],
  admin: { lead: ['Everything an admin needs to run', '660+ boards, '],
           lines: ['in one login- not', 'spread across a slide deck, a phone,',
                   'and someone’s memory.'] },
  // bold lands mid-line here, so these are styled segments
  data: [
    ['Every single data point is'],
    ['invaluable here. ', { t: 'The system uses', w: 600, c: '#FFFFFF' }],
    [{ t: 'every data to map out new', w: 600, c: '#FFFFFF' }],
    [{ t: 'patterns', w: 600, c: '#FFFFFF' }, ' and possible business'],
    ['opportunities.'],
  ],
  fieldHead: ['Scan it. Click a photo.', 'Type it. Say it. Reported.'],
  siteHead: ['A modern website that sells.', 'No more scrolling through slides.'],
  site: ['A modern landing page with a', 'live map, credibility elements',
         'built in, and CTAs that push', 'clients straight to booking.'],
}

export const impact = ['100% decrease in fines.', 'Hours saved. Money saved.',
                       'Unlocking new opportunities.']

export const end = { next: 'View next project', contact: 'Contact' }
