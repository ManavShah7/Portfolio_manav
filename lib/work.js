// The four case studies, in the order the site presents them. Every line here
// is lifted from that case study's own copy file - nothing is written fresh.
// `next` makes the "next project" cycle at the foot of each case study.
export const WORK = [
  { slug: 'peak', name: 'Peak', role: 'Founding Product Designer', kind: 'iOS app',
    line: 'The only app that keeps up with you.',
    accent: '#E8842A', clip: 'peak-hero', dark: true },
  { slug: 'times-media', name: 'Times Media', role: 'Founding Product Designer', kind: 'Web platform, three portals',
    line: 'No more slides. No more friction. Just business.',
    // the frame's own break, for anywhere that sets it on two lines
    lines: ['No more slides. No more friction.', 'Just business.'],
    accent: '#F04250', clip: 'times-pink', still: '/media/times-aerial.webp', dark: true },
  { slug: 'lighthouse', name: 'Lighthouse AI', role: 'Product Design Intern', kind: 'Web app and Chrome extension',
    line: 'Not another resource. But something making sure that you’re in the right path.',
    accent: '#34C759', clip: 'lighthouse-green', dark: true },
  { slug: 'liveasy', name: 'Liveasy', role: 'UI Design Intern', kind: 'Marketing site',
    line: 'A page that earns the click before it asks for one.',
    accent: '#C2893A', clip: null, dark: true },
]

export const next = slug => {
  const i = WORK.findIndex(w => w.slug === slug)
  return WORK[(i + 1) % WORK.length]
}
