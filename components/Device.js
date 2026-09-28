import { Video } from './Media'

// A device cut from Manav's frame with its screen made transparent, and the
// project playing BEHIND it - so the bezel's own rounded corners mask the
// recording, and nothing has to be composited to the pixel.
//
// `screen` is the transparent rectangle as [left, top, width, height] in % of
// the image, measured when the frame was cut (see public/media/times/).
// `empty` paints the screen a flat colour instead, as a frame draws an unfilled device.
export default function Device({ img, screen: [l, t, w, h], clip, still, empty, alt = '',
                                 className = '', style, ...rest }) {
  const poster = still || clip?.poster || (clip && !clip.video ? clip.src : undefined)
  return (
    <div className={`dev ${className}`} style={style} {...rest}>
      <div className="dev-screen" role={alt ? 'img' : undefined} aria-label={alt || undefined}
           style={{ left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%`,
                    backgroundColor: empty, backgroundImage: !empty && poster ? `url(${poster})` : undefined }}>
        {!empty && !still && clip?.video && <Video src={clip.src} poster={clip.poster} />}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="dev-frame" src={img} alt="" />
    </div>
  )
}
