import { Fragment } from 'react'

import Frame from '@/components/Frame'
import MotionDriver from '@/components/MotionDriver'
import { T, Rect, Img, Band, MediaBand, IPad } from '@/components/Nodes'
import { slots } from '@/lib/clips'
import { HOME as G, META_GAP } from '@/lib/grid'
import { about as A } from '@/lib/home-copy'

const H = 5660

// drop a clip or a still at public/media/home-<slot>.* - see lib/clips.js
const V = slots('home')

// The About block is the one part of this page with a measure of its own:
// L 390, 856 across, on a 17px gutter, which is the only gutter that gives the
// three 274-wide cards the frame draws. The hero above it is still on the
// frame's own numbers (text at 238, devices at 193) - Manav has not asked for
// that to move and it is the one part of the page he did not redraw.
const CARD_R = 14        // measured off the frame; the case studies use 20

// The iPad is wider than the About measure, so it gets its own. The screen
// rectangle inside it was measured off the export.
const PAD_W = 1148.5
const PAD_H = 741.5
const PAD_C = G.L + PAD_W / 2
const SCREEN = { x: 58, y: 51.5, w: 1044.5, h: 651, r: 20 }

// --- vertical anchors -----------------------------------------------------
const HEAD_Y  = 2423.5
const BIG_Y   = 2561
const BIG_PAD = 68.5
const ROW_Y   = 3059
const ROW_PAD = 28
const QUOTE_Y = 3513.5
const PAD_Y   = 3883

const LEAD_Y = 4830
const EDU_Y  = LEAD_Y + (A.lead.length - 1) * 36 + META_GAP
const EDU_1  = EDU_Y + 60
const EDU_2  = EDU_1 + 156
const CV_Y   = EDU_2 + 194

