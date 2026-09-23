import { Fragment } from 'react'

import Frame from '@/components/Frame'
import Carousel from '@/components/Carousel'
import SectionRail from '@/components/SectionRail'
import MotionDriver from '@/components/MotionDriver'
import { T, Rect, Img, Band } from '@/components/Nodes'
import * as C from '@/lib/liveasy-copy'

const H = 11737

// This page has no Figma frame behind it - see lib/liveasy-copy.js. The band
// stops, the grid and the vertical rhythm are lifted from the Lighthouse frame
// so it reads as one of the set; only the accent is Liveasy's own.
//
// 21 stops, deep bronze into lit bronze at the midpoint and then washing out to
// the same near-white the Peak and Lighthouse ramps end on, so the join into the
// white band below needs no seam.
const BRONZE = 'linear-gradient(180deg,#A8702A 0%,#AC752F 5%,#B17933 10%,#B57E38 15%,#BA823C 20%,#BE8741 25%,#C38B45 30%,#C7904A 35%,#CC944E 40%,#D09953 45%,#D59D57 50%,#D9A25C 55%,#DDAC6E 60%,#E1B680 65%,#E5C192 70%,#E9CBA4 75%,#EDD5B6 80%,#F1DFC8 85%,#F5EADA 90%,#F9F4EC 95%,#FDFEFE 100%)'

// Same 1217 card on a 34px gutter as the other two carousels.
const RS_STEP = 1251

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

