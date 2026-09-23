import Frame from '@/components/Frame'
import { T, Img, Band, MediaBand } from '@/components/Nodes'
import { slots } from '@/lib/clips'

const H = 2701

// drop a clip or a still at public/media/home-<slot>.* - see lib/clips.js
const V = slots('home')

export default function Home() {
  return (
    <Frame height={H}>
      <Band y={0}    h={1157} fill="#F5F5F7" />
      <MediaBand y={1157} h={744} clip={V('kanye')}
                 fill="url(/figma/home-gradient.webp) center/1900px 744px no-repeat" />
      <Band y={1901} h={800}  fill="#D9D9D9" />

      <T x={238} y={343} s="heroEyebrow" lines="Product Designer" />
      <T x={238} y={385} s="heroName" lines="Manav Shah" className="gradText" />

      {/* The Figma defines no destinations for these three, so they are drawn
          as the frame draws them. Wire them up once those frames exist. */}
      <T x={1487} y={343} s="nav" lines="About" />
      <T x={1475} y={400} s="nav" lines="Contact" />
      <T x={1436} y={458} s="nav" lines="Reflections" />

      {/* the device strip is the navigation: phone -> Peak, small laptop ->
          Times Media, large laptop -> Lighthouse. The iPad has no case study
          behind it yet, so it stays as artwork. */}
      <Img x={233} y={582} w={159} h={320.5} src="/figma/dev-iphone.png"
           alt="Peak - iPhone app" className="device"
           href="/work/peak" label="Peak case study" />
      <Img x={411} y={654} w={413} h={249} src="/figma/dev-macbook-sm.png"
           alt="Times Media - web platform" className="device"
           href="/work/times-media" label="Times Media case study" />
      <Img x={840} y={672} w={352.5} h={228.5} src="/figma/dev-ipad.png" alt="iPad" />
      <Img x={1205} y={630.5} w={433} h={272.5} src="/figma/dev-macbook-lg.png"
           alt="Lighthouse AI - web app and Chrome extension" className="device"
           href="/work/lighthouse" label="Lighthouse AI case study" />

      <T x={464} y={1493.5} s="quote" lines={'“The world can be saved through design”'} />
      <T x={793.5} y={1550.5}   s="quoteAttrib" lines="Kanye West" />
    </Frame>
  )
}
