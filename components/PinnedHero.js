'use client'
import { useScale } from './Frame'

// The Apple TV hero, measured off apple.com/apple-tv and reproduced.
//
// Three facts from that page:
//   - the video is `position: sticky`, so it holds while the page moves;
//   - the copy has NO animation on it at all - it is in normal flow and simply
//     scrolls up over the pinned video at 1:1;
//   - the darkening is a flat black scrim on a LINEAR ramp against scroll,
//     opacity .1 -> 1, no easing.
//
// It has to live in <Frame overlay> because the canvas is transform: scale()d
// and sticky resolves its offsets in unscaled coordinates inside it (rule 6 /
// rule 22). Out here the pixels are real, which also means `scroll()` measures
// correctly - so the scrim is driven by a scroll-progress timeline rather than
// a listener, and never touches the main thread.
export default function PinnedHero({ h, pin, clip, poster }) {
  const { scale } = useScale()
  const stage = h * scale          // how tall the video sits on screen
  const run = pin * scale          // how far it stays pinned

  return (
    <div className="pinWrap" style={{ height: run, '--pin': `${run - stage}px` }}>
      <div className="pinStage"
           style={{ height: stage, background: `url(${poster}) center/cover no-repeat` }}>
        {clip
          ? <video className="pinVideo" src={clip} poster={poster}
                   autoPlay muted loop playsInline preload="auto" />
          : <div className="pinVideo" style={{ background: `url(${poster}) center/cover no-repeat` }} />}
        <div className="pinScrim" />
      </div>
    </div>
  )
}
