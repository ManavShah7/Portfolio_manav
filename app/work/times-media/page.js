import { Fragment } from 'react'

import Frame from '@/components/Frame'
import Carousel from '@/components/Carousel'
import SectionRail from '@/components/SectionRail'
import MotionDriver from '@/components/MotionDriver'
import { T, Rect, Img, Shot, Cover, Band, Seam } from '@/components/Nodes'
import { slots } from '@/lib/clips'
import S from '@/lib/styles'
import { TIMES as G, PAD_LG, HEAD_GAP, PARA_GAP, CARD_GAP, META_GAP, META_VAL, FOOT_GAP, under }
  from '@/lib/grid'
import * as C from '@/lib/times-copy'

const H = 11737

// drop a clip at public/videos/times-<name>.mp4 - see lib/clips.js
const V = slots('times')

// 21 stops sampled down the band; horizontally uniform, so a vertical ramp
// reproduces it exactly.
const PINK = 'linear-gradient(180deg,#FF336E 0%,#FD3E74 5%,#FB487A 10%,#FA527F 15%,#F85D85 20%,#F7678B 25%,#F57291 30%,#F37D96 35%,#F2879C 40%,#F091A2 45%,#F19DAC 50%,#F4AAB7 55%,#F5B5C0 60%,#F6C0C9 65%,#F7C9D1 70%,#F9D3D9 75%,#FADBE0 80%,#FBE4E8 85%,#FCEDF0 90%,#FEF6F7 95%,#FFFFFF 100%)'

// The rail on this page has six stops, sits further right than Peak's, and is
// white on #111111.
const RAIL = {
  items: [
    { label: 'Overview',     x: 242.5, y: 1062.5, to: 839 },
    { label: 'Problem',      x: 242.5, y: 1116,   to: 3030 },
    { label: 'Research',     x: 242.5, y: 1169,   to: 1900 },
    { label: 'Solution',     x: 242.5, y: 1218.5, to: 4326 },
    { label: 'Impact',       x: 242.5, y: 1262,   to: 9280 },
    { label: "What's Next?", x: 242.5, y: 1306,   to: 10996 },
  ],
  natural: 1020, stick: 300, height: 300, end: H,
  // where the page behind the rail's own column is dark
  dark: [[839, 3030], [3030, 6070]],
  light: '#5A5A5A', darkInk: '#FFFFFF',
}

// Both quote rows now sit on the grid's three-up columns. The frames placed
// them by hand at steps of 403 and 449 in one row and 403 and 449 in the other,
// which is the most visible thing on this page. The longest line of the third
// research quote runs 19px past the nominal measure - it is text, not a card
// edge, so it is left long rather than re-broken into an eleventh line that
// would drop its attribution below the other two.
const COL      = i => G.col(i, 3)
const NAME_DX  = 25          // the dash sits clear of the name; both are placed
const NAME_SZ  = 28          // the frame sets the third of these at 30, by hand
const ATTR_GAP = 65.5        // last line of a quote -> its attribution
const ROLE_GAP = 35          // attribution -> the role under it

// y of the attribution under a quote of `n` lines set at `lh`
const attrY = (top, n, lh) => top + (n - 1) * lh + ATTR_GAP

// two 80px paddles and the 46 between them, ending on the content right edge
const PADDLE_X = G.R - 206

// --- vertical anchors, each derived from the block above it --------------
const OV_HEAD = 1026.5
const OV_P1   = under(OV_HEAD, S.tmHead, C.overview.headline.length)
const OV_P2   = under(OV_P1, S.tmBody, C.overview.p1.length, PARA_GAP)
const OV_META = under(OV_P2, S.tmBody, C.overview.p2.length, META_GAP)

const RS_HEAD  = 1960.5
const RS_BODY  = under(RS_HEAD, S.tmHead, C.research.headline.length)
const RS_QUOTE = 2318

const ADM_HEAD = 4997.5
const ADM_BODY = under(ADM_HEAD, S.tmHeadW, 1)
const CLI_HEAD = 6363.5
const CLI_BODY = under(CLI_HEAD, S.tmHeadD, 1)
const FLD_HEAD = 7681.5
const FLD_BODY = under(FLD_HEAD, S.tmHeadD, C.solution.field.head.length)

