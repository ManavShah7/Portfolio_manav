import { Fragment } from 'react'

import Frame from '@/components/Frame'
import Carousel from '@/components/Carousel'
import MotionDriver from '@/components/MotionDriver'
import PinnedHero from '@/components/PinnedHero'
import { T, Rect, Img, Plate, PhoneOutline, Band, MediaBand } from '@/components/Nodes'
import { media, slots } from '@/lib/clips'
import S from '@/lib/styles'
import * as C from '@/lib/peak-copy'

// Peak, to Manav's frame. Every x and y below is measured off that export and
// used as drawn - the frame hand-places its left column at 272, 280, 305, 320,
// 347, 361, 369, 372, 387, 486 and 507, and this page reproduces all of it
// rather than snapping to a measure. There is no section rail here.
const H = 19591
const V = slots('peak')
const HERO = media('peak-hero')

const BLACK = '#000000'
const DARK  = '#141419'
const WHITE = '#FFFFFF'
const GREY  = '#F5F5F7'

// --- bands ------------------------------------------------------------------
const HERO_H  = 1022
const INTRO_END = 2156          // the hero stays pinned this far down
const PROB_Y  = 2156, PROB_H = 1872
const RSCH_Y  = 4028, RSCH_H = 2710
const FIND_Y  = 6738, FIND_H = 2390
const SOL_Y   = 9128
const DARK_Y  = 12053
const SOC_W1  = 13888
const SOC1_Y  = 14472, SOC_H = 1099
const SOC_W2  = 15571
const SOC2_Y  = 16069
const FOOT_Y  = 19191

// --- intro ------------------------------------------------------------------
const IN_X = 507, IN_Y = 1207, IN_STEP = 220

// --- problems ---------------------------------------------------------------
const PB_EYE = 2387, PB_HEAD = 2454
const PB_BIG_X = 369.5, PB_BIG_W = 1160, PB_BIG_Y = 2577, PB_CARD_H = 599
const PB_TWO = [370.1, 966.7], PB_TWO_W = 565, PB_TWO_Y = 3198
const PB_PAD = 44

// --- research ---------------------------------------------------------------
const RS_X = 372, RS_EYE = 4221, RS_HEAD = 4284
const RS_ASIDE_X = 1112, RS_ASIDE_Y = 4325
const RS_COL1 = [368.9, 980.5], RS_COL2 = [369.5, 981.7], RS_CW = 550
const RS_CARD1 = 4608, RS_CARD_H = 529, RS_Q1 = 5248, RS_W1 = 5411
const RS_RED = 5601, RS_RED_BODY = 5745
const RS_CARD2 = 5829, RS_Q2 = 6470, RS_W2 = 6633

// --- findings ---------------------------------------------------------------
const FD_X = 372, FD_EYE = 6875, FD_HEAD = 6963
const FD_L = 361.1, FD_LW = 564.4, FD_R = 956.0, FD_RW = 581.7
const FD_TOP = 7116, FD_CARD_H = 599, FD_LOW = 7747, FD_TALL_H = 1229
const FD_WIDE_X = 346.8, FD_WIDE_W = 1184.9, FD_WIDE_Y = 8378, FD_WIDE_H = 599
const FD_PAD = 44

// --- solution ---------------------------------------------------------------
const SL_HEAD = 9351
const GLOBE_Y = 9727, GLOBE_H = 767
const LF_HEAD = 10851
const LF_PHONE = [567, 1236], LF_PW = 242, LF_PH = 437, LF_PY = 11194
const LF_CAP = [486, 1137], LF_CAP_Y = 11790
const CT_HEAD_X = 281, CT_HEAD = 12263
const CT_X = 279.5, CT_W = 486.7, CT_STEP = 502.5, CT_Y = 12539, CT_H = 739
const CT_CAP = 862          // the caption sits this far below the track top

// --- social / adapts / next --------------------------------------------------
const SOC_HEAD = 14116
const SOC_MID = 15760                 // centred now, not left
const AD_HEAD = 17229
const AD_X = 384.4, AD_W = 1185.6, AD_Y = 17582, AD_H = 599
const WN_X = 269, WN_HEAD = 18271
const WN_TX = 268.4, WN_W = 538, WN_STEP = 569.8, WN_Y = 18603, WN_H = 378
const END_Y = 19286

