// Lighthouse AI, transcribed from ~/Desktop/Final Design/lighthouse.png
// (3800 wide, so 2x of a 1900 frame; 16061 design px tall). Line breaks are
// the frame's own and must not be re-wrapped on a laptop.
//
// NOTE for Manav: blocks 2-4 of `intro` are Times Media's copy - they are
// drawn that way in the Figma file. Reproduced as drawn; flagged, not fixed.

export const intro = [
  ['I joined Lighthouse AI as a Product', 'Design Intern during my undergrad.'],
  ['All of them lives in one PowerPoint.', 'One guy maintaining it, everyday.'],
  ['Data all over the place. Lease lapses,', 'nobody notices - a big fine shows up.'],
  ['Clients are sent “updated pdf”.', 'No time, no data to chase new business.'],
]

// on the laptop-at-night photo
export const access = ['Access to information has never', 'been this easy. We are one click',
                       'away from every information we', 'need.']

// on the gradient that runs down into the sea
export const lost = ['But, without direction,', 'it’s easy to get lost.']

export const research = {
  headline: ['There is no lack of information.', 'There is lack of direction.'],
  shot: ['Putting in hours.', 'Direction? Unclear.'],
  cards: [
    ['Same roadmaps', 'to everyone.'],
    ['Knowledge is all', 'over the place.'],
  ],
}

// on the green band
export const talked = ['I talked to people,', 'at different stages of their careers.']

export const solution = {
  headline: ['Not another resource.', 'But something that', 'makes sure you’re in the', 'right path.'],
  navi: {
    head: ['An onboarding that', 'understands you.'],
    caption: ['Navi opens a conversation instead of a form -a vague one, or',
              'a frustrated one the same way a person would.'],
  },
  rows: [
    { copyFirst: true, cx: 173, cw: 590, cy: 164, cgap: 0, dx: 735, dw: 922, mt: 656,
      lines: ['A plan that is', 'made for you', 'and grows with', 'you.'] },
    { copyFirst: false, dx: 161, dw: 884, cgap: 213, cw: 460, cy: 152, mt: 486,
      lines: ['Everything you', 'learn, gets saved', 'and sorted at', '*Knowledge Base*'] },
  ],
  guide: ['A guide that makes sure', 'you’re on the *right path.*'],
}