const IMP_HEAD  = 9349.5
const IMP_SUB   = under(IMP_HEAD, S.tmImpact, C.impact.headline.length)
const IMP_QUOTE = 9788.5

export default function TimesMedia() {
  return (
    <Frame height={H} overlay={<SectionRail config={RAIL} />}>
      <MotionDriver />

      {/* ---- bands ---- */}
      <Cover y={0} h={832} clip={V('hero')} poster="/figma/tm-mesh.webp" />
      <Band y={832}   h={7}    fill="#FFFFFF" />
      <Band y={839}   h={2191} fill="#111111" />
      <Band y={3030}  h={1296} fill="url(/figma/tm-mesh.webp) center/1900px 1296px no-repeat" />
      <Band y={4326}  h={1744} fill={PINK} />
      <Band y={6070}  h={4926} fill="#FFFFFF" />
      <Band y={10996} h={741}  fill="#F5F5F7" />
      {/* the mesh ends on #FF3F72 and the ramp opens on #FF336E - close, but a
          step you can see across 1900px */}
      <Seam y={4206} h={120} to={[255, 51, 110]} />

      {/* ---- overview ---- */}
      <T x={G.L} y={OV_HEAD} s="tmHead" lines={C.overview.headline} rv="lines" block="ov" />
      <T x={G.L} y={OV_P1} s="tmBody" lines={C.overview.p1} rv="rise" block="ov" at={240} />
      <T x={G.L} y={OV_P2} s="tmBody" lines={C.overview.p2} rv="rise" block="ov" at={330} />

      {C.overview.meta.map((m, i) => (
        <Fragment key={m.label}>
          <T x={COL(i)} y={OV_META} s="tmMetaLabel" lines={m.label}
             rv="rise" block="ov" at={420 + i * 50} />
          <T x={COL(i)} y={OV_META + META_VAL} s="tmMetaValue" lines={m.values}
             rv="rise" block="ov" at={420 + i * 50} />
        </Fragment>
      ))}

      {/* ---- research ---- */}
      {C.research.headline.map((l, i) => (
        <T key={i} x={G.C} y={RS_HEAD + i * S.tmHead.lh}
           w={1400} align="center" lines={l} s="tmHead"
           rv="lines" block="rs" at={i * 110} />
      ))}
      <T x={G.C} y={RS_BODY} w={1400} align="center" s="tmBody" lines={C.research.body}
         rv="rise" block="rs" at={300} />

      {C.research.quotes.map((q, i) => {
        const ny = attrY(RS_QUOTE, q.lines.length, S.tmQuote.lh)
        const attr = { size: NAME_SZ, weight: 600, lh: NAME_SZ * 1.2, color: '#CCCCCC' }
        return (
          <Fragment key={q.name}>
            <T x={COL(i)} y={RS_QUOTE} s="tmQuote" lines={q.lines}
               rv="rise" block="rq" at={i * 110} />
            <T x={COL(i)} y={ny} s={attr} lines="-" rv="rise" block="rq" at={i * 110 + 80} />
            <T x={COL(i) + NAME_DX} y={ny} s={attr} lines={q.name}
               rv="rise" block="rq" at={i * 110 + 80} />
            <T x={COL(i) + NAME_DX} y={ny + ROLE_GAP} s="tmQuoteRole"
               lines={q.role} rv="rise" block="rq" at={i * 110 + 120} />
          </Fragment>
        )
      })}

      {/* ---- problem (over the mesh) ---- */}
      <T x={G.L} y={3191.5} s="tmHeadW" lines={C.problem.headline} rv="lines" block="pb" />
      {/* the Figma draws paddles but no second card - unlike Peak there is no
          faint card queued behind this one, so the track does not overflow */}
      <Carousel x={G.L} y={3365} w={G.W} h={755} inner={G.W} step={G.W + G.GUT}
                paddleY={4169} paddleX={PADDLE_X}>
        <Rect x={0} y={0} w={G.W} h={755} fill="#FFFFFF" rv="card" block="pb" at={260} />
        <T x={PAD_LG} y={94} s="tmCardHead" lines={C.problem.cardHead}
           rv="card" block="pb" at={260} />
        <T x={PAD_LG} y={under(94, S.tmCardHead, C.problem.cardHead.length, CARD_GAP)}
           s="tmCardBody" lines={C.problem.cardBody} rv="card" block="pb" at={260} />
        <Shot x={(G.W - 456) / 2} y={357} w={456} h={275} src="/figma/tm-macbook.png"
              clip={V('problem')} alt="" rv="card" block="pb" at={260} />
      </Carousel>

      {/* ---- solution ---- */}
      <T x={G.C} y={4623.5} w={1500} align="center" s="tmBigHead"
         lines={C.solution.headline} rv="lines" block="sol" />

      <T x={G.L} y={ADM_HEAD} s="tmHeadW" lines={C.solution.admin.head} rv="lines" block="adm" />
      <T x={G.L} y={ADM_BODY} s="tmBodyW" lines={C.solution.admin.body}
         rv="rise" block="adm" at={300} />
      <Carousel x={G.L} y={5243} w={G.W} h={784} inner={G.W} step={G.W + G.GUT}
                paddleY={6072} paddleX={PADDLE_X}>
        <Rect x={0} y={0} w={G.W} h={784} fill="#FFFFFF" rv="card" block="adm" at={420} />
      </Carousel>
      <T x={G.L} y={6083} s="tmBodyD" lines={C.solution.admin.caption}
         rv="rise" block="adm2" />

      <T x={G.L} y={CLI_HEAD} s="tmHeadD" lines={C.solution.client.head}
         rv="lines" block="cli" />
      <T x={G.L} y={CLI_BODY} s="tmBodyD" lines={C.solution.client.body}
         rv="rise" block="cli" at={280} />
      <T x={G.L} y={7353} s="tmBodyD" lines={C.solution.client.caption}
         rv="rise" block="cli2" />

      <T x={G.L} y={FLD_HEAD} s="tmHeadD" lines={C.solution.field.head}
         rv="lines" block="fld" />
      <T x={G.L} y={FLD_BODY} s="tmBodyD" lines={C.solution.field.body}
         rv="rise" block="fld" at={300} />
      {/* 1px outline, #A30707 - the field-agent screen goes inside */}
      <Rect x={G.L} y={7950} w={G.W} h={784} fill="transparent"
            style={{ border: '1px solid #A30707' }} rv="card" block="fld" at={420} />
      <T x={G.L} y={8815} s="tmBodyD" lines={C.solution.field.caption}
         rv="rise" block="fld2" />

      {/* ---- impact ---- */}
      <T x={G.C} y={IMP_HEAD} w={1400} align="center" s="tmImpact"
         lines={C.impact.headline} rv="lines" block="imp" />
      <T x={G.C} y={IMP_SUB} w={1500} align="center" s="tmImpactSub"
         lines={C.impact.sub} rv="rise" block="imp" at={320} />

      {C.impact.quotes.map((q, i) => {
        const ny = attrY(IMP_QUOTE, q.lines.length, S.tmFQ.lh)
        return (
          <Fragment key={q.name}>
            <T x={COL(i)} y={IMP_QUOTE} s="tmFQ" lines={q.lines}
               rv="rise" block="iq" at={i * 110} />
            <T x={COL(i)} y={ny} s="tmFQName" color={q.colour}
               lines="-" rv="rise" block="iq" at={i * 110 + 80} />
            <T x={COL(i) + NAME_DX} y={ny} s="tmFQName" color={q.colour}
               lines={q.name} rv="rise" block="iq" at={i * 110 + 80} />
            <T x={COL(i) + NAME_DX} y={ny + ROLE_GAP} s="tmFQRole" lines={q.role}
               rv="rise" block="iq" at={i * 110 + 120} />
          </Fragment>
        )
      })}

      {/* ---- end of the case study (not in the Figma) ---- */}
      <T x={G.L} y={11200} s="footLink" lines="View next project"
         as="a" href="/work/lighthouse" rv="lines" block="end" />
      <T x={G.L} y={11200 + FOOT_GAP} s="footLinkAlt" lines="Contact"
         as="a" href="mailto:shah.manavd@northeastern.edu" rv="lines" block="end" at={140} />
      <T x={G.C} y={11640} w={900} align="center" s="egg" className="egg"
         lines="god bless the white monster" rv="rise" block="end" at={520} />
    </Frame>
  )
}
