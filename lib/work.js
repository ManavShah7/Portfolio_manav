// The four case studies, in the order the site presents them. Every line here
// is lifted from that case study's own copy file - nothing is written fresh.
//
// `kind` is the exception: it names the KIND of thing each one is, and it now
// says the domain too, because the home page prints it under each project's
// name. A recruiter deciding what to open first wants "iOS fitness app", not
// "iOS app". MANAV: these four strings are mine - say the word on any of them.
// `next` makes the "next project" cycle at the foot of each case study.
export const WORK = [
  { slug: 'peak', name: 'Peak', role: 'Founding Product Designer', kind: 'iOS fitness app',
    line: 'The only app that keeps up with you.',
    accent: '#E8842A', clip: 'peak-hero', dark: true },
  { slug: 'times-media', name: 'Times Media', role: 'Founding Product Designer', kind: 'Advertising platform, three portals',
    line: 'No more slides. No more friction. Just business.',
    // the frame's own break, for anywhere that sets it on two lines
    lines: ['No more slides. No more friction.', 'Just business.'],
    accent: '#F04250', clip: 'times-pink', still: '/media/times-aerial.webp', dark: true },
  { slug: 'lighthouse', name: 'Lighthouse AI', role: 'Product Design Intern', kind: 'AI web app and Chrome extension',
    line: 'Not another resource. But something making sure that you’re in the right path.',
    // pulled back to be rewritten. The page says so instead of 404ing, and
    // the URL stays out of the sitemap and out of search while that is true.
    accent: '#34C759', clip: 'lighthouse-green', dark: true, wip: true },
  { slug: 'liveasy', name: 'Liveasy', role: 'UI Design Intern', kind: 'Marketing site redesign',
    line: 'A page that earns the click before it asks for one.',
    accent: '#C2893A', clip: null, dark: true },
]

export const next = slug => {
  const i = WORK.findIndex(w => w.slug === slug)
  return WORK[(i + 1) % WORK.length]
}
