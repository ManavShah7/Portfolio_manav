import { Fragment } from 'react'

import Frame from '@/components/Frame'
import Carousel from '@/components/Carousel'
import SectionRail from '@/components/SectionRail'
import MotionDriver from '@/components/MotionDriver'
import { T, Rect, Img, Shot, Cover, Band, MediaBand } from '@/components/Nodes'
import { slots } from '@/lib/clips'
import S from '@/lib/styles'
import { LV as G, PAD_LG, PAD_SM, PARA_GAP, CARD_GAP, META_GAP, META_VAL, FOOT_GAP, under }
  from '@/lib/grid'
import * as C from '@/lib/liveasy-copy'

const H = 11737

// drop a clip or a still at public/media/liveasy-<name>.* - see lib/clips.js
const V = slots('liveasy')

// This page has no Figma frame behind it - see lib/liveasy-copy.js. The band
// stops and vertical rhythm are lifted from the Lighthouse frame so it reads as
// one of the set; the grid it sits on is shared with the others in lib/grid.js.
//
// 21 stops, deep bronze into lit bronze at the midpoint and then washing out to
// the same near-white the other ramps end on, so the join below needs no seam.
const BRONZE = 'linear-gradient(180deg,#A8702A 0%,#AC752F 5%,#B17933 10%,#B57E38 15%,#BA823C 20%,#BE8741 25%,#C38B45 30%,#C7904A 35%,#CC944E 40%,#D09953 45%,#D59D57 50%,#D9A25C 55%,#DDAC6E 60%,#E1B680 65%,#E5C192 70%,#E9CBA4 75%,#EDD5B6 80%,#F1DFC8 85%,#F5EADA 90%,#F9F4EC 95%,#FDFEFE 100%)'

// Same job as Lighthouse's: washes a clip out to the colour the ramp reaches,
// so the dark caption at y 6236 still has something to sit on.
const BRONZE_WASH = 'linear-gradient(180deg,rgba(253,254,254,0) 0%,rgba(253,254,254,0.0) 55%,rgba(253,254,254,0.013) 57.69%,rgba(253,254,254,0.041) 60.38%,rgba(253,254,254,0.083) 63.08%,rgba(253,254,254,0.135) 65.77%,rgba(253,254,254,0.197) 68.46%,rgba(253,254,254,0.269) 71.15%,rgba(253,254,254,0.349) 73.85%,rgba(253,254,254,0.438) 76.54%,rgba(253,254,254,0.535) 79.23%,rgba(253,254,254,0.64) 81.92%,rgba(253,254,254,0.753) 84.62%,rgba(253,254,254,0.873) 87.31%,rgba(253,254,254,1.0) 90%,rgba(253,254,254,1) 100%)'

const RS_STEP = G.W + G.GUT
const PADDLE_X = G.R - 206

const RAIL = {
  items: [
    { label: 'Overview',     x: 152, y: 1053.5, to: 832 },
    { label: 'Problem',      x: 153, y: 1100,   to: 1830 },
    { label: 'Research',     x: 153, y: 1146,   to: 3300 },
    { label: 'Solution',     x: 152, y: 1195.5, to: 4600 },
    { label: "What's Next?", x: 152, y: 1245.5, to: 9000 },
  ],
  natural: 1020, stick: 300, height: 260, end: H,
  // White ink over the near-black research band, then on down the bronze to the
  // point where white and #5A5A5A are equally legible on it - y 5356, where both
  // sit at 2.6:1. A ramp through the mid-tones has no good answer anywhere near
  // there; this is the crossover, so it is the least bad place to switch.
  dark: [[3300, 5356]],
  light: '#5A5A5A', darkInk: '#FFFFFF',
}

// --- vertical anchors, each derived from the block above it --------------
const OV_HEAD = 1045.5
const OV_P1   = under(OV_HEAD, S.lvHead, C.overview.headline.length)
const OV_P2   = under(OV_P1, S.lvBody, C.overview.p1.length, PARA_GAP)
const OV_META = under(OV_P2, S.lvBody, C.overview.p2.length, META_GAP)

const PB_HEAD = 1871.5
const PB_BODY = under(PB_HEAD, S.lvHead, C.insight.headline.length)

const WIDE_Y  = 2139
const WIDE_HD = WIDE_Y + 61
const WIDE_BD = under(WIDE_HD, S.lvCardHead, C.insight.wide.head.length, CARD_GAP)

const CARDS_Y  = 2760
const CARDS_HD = CARDS_Y + 64
const CARDS_BD = under(CARDS_HD, S.lvCardHead, 2, CARD_GAP)

