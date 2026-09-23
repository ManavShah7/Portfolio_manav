import Frame from '@/components/Frame'
import Carousel from '@/components/Carousel'
import SectionRail from '@/components/SectionRail'
import MotionDriver from '@/components/MotionDriver'
import { T, Rect, Img, Band, Scrim, Seam, Icon, BrandIcon, VideoBand } from '@/components/Nodes'
import fs from 'node:fs'
import path from 'node:path'

import { Fragment } from 'react'
import * as C from '@/lib/peak-copy'

const H = 14866
const SCRIM = true

// Drop a clip in and it plays; until then the band is just the still.
const hasAsset = f => fs.existsSync(path.join(process.cwd(), 'public', f))
const PURPLE_VIDEO = hasAsset('figma/cs-purple.mp4')

// Real marks, from lib/brand-icons.js. Health Connect rather than Google Fit:
// the Fit APIs are deprecated and only supported to the end of 2026, and
// Health Connect is what an Android app reads from now.
const INTEGRATIONS = [
  { label: 'Hevy',           icon: 'hevy' },
  { label: 'Health Connect', icon: 'google' },
  { label: 'Apple Health',   icon: 'apple' },
  { label: 'Strava',         icon: 'strava' },
]

// Sampled every 5% down the band in the export; both gradients are perfectly
// uniform horizontally, so a plain vertical ramp reproduces them exactly.
const CORAL = 'linear-gradient(180deg,#E65342 0%,#E7594F 5%,#E86262 10%,#E86A75 15%,#E97286 20%,#E97A96 25%,#EA82A2 30%,#EB88A7 35%,#EC90AC 40%,#EE98B3 45%,#EFA1B9 50%,#F1ABC1 55%,#F3B7CA 60%,#F5C0D0 65%,#F6C8D6 70%,#F7D1DC 75%,#F9DAE4 80%,#FBE4EB 85%,#FBECF0 90%,#FDF5F8 95%,#FFFEFE 100%)'
const PURPLE = 'linear-gradient(180deg,#6B00A8 0%,#7B14B6 10%,#8C29C4 20%,#9D3ED4 30%,#AE53E2 40%,#B663E5 50%,#BD73E7 60%,#C583EA 70%,#D4A3F0 80%,#E4C3F6 90%,#F3E3FC 100%)'

