import { Fragment } from 'react'

import Frame from '@/components/Frame'
import Carousel from '@/components/Carousel'
import SectionRail from '@/components/SectionRail'
import MotionDriver from '@/components/MotionDriver'
import { T, Rect, Img, Shot, Cover, Band, MediaBand, Seam } from '@/components/Nodes'
import { slots } from '@/lib/clips'
import S from '@/lib/styles'
import { LH as G, PAD_LG, PAD_SM, HEAD_GAP, PARA_GAP, CARD_GAP, META_GAP, META_VAL, FOOT_GAP, under }
  from '@/lib/grid'
import * as C from '@/lib/lighthouse-copy'

const H = 11737

// drop a clip or a still at public/media/lighthouse-<name>.* - see lib/clips.js
const V = slots('lighthouse')

// 21 stops down the band; horizontally uniform, so a vertical ramp is exact.
const GREEN = 'linear-gradient(180deg,#0DA31C 0%,#12A625 5%,#18A92E 10%,#1FAB38 15%,#24AD41 20%,#2AB04A 25%,#30B354 30%,#36B65E 35%,#3BB866 40%,#3BC166 45%,#3AC964 50%,#3AD263 55%,#39DA62 60%,#52DF75 65%,#6AE389 70%,#83E89C 75%,#9BECB0 80%,#B4F1C3 85%,#CCF5D7 90%,#E5FAEA 95%,#FDFEFE 100%)'

// Carousel cards are the full measure now, on the same gutter as everything else.
// Washes the clip out to the colour the CSS ramp reaches by its end, so the
// dark caption at y 6176 - which the frame puts on the near-white tail of the
// ramp - still has something to sit on.
const GREEN_WASH = 'linear-gradient(180deg,rgba(253,254,254,0) 0%,rgba(253,254,254,0.0) 60%,rgba(253,254,254,0.013) 62.69%,rgba(253,254,254,0.041) 65.38%,rgba(253,254,254,0.083) 68.08%,rgba(253,254,254,0.135) 70.77%,rgba(253,254,254,0.197) 73.46%,rgba(253,254,254,0.269) 76.15%,rgba(253,254,254,0.349) 78.85%,rgba(253,254,254,0.438) 81.54%,rgba(253,254,254,0.535) 84.23%,rgba(253,254,254,0.64) 86.92%,rgba(253,254,254,0.753) 89.62%,rgba(253,254,254,0.873) 92.31%,rgba(253,254,254,1.0) 95%,rgba(253,254,254,1) 100%)'

const RS_STEP = G.W + G.GUT

// two 80px paddles and the 46 between them, ending on the content right edge
const PADDLE_X = G.R - 206

const RAIL = {
  items: [
    { label: 'Overview',     x: 152, y: 1053.5, to: 832 },
    { label: 'Problem',      x: 153, y: 1100,   to: 1830 },
    { label: 'Research',     x: 153, y: 1146,   to: 3244 },
    { label: 'Solution',     x: 152, y: 1195.5, to: 4508 },
    { label: "What's Next?", x: 152, y: 1245.5, to: 8960 },
  ],
  natural: 1020, stick: 300, height: 260, end: H,
  dark: [[3244, 6000]],
  light: '#5A5A5A', darkInk: '#FFFFFF',
}

// --- vertical anchors, each derived from the block above it --------------
const OV_HEAD = 1045.5
const OV_P1   = under(OV_HEAD, S.lhHead, C.overview.headline.length)
const OV_P2   = under(OV_P1, S.lhBody, C.overview.p1.length, PARA_GAP)
const OV_META = under(OV_P2, S.lhBody, C.overview.p2.length, META_GAP)

const PB_HEAD = 1871.5
const PB_BODY = under(PB_HEAD, S.lhHead, C.insight.headline.length)

const WIDE_Y  = 2139
const WIDE_HD = WIDE_Y + 61
const WIDE_BD = under(WIDE_HD, S.lhCardHead, C.insight.wide.head.length, CARD_GAP)

const CARDS_Y  = 2760
const CARDS_HD = CARDS_Y + 64
const CARDS_BD = under(CARDS_HD, S.lhCardHead, 2, CARD_GAP)

