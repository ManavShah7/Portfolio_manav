'use client'
import { useScale } from './Frame'

// A piece of media that holds still while the copy beside it scrolls past.
//
// Same reason as PinnedHero: the canvas is transform: scale()d, and sticky
// resolves its offsets in unscaled coordinates inside it (rules 6/22). So this
// renders through <Frame overlay>, outside the transform, and converts design
// coordinates to screen px itself.
//
// z-index 2 puts it in FRONT of the bands - unlike the hero, which sits behind
// them so the copy can scroll over it. Nothing overlaps it horizontally, so in
// front is what you want here.
export default function Pinned({ top, pin, x, y, w, h, children }) {
  const { scale, offsetX } = useScale()
  return (
    // `pin` is how far the media should HOLD, so the wrapper has to be that
    // plus one viewport - a sticky element releases when the wrapper's bottom
    // reaches it, not when the wrapper's height runs out.
    <div className="pinHold"
         style={{ top: top * scale, height: `calc(${pin * scale}px + 100vh)` }}>
      <div className="pinHoldStage">
        <div style={{ position: 'absolute', left: offsetX + x * scale,
                      top: y === undefined ? '50%' : y * scale,
                      width: w * scale, height: h * scale,
                      transform: y === undefined ? 'translateY(-50%)' : 'none' }}>
          {children}
        </div>
      </div>
    </div>
  )
}
