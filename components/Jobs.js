'use client'
import { useState } from 'react'

import { Lines } from './Chrome'

// Where he has worked. One card is the big one and carries its role and dates;
// the other three sit in a row under it and swap into the big slot when you
// pick one.
//
// The three small cards are keyed by POSITION, not by job, so the DOM nodes
// never move - only what they carry changes. That matters because every card
// is a `data-reveal` block: the entrance driver writes opacity and transform
// on these nodes directly (components/Reveal.js), and a node that React tore
// down and rebuilt somewhere else would come back hidden with nothing left to
// bring it in.
export default function Jobs({ jobs }) {
  const [at, setAt] = useState(0)
  const big = jobs[at]
  const rest = jobs.map((j, i) => ({ ...j, i })).filter(j => j.i !== at)

  return (
    <div className="ab-jobs" data-stagger>
      <div className="ab-job ab-job-now" data-reveal
           style={{ backgroundImage: `url(${big.img})` }}>
        <p className="p40 ab-job-name"><Lines lines={big.name} /></p>
        {(big.role || big.when) && (
          <p className="p24 ab-job-meta">
            {big.role && <span>{big.role}</span>}
            {big.when && <span>{big.when}</span>}
          </p>
        )}
      </div>
      <div className="ab-job-row" data-reveal>
        {rest.map((j, pos) => (
          <button key={pos} type="button" className="ab-job ab-job-pick"
                  style={{ backgroundImage: `url(${j.img})` }}
                  onClick={() => setAt(j.i)}>
            <span className="p32 ab-job-name"><Lines lines={j.name} /></span>
          </button>
        ))}
      </div>
    </div>
  )
}
