import { Fragment } from 'react'

import Frame from '@/components/Frame'
import Carousel from '@/components/Carousel'
import SectionRail from '@/components/SectionRail'
import MotionDriver from '@/components/MotionDriver'
import { T, Rect, Img, Band, Seam } from '@/components/Nodes'
import * as C from '@/lib/lighthouse-copy'

const H = 11737

// 21 stops down the band; horizontally uniform, so a vertical ramp is exact.
const GREEN = 'linear-gradient(180deg,#0DA31C 0%,#12A625 5%,#18A92E 10%,#1FAB38 15%,#24AD41 20%,#2AB04A 25%,#30B354 30%,#36B65E 35%,#3BB866 40%,#3BC166 45%,#3AC964 50%,#3AD263 55%,#39DA62 60%,#52DF75 65%,#6AE389 70%,#83E89C 75%,#9BECB0 80%,#B4F1C3 85%,#CCF5D7 90%,#E5FAEA 95%,#FDFEFE 100%)'

// Research carousel: 1217-wide cards on a 34px gutter, the same pitch the other
// two case studies use. The first card is drawn half a design px lower than the
// other two, with half a px more leading - hand placement, reproduced as drawn.
const RS_STEP = 1251
const RS_HEAD = [{ y: 94.5, lh: 48.5 }, { y: 94, lh: 48 }, { y: 94, lh: 48 }]

const RAIL = {
  items: [
    { label: 'Overview',     x: 152,   y: 1053.5, to: 832 },
    { label: 'Problem',      x: 153,   y: 1100,   to: 1830 },
    { label: 'Research',     x: 153,   y: 1146,   to: 3244 },
    { label: 'Solution',     x: 152,   y: 1195.5, to: 4508 },
    { label: "What's Next?", x: 152,   y: 1245.5, to: 8960 },
  ],
  natural: 1020, stick: 300, height: 260, end: H,
  dark: [[3244, 6000]],
  light: '#5A5A5A', darkInk: '#FFFFFF',
}