export default function Liveasy() {
  return (
    <Frame height={H} overlay={<SectionRail config={RAIL} />}>
      <MotionDriver />

      {/* ---- bands ---- */}
      <Band y={0}    h={832}  className="checker" />
      <Band y={832}  h={2468} fill="#FFFFFF" />
      <Band y={3300} h={1300} fill="#0A0A0A" />
      <Band y={4600} h={1800} fill={BRONZE} />
      <Band y={6400} h={5337} fill="#FFFFFF" />

      {/* ---- overview ---- */}
      <T x={449} y={1045.5} s="lvHead" lines={C.overview.headline} rv="lines" block="ov" />
      <T x={449.5} y={1197} s="lvBody" lines={C.overview.p1} rv="rise" block="ov" at={240} />
      <T x={449.5} y={1383} s="lvBody" lines={C.overview.p2} rv="rise" block="ov" at={330} />
      {C.overview.meta.map((m, i) => (
        <Fragment key={m.label}>
          <T x={[451, 834, 1214][i]} y={1588.5} s="metaLabel" lines={m.label}
             rv="rise" block="ov" at={420 + i * 50} />
          <T x={[452, 835, 1215][i]} y={1634.5} s="metaValue" lines={m.values}
             rv="rise" block="ov" at={420 + i * 50} />
        </Fragment>
      ))}

      {/* ---- problem ---- */}
      <T x={1059.75} y={1871.5} w={1400} align="center" s="lvHead" lines={C.insight.headline}
         rv="lines" block="pb" />
      <T x={1029.3} y={1997} w={1200} align="center" s="lvBody" lines={C.insight.body}
         rv="rise" block="pb" at={280} />

      <Rect x={499} y={2139} w={1061} h={599} fill="#F5F5F7" rv="card" block="pc1" />
      <T x={1015.1} y={2200} w={1000} align="center" s="lvCardHead" lines={C.insight.wide.head}
         rv="card" block="pc1" />
      <T x={1036} y={2307} w={1000} align="center" s="lvBody" lines={C.insight.wide.body}
         rv="card" block="pc1" />
      {/* every device frame has its background baked in, so it has to match the
          surface underneath: -lg is cut on #F5F5F7, the other two on #FFFFFF */}
      <Img x={813} y={2420} w={433} h={272.5} src="/figma/dev-macbook-lg.png" alt=""
           rv="card" block="pc1" />

      {C.insight.cards.map((card, i) => (
        <Fragment key={i}>
          <Rect x={[494, 1039][i]} y={2760} w={521} h={398} fill="#F5F5F7"
                rv="card" block="pc2" at={i * 130} />
          <T x={[561.5, 1105][i]} y={2824} s="lvCardHead" lines={card.head}
             rv="card" block="pc2" at={i * 130} />
          <T x={[560, 1105][i]} y={2934} s="lvCardBody" lines={card.body}
             rv="card" block="pc2" at={i * 130} />
        </Fragment>
      ))}

      {/* ---- research (over the near-black band) ---- */}
      <T x={494.5} y={3398} s="lvHeadW" lines={C.research.headline} rv="lines" block="rs" />
      {/* one card wide, so the band shows through beside it rather than a peek */}
      <Carousel x={494} y={3570} w={1217} h={755} inner={1217 + 2 * RS_STEP} step={RS_STEP}
                paddleY={4374} paddleX={1505}>
        {C.research.cards.map((card, i) => (
          <Fragment key={i}>
            <Rect x={i * RS_STEP} y={0} w={1217} h={755} fill="#FFFFFF"
                  rv="card" block="rs" at={260} />
            <T x={i * RS_STEP + 115} y={94} s="lvCardHead" lines={card.head}
               rv="card" block="rs" at={260} />
            <T x={i * RS_STEP + 115} y={210} s="lvCardBody" lines={card.body}
               rv="card" block="rs" at={260} />
            {i === 0 && (
              <Img x={380.5} y={430} w={456} h={275} src="/figma/tm-macbook.png" alt=""
                   rv="card" block="rs" at={260} />
            )}
          </Fragment>
        ))}
      </Carousel>

      {/* ---- solution (bronze ramp) ---- */}
      {C.solution.headline.map((l, i) => (
        <T key={i} x={1062.5} y={4700 + i * 71} w={1500} align="center" s="lvBigHead"
           lines={l} rv="lines" block="sol" at={i * 110} />
      ))}

      <T x={470} y={5030} s="lvHeadW" lines={C.solution.pillars.head} rv="lines" block="pil" />
      <T x={470} y={5210} s="lvBigW" lines={C.solution.pillars.body}
         rv="rise" block="pil" at={300} />
      <Rect x={470} y={5390} w={1238} h={784} fill="#FFFFFF" rv="card" block="pil" at={420} />
      <Img x={724.75} y={5553} w={728.5} h={439.5} src="/figma/lv-macbook-white.png" alt=""
           rv="card" block="pil" at={420} />
      {/* the ramp is all but white this far down, so the dark caption still reads */}
      <T x={470} y={6236} s="lvBig" lines={C.solution.pillars.caption} rv="rise" block="pil2" />

      <T x={1085.5} y={6605.5} w={1400} align="center" s="lvHeadGrey"
         lines={C.solution.hero.head} rv="lines" block="hro" />
      <T x={1089} y={6772} w={1400} align="center" s="lvBig" lines={C.solution.hero.body}
         rv="rise" block="hro" at={300} />
      <Img x={512} y={7073.5} w={876} h={528.5} src="/figma/lv-macbook-white.png" alt=""
           rv="card" block="hro" at={420} />

      <T x={473.5} y={7790.5} s="lvHeadGrey" lines={C.solution.proof.head} rv="lines" block="prf" />
      <T x={473} y={7925} s="lvBig" lines={C.solution.proof.body} rv="rise" block="prf" at={300} />
      <Img x={512} y={8230.5} w={876} h={528.5} src="/figma/lv-macbook-white.png" alt=""
           rv="card" block="prf" at={420} />

      {/* ---- impact ---- */}
      <T x={1089} y={9021.5} w={1400} align="center" s="lvImpact" lines={C.impact.headline}
         rv="lines" block="imp" />

      {/* ---- reflection ---- */}
      <T x={494} y={9420} s="lvHeadGrey" lines={C.reflection.head} rv="lines" block="ref" />
      {C.reflection.cards.map((card, i) => (
        <Fragment key={i}>
          <Rect x={[494, 1039][i]} y={9620} w={521} h={398} fill="#F5F5F7"
                rv="card" block="ref2" at={i * 130} />
          <T x={[561.5, 1105][i]} y={9684} s="lvCardHead" lines={card.head}
             rv="card" block="ref2" at={i * 130} />
          <T x={[560, 1105][i]} y={9794} s="lvCardBody" lines={card.body}
             rv="card" block="ref2" at={i * 130} />
        </Fragment>
      ))}

      {/* ---- end of the case study ---- */}
      <T x={450} y={10400} s="footLink" lines="View next project"
         as="a" href="/work/peak" rv="lines" block="end" />
      <T x={450} y={10500} s="footLinkAlt" lines="Contact"
         as="a" href="mailto:shah.manavd@northeastern.edu" rv="lines" block="end" at={140} />
      <T x={950} y={11500} w={900} align="center" s="egg" className="egg"
         lines="god bless the white monster" rv="rise" block="end" at={520} />
    </Frame>
  )
}
