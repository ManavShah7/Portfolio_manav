import { Video } from './Media'

// A device exactly as Manav's frames draw it: the mockup he used in Figma,
// cut from the export, with the screen rectangle measured off that image.
//
// Empty is the default, because every frame except Peak's is drawn with a
// blank screen. Passing a `clip` (or a `still`) fills it; passing nothing
// leaves the device as the frame has it, so a page reads as finished with no
// recording at all (rule 4).
//
// The MacBook keeps the wallpaper baked into its mockup, which is what the
// frames show - so an empty mac draws no screen layer over it.
// `ipad`, `phone` and `mac` are cut straight out of the exports, so they are
// the very mockups the frames are drawn with (the home page's own set has a
// different iPad - 1.70 against these 1.53 - which is why they are separate).
const DEV = {
  // Measured off the mockups themselves, from the columns that miss BOTH the
  // notch and the rounded corners - the two things that fooled every earlier
  // attempt. On the phone the notch occupies enough of the middle columns to
  // win a naive vote at 7.00%, but the screen really starts at 3.25% and the
  // notch simply sits over it, so a shot fitted to 7.00% sat low and short.
  ipad:     { img: 'frame-ipad',     r: 1800 / 1173, screen: [5.50, 6.48, 90.11, 87.55] },
  phone:    { img: 'frame-phone',    r: 491 / 986,   screen: [6.92, 3.25, 86.76, 93.51] },
  mac:      { img: 'frame-mac',      r: 1542 / 940,  screen: [10.4, 3.6, 79.4, 84.2] },
  'ipad-p': { img: 'ipad-portrait',  r: 776 / 1128,  screen: [7.35, 4.34, 83.76, 90.34] },
  'ipad-h': { img: 'ipad-landscape', r: 1866 / 1098, screen: [5.31, 7.38, 90.41, 87.52] },
  'mac-h':  { img: 'macbook',        r: 1656 / 1022, screen: [9.66, 3.33, 80.68, 84.74] },
}

export const ratio = kind => DEV[kind].r

// The aspect of the screen rectangle itself, which is what a full-page
// screenshot has to be measured against - not the aspect of the whole mockup.
const screenRatio = d => (d.r * d.screen[2]) / d.screen[3]

// `shot` is a whole page captured in one image: { src, r } where r is its own
// width/height. Anything taller than the screen scrolls inside it rather than
// being squashed or cropped, and --fr-roll is how far it has to travel to
// bring its last row to the bottom of the screen, as a percentage of its own
// height: 1 - (shot aspect / screen aspect). Derived, not eyeballed, so a
// re-export at any length still lands exactly on its own end.
export default function Frame({ kind, w, clip, still, shot, alt = '',
                                className = '', style, ...rest }) {
  const d = DEV[kind]
  // The mockup's inner edge is antialiased, so a rectangle that stops at the
  // last fully-white pixel leaves a pale hairline all the way round. Grow the
  // box by a little under 1% of its own size on every side; the corner radii
  // are percentages of the box, so they grow with it.
  const OVER = 0.009
  const [ml, mt, mw, mh] = d.screen
  const l = ml - mw * OVER, t = mt - mh * OVER
  const sw = mw * (1 + 2 * OVER), sh = mh * (1 + 2 * OVER)
  const poster = still || clip?.poster || (clip && !clip.video ? clip.src : undefined)
  // under 2% is not a scroll, it is a rounding difference - rolling it would
  // only add a will-change and an animation for no visible travel
  const raw = shot ? 1 - shot.r / screenRatio(d) : 0
  const roll = raw > 0.02 ? raw : 0
  const filled = Boolean(poster || clip?.video || shot)
  return (
    <div className={`fr fr-${kind} ${className}`}
         style={{ aspectRatio: d.r,
                  ...(w ? { width: `min(calc(${w} * var(--u)), 100%)` } : null), ...style }} {...rest}>
      {filled && (
        <span className={`fr-screen${roll ? ' fr-rolls' : ''}`}
              role={alt ? 'img' : undefined} aria-label={alt || undefined}
              style={{ left: `${l}%`, top: `${t}%`, width: `${sw}%`, height: `${sh}%`,
                       ...(roll ? { '--fr-roll': `${(roll * 100).toFixed(2)}%` } : null),
                       backgroundImage: !shot && poster ? `url(${poster})` : undefined }}>
          {shot
            /* eslint-disable-next-line @next/next/no-img-element */
            ? <img className="fr-shot" src={shot.src} alt="" loading="lazy" />
            : clip?.video && <Video src={clip.src} poster={clip.poster} />}
        </span>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/media/devices/${d.img}.webp`} alt="" loading="lazy" />
    </div>
  )
}
