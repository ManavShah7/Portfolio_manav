import { Fragment } from 'react'

import Frame from '@/components/Frame'
import Carousel from '@/components/Carousel'
import SectionRail from '@/components/SectionRail'
import MotionDriver from '@/components/MotionDriver'
import { T, Rect, Img, Shot, Plate, PhoneOutline, Cover, Band, MediaBand } from '@/components/Nodes'
import { slots } from '@/lib/clips'
import S from '@/lib/styles'
import { PEAK as G } from '@/lib/grid'
import * as C from '@/lib/peak-copy'

// Rebuilt to Manav's new frame. Band stops and the x-grid are measured off that
// export; the type ramp is the existing one, nudged to the sizes it draws.
//
// The page is three quarters black now and about a third of the words. It also
// no longer carries the purple photo, the lime card or the two-phone social
// card - see the sections below for what replaced each.
const H = 19591

const V = slots('peak')

// --- bands, measured off the export -----------------------------------------
const HERO_H  = 1022
const DARK    = '#141419'          // the Problems / catalog ground
const BLACK    = '#000000'
const WHITE    = '#FFFFFF'
const GREY     = '#F5F5F7'

const INTRO_Y = HERO_H,  INTRO_H = 1134   // black, the four opening lines
const PROB_Y  = 2156,    PROB_H  = 1872   // #141419
const RSCH_Y  = 4028,    RSCH_H  = 2710   // white
const FIND_Y  = 6738,    FIND_H  = 2390   // #F5F5F7
const SOL_Y   = 9128,    SOL_H   = 4880   // black -> #141419
const SOC1_Y  = 14472,   SOC_H   = 967    // friends band 1
const SOC2_Y  = 15965                      // friends band 2
const ADAPT_Y = 16931
const NEXT_Y  = 18011
const FOOT_Y  = 19191

// --- the opening lines ------------------------------------------------------
// the frame indents the opening lines past the measure, and steps them 220
const INTRO_X = 501
const INTRO_1 = 1207, INTRO_STEP = 220

// --- problems ---------------------------------------------------------------
const PB_EYE  = 2387, PB_HEAD = 2454
const PB_CARD = 2577, PB_CARD_H = 599
const PB_TWO  = 3198, PB_TWO_H = 599

// --- research ---------------------------------------------------------------
const RS_EYE  = 4221, RS_HEAD = 4284
const RS_ASIDE = 4325
const RS_CARD = 4608, RS_CARD_H = 529
const RS_QUOTE = 5248, RS_WHO = 5411
const RS_RED  = 5533, RS_RED_BODY = 5732
const RS_CARD2 = 5829
const RS_QUOTE2 = 6470, RS_WHO2 = 6633

// --- findings ---------------------------------------------------------------
const FD_EYE  = 6875, FD_HEAD = 6963
const FD_TOP  = 7117
const FD_SHORT = 545, FD_TALL = 1229, FD_LOW = 660   // the masonry shapes
const FD_WIDE = 8378, FD_WIDE_H = 599

// --- solution ---------------------------------------------------------------
const SL_HEAD = 9351
const GLOBE_Y = 9727, GLOBE_H = 767
const LIFT_HEAD = 10851
const LIFT_PHONE = 11124, LIFT_PHONE_H = 549
const LIFT_CAP = 11790
const CAT_HEAD = 12309, CAT_BODY = 12450
const CAT_TRACK = 12706, CAT_CARD_H = 739
const CAT_CAP = 13480

// --- friendship / adapts / next ---------------------------------------------
const SOC_HEAD = 14150
const SOC_MID  = 15660
const AD_HEAD  = 17130
const AD_CARD  = 17412, AD_CARD_H = 599
const WN_HEAD  = 18194
const WN_TRACK = 18433, WN_CARD_H = 378
const END_Y    = 18990

// the rail follows the new bands
const RAIL = {
  items: [
    { label: 'Overview',     x: 126.5, y: 997.5,  to: INTRO_Y },
    { label: 'Problem',      x: 127.5, y: 1051,   to: PROB_Y },
    { label: 'Research',     x: 127.5, y: 1104,   to: RSCH_Y },
    { label: 'Solution',     x: 126.5, y: 1153.5, to: SOL_Y },
    { label: "What's Next?", x: 126.5, y: 1203.5, to: NEXT_Y },
  ],
  natural: 960, stick: 300, height: 270, end: H,
  dark: [[INTRO_Y, RSCH_Y], [SOL_Y, 14008], [SOC1_Y, SOC1_Y + SOC_H], [SOC2_Y, SOC2_Y + SOC_H]],
  light: '#5A5A5A', darkInk: '#A9A9A9',
}