export default function Home() {
  return (
    <Frame height={H}>
      <MotionDriver />

      {/* ---- bands. The frame opens on white now, not #F5F5F7, and the
              gradient band is 1015 tall rather than 744. ---- */}
      <Band y={0} h={1157} fill="#FFFFFF" />
      <MediaBand y={1157} h={1015} clip={V('kanye')}
                 fill="url(/figma/home-gradient-tall.webp) center/1900px 1015px no-repeat" />
      <Band y={2172} h={H - 2172} fill="#FFFFFF" />

      {/* ---- hero ---- */}
      <T x={238} y={343} s="heroEyebrow" lines="Product Designer" />
      <T x={238} y={385} s="heroName" lines="Manav Shah" className="gradText" />

      {/* The Figma defines no destinations for these three, so they are drawn
          as the frame draws them. Wire them up once those frames exist. */}
      <T x={1487} y={343} s="nav" lines="About" />
      <T x={1475} y={400} s="nav" lines="Contact" />
      <T x={1436} y={458} s="nav" lines="Reflections" />

      {/* the device strip is the navigation. The frame moves the phone left and
          swaps the big laptop for a second small one, so both laptops match. */}
      <Img x={193} y={583} w={159} h={320.5} src="/figma/dev-iphone.png"
           alt="Peak - iPhone app" className="device"
           href="/work/peak" label="Peak case study" />
      <Img x={411} y={654} w={413} h={249} src="/figma/dev-macbook-sm.png"
           alt="Times Media - web platform" className="device"
           href="/work/times-media" label="Times Media case study" />
      <Img x={840} y={672} w={352.5} h={228.5} src="/figma/dev-ipad.png" alt="" />
      <Img x={1209} y={652} w={413} h={249} src="/figma/dev-macbook-sm.png"
           alt="Lighthouse AI - web app and Chrome extension" className="device"
           href="/work/lighthouse" label="Lighthouse AI case study" />

      {/* ---- the quote band ---- */}
      <T x={488.5} y={1624.5} s="quote" lines={'“The world can be saved through design”'} />
      <T x={816} y={1680} s="quoteAttrib" lines="Kanye West" />

      {/* ---- about ---- */}
      <T x={G.L} y={HEAD_Y} s="aboutHead" lines={A.heading} className="gradPink"
         rv="lines" block="ab" />

      <Rect x={G.L} y={BIG_Y} w={G.W} h={480} r={CARD_R} fill="#F5F5F7"
            rv="card" block="ab" at={160} />
      <T x={G.L + BIG_PAD} y={BIG_Y + 94} s="coBig" lines={A.headline.company}
         rv="card" block="ab" at={160} />
      <T x={G.L + BIG_PAD} y={BIG_Y + 156} s="coRole" lines={A.headline.role}
         rv="card" block="ab" at={160} />
      <T x={G.L + BIG_PAD} y={BIG_Y + 192} s="coMeta" lines={A.headline.meta}
         rv="card" block="ab" at={160} />
      <T x={G.L + BIG_PAD} y={BIG_Y + 250} s="coBody" lines={A.headline.body}
         rv="card" block="ab" at={160} />

      {A.roles.map((r, i) => (
        <Fragment key={r.company}>
          <Rect x={G.col(i, 3)} y={ROW_Y} w={G.colW(3)} h={268} r={CARD_R} fill="#F5F5F7"
                rv="card" block="abr" at={i * 110} />
          <T x={G.col(i, 3) + ROW_PAD} y={ROW_Y + 34} s="coSmall" color={r.colour}
             lines={r.company} rv="card" block="abr" at={i * 110} />
          <T x={G.col(i, 3) + ROW_PAD} y={ROW_Y + 78} s="coRoleSm" lines={r.role}
             rv="card" block="abr" at={i * 110} />
          <T x={G.col(i, 3) + ROW_PAD} y={ROW_Y + 136} s="coMetaSm" lines={r.meta}
             rv="card" block="abr" at={i * 110} />
          <T x={G.col(i, 3) + ROW_PAD} y={ROW_Y + 190} s="coNote" lines={r.note}
             rv="card" block="abr" at={i * 110} />
        </Fragment>
      ))}

      {/* the principle. One line at a time, each swinging up out of its own clip
          box - the same reveal the case-study headlines use. */}
      {A.quote.map((l, i) => (
        <T key={i} x={PAD_C} y={QUOTE_Y + i * 60} w={1200} align="center"
           s="aboutQuote" lines={l} className="gradPink ctr"
           rv="lines" block="abq" at={i * 120} />
      ))}

      {/* ---- the work, inside the iPad ---- */}
      <IPad x={G.L} y={PAD_Y} w={PAD_W} h={PAD_H} screen={SCREEN}
            src="/figma/home-ipad-big.png" clip={V('collage')}
            alt="A collage of Manav's design work" />

      {/* ---- who, where, and the resume ---- */}
      <T x={G.L} y={LEAD_Y} s="aboutLead" lines={A.lead} rv="rise" block="abe" />

      <T x={G.L} y={EDU_Y} s="metaLabel" lines={A.eduLabel} rv="rise" block="abe" at={120} />
      {A.education.map((e, i) => (
        <Fragment key={e.school}>
          <T x={G.L} y={[EDU_1, EDU_2][i]} s="eduSchool" lines={e.school}
             rv="rise" block="abe" at={180 + i * 90} />
          <T x={G.L} y={[EDU_1, EDU_2][i] + 46} s="eduDegree" lines={e.degree}
             rv="rise" block="abe" at={180 + i * 90} />
          <T x={G.L} y={[EDU_1, EDU_2][i] + 86} s="eduMeta" lines={e.meta}
             rv="rise" block="abe" at={180 + i * 90} />
        </Fragment>
      ))}

      <T x={G.L} y={CV_Y} s="footLink" lines={A.resume} className="cv"
         as="a" href={A.resumeFile} download rv="lines" block="abe" at={380} />
    </Frame>
  )
}
