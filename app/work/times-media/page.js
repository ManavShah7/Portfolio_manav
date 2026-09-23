import { Fragment } from 'react'

import Frame from '@/components/Frame'
import Carousel from '@/components/Carousel'
import SectionRail from '@/components/SectionRail'
import MotionDriver from '@/components/MotionDriver'
import { T, Rect, Img, Band, Seam } from '@/components/Nodes'
import * as C from '@/lib/times-copy'

const H = 11737

// 21 stops sampled down the band; horizontally uniform, so a vertical ramp
// reproduces it exactly.
const PINK = 'linear-gradient(180deg,#FF336E 0%,#FD3E74 5%,#FB487A 10%,#FA527F 15%,#F85D85 20%,#F7678B 25%,#F57291 30%,#F37D96 35%,#F2879C 40%,#F091A2 45%,#F19DAC 50%,#F4AAB7 55%,#F5B5C0 60%,#F6C0C9 65%,#F7C9D1 70%,#F9D3D9 75%,#FADBE0 80%,#FBE4E8 85%,#FCEDF0 90%,#FEF6F7 95%,#FFFFFF 100%)'

// The rail on this page has six stops, sits further right than Peak's, and is
// white on #111111.
const RAIL = {
  items: [
    { label: 'Overview',     x: 242.5, y: 1062.5, to: 839 },
    { label: 'Problem',      x: 243.5, y: 1116,   to: 3030 },
    { label: 'Research',     x: 243.5, y: 1169,   to: 1900 },
    { label: 'Solution',     x: 242.5, y: 1218.5, to: 4326 },
    { label: 'Impact',       x: 243.5, y: 1262,   to: 9280 },
    { label: "What's Next?", x: 242.5, y: 1306,   to: 10996 },
  ],
  natural: 1020, stick: 300, height: 300, end: H,
  // where the page behind the rail's own column is dark
  dark: [[839, 3030], [3030, 6070]],
  light: '#5A5A5A', darkInk: '#FFFFFF',
}

const QUOTE_X = [474, 877, 1326]
// the dash sits well clear of the name; both are placed, not spaced
const DASH_X  = [475, 876.5, 1332.5]
const NAME_X  = [499, 900.5, 1358]
// the third name is set a size larger than the other two, by hand
const NAME_SZ = [28, 28, 30]
const ROLE_X  = [496.5, 899.5, 1331.5]

const FQ_X   = [470, 873, 1322]
const FQ_N   = [{ y: 10322, x: 469.5, n: 495,   r: 492,   ry: 10355.5 },
                { y: 10141, x: 872.5, n: 898,   r: 895,   ry: 10175.5 },
                { y: 10137, x: 1321.5, n: 1347, r: 1322,  ry: 10167.5 }]