export default function Peak() {
  return (
    <Frame height={H} overlay={<SectionRail />}>
      <MotionDriver />

      {/* ---- bands ---- */}
      <Band y={0}     h={832}  className="checker" />
      <Band y={832}   h={2662} fill="#FFFFFF" />
      <Band y={3494}  h={1374} fill={CORAL} />
      <Band y={4868}  h={1163} fill="#FFFFFF" />
      <Band y={6031}  h={4120} fill="#101010" />
      {/* drop the clip at public/figma/cs-purple.mp4 - the still stays as the
          poster and is used on its own until the file is there */}
      <VideoBand y={10151} h={1395} src="/figma/cs-purple.mp4"
                 poster="/figma/cs-purple-photo.webp" on={PURPLE_VIDEO} />
      <Band y={11546} h={1343} fill={PURPLE} />
      {/* the photo ends on #4A0381 and the ramp below starts on #6B00A8 - a
          39-level step you can see. Dissolve the last 140px into the ramp's
          own first colour so the two read as one purple. */}
      <Seam y={11406} h={140} to={[107, 0, 168]} />
      {/* the ramp stops at #F3E3FC and white begins: a 29-level step. */}
      <Seam y={12749} h={140} to={[255, 255, 255]} />
      <Band y={12889} h={1237} fill="#FFFFFF" />
      <Band y={14126} h={740}  fill="#F5F5F7" />

      {/* the section rail is rendered by <Frame overlay>, outside the scaled
          canvas, so it can be pinned with native sticky */}

      {/* ---- overview ---- */}
      <T x={424.5} y={1003.5} s="headline" lines={C.overview.headline} rv="lines" block="ov" />
      <T x={424.5} y={1129}   s="body"     lines={C.overview.p1} rv="rise" block="ov" at={240} />
      <T x={424.5} y={1346}   s="body"     lines={C.overview.p2} rv="rise" block="ov" at={330} />

      <T x={426.5}  y={1545.5} s="metaLabel" lines="Role" rv="rise" block="ov" at={420} />
      <T x={809}    y={1545.5} s="metaLabel" lines="Current Status" rv="rise" block="ov" at={470} />
      <T x={1189.5} y={1545.5} s="metaLabel" lines="Skills" rv="rise" block="ov" at={520} />
      <T x={426}    y={1592}   s="metaValue" lines={C.overview.meta[0].values} rv="rise" block="ov" at={420} />
      <T x={809}    y={1600}   s="metaValue" lines={C.overview.meta[1].values} rv="rise" block="ov" at={470} />
      <T x={1190}   y={1598.5} s={{ size: 26, weight: 500, lh: 31, color: '#1C1C1E' }}
         lines={C.overview.meta[2].values} rv="rise" block="ov" at={520} />

      {/* ---- problem ---- */}
      <T x={980.75} y={1826.5} w={1300} align="center" s="headline" lines={C.problem.headline} rv="lines" block="pb" />
      <T x={950.5}  y={1952}   w={1300} align="center" s="body"     lines={C.problem.body} rv="rise" block="pb" at={280} />

      <Rect x={420} y={2094} w={1061} h={599} fill="#F5F5F7" rv="card" block="pc1" />
      <T x={962.5} y={2215} w={1000} align="center" s="body" lines={C.problem.body} rv="card" block="pc1" />
      <Img x={693}  y={2380} w={133} h={267} src="/figma/cs-phone-light-a.png" alt="" rv="card" block="pc1" />
      <Img x={893}  y={2378} w={133} h={267} src="/figma/cs-phone-light-a.png" alt="" rv="card" block="pc1" />
      <Img x={1093} y={2376} w={133} h={267} src="/figma/cs-phone-light-a.png" alt="" rv="card" block="pc1" />

      <Rect x={415} y={2715} w={521} h={709} fill="#F5F5F7" rv="card" block="pc2" />
      <T x={481}   y={2784} s="cardHead" lines={C.problem.cards[0].head} rv="card" block="pc2" />
      <T x={481}   y={2889} s="cardBody" lines={C.problem.cards[0].body} rv="card" block="pc2" />
      {/* not in the Figma: an icon apiece in the empty lower half of each card */}
      <Icon x={481} y={3176} size={112} stroke={7.5} name="form" rv="card" block="pc2" />

      <Rect x={960} y={2712} w={521} h={709} fill="#F5F5F7" rv="card" block="pc2" at={130} />
      <T x={1026}   y={2781} s="cardHead" lines={C.problem.cards[1].head} rv="card" block="pc2" at={130} />
      <T x={1026}   y={2889} s="cardBody" lines={C.problem.cards[1].body} rv="card" block="pc2" at={130} />
      <Icon x={1026} y={3173} size={112} stroke={7.5} name="missed" rv="card" block="pc2" at={130} />

      {/* ---- research ---- */}
      <T x={1042.6} y={3725.5} w={1300} align="center" s="headlineW" lines={C.research.headline} rv="lines" block="rs" />
      <Rect x={415} y={3920} w={1232} h={886} fill="#FFFFFF" rv="card" block="rsc" />
      <T x={1022.75} y={3994} w={1100} align="center" s="cardHead" lines={[C.research.cardHead[0]]} rv="card" block="rsc" />
      <T x={1025.75} y={4042} w={1100} align="center" s="cardHead" lines={[C.research.cardHead[1]]} rv="card" block="rsc" />
      <T x={1030.75} y={4105} w={1100} align="center" s="cardBody" lines={C.research.cardBody} rv="card" block="rsc" />
      {C.research.quotes.map((q, i) => {
        const x = [601, 836, 1071, 1306][i]
        const qy = [4311.5, 4312.5, 4312.5, 4312.5][i]
        return (
          <Fragment key={i}>
            <T x={x} y={qy} s="quoteBody" lines={q} rv="card" block="rsc" />
            <T x={x} y={4648}   s="quoteName" lines={C.research.name} rv="card" block="rsc" />
            <T x={x} y={4674.5} s="quoteRole" lines={C.research.role} rv="card" block="rsc" />
          </Fragment>
        )
      })}

      {/* ---- where smart-tracking stops ---- */}
      <T x={415.5} y={4979.5} s="headline" lines={C.ceiling.headline} rv="lines" block="ce" />
      <Carousel x={415} y={5114} w={1485} h={755} inner={2483} step={1249}
                paddleY={5906.5} paddleX={1426}>
        <Rect x={0} y={0} w={1217} h={755} fill="#F5F5F7" rv="card" block="ce" at={240} />
        <T x={104} y={97} s="cardHead" lines={C.ceiling.cardHead} rv="card" block="ce" at={240} />
        <Img x={294} y={343} w={148} h={301} src="/figma/cs-phone-light-b.png" alt="" rv="card" block="ce" at={240} />
        <Img x={528} y={343} w={148} h={301} src="/figma/cs-phone-light-b.png" alt="" rv="card" block="ce" at={240} />
        <Img x={762} y={343} w={148} h={301} src="/figma/cs-phone-light-b.png" alt="" rv="card" block="ce" at={240} />
        <Rect x={1249} y={0} w={1217} h={755} fill="#FEFEFE" />
      </Carousel>

      {/* ---- solution (black) ---- */}
      <T x={1024}    y={6393.5} w={1300} align="center" s="headlineLime" lines={[C.solution.headline[0]]}
         color="#FFFFFF" rv="lines" block="sol" />
      <T x={1023.25} y={6459.5} w={1300} align="center" s="headlineLime" lines={[C.solution.headline[1]]} rv="lines" block="sol" at={110} />

      <Rect x={419} y={6775} w={1217} h={755} fill="#C7D13D" rv="card" block="lime" />
      <T x={1021} y={6872} w={1100} align="center" s="cardHead" color="#010101" lines={C.solution.limeHead} rv="card" block="lime" />
      <Img x={706}  y={7062} w={126} h={233} src="/figma/cs-phone-lime.png" alt="" rv="card" block="lime" />
      <Img x={948}  y={7063} w={126} h={233} src="/figma/cs-phone-lime.png" alt="" rv="card" block="lime" />
      <Img x={1203} y={7062} w={126} h={233} src="/figma/cs-phone-lime.png" alt="" rv="card" block="lime" />

      <T x={1030.25} y={7740.5} w={1300} align="center" s="headlineW" lines={[C.solution.liftHead[0]]} rv="lines" block="lift" />
      <T x={1030}    y={7800.5} w={1300} align="center" s="headlineW" lines={[C.solution.liftHead[1]]} rv="lines" block="lift" at={110} />
      <T x={1011.25} y={7896}   w={1300} align="center" s="bodyW"     lines={C.solution.liftBody} rv="rise" block="lift" at={330} />
      <Img x={543}  y={8128} w={270} h={549} src="/figma/cs-phone-dark-big.png" alt="" rv="card" block="lift" at={420} />
      <Img x={1137} y={8128} w={270} h={549} src="/figma/cs-phone-dark-big.png" alt="" rv="card" block="lift" at={540} />

      <T x={420.5} y={8907.5} s="headlineW" lines={[C.solution.catalogHead[0]]} rv="lines" block="cat" />
      <T x={419}   y={8967.5} s="headlineW" lines={[C.solution.catalogHead[1]]} rv="lines" block="cat" at={110} />

      <Carousel x={419} y={9095} w={1481} h={739} inner={2261} step={574}
                paddleY={9952.5} paddleX={1574} depth>
        {[0, 1, 2].map(i => {
          const left = i * 574
          const phone = [185, 172, 185][i]
          const pad = [35, 35, 35][i]
          const at = 300 + i * 120
          return (
            <Fragment key={i}>
              <Rect x={left} y={0} w={539} h={739} fill="#000000" rv="card" block="cat" at={at} data-depth={i} />
              <Img x={left + phone} y={65} w={170} h={345} src="/figma/cs-phone-darkcard.png" alt="" rv="card" block="cat" at={at} data-depth={i} />
              <T x={left + pad} y={558} s="featTitle" lines={C.solution.cards[i].title} rv="card" block="cat" at={at} data-depth={i} />
              <T x={left + pad} y={598} s="featBody"  lines={C.solution.cardBody} rv="card" block="cat" at={at} data-depth={i} />
            </Fragment>
          )
        })}
      </Carousel>

      {/* ---- social (purple photo) ----
          The one place on the page where white type sits on a busy photo.
          Apple's progressive blur: backdrop-filter plus a mask whose alpha
          follows t^1.7, so the blur arrives without a visible edge. Not in the
          Figma - set SCRIM to false to drop it. */}
      {SCRIM && <Scrim y={10151} h={433} />}
      <T x={357} y={10395.5} s="headlineW" lines={C.social.headline} rv="lines" block="soc" />
      <Rect x={357} y={10584} w={1217} h={755} fill="#FFFFFF" rv="card" block="soc" at={260} />
      <Img x={596}  y={10669} w={178} h={361} src="/figma/cs-phone-white.png" alt="" rv="card" block="soc" at={260} />
      <Img x={1157} y={10669} w={178} h={361} src="/figma/cs-phone-white.png" alt="" rv="card" block="soc" at={260} />
      <T x={682.5}   y={11091.5} w={600} align="center" s="caption"     lines={C.social.cols[0].caption} rv="card" block="soc" at={260} />
      <T x={1249.75} y={11091.5} w={600} align="center" s="caption"     lines={C.social.cols[1].caption} rv="card" block="soc" at={260} />
      <T x={697}     y={11136}   w={600} align="center" s="captionBody" lines={C.social.colBody} rv="card" block="soc" at={260} />
      <T x={1250}    y={11136}   w={600} align="center" s="captionBody" lines={C.social.colBody} rv="card" block="soc" at={260} />

      {/* ---- adapts (purple gradient) ---- */}
      <T x={936.5} y={11770.5} w={1300} align="center" lines={C.adapts.headline}
         s={{ size: 50, weight: 700, lh: 59.5, color: '#FFFFFF' }} rv="lines" block="ad" />
      <T x={939.1} y={11992}   w={1300} align="center" s="bodyW"     lines={C.adapts.body} rv="rise" block="ad" at={340} />

      {/* ---- what it connects to (not in the Figma; Manav's ask) ---- */}
      <T x={950} y={12232} w={900} align="center" s="bodyW" lines="Connects with what you already use"
         rv="rise" block="int" />
      {INTEGRATIONS.map((it, i) => {
        const cx = 500 + i * 300
        return (
          <Fragment key={it.label}>
            <BrandIcon cx={cx} y={12300} name={it.icon}
                       rv="card" block="int" at={160 + i * 90} />
            <T x={cx} y={12452} w={280} align="center" s="captionW" lines={it.label}
               rv="rise" block="int" at={220 + i * 90} />
          </Fragment>
        )
      })}

      {/* ---- what's next ---- */}
      <T x={357.5} y={13111.5} lines={C.whatsNext.headline}
         s={{ size: 50, weight: 700, lh: 60, color: '#1C1C1E' }} rv="lines" block="wn" />
      <Carousel x={357} y={13379} w={1543} h={378} inner={2249} step={570}
                paddleY={13801.5} paddleX={1633}>
        {[0, 1, 2].map(i => {
          const left = i * 570
          const at = 340 + i * 120
          return (
            <Fragment key={i}>
              <Rect x={left} y={0} w={539} h={378} fill="#F5F5F7" rv="card" block="wn" at={at} />
              <T x={left + 49} y={182} s="nextTitle" lines={C.whatsNext.cards[i].title} rv="card" block="wn" at={at} />
              <T x={left + 49} y={233} s="nextBody"  lines={C.whatsNext.cards[i].body} rv="card" block="wn" at={at} />
            </Fragment>
          )
        })}
      </Carousel>

      {/* ---- end of the case study ----
          Nothing is drawn in this band in the Figma; this is Manav's ask. */}
      <T x={357} y={14330} s="footLink" lines="View next project"
         as="a" href="/work/times-media" rv="lines" block="end" />
      <T x={357} y={14430} s="footLinkAlt" lines="Contact"
         as="a" href="mailto:shah.manavd@northeastern.edu" rv="lines" block="end" at={140} />
      <T x={950} y={14806} w={900} align="center" s="egg" className="egg"
         lines="god bless the white monster" rv="rise" block="end" at={520} />
    </Frame>
  )
}