const NAVI_HEAD = 5000
const NAVI_LH   = 59
const NAVI_BODY = NAVI_HEAD + (C.solution.navi.head.length - 1) * NAVI_LH + HEAD_GAP

const PBK_HEAD = 6605.5
const PBK_BODY = under(PBK_HEAD, S.lhHeadGrey, C.solution.playbook.head.length)

const EXT_HEAD = 7790.5
const EXT_BODY = under(EXT_HEAD, S.lhHeadGrey, C.solution.ext.head.length)

export default function Lighthouse() {
  return (
    <Frame height={H} overlay={<SectionRail config={RAIL} />}>
      <MotionDriver />

      {/* ---- bands ---- */}
      <Cover y={0} h={832} clip={V('hero')} poster="/figma/lh-mesh.webp" />
      <Band y={832}  h={2412} fill="#FFFFFF" />
      <Band y={3244} h={1264} fill="url(/figma/lh-mesh.webp) center/1900px 1264px no-repeat" />
      <MediaBand y={4508} h={1739} clip={V('green')} fill={GREEN} over={GREEN_WASH} />
      <Band y={6247} h={5490} fill="#FFFFFF" />
      {/* the mesh ends pale and the ramp opens on #0DA31C - up to 152 levels of
          step across the width. The clip opens on #57C859 instead, sampled over
          the whole clip (it drifts by under 2 levels), so the seam carries both. */}
      <Seam y={4388} h={120} to={[13, 163, 28]} over={V('green') && [87, 200, 89]} />

      {/* ---- overview ---- */}
      <T x={G.L} y={OV_HEAD} s="lhHead" lines={C.overview.headline} rv="lines" block="ov" />
      <T x={G.L} y={OV_P1} s="lhBody" lines={C.overview.p1} rv="rise" block="ov" at={240} />
      <T x={G.L} y={OV_P2} s="lhBody" lines={C.overview.p2} rv="rise" block="ov" at={330} />
      {C.overview.meta.map((m, i) => (
        <Fragment key={m.label}>
          <T x={G.col(i, 3)} y={OV_META} s="metaLabel" lines={m.label}
             rv="rise" block="ov" at={420 + i * 50} />
          <T x={G.col(i, 3)} y={OV_META + META_VAL} s="metaValue" lines={m.values}
             rv="rise" block="ov" at={420 + i * 50} />
        </Fragment>
      ))}

      {/* ---- problem ---- */}
      <T x={G.C} y={PB_HEAD} w={1400} align="center" s="lhHead" lines={C.insight.headline}
         rv="lines" block="pb" />
      <T x={G.C} y={PB_BODY} w={1200} align="center" s="lhBody" lines={C.insight.body}
         rv="rise" block="pb" at={280} />

      <Rect x={G.L} y={WIDE_Y} w={G.W} h={599} fill="#F5F5F7" rv="card" block="pc1" />
      <T x={G.C} y={WIDE_HD} w={1000} align="center" s="lhCardHead" lines={C.insight.wide.head}
         rv="card" block="pc1" />
      <T x={G.C} y={WIDE_BD} w={1000} align="center" s="lhBody" lines={C.insight.wide.body}
         rv="card" block="pc1" />
      <Shot x={G.C - 176.5} y={2439} w={353} h={229} src="/figma/lh-tablet-grey.png"
            clip={V('problem')} alt="" rv="card" block="pc1" />

      {C.insight.cards.map((card, i) => (
        <Fragment key={i}>
          <Rect x={G.col(i, 2)} y={CARDS_Y} w={G.colW(2)} h={398} fill="#F5F5F7"
                rv="card" block="pc2" at={i * 130} />
          <T x={G.col(i, 2) + PAD_SM} y={CARDS_HD} s="lhCardHead" lines={card.head}
             rv="card" block="pc2" at={i * 130} />
          <T x={G.col(i, 2) + PAD_SM} y={CARDS_BD} s="lhCardBody" lines={card.body}
             rv="card" block="pc2" at={i * 130} />
        </Fragment>
      ))}

      {/* ---- research (over the mesh) ---- */}
      <T x={G.L} y={3398} lines={C.research.headline}
         s={{ size: 50, weight: 700, lh: 59.5, color: '#FFFFFF' }} rv="lines" block="rs" />
      {/* one card wide, so the mesh shows through beside it rather than a peek
          of the next card - which is how the frame draws it */}
      <Carousel x={G.L} y={3570} w={G.W} h={755} inner={G.W + 2 * RS_STEP} step={RS_STEP}
                paddleY={4374} paddleX={PADDLE_X}>
        {C.research.cards.map((card, i) => (
          <Fragment key={i}>
            <Rect x={i * RS_STEP} y={0} w={G.W} h={755} fill="#FFFFFF"
                  rv="card" block="rs" at={260} />
            <T x={i * RS_STEP + PAD_LG} y={94} s="lhCardHead" lines={card.head}
               rv="card" block="rs" at={260} />
            <T x={i * RS_STEP + PAD_LG} y={under(94, S.lhCardHead, 2, CARD_GAP)}
               s="lhCardBody" lines={card.body} rv="card" block="rs" at={260} />
            {i === 0 && (
              <Shot x={(G.W - 353) / 2} y={422} w={353} h={229} src="/figma/lh-tablet-white.png"
                    clip={V('research')} alt="" rv="card" block="rs" at={260} />
            )}
          </Fragment>
        ))}
      </Carousel>

      {/* ---- solution (green ramp) ---- */}
      {C.solution.headline.map((l, i) => (
        <T key={i} x={G.C} y={4635 + i * S.lhBigHead.lh} w={1500} align="center" s="lhBigHead"
           lines={l} rv="lines" block="sol" at={i * 110} sv="drift" />
      ))}

      <T x={G.L} y={NAVI_HEAD} lines={C.solution.navi.head}
         s={{ size: 50, weight: 700, lh: NAVI_LH, color: '#FFFFFF' }} rv="lines" block="nav" />
      <T x={G.L} y={NAVI_BODY} s="lhBigW" lines={C.solution.navi.body}
         rv="rise" block="nav" at={300} />
      <Rect x={G.L} y={5324} w={G.W} h={784} fill="#FFFFFF" rv="card" block="nav" at={420} />
      <Shot x={G.C - 364.25} y={5487} w={728.5} h={471} src="/figma/lh-tablet-card.png"
            clip={V('navi')} alt="" rv="card" block="nav" at={420} />
      <T x={G.L} y={6176} s="lhBig" lines={C.solution.navi.caption} rv="rise" block="nav2" />

      <T x={G.C} y={PBK_HEAD} w={1400} align="center" s="lhHeadGrey"
         lines={C.solution.playbook.head} rv="lines" block="pbk" />
      <T x={G.C} y={PBK_BODY} w={1400} align="center" s="lhBig" lines={C.solution.playbook.body}
         rv="rise" block="pbk" at={300} />
      {/* scroll-driven rather than triggered - see data-sv in globals.css */}
      <Shot x={G.C - 438} y={7073.5} w={876} h={559} src="/figma/lh-tablet-big.png"
            clip={V('playbook')} alt="" sv="tilt" />

      <T x={G.L} y={EXT_HEAD} s="lhHeadGrey" lines={C.solution.ext.head} rv="lines" block="ext" />
      <T x={G.L} y={EXT_BODY} s="lhBig" lines={C.solution.ext.body} rv="rise" block="ext" at={300} />
      <Shot x={G.C - 438} y={8230.5} w={876} h={559} src="/figma/lh-tablet-big.png"
            clip={V('extension')} alt="" sv="tilt" />

      {/* ---- impact ---- */}
      <T x={G.C} y={9021.5} w={1400} align="center" s="lhImpact" lines={C.impact.headline}
         rv="lines" block="imp" sv="punch" />

      {/* ---- end of the case study (not in the Figma) ---- */}
      <T x={G.L} y={10400} s="footLink" lines="View next project"
         as="a" href="/work/liveasy" rv="lines" block="end" />
      <T x={G.L} y={10400 + FOOT_GAP} s="footLinkAlt" lines="Contact"
         as="a" href="mailto:shah.manavd@northeastern.edu" rv="lines" block="end" at={140} />
      <T x={G.C} y={11500} w={900} align="center" s="egg" className="egg"
         lines="god bless the white monster" rv="rise" block="end" at={520} />
    </Frame>
  )
}
