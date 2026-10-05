// A hole in the page that only Manav can fill.
//
// His build spec: "anything marked [FILL] or [ASSET] needs real content from
// Manav. Render a visible placeholder block so it is easy to spot; do not
// invent copy or data for these." So this is deliberately unmissable rather
// than tasteful - it is a to-do, not a design.
//
// `aria-hidden` because it says nothing to anyone reading the page with a
// screen reader, and `data-fill` so `node scripts/check.mjs` could be taught
// to count them later.
export default function Fill({ what, h }) {
  return (
    <div className="fill" data-fill aria-hidden="true"
         style={h ? { minHeight: `calc(${h} * var(--u))` } : undefined}>
      <span className="fill-tag">{what}</span>
    </div>
  )
}