const CENTRE = 950

export default function Peak() {
  return (
    <Frame height={H}
           overlay={<PinnedHero h={HERO_H} pin={INTRO_END}
                                clip={HERO && HERO.video ? HERO.src : null}
                                poster="/media/peak-hero-poster.webp" />}>
      <MotionDriver />

      {/* ---- bands. Nothing is painted over 0..2156: that is the pinned hero
              showing through, darkening to black as the opening lines pass
              over it (see components/PinnedHero.js). ---- */}
      <Band y={PROB_Y} h={PROB_H} fill={DARK} />
      <Band y={RSCH_Y} h={RSCH_H} fill={WHITE} />
      <Band y={FIND_Y} h={FIND_H} fill={GREY} />
      <Band y={SOL_Y}  h={DARK_Y - SOL_Y} fill={BLACK} />
      <Band y={DARK_Y} h={SOC_W1 - DARK_Y} fill={DARK} />
      <Band y={SOC_W1} h={SOC1_Y - SOC_W1} fill={WHITE} />
      <Band y={SOC_W2} h={SOC2_Y - SOC_W2} fill={WHITE} />
      <Band y={SOC2_Y + SOC_H} h={FOOT_Y - SOC2_Y - SOC_H} fill={WHITE} />
      <Band y={FOOT_Y} h={H - FOOT_Y} fill={GREY} />

      {/* ---- the opening lines, riding up over the pinned hero ---- */}
      {C.intro.map((lines, i) => (
        <T key={i} x={IN_X} y={IN_Y + i * IN_STEP} s="introW" lines={lines}
           rv="lines" block={`in${i}`} />
      ))}

      {/* ---- problems ---- */}
      <T x={CENTRE} y={PB_EYE} w={800} align="center" s="eyebrowD"
         lines={C.problem.eyebrow} rv="rise" block="pb" />
      <T x={CENTRE} y={PB_HEAD} w={1500} align="center" s="headlineW"
         lines={C.problem.headline} rv="lines" block="pb" at={120} sv="drift" />

      <Plate x={PB_BIG_X} y={PB_BIG_Y} w={PB_BIG_W} h={PB_CARD_H}
             clip={V('problem')} rv="card" block="pbc" />
      {C.problem.cards.map((lines, i) => (
        <Fragment key={i}>
          <Rect x={PB_TWO[i]} y={PB_TWO_Y} w={PB_TWO_W} h={PB_CARD_H} r={20}
                fill="#050505" rv="card" block="pbc2" at={i * 120} />
          <T x={PB_TWO[i] + PB_PAD} y={PB_TWO_Y + 46} s="cardHeadW" lines={lines}
             rv="card" block="pbc2" at={i * 120} />
        </Fragment>
      ))}

      {/* ---- user research ---- */}
      <T x={RS_X} y={RS_EYE} s="eyebrow" lines={C.research.eyebrow} rv="rise" block="rs" />
      <T x={RS_X} y={RS_HEAD} s="pkHead" lines={C.research.headline}
         rv="lines" block="rs" at={120} />
      <T x={RS_ASIDE_X} y={RS_ASIDE_Y} s="aside" lines={C.research.aside}
         rv="rise" block="rs" at={300} />

      {C.research.quotes.map((q, i) => (
        <Fragment key={i}>
          <Plate x={RS_COL1[i]} y={RS_CARD1} w={RS_CW} h={RS_CARD_H}
                 clip={V(`voice${i + 1}`)} rv="card" block="rq" at={i * 120} />
          <T x={RS_COL1[i]} y={RS_Q1} s="pkQuote" lines={q.lines}
             rv="card" block="rq" at={i * 120} />
          <T x={RS_COL1[i]} y={RS_W1} s="pkWho" lines={q.who}
             rv="card" block="rq" at={i * 120} />
        </Fragment>
      ))}

      <T x={CENTRE} y={RS_RED} w={1500} align="center" s="pkHead"
         lines={C.research.redditHead} rv="lines" block="rr" sv="drift" />
      <T x={CENTRE} y={RS_RED_BODY} w={900} align="center" s="aside"
         lines={C.research.redditBody} rv="rise" block="rr" at={260} />

      {C.research.redditQuotes.map((q, i) => (
        <Fragment key={i}>
          <Plate x={RS_COL2[i]} y={RS_CARD2} w={RS_CW} h={RS_CARD_H}
                 clip={V(`reddit${i + 1}`)} rv="card" block="rq2" at={i * 120} />
          <T x={RS_COL2[i]} y={RS_Q2} s="pkQuote" lines={q.lines}
             rv="card" block="rq2" at={i * 120} />
          <T x={RS_COL2[i]} y={RS_W2} s="pkWho" lines={q.who}
             rv="card" block="rq2" at={i * 120} />
        </Fragment>
      ))}

      {/* ---- research findings. Two 599 cards stacked on the left, one 1229
              on the right - the frame's own shapes, not a tidy grid. ---- */}
      <T x={FD_X} y={FD_EYE} s="eyebrow" lines={C.findings.eyebrow} rv="rise" block="fd" />
      <T x={FD_X} y={FD_HEAD} s="pkHead" lines={C.findings.headline}
         rv="lines" block="fd" at={120} />

      <Rect x={FD_L} y={FD_TOP} w={FD_LW} h={FD_CARD_H} r={20} fill={WHITE}
            rv="card" block="fdc" />
      <T x={FD_L + FD_PAD} y={FD_TOP + 52} s="findCard" lines={C.findings.cards[0]}
         rv="card" block="fdc" />

      <Rect x={FD_R} y={FD_TOP} w={FD_RW} h={FD_TALL_H} r={20} fill={WHITE}
            rv="card" block="fdc" at={120} />
      <T x={FD_R + FD_PAD} y={FD_TOP + 52} s="findCard" lines={C.findings.cards[1]}
         rv="card" block="fdc" at={120} />

      <Rect x={FD_L} y={FD_LOW} w={FD_LW} h={FD_CARD_H} r={20} fill={WHITE}
            rv="card" block="fdc" at={240} />
      <T x={FD_L + FD_PAD} y={FD_LOW + 52} s="findCard" lines={C.findings.cards[2]}
         rv="card" block="fdc" at={240} />

      <Rect x={FD_WIDE_X} y={FD_WIDE_Y} w={FD_WIDE_W} h={FD_WIDE_H} r={20} fill={WHITE}
            rv="card" block="fdw" />
      <T x={FD_WIDE_X + FD_WIDE_W / 2} y={FD_WIDE_Y + 264} w={1100} align="center"
         s="ceiling" lines={C.findings.ceiling} rv="card" block="fdw" />

      {/* ---- solution ---- */}
      {C.solution.headline.map((l, i) => (
        <T key={i} x={CENTRE} y={SL_HEAD + i * S.solHead.lh} w={1500} align="center"
           s="solHead" color={i === 0 ? '#FFFFFF' : '#C7D13D'} lines={[l]}
           rv="lines" block="sl" at={i * 110} sv="drift" />
      ))}

      <MediaBand y={GLOBE_Y} h={GLOBE_H} clip={V('globe')} fill={BLACK}
                 poster="/media/peak-globe-poster.webp" />

      <T x={CENTRE} y={LF_HEAD} w={1500} align="center" s="liftHead"
         lines={C.solution.liftHead} rv="lines" block="lf" />
      {C.solution.liftCaps.map((cap, i) => (
        <Fragment key={i}>
          <PhoneOutline x={LF_PHONE[i]} y={LF_PY} w={LF_PW} h={LF_PH}
                        stroke="rgba(190,200,215,.55)" />
          <T x={LF_CAP[i]} y={LF_CAP_Y} s="liftCap" lines={cap.lines}
             rv="rise" block="lf" at={260 + i * 120} />
        </Fragment>
      ))}

      <T x={CT_HEAD_X} y={CT_HEAD} s="solHead" lines={C.solution.catalogHead}
         rv="lines" block="ct" />

      <Carousel x={CT_X} y={CT_Y} w={1900 - CT_X} h={CT_H + 300}
                inner={CT_W + 3 * CT_STEP} step={CT_STEP}
                paddleY={CT_Y + CT_H + 250} paddleX={1531 - 206}>
        {C.solution.cards.map((c, i) => {
          const left = i * CT_STEP
          const at = 200 + i * 110
          return (
            <Fragment key={i}>
              <Rect x={left} y={0} w={CT_W} h={CT_H} r={20} fill="#050505"
                    rv="card" block="ctc" at={at} />
              <PhoneOutline x={left + (CT_W - 170) / 2} y={140} w={170} h={310}
                            stroke="rgba(190,200,215,.5)" />
              <T x={left} y={CT_CAP} s="catRest" lines={c.lines} w={CT_W}
                 lead={{ lines: c.lead, color: '#FFFFFF', weight: 600 }}
                 rv="card" block="ctc" at={at} />
            </Fragment>
          )
        })}
      </Carousel>

      {/* ---- friendship ---- */}
      <T x={CENTRE} y={SOC_HEAD} w={1200} align="center" s="pkBig" color="#E8842A"
         lines={[C.social.head[0]]} rv="lines" block="sh" />
      <T x={CENTRE} y={SOC_HEAD + S.pkBig.lh} w={1200} align="center" s="pkBig"
         lines={[C.social.head[1]]} rv="lines" block="sh" at={110} />

      {[0, 1].map(i => {
        const b = C.social.bands[i]
        const y = i === 0 ? SOC1_Y : SOC2_Y
        const right = b.align === 'right'
        return (
          <Fragment key={i}>
            <MediaBand y={y} h={SOC_H} clip={V(`friends${i + 1}`)} fill="#101010"
                       poster={`/media/peak-friends${i + 1}-poster.webp`}
                       over={`linear-gradient(${right ? 270 : 90}deg,`
                             + 'rgba(0,0,0,.42) 0%,rgba(0,0,0,.16) 48%,rgba(0,0,0,0) 82%)'} />
            <PhoneOutline x={right ? 315 : 1240} y={y + (SOC_H - 606) / 2}
                          w={312} h={606} stroke="#0B0B0B" />
            <T x={right ? 1640 : 300} y={y + (SOC_H - S.bandHead.lh * b.lines.length) / 2}
               w={right ? 900 : undefined} align={right ? 'right' : 'left'}
               s="bandHead" lines={b.lines} rv="lines" block={`sb${i}`} />
          </Fragment>
        )
      })}

      <T x={CENTRE} y={SOC_MID} w={1400} align="center" s="pkBig" lines={C.social.mid}
         accent={{ text: C.social.midAccent, color: '#E8842A' }}
         rv="lines" block="sm" />

      {/* ---- adapts ---- */}
      <T x={CENTRE} y={AD_HEAD} w={1400} align="center" s="pkHead"
         lines={C.adapts.headline} rv="lines" block="ad" sv="drift" />
      <Plate x={AD_X} y={AD_Y} w={AD_W} h={AD_H} clip={V('adapts')}
             rv="card" block="adc" />

      {/* ---- what's next ---- */}
      <T x={WN_X} y={WN_HEAD} s="pkHead" lines={C.whatsNext.headline}
         rv="lines" block="wn" />
      <Carousel x={WN_TX} y={WN_Y} w={1900 - WN_TX} h={WN_H}
                inner={WN_W + 2 * WN_STEP} step={WN_STEP}
                paddleY={WN_Y + WN_H + 40} paddleX={1531 - 206}>
        {C.whatsNext.cards.map((c, i) => {
          const left = i * WN_STEP
          const at = 200 + i * 110
          return (
            <Fragment key={i}>
              <Rect x={left} y={0} w={WN_W} h={WN_H} r={20} fill={GREY}
                    rv="card" block="wnc" at={at} />
              <T x={left + 36} y={182} s="nextTitle" lines={c.title}
                 rv="card" block="wnc" at={at} />
              <T x={left + 36} y={233} s="nextBody" lines={c.body}
                 rv="card" block="wnc" at={at} />
            </Fragment>
          )
        })}
      </Carousel>

      {/* ---- end ---- */}
      <T x={WN_X} y={END_Y} s="footLink" lines={C.end.next}
         as="a" href="/work/times-media" rv="lines" block="end" />
      <T x={WN_X} y={END_Y + 100} s="footLinkAlt" lines={C.end.contact}
         as="a" href="mailto:shah.manavd@northeastern.edu" rv="lines" block="end" at={140} />
      <T x={CENTRE} y={H - 240} w={900} align="center" s="egg" className="egg"
         lines="god bless the white monster" rv="rise" block="end" at={520} />
    </Frame>
  )
}
