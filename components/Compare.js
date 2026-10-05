// Peak's competitive matrix.
//
// The export drew this as a feature-comparison table with a highlighted last
// column - the shape every generic landing page ships, and Manav's note was
// that it read as machine-made. Same information, re-set in the page's own
// language:
//
//   - the row label is the loud thing (p28, near-white); the marks are quiet.
//     A matrix reads down the labels, so that is what carries the type.
//   - ONE encoding for one scale. The export mixed a filled dot, an em dash
//     and the word "Partial", which is three vocabularies for three states;
//     here they are a filled dot, a ring and a dash, named once underneath.
//   - no vertical rules and no boxed cells. Horizontal hairlines only, at the
//     same weight the FAQ uses, so the table belongs to the page.
//   - Peak's column is washed in its own ink rather than given the lighter
//     panel a pricing table would use.
//
// A real <table> with scoped headers, so it is announced as a table rather
// than as a grid of loose words - the one thing the Figma frame cannot carry.
// Each cell also states its value in text for a screen reader, because a dot
// is not a word.
const WORD = { y: 'Has it', p: 'Partly', n: 'Does not' }

const Mark = ({ state }) => (
  <>
    <span className={`pk-cmp-mark is-${state}`} aria-hidden="true" />
    <span className="vh">{WORD[state]}</span>
  </>
)

export default function Compare({ cols, rows, keys }) {
  return (
    <div className="pk-card black pk-cmp" data-reveal>
      <table className="pk-cmp-t">
        <thead>
          <tr>
            <th scope="col"><span className="vh">Capability</span></th>
            {cols.map(c => (
              <th key={c.name} scope="col" className={c.us ? 'is-us' : undefined}>
                <span className="p24 pk-cmp-col">{c.name}</span>
                {c.eg && <span className="p20 pk-cmp-eg">{c.eg}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.label} style={{ '--r': i }}>
              <th scope="row" className="p28 pk-cmp-row">{r.label}</th>
              {r.cells.map((state, j) => (
                <td key={j} className={cols[j].us ? 'is-us' : undefined}>
                  {/* On a phone the table becomes a block per capability and
                      the column headings go away, so every cell carries its
                      own column name. Real text, hidden on wide screens
                      rather than generated with ::before - a cell has to read
                      as "Nutrition, has it" to a screen reader either way. */}
                  <span className="p20 pk-cmp-cn">{cols[j].name}</span>
                  <Mark state={state} />
                  {cols[j].us && r.note && <span className="p20 pk-cmp-note">{r.note}</span>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="pk-cmp-key" aria-hidden="true">
        {keys.map(([state, word]) => (
          <span key={state}>
            <span className={`pk-cmp-mark is-${state}`} />
            <span className="p20">{word}</span>
          </span>
        ))}
      </p>
    </div>
  )
}
