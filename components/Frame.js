'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'

const W = 1900
const ScaleCtx = createContext({ scale: 1, offsetX: 0 })
export const useScale = () => useContext(ScaleCtx)

// Scales the 1900px design frame down to fit narrower viewports. Above 1900
// the frame is centred at 1:1, so a wide display gets the Figma pixel for pixel.
//
// `overlay` renders inside the scroller but OUTSIDE the scaled frame, and reads
// the scale from context so it can size itself in screen px. Anything that
// needs position: sticky has to live there - sticky resolves its offsets in
// unscaled layout coordinates, so inside the transform it pins in the wrong
// place and drifts.
export default function Frame({ height, overlay, children }) {
  const [box, setBox] = useState({ scale: 1, offsetX: 0 })
  const wrap = useRef(null)

  useEffect(() => {
    const fit = () => {
      const w = wrap.current?.clientWidth || W
      const scale = Math.min(1, w / W)
      setBox({ scale, offsetX: Math.max(0, (w - W * scale) / 2) })
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <ScaleCtx.Provider value={box}>
      <div ref={wrap} className="scaler" style={{ height: height * box.scale }}>
        <div className="frame"
             style={{ height, transform: `scale(${box.scale})`, left: box.offsetX }}>
          {children}
        </div>
        {overlay}
      </div>
    </ScaleCtx.Provider>
  )
}