export default function Lighthouse() {
  return (
    <Frame height={H} overlay={<SectionRail config={RAIL} />}>
      <MotionDriver />

      {/* ---- bands ---- */}
      <Band y={0}    h={832}  className="checker" />
      <Band y={832}  h={2412} fill="#FFFFFF" />
      <Band y={3244} h={1264} fill="url(/figma/lh-mesh.webp) center/1900px 1264px no-repeat" />
      <Band y={4508} h={1739} fill={GREEN} />
      <Band y={6247} h={5490} fill="#FFFFFF" />
      {/* the mesh ends pale and the ramp opens on #0DA31C - up to 152 levels
          of step across the width */}
      <Seam y={4388} h={120} to={[13, 163, 28]} />

      {/* ---- overview ---- */}
      <T x={449} y={1045.5} s="lhHead" lines={C.overview.headline} rv="lines" block="ov" />
      <T x={449.5} y={1197}   s="lhBody" lines={C.overview.p1} rv="rise" block="ov" at={240} />
      <T x={449.5} y={1383}   s="lhBody" lines={C.overview.p2} rv="rise" block="ov" at={330} />
      {C.overview.meta.map((m, i) => {
        const lx = [451, 834, 1214][i]
        const vx = [452, 835, 1215][i]
        return (
          <Fragment key={m.label}>
            <T x={lx} y={1588.5} s="metaLabel" lines={m.label} rv="rise" block="ov" at={420 + i * 50} />
            <T x={vx} y={[1634.5, 1642, 1640.5][i]} s="metaValue" lines={m.values}
               rv="rise" block="ov" at={420 + i * 50} />
          </Fragment>
        )
      })}

      {/* ---- problem ---- */}
      <T x={1059.75} y={1871.5} w={1400} align="center" s="lhHead" lines={C.insight.headline}
         rv="lines" block="pb" />
      <T x={1029.3} y={1997} w={1200} align="center" s="lhBody" lines={C.insight.body}
         rv="rise" block="pb" at={280} />

      <Rect x={499} y={2139} w={1061} h={599} fill="#F5F5F7" rv="card" block="pc1" />
      <T x={1015.1} y={2200} w={1000} align="center" s="lhCardHead" lines={C.insight.wide.head}
         rv="card" block="pc1" />
      <T x={1036} y={2307} w={1000} align="center" s="lhBody" lines={C.insight.wide.body}
         rv="card" block="pc1" />
      <Img x={840} y={2439} w={353} h={229} src="/figma/lh-tablet-grey.png" alt=""
           rv="card" block="pc1" />

      <Rect x={494} y={2760} w={521} h={398} fill="#F5F5F7" rv="card" block="pc2" />
      <T x={561.5} y={2824} s="lhCardHead" lines={C.insight.cards[0].head}
         rv="card" block="pc2" />
      <T x={560} y={2934} s="lhCardBody" lines={C.insight.cards[0].body} rv="card" block="pc2" />
      <Rect x={1039} y={2759} w={521} h={397} fill="#F5F5F7" rv="card" block="pc2" at={130} />
      <T x={1105} y={2834} s="lhCardHead" lines={C.insight.cards[1].head}
         rv="card" block="pc2" at={130} />
      <T x={1105} y={2942} s="lhCardBody" lines={C.insight.cards[1].body}
         rv="card" block="pc2" at={130} />

      {/* ---- research (over the mesh) ---- */}
      <T x={494.5} y={3398} lines={C.research.headline}
         s={{ size: 50, weight: 700, lh: 59.5, color: '#FFFFFF' }} rv="lines" block="rs" />
      {/* Unlike Peak's, this track is exactly one card wide: the frame shows mesh,
          not a peek of the next card, to the right of x 1711. Clipping there also
          lets every card come flush to the left edge. */}
      <Carousel x={494} y={3570} w={1217} h={755} inner={1217 + 2 * RS_STEP} step={RS_STEP}
                paddleY={4374} paddleX={1505}>
        {C.research.cards.map((card, i) => (
          <Fragment key={i}>
            <Rect x={i * RS_STEP} y={0} w={1217} h={755} fill="#FFFFFF"
                  rv="card" block="rs" at={260} />
            <T x={i * RS_STEP + 115} y={RS_HEAD[i].y} lines={card.head}
               s={{ size: 40, weight: 600, lh: RS_HEAD[i].lh, color: '#1C1C1E' }}
               rv="card" block="rs" at={260} />
            <T x={i * RS_STEP + 115} y={210} s="lhCardBody" lines={card.body}
               rv="card" block="rs" at={260} />
            {i === 0 && (
              <Img x={396} y={422} w={353} h={229} src="/figma/lh-tablet-white.png" alt=""
                   rv="card" block="rs" at={260} />
            )}
          </Fragment>
        ))}
      </Carousel>

      {/* ---- solution (green ramp) ---- */}
      {/* the three lines are each centred a couple of px apart in the Figma */}
      {C.solution.headline.map((l, i) => (
        <T key={i} x={[1062.5, 1067.25, 1065.25][i]} y={[4635, 4705.5, 4777.5][i]}
           w={1500} align="center" s="lhBigHead" lines={l}
           rv="lines" block="sol" at={i * 110} />
      ))}

      <T x={470} y={5000} lines={C.solution.navi.head}
         s={{ size: 50, weight: 700, lh: 59, color: '#FFFFFF' }} rv="lines" block="nav" />
      <T x={470} y={5140.5} s="lhBigW" lines={C.solution.navi.body} rv="rise" block="nav" at={300} />
      <Rect x={470} y={5324} w={1238} h={784} fill="#FFFFFF" rv="card" block="nav" at={420} />
      <Img x={726} y={5487} w={728.5} h={471} src="/figma/lh-tablet-card.png" alt=""
           rv="card" block="nav" at={420} />
      <T x={470} y={6176} s="lhBig" lines={C.solution.navi.caption} rv="rise" block="nav2" />

      <T x={1085.5} y={6605.5} w={1400} align="center" s="lhHeadGrey"
         lines={C.solution.playbook.head} rv="lines" block="pbk" />
      <T x={1089} y={6772} w={1400} align="center" s="lhBig" lines={C.solution.playbook.body}
         rv="rise" block="pbk" at={300} />
      <Img x={650} y={7073.5} w={876} h={559} src="/figma/lh-tablet-big.png" alt=""
           rv="card" block="pbk" at={420} />

      <T x={473.5} y={7790.5} s="lhHeadGrey" lines={C.solution.ext.head} rv="lines" block="ext" />
      <T x={473} y={7925} s="lhBig" lines={C.solution.ext.body} rv="rise" block="ext" at={300} />
      <Img x={661} y={8230.5} w={876} h={559} src="/figma/lh-tablet-big.png" alt=""
           rv="card" block="ext" at={420} />

      {/* ---- impact ---- */}
      <T x={1089} y={9021.5} w={1400} align="center" s="lhImpact" lines={C.impact.headline}
         rv="lines" block="imp" />

      {/* ---- end of the case study (not in the Figma) ---- */}
      <T x={450} y={10400} s="footLink" lines="View next project"
         as="a" href="/work/liveasy" rv="lines" block="end" />
      <T x={450} y={10500} s="footLinkAlt" lines="Contact"
         as="a" href="mailto:shah.manavd@northeastern.edu" rv="lines" block="end" at={140} />
      <T x={950} y={11500} w={900} align="center" s="egg" className="egg"
         lines="god bless the white monster" rv="rise" block="end" at={520} />
    </Frame>
  )
}
