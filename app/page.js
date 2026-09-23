import { Fragment } from 'react'

import Frame from '@/components/Frame'
import MotionDriver from '@/components/MotionDriver'
import { T, Rect, Img, Btn, Band, MediaBand, IPad } from '@/components/Nodes'
import { slots } from '@/lib/clips'
import { HOME as G, META_GAP } from '@/lib/grid'
import { about as A } from '@/lib/home-copy'

const H = 5500

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

// The wide measure. The iPad is wider than the About block's 856, so it and the
// resume button both run to 1538.5 - which gives the button a right edge to sit
// on rather than floating in the space beside the cards.
const WIDE_R = G.L + PAD_W

// --- vertical anchors -----------------------------------------------------
// Re-cut after Manav asked for the padding and sizes here to be fixed. The big
// card was 480 tall with about 150 of nothing under the copy; it is 410 now
// with four lines rather than five. The three small cards lost the note that
// nobody was going to read at 17px and came down from 268 to 212.
const HEAD_Y  = 2423.5
const BIG_Y   = 2561
const BIG_H   = 410
const BIG_PAD = 68

const ROW_Y   = BIG_Y + BIG_H + 24
const ROW_H   = 212
const ROW_PAD = 32

const BTN_W = 268
const BTN_H = 64
const BTN_Y = ROW_Y + (ROW_H - BTN_H) / 2

const MOTTO_Y = ROW_Y + ROW_H + 176
const WHY_Y   = MOTTO_Y + (A.motto.length - 1) * 60 + 108
const PAD_Y   = WHY_Y + (A.why.length - 1) * 36 + 118

const LEAD_Y = PAD_Y + PAD_H + 190
const EDU_Y  = LEAD_Y + (A.lead.length - 1) * 36 + META_GAP
const EDU_1  = EDU_Y + 60
const EDU_2  = EDU_1 + 156

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

      <Rect x={G.L} y={BIG_Y} w={G.W} h={BIG_H} r={CARD_R} fill="#F5F5F7"
            rv="card" block="ab" at={160} />
      <T x={G.L + BIG_PAD} y={BIG_Y + 68} s="coBig" lines={A.headline.company}
         rv="card" block="ab" at={160} />
      <T x={G.L + BIG_PAD} y={BIG_Y + 128} s="coRole" lines={A.headline.role}
         rv="card" block="ab" at={160} />
      <T x={G.L + BIG_PAD} y={BIG_Y + 164} s="coMeta" lines={A.headline.meta}
         rv="card" block="ab" at={160} />
      <T x={G.L + BIG_PAD} y={BIG_Y + 220} s="coBody" lines={A.headline.body}
         rv="card" block="ab" at={160} />

      {A.roles.map((r, i) => (
        <Fragment key={r.company}>
          <Rect x={G.col(i, 3)} y={ROW_Y} w={G.colW(3)} h={ROW_H} r={CARD_R} fill="#F5F5F7"
                rv="card" block="abr" at={i * 110} />
          <T x={G.col(i, 3) + ROW_PAD} y={ROW_Y + 32} s="coSmall" color={r.colour}
             lines={r.company} rv="card" block="abr" at={i * 110} />
          <T x={G.col(i, 3) + ROW_PAD} y={ROW_Y + 82} s="coRoleSm" lines={r.role}
             rv="card" block="abr" at={i * 110} />
          <T x={G.col(i, 3) + ROW_PAD} y={ROW_Y + 146} s="coMetaSm" lines={r.meta}
             rv="card" block="abr" at={i * 110} />
        </Fragment>
      ))}

      {/* beside the cards, on the wide measure's right edge */}
      <Btn x={WIDE_R - BTN_W} y={BTN_Y} w={BTN_W} h={BTN_H}
           href={A.resumeFile} download label={A.resume}
           rv="card" block="abr" at={330} />

      {/* His motto, as the frame draws it, then the part he described when he
          asked for this - the one about nature. One line at a time, each
          swinging up out of its own clip box, and the whole block drifting with
          the scroll on top of that. */}
      {A.motto.map((l, i) => (
        <T key={i} x={PAD_C} y={MOTTO_Y + i * 60} w={1200} align="center"
           s="aboutQuote" lines={l} className="gradPink ctr"
           rv="lines" block="abq" at={i * 120} sv="drift" />
      ))}
      <T x={PAD_C} y={WHY_Y} w={1150} align="center" s="aboutWhy" lines={A.why}
         rv="rise" block="abq" at={560} />

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

    </Frame>
  )
}