const PIL_HEAD = 5030
const PIL_BODY = under(PIL_HEAD, S.lvHeadW, C.solution.pillars.head.length)

const HRO_HEAD = 6605.5
const HRO_BODY = under(HRO_HEAD, S.lvHeadGrey, C.solution.hero.head.length)

const PRF_HEAD = 7790.5
const PRF_BODY = under(PRF_HEAD, S.lvHeadGrey, C.solution.proof.head.length)

const REF_HEAD  = 9420
const REF_CARDS = 9620
const REF_HD    = REF_CARDS + 64
const REF_BD    = under(REF_HD, S.lvCardHead, 2, CARD_GAP)

export default function Liveasy() {
  return (
    <Frame height={H} overlay={<SectionRail config={RAIL} />}>
      <MotionDriver />

      {/* ---- bands ---- */}
      <Cover y={0} h={832} clip={V('hero')} poster="/figma/lv-macbook-white.png" />
      <Band y={832}  h={2468} fill="#FFFFFF" />
      <Band y={3300} h={1300} fill="#0A0A0A" />
      <MediaBand y={4600} h={1800} clip={V('bronze')} fill={BRONZE} over={BRONZE_WASH} />
      <Band y={6400} h={5337} fill="#FFFFFF" />

      {/* ---- overview ---- */}
      <T x={G.L} y={OV_HEAD} s="lvHead" lines={C.overview.headline} rv="lines" block="ov" />
      <T x={G.L} y={OV_P1} s="lvBody" lines={C.overview.p1} rv="rise" block="ov" at={240} />
      <T x={G.L} y={OV_P2} s="lvBody" lines={C.overview.p2} rv="rise" block="ov" at={330} />
      {C.overview.meta.map((m, i) => (
        <Fragment key={m.label}>
          <T x={G.col(i, 3)} y={OV_META} s="metaLabel" lines={m.label}
             rv="rise" block="ov" at={420 + i * 50} />
          <T x={G.col(i, 3)} y={OV_META + META_VAL} s="metaValue" lines={m.values}
             rv="rise" block="ov" at={420 + i * 50} />
        </Fragment>
      ))}

      {/* ---- problem ---- */}
      <T x={G.C} y={PB_HEAD} w={1400} align="center" s="lvHead" lines={C.insight.headline}
         rv="lines" block="pb" />
      <T x={G.C} y={PB_BODY} w={1200} align="center" s="lvBody" lines={C.insight.body}
         rv="rise" block="pb" at={280} />

      <Rect x={G.L} y={WIDE_Y} w={G.W} h={599} fill="#F5F5F7" rv="card" block="pc1" />
      <T x={G.C} y={WIDE_HD} w={1000} align="center" s="lvCardHead" lines={C.insight.wide.head}
         rv="card" block="pc1" />
      <T x={G.C} y={WIDE_BD} w={1000} align="center" s="lvBody" lines={C.insight.wide.body}
         rv="card" block="pc1" />
      {/* every device frame has its background baked in, so it has to match the
          surface underneath: -lg is cut on #F5F5F7, the other two on #FFFFFF */}
      <Shot x={G.C - 216.5} y={2420} w={433} h={272.5} src="/figma/dev-macbook-lg.png"
            clip={V('problem')} alt="" rv="card" block="pc1" />

      {C.insight.cards.map((card, i) => (
        <Fragment key={i}>
          <Rect x={G.col(i, 2)} y={CARDS_Y} w={G.colW(2)} h={398} fill="#F5F5F7"
                rv="card" block="pc2" at={i * 130} />
          <T x={G.col(i, 2) + PAD_SM} y={CARDS_HD} s="lvCardHead" lines={card.head}
             rv="card" block="pc2" at={i * 130} />
          <T x={G.col(i, 2) + PAD_SM} y={CARDS_BD} s="lvCardBody" lines={card.body}
             rv="card" block="pc2" at={i * 130} />
        </Fragment>
      ))}

      {/* ---- research (over the near-black band) ---- */}
      <T x={G.L} y={3398} s="lvHeadW" lines={C.research.headline} rv="lines" block="rs" />
      {/* one card wide, so the band shows through beside it rather than a peek */}
      <Carousel x={G.L} y={3570} w={G.W} h={755} inner={G.W + 2 * RS_STEP} step={RS_STEP}
                paddleY={4374} paddleX={PADDLE_X}>
        {C.research.cards.map((card, i) => (
          <Fragment key={i}>
            <Rect x={i * RS_STEP} y={0} w={G.W} h={755} fill="#FFFFFF"
                  rv="card" block="rs" at={260} />
            <T x={i * RS_STEP + PAD_LG} y={94} s="lvCardHead" lines={card.head}
               rv="card" block="rs" at={260} />
            <T x={i * RS_STEP + PAD_LG} y={under(94, S.lvCardHead, 2, CARD_GAP)}
               s="lvCardBody" lines={card.body} rv="card" block="rs" at={260} />
            {i === 0 && (
              <Shot x={(G.W - 456) / 2} y={430} w={456} h={275} src="/figma/tm-macbook.png"
                    clip={V('research')} alt="" rv="card" block="rs" at={260} />
            )}
          </Fragment>
        ))}
      </Carousel>

      {/* ---- solution (bronze ramp) ---- */}
      {C.solution.headline.map((l, i) => (
        <T key={i} x={G.C} y={4700 + i * S.lvBigHead.lh} w={1500} align="center" s="lvBigHead"
           lines={l} rv="lines" block="sol" at={i * 110} sv="drift" />
      ))}

      <T x={G.L} y={PIL_HEAD} s="lvHeadW" lines={C.solution.pillars.head} rv="lines" block="pil" />
      <T x={G.L} y={PIL_BODY} s="lvBigW" lines={C.solution.pillars.body}
         rv="rise" block="pil" at={300} />
      <Rect x={G.L} y={5390} w={G.W} h={784} fill="#FFFFFF" rv="card" block="pil" at={420} />
      <Shot x={G.C - 364.25} y={5553} w={728.5} h={439.5} src="/figma/lv-macbook-white.png"
            clip={V('pillars')} alt="" rv="card" block="pil" at={420} />
      {/* the ramp is all but white this far down, so the dark caption still reads */}
      <T x={G.L} y={6236} s="lvBig" lines={C.solution.pillars.caption} rv="rise" block="pil2" />

      <T x={G.C} y={HRO_HEAD} w={1400} align="center" s="lvHeadGrey"
         lines={C.solution.hero.head} rv="lines" block="hro" />
      <T x={G.C} y={HRO_BODY} w={1400} align="center" s="lvBig" lines={C.solution.hero.body}
         rv="rise" block="hro" at={300} />
      {/* scroll-driven rather than triggered - see data-sv in globals.css */}
      <Shot x={G.C - 438} y={7073.5} w={876} h={528.5} src="/figma/lv-macbook-white.png"
            clip={V('hero-screen')} alt="" sv="tilt" />

      <T x={G.L} y={PRF_HEAD} s="lvHeadGrey" lines={C.solution.proof.head} rv="lines" block="prf" />
      <T x={G.L} y={PRF_BODY} s="lvBig" lines={C.solution.proof.body} rv="rise" block="prf" at={300} />
      <Shot x={G.C - 438} y={8230.5} w={876} h={528.5} src="/figma/lv-macbook-white.png"
            clip={V('proof')} alt="" sv="tilt" />

      {/* ---- impact ---- */}
      <T x={G.C} y={9021.5} w={1400} align="center" s="lvImpact" lines={C.impact.headline}
         rv="lines" block="imp" sv="punch" />

      {/* ---- reflection ---- */}
      <T x={G.L} y={REF_HEAD} s="lvHeadGrey" lines={C.reflection.head} rv="lines" block="ref" />
      {C.reflection.cards.map((card, i) => (
        <Fragment key={i}>
          <Rect x={G.col(i, 2)} y={REF_CARDS} w={G.colW(2)} h={398} fill="#F5F5F7"
                rv="card" block="ref2" at={i * 130} />
          <T x={G.col(i, 2) + PAD_SM} y={REF_HD} s="lvCardHead" lines={card.head}
             rv="card" block="ref2" at={i * 130} />
          <T x={G.col(i, 2) + PAD_SM} y={REF_BD} s="lvCardBody" lines={card.body}
             rv="card" block="ref2" at={i * 130} />
        </Fragment>
      ))}

      {/* ---- end of the case study ---- */}
      <T x={G.L} y={10400} s="footLink" lines="View next project"
         as="a" href="/work/peak" rv="lines" block="end" />
      <T x={G.L} y={10400 + FOOT_GAP} s="footLinkAlt" lines="Contact"
         as="a" href="mailto:shah.manavd@northeastern.edu" rv="lines" block="end" at={140} />
      <T x={G.C} y={11500} w={900} align="center" s="egg" className="egg"
         lines="god bless the white monster" rv="rise" block="end" at={520} />
    </Frame>
  )
}
