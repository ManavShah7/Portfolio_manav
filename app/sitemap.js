import { WORK } from '@/lib/work'

// Static export, so this is written once at build time. Nothing on the site is
// paginated or generated, so every URL is known here.
export default function sitemap() {
  const now = new Date()
  const page = (path, priority) => ({ url: `https://manavshah.me${path}`, lastModified: now,
                                      changeFrequency: 'monthly', priority })
  return [
    page('', 1),
    page('/about', 0.8),
    ...WORK.map(w => page(`/work/${w.slug}`, 0.7)),
  ]
}