// two-up and the carousels
const HALF = G.colW(2)
const CAT_W = 487, CAT_STEP = 503
const WN_W = 536, WN_STEP = 568

export default function Peak() {
  return (
    <Frame height={H} overlay={<SectionRail config={RAIL} />}>
      <MotionDriver />

      {/* ---- bands ---- */}
      <Cover y={0} h={HERO_H} clip={V('hero')} poster="/media/peak-hero-poster.webp" />
      <Band y={INTRO_Y} h={INTRO_H} fill={BLACK} />
      <Band y={PROB_Y}  h={PROB_H}  fill={DARK} />
      <Band y={RSCH_Y}  h={RSCH_H}  fill={WHITE} />
      <Band y={FIND_Y}  h={FIND_H}  fill={GREY} />
      <Band y={SOL_Y}   h={SOL_H}   fill={BLACK} />
      {/* the catalog half of the solution sits on the lighter ground */}
      <Band y={12053} h={14008 - 12053} fill={DARK} />
      <Band y={14008} h={SOC1_Y - 14008} fill={WHITE} />
      <Band y={SOC1_Y + SOC_H} h={SOC2_Y - SOC1_Y - SOC_H} fill={WHITE} />
      <Band y={SOC2_Y + SOC_H} h={FOOT_Y - SOC2_Y - SOC_H} fill={WHITE} />
      <Band y={FOOT_Y} h={H - FOOT_Y} fill={GREY} />

      {/* ---- the opening, four lines on black ---- */}
      {C.intro.map((lines, i) => (
        <T key={i} x={INTRO_X} y={INTRO_1 + i * INTRO_STEP} s="introW" lines={lines}
           rv="lines" block={`in${i}`} />
      ))}

      {/* ---- problems ---- */}
      <T x={G.C} y={PB_EYE} w={800} align="center" s="eyebrowD" lines={C.problem.eyebrow}
         rv="rise" block="pb" />
      <T x={G.C} y={PB_HEAD} w={1500} align="center" s="headlineW" lines={C.problem.headline}
         rv="lines" block="pb" at={120} sv="drift" />

      <Plate x={G.L} y={PB_CARD} w={G.W} h={PB_CARD_H} clip={V('problem')}
             rv="card" block="pbc" />
      {C.problem.cards.map((lines, i) => (
        <Fragment key={i}>
          <Rect x={G.col(i, 2)} y={PB_TWO} w={HALF} h={PB_TWO_H} r={20} fill="#050505"
                rv="card" block="pbc2" at={i * 120} />
          <T x={G.col(i, 2) + 44} y={PB_TWO + 46} s="cardHeadW" lines={lines}
             rv="card" block="pbc2" at={i * 120} />
        </Fragment>
      ))}

      {/* ---- user research ---- */}
      <T x={G.L} y={RS_EYE} s="eyebrow" lines={C.research.eyebrow} rv="rise" block="rs" />
      <T x={G.L} y={RS_HEAD} s="headline" lines={C.research.headline}
         rv="lines" block="rs" at={120} />
      <T x={G.col(1, 2) + 130} y={RS_ASIDE} s="aside" lines={C.research.aside}
         rv="rise" block="rs" at={300} />

      {C.research.quotes.map((q, i) => (
        <Fragment key={i}>
          <Plate x={G.col(i, 2)} y={RS_CARD} w={HALF} h={RS_CARD_H}
                 clip={V(`voice${i + 1}`)} rv="card" block="rq" at={i * 120} />
          <T x={G.col(i, 2)} y={RS_QUOTE} s="pkQuote" lines={q.lines}
             rv="card" block="rq" at={i * 120} />
          <T x={G.col(i, 2)} y={RS_WHO} s="pkWho" lines={q.who}
             rv="card" block="rq" at={i * 120} />
        </Fragment>
      ))}

      <T x={G.C} y={RS_RED} w={1500} align="center" s="headline" lines={C.research.redditHead}
         rv="lines" block="rr" sv="drift" />
      <T x={G.C} y={RS_RED_BODY} w={900} align="center" s="aside" lines={C.research.redditBody}
         rv="rise" block="rr" at={260} />

      {C.research.redditQuotes.map((q, i) => (
        <Fragment key={i}>
          <Plate x={G.col(i, 2)} y={RS_CARD2} w={HALF} h={RS_CARD_H}
                 clip={V(`reddit${i + 1}`)} rv="card" block="rq2" at={i * 120} />
          <T x={G.col(i, 2)} y={RS_QUOTE2} s="pkQuote" lines={q.lines}
             rv="card" block="rq2" at={i * 120} />
          <T x={G.col(i, 2)} y={RS_WHO2} s="pkWho" lines={q.who}
             rv="card" block="rq2" at={i * 120} />
        </Fragment>
      ))}

      {/* ---- research findings, a masonry of three ---- */}
      <T x={G.L} y={FD_EYE} s="eyebrow" lines={C.findings.eyebrow} rv="rise" block="fd" />
      <T x={G.L} y={FD_HEAD} s="headline" lines={C.findings.headline}
         rv="lines" block="fd" at={120} />

      {/* left column: a short card over a lower one; right column: one tall */}
      <Rect x={G.col(0, 2)} y={FD_TOP} w={HALF} h={FD_SHORT} r={20} fill={WHITE}
            rv="card" block="fdc" />
      <T x={G.col(0, 2) + 44} y={FD_TOP + 52} s="findCard" lines={C.findings.cards[0]}
         rv="card" block="fdc" />

      <Rect x={G.col(1, 2)} y={FD_TOP} w={HALF} h={FD_TALL} r={20} fill={WHITE}
            rv="card" block="fdc" at={120} />
      <T x={G.col(1, 2) + 44} y={FD_TOP + 52} s="findCard" lines={C.findings.cards[1]}
         rv="card" block="fdc" at={120} />

      <Rect x={G.col(0, 2)} y={FD_TOP + FD_SHORT + 24} w={HALF} h={FD_LOW} r={20} fill={WHITE}
            rv="card" block="fdc" at={240} />
      <T x={G.col(0, 2) + 44} y={FD_TOP + FD_SHORT + 76} s="findCard" lines={C.findings.cards[2]}
         rv="card" block="fdc" at={240} />

      <Rect x={G.L} y={FD_WIDE} w={G.W} h={FD_WIDE_H} r={20} fill={WHITE}
            rv="card" block="fdw" />
      <T x={G.C} y={FD_WIDE + 264} w={1100} align="center" s="ceiling" lines={C.findings.ceiling}
         rv="card" block="fdw" />

      {/* ---- solution ---- */}
      {C.solution.headline.map((l, i) => (
        <T key={i} x={G.C} y={SL_HEAD + i * S.solHead.lh} w={1500} align="center"
           s="solHead" color={i === 0 ? '#FFFFFF' : '#C7D13D'} lines={[l]}
           rv="lines" block="sl" at={i * 110} sv="drift" />
      ))}

      <MediaBand y={GLOBE_Y} h={GLOBE_H} clip={V('globe')} fill={BLACK}
                 poster="/media/peak-globe-poster.webp" />

      <T x={G.C} y={LIFT_HEAD} w={1500} align="center" s="liftHead" lines={C.solution.liftHead}
         rv="lines" block="lf" />
      {C.solution.liftCaps.map((cap, i) => (
        <Fragment key={i}>
          <Shot x={G.colC(i, 2) - 135} y={LIFT_PHONE} w={270} h={LIFT_PHONE_H}
                src="/figma/cs-phone-dark-big.png" clip={V(['lift-left', 'lift-right'][i])}
                alt="" sv="tilt" />
          <T x={G.colC(i, 2) - 170} y={LIFT_CAP} s="liftCap"
             lines={cap.lines} rv="rise" block="lf" at={260 + i * 120} />
        </Fragment>
      ))}

      <T x={G.L} y={CAT_HEAD} s="headlineW" lines={C.solution.catalogHead}
         rv="lines" block="ct" />
      <T x={G.L} y={CAT_BODY} s="catBody" lines={C.solution.catalogBody}
         rv="rise" block="ct" at={240} />

      {/* the caption sits UNDER each card in the new frame, not printed on it */}
      <Carousel x={G.L} y={CAT_TRACK} w={1900 - G.L} h={CAT_CARD_H + 300}
                inner={CAT_W + 3 * CAT_STEP} step={CAT_STEP}
                paddleY={CAT_TRACK + CAT_CARD_H + 250} paddleX={G.R - 206}>
        {C.solution.cards.map((c, i) => {
          const left = i * CAT_STEP
          const at = 200 + i * 110
          return (
            <Fragment key={i}>
              <Rect x={left} y={0} w={CAT_W} h={CAT_CARD_H} r={20} fill="#050505"
                    rv="card" block="ctc" at={at} />
              <Img x={left + (CAT_W - 170) / 2} y={140} w={170} h={345}
                   src="/figma/cs-phone-darkcard.png" alt=""
                   rv="card" block="ctc" at={at} />
              <T x={left} y={CAT_CARD_H + 45} s="catRest" lines={c.lines} w={CAT_W}
                 lead={{ text: c.lead, color: '#FFFFFF', weight: 600 }}
                 rv="card" block="ctc" at={at} />
            </Fragment>
          )
        })}
      </Carousel>

      {/* ---- friendship ---- */}
      <T x={G.C} y={SOC_HEAD} w={1200} align="center" s="headline" color="#E8842A"
         lines={[C.social.head[0]]} rv="lines" block="sh" />
      <T x={G.C} y={SOC_HEAD + S.headline.lh} w={1200} align="center" s="headline"
         lines={[C.social.head[1]]} rv="lines" block="sh" at={110} />

      {[0, 1].map(i => {
        const b = C.social.bands[i]
        const y = i === 0 ? SOC1_Y : SOC2_Y
        const right = b.align === 'right'
        return (
          <Fragment key={i}>
            <MediaBand y={y} h={SOC_H} clip={V(`friends${i + 1}`)} fill="#101010"
                       poster={`/media/peak-friends${i + 1}-poster.webp`}
                       over={'linear-gradient(rgba(0,0,0,.26),rgba(0,0,0,.26)),'
                             + `linear-gradient(${right ? 270 : 90}deg,`
                             + 'rgba(0,0,0,.5) 0%,rgba(0,0,0,.22) 45%,rgba(0,0,0,0) 80%),'
                             + 'linear-gradient(90deg,rgba(0,0,0,.45) 0%,rgba(0,0,0,0) 22%)'} />
            {/* the frame draws a stroked phone here, not a device shot */}
            <PhoneOutline x={right ? 311 : 1316} y={y + (SOC_H - 600) / 2}
                          w={300} h={600} stroke="rgba(6,6,6,.9)" />
            <T x={right ? G.R : G.L} y={y + (SOC_H - S.bandHead.lh * b.lines.length) / 2}
               w={right ? 700 : undefined} align={right ? 'right' : 'left'}
               s="bandHead" lines={b.lines} rv="lines" block={`sb${i}`} />
          </Fragment>
        )
      })}

      <T x={G.L} y={SOC_MID} s="headline" lines={C.social.mid}
         accent={{ text: C.social.midAccent, color: '#E8842A' }}
         rv="lines" block="sm" />

      {/* ---- adapts ---- */}
      <T x={G.C} y={AD_HEAD} w={1400} align="center" s="headline" lines={C.adapts.headline}
         rv="lines" block="ad" sv="drift" />
      <Plate x={G.L} y={AD_CARD} w={G.W} h={AD_CARD_H} clip={V('adapts')}
             rv="card" block="adc" />

      {/* ---- what's next ---- */}
      <T x={G.L} y={WN_HEAD} s="headline" lines={C.whatsNext.headline}
         rv="lines" block="wn" />
      <Carousel x={G.L} y={WN_TRACK} w={1900 - G.L} h={WN_CARD_H} inner={WN_W + 2 * WN_STEP}
                step={WN_STEP} paddleY={WN_TRACK + WN_CARD_H + 40} paddleX={G.R - 206}>
        {C.whatsNext.cards.map((c, i) => {
          const left = i * WN_STEP
          const at = 200 + i * 110
          return (
            <Fragment key={i}>
              <Rect x={left} y={0} w={WN_W} h={WN_CARD_H} r={20} fill={GREY}
                    rv="card" block="wnc" at={at} />
              <T x={left + 36} y={193} s="nextTitle" lines={c.title} rv="card" block="wnc" at={at} />
              <T x={left + 36} y={241} s="nextBody" lines={c.body} rv="card" block="wnc" at={at} />
            </Fragment>
          )
        })}
      </Carousel>

      {/* ---- end ---- */}
      <T x={G.L} y={END_Y} s="footLink" lines={C.end.next}
         as="a" href="/work/times-media" rv="lines" block="end" />
      <T x={G.L} y={END_Y + 100} s="footLinkAlt" lines={C.end.contact}
         as="a" href="mailto:shah.manavd@northeastern.edu" rv="lines" block="end" at={140} />
      <T x={G.C} y={H - 240} w={900} align="center" s="egg" className="egg"
         lines="god bless the white monster" rv="rise" block="end" at={520} />
    </Frame>
  )
}
