// Liveasy, transcribed from ~/Desktop/Final Design/liveasy.png (3800 wide, so
// 2x of a 1900 frame; 11051 design px tall). Line breaks are the frame's own
// and must not be re-wrapped on a laptop.

export const intro = [
  ['During my first internship at Nexus Info,', 'I was given a task to redesign Liveasy.'],
  ['Liveasy - a logistics company, had a landing', 'page that was dated and didn’t make the impact.'],
  ['No proper information hierarchy.', 'No credibility. Everything, everywhere.'],
  ['Sat with it, found real problems and', 'redesigned it on my design pillars.'],
]

export const problem = {
  headline: ['Understanding why the redesign', 'was necessary.'],
  // four points running past the laptop, across the white/black seam
  items: [
    ['Information scattered with no real', 'hierarchy.  Just walls of texts.'],
    ['No logos, no proof, no credibility', 'elements that earns the trust of', 'clients.'],
    ['No proper placement of CTAs. They', 'are randomly placed.'],
    ['Outdated UI. The interface looked like', 'it had been abandoned, not', 'maintained.'],
  ],
}

export const research = {
  headline: ['I researched and learned what', 'makes a website good.'],
  cards: [
    ['Clarity before', 'aesthetics.'],
    ['Proof before', 'pitch.'],
    ['Don’t let your', 'users wander.'],
    ['Good design is', 'good business'],
  ],
}

// The orange band: the film holds while this shrinks down into it.
export const band = ['Redesigning Liveasy, not just for', 'a better look but for a better', 'business.']

// Each row is a device and its line. Everything is read off the frame:
// `dx` is the device's left edge, `cgap` the space to the copy, `cy` how far
// the copy sits below the top of the device, `mt` the gap above the row.
// `copyFirst` is the middle row, which has the copy on the left.
export const solution = [
  { dev: 'mac',  w: 760, dx: 190, cgap: 169, cw: 545, cy: 72,  mt: 400,
    lines: ['Setting the first', 'impression with modern', 'and clean visual appeal', 'with direct CTAs'] },
  { dev: 'ipad', w: 751, dx: 272, cgap: 152, cw: 530, cy: 119, mt: 389, copyFirst: true,
    lines: ['Proof before features.', 'Proper credibility', 'elements placed to earn', 'trust.'] },
  { dev: 'mac',  w: 760, dx: 190, cgap: 169, cw: 545, cy: 72,  mt: 381,
    lines: ['Instead of overwhelming', 'users, features were', 'organized to highlight', 'practical outcomes.'] },
]
