'use client'
import { useState } from 'react'

// A card with a second side. The front is in flow and sets the height; the
// back is laid over it and both faces hide their own back, so the pair turns
// as one object.
//
// The control is a real <button> carrying aria-expanded, not a click handler on
// the card: the whole card being a button would mean its quote could not be
// selected, and a screen reader would read the whole thing as one label. The
// face that is turned away is aria-hidden, so only one side is ever announced.
//
// With JS off the front shows and the button does nothing, which is the same
// contract the rest of the site keeps: no script, finished page.
export default function Flip({ front, back, label, className = '' }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`flip${open ? ' is-open' : ''} ${className}`}>
      <div className="flip-in">
        <div className="flip-face flip-front" aria-hidden={open}>{front}</div>
        <div className="flip-face flip-back" aria-hidden={!open}>{back}</div>
      </div>
      <button type="button" className="flip-btn" aria-expanded={open}
              onClick={() => setOpen(v => !v)}>
        <span className="vh">{open ? `Hide ${label}` : `Show ${label}`}</span>
      </button>
    </div>
  )
}