export default function TimesMedia() {
  return (
    <Frame height={H} overlay={<SectionRail config={RAIL} />}>
      <MotionDriver />

      {/* ---- bands ---- */}
      <Band y={0}     h={832}  className="checker" />
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
      <T x={470.5} y={1026.5} s="tmHead" lines={C.overview.headline} rv="lines" block="ov" />
      <T x={474.5} y={1172} s="tmBody" lines={C.overview.p1} rv="rise" block="ov" at={240} />
      <T x={474.5} y={1389} s="tmBody" lines={C.overview.p2} rv="rise" block="ov" at={330} />

      {/* each column starts at its own y and Skills leads by half a pixel per
          line - the three were set by hand */}
      {C.overview.meta.map((m, i) => {
        const lx = [474, 857, 1238][i]
        const vx = [474, 856.5, 1236.5][i]
        const vy = [1652, 1660, 1658.5][i]
        const lh = i === 2 ? 31 : 31.5
        return (
          <Fragment key={m.label}>
            <T x={lx} y={[1606.5, 1605.5, 1605.5][i]} s="tmMetaLabel" lines={m.label}
               rv="rise" block="ov" at={420 + i * 50} />
            <T x={vx} y={vy} lines={m.values}
               s={{ size: 26, weight: 500, lh, color: '#CCCCCC' }}
               rv="rise" block="ov" at={420 + i * 50} />
          </Fragment>
        )
      })}

      {/* ---- research ---- */}
      {/* the middle line is centred 6px right of the other two */}
      {C.research.headline.map((l, i) => (
        <T key={i} x={[1039.5, 1045.5, 1039.5][i]} y={[1960.5, 2021, 2081.5][i]}
           w={1400} align="center" lines={l}
           s={{ size: 50, weight: 700, lh: 60, color: '#CCCCCC' }}
           rv="lines" block="rs" at={i * 110} />
      ))}
      <T x={1063.9} y={2172} w={1400} align="center" s="tmBody" lines={C.research.body}
         rv="rise" block="rs" at={300} />

      {C.research.quotes.map((q, i) => (
        <Fragment key={q.name}>
          <T x={QUOTE_X[i]} y={2318} s="tmQuote" lines={q.lines}
             rv="rise" block="rq" at={i * 110} />
          <T x={DASH_X[i]} y={[2671.5, 2669.5, 2673][i]}
             s={{ size: NAME_SZ[i], weight: 600, lh: NAME_SZ[i] * 1.2, color: '#CCCCCC' }}
             lines="-" rv="rise" block="rq" at={i * 110 + 80} />
          <T x={NAME_X[i]} y={[2671.5, 2669.5, 2673][i]}
             s={{ size: NAME_SZ[i], weight: 600, lh: NAME_SZ[i] * 1.2, color: '#CCCCCC' }}
             lines={q.name} rv="rise" block="rq" at={i * 110 + 80} />
          <T x={ROLE_X[i]} y={[2706.5, 2705.5, 2709.5][i]} s="tmQuoteRole"
             lines={q.role} rv="rise" block="rq" at={i * 110 + 120} />
        </Fragment>
      ))}

      {/* ---- problem (over the mesh) ---- */}
      <T x={471.5} y={3191.5} s="tmHeadW" lines={C.problem.headline} rv="lines" block="pb" />
      {/* the Figma draws paddles but no second card - unlike Peak there is no
          faint card queued behind this one, so the track does not overflow */}
      <Carousel x={470} y={3365} w={1430} h={755} inner={1217} step={1251}
                paddleY={4169} paddleX={1481}>
        <Rect x={0} y={0} w={1217} h={755} fill="#FFFFFF" rv="card" block="pb" at={260} />
        <T x={115} y={94} s="tmCardHead" lines={C.problem.cardHead}
           rv="card" block="pb" at={260} />
        <T x={115.5} y={210} s="tmCardBody" lines={C.problem.cardBody}
           rv="card" block="pb" at={260} />
        <Img x={358} y={357} w={456} h={275} src="/figma/tm-macbook.png" alt=""
             rv="card" block="pb" at={260} />
      </Carousel>

      {/* ---- solution ---- */}
      <T x={1064.9} y={4623.5} w={1500} align="center" s="tmBigHead"
         lines={C.solution.headline} rv="lines" block="sol" />

      <T x={470} y={4997.5} s="tmHeadW" lines={C.solution.admin.head} rv="lines" block="adm" />
      <T x={470} y={5070.5} s="tmBodyW" lines={C.solution.admin.body}
         rv="rise" block="adm" at={300} />
      <Carousel x={470} y={5243} w={1430} h={784} inner={1238} step={1272}
                paddleY={6072} paddleX={1502}>
        <Rect x={0} y={0} w={1238} h={784} fill="#FFFFFF" rv="card" block="adm" at={420} />
      </Carousel>
      <T x={483} y={6083} s="tmBodyD" lines={C.solution.admin.caption}
         rv="rise" block="adm2" />

      <T x={470} y={6363.5} s="tmHeadD" lines={C.solution.client.head}
         rv="lines" block="cli" />
      <T x={470} y={6436} s="tmBodyD" lines={C.solution.client.body}
         rv="rise" block="cli" at={280} />
      <T x={470} y={7353} s="tmBodyD" lines={C.solution.client.caption}
         rv="rise" block="cli2" />

      <T x={470} y={7681.5} s="tmHeadD" lines={C.solution.field.head}
         rv="lines" block="fld" />
      <T x={470} y={7816} s="tmBodyD" lines={C.solution.field.body}
         rv="rise" block="fld" at={300} />
      {/* 1px outline, #A30707 - the field-agent screen goes inside */}
      <Rect x={470} y={7950} w={1238} h={784} fill="transparent"
            style={{ border: '1px solid #A30707' }} rv="card" block="fld" at={420} />
      <T x={470} y={8815} s="tmBodyD" lines={C.solution.field.caption}
         rv="rise" block="fld2" />

      {/* ---- impact ---- */}
      <T x={1037} y={9349.5} w={1400} align="center" s="tmImpact"
         lines={C.impact.headline} rv="lines" block="imp" />
      <T x={1059.5} y={9617} w={1500} align="center" s="tmImpactSub"
         lines={C.impact.sub} rv="rise" block="imp" at={320} />

      {C.impact.quotes.map((q, i) => (
        <Fragment key={q.name}>
          <T x={FQ_X[i]} y={9788.5} s="tmFQ" lines={q.lines}
             rv="rise" block="iq" at={i * 110} />
          <T x={FQ_N[i].x} y={FQ_N[i].y} s="tmFQName" color={q.colour}
             lines="-" rv="rise" block="iq" at={i * 110 + 80} />
          <T x={FQ_N[i].n} y={FQ_N[i].y} s="tmFQName" color={q.colour}
             lines={q.name} rv="rise" block="iq" at={i * 110 + 80} />
          <T x={FQ_N[i].r} y={FQ_N[i].ry} s="tmFQRole" lines={q.role}
             rv="rise" block="iq" at={i * 110 + 120} />
        </Fragment>
      ))}

      {/* ---- end of the case study (not in the Figma) ---- */}
      <T x={472} y={11200} s="footLink" lines="View next project"
         as="a" href="/work/lighthouse" rv="lines" block="end" />
      <T x={472} y={11300} s="footLinkAlt" lines="Contact"
         as="a" href="mailto:shah.manavd@northeastern.edu" rv="lines" block="end" at={140} />
      <T x={950} y={11640} w={900} align="center" s="egg" className="egg"
         lines="god bless the white monster" rv="rise" block="end" at={520} />
    </Frame>
  )
}
