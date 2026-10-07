// The question list every case study closes on. Native <details>, so there is
// no script behind it, it opens with a keyboard, and a printed or JS-off page
// shows the questions rather than nothing. The mark is a plus that becomes a
// minus by collapsing its vertical stroke - the same mark the flip cards use.
import { Lines, para } from './Chrome'
import Fill from './Fill'

export default function Faq({ eyebrow, head, items, id, x = 240, pt = 240, pb = 0, mw = 1180 }) {
  return (
    <section className="du-sec" id={id} style={{ '--pt': pt, '--pb': pb }}>
      <div className="du-x" style={{ '--x': x }}>
        <p className="p28 w500" data-reveal>{eyebrow}</p>
        <h2 className="p70" data-reveal><Lines lines={head} /></h2>
      </div>
      <div className="du-w faq" style={{ '--mw': mw, '--mt': 76 }} data-stagger>
        {items.map(it => (
          <details key={it.q} className="faq-item" data-reveal>
            <summary className="p30 faq-q">{it.q}</summary>
            {/* an answer Manav has not written yet is a hole, not a guess */}
            {it.a
              ? <p className="p26 w500 faq-a">{para(it.a)}</p>
              : <div className="faq-a"><Fill what="[FILL] answer" h={110} /></div>}
            {/* some answers are a lead, a few labelled ways and a line to
                close - the AI one on the home page is the first */}
            {it.list && (
              <ul className="faq-list">
                {it.list.map(l => (
                  <li key={l.label} className="p26 w500 faq-li">
                    <span className="faq-li-label">{l.label}</span> {para(l.lines)}
                  </li>
                ))}
              </ul>
            )}
            {it.tail && <p className="p26 w500 faq-a faq-tail">{para(it.tail)}</p>}
          </details>
        ))}
      </div>
    </section>
  )
}
