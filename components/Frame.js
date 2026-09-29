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
  ipad:     { img: 'frame-ipad',     r: 2344 / 1528, screen: [5.5, 6.5, 90.2, 86.6] },
  phone:    { img: 'frame-phone',    r: 491 / 986,   screen: [6.1, 2.8, 88.6, 94.1] },
  mac:      { img: 'frame-mac',      r: 1542 / 940,  screen: [10.4, 3.6, 79.4, 84.2] },
  'ipad-p': { img: 'ipad-portrait',  r: 776 / 1128,  screen: [7.35, 4.34, 83.76, 90.34] },
  'ipad-h': { img: 'ipad-landscape', r: 1866 / 1098, screen: [5.31, 7.38, 90.41, 87.52] },
  'mac-h':  { img: 'macbook',        r: 1656 / 1022, screen: [9.66, 3.33, 80.68, 84.74] },
}

export const ratio = kind => DEV[kind].r

export default function Frame({ kind, w, clip, still, alt = '', className = '', style, ...rest }) {
  const d = DEV[kind]
  const [l, t, sw, sh] = d.screen
  const poster = still || clip?.poster || (clip && !clip.video ? clip.src : undefined)
  const filled = Boolean(poster || clip?.video)
  return (
    <div className={`fr fr-${kind} ${className}`}
         style={{ aspectRatio: d.r,
                  ...(w ? { width: `min(calc(${w} * var(--u)), 100%)` } : null), ...style }} {...rest}>
      {filled && (
        <span className="fr-screen"
              role={alt ? 'img' : undefined} aria-label={alt || undefined}
              style={{ left: `${l}%`, top: `${t}%`, width: `${sw}%`, height: `${sh}%`,
                       backgroundImage: poster ? `url(${poster})` : undefined }}>
          {clip?.video && <Video src={clip.src} poster={clip.poster} />}
        </span>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/media/devices/${d.img}.webp`} alt="" loading="lazy" />
    </div>
  )
}
