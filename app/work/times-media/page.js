import { Fragment } from 'react'

import Frame from '@/components/Frame'
import MotionDriver from '@/components/MotionDriver'
import PinnedHero from '@/components/PinnedHero'
import Pinned from '@/components/Pinned'
import { T, Rect, Img, Plate, Band } from '@/components/Nodes'
import { media, slots } from '@/lib/clips'
import S from '@/lib/styles'
import * as C from '@/lib/times-copy'

// Times Media, to Manav's frame. Coordinates are measured off that export and
// used as drawn - no grid, no rail. The hero is the same pinned-and-darkening
// treatment as Peak (see components/PinnedHero.js).
const H = 11003
const V = slots('times')
const HERO = media('times-hero')

const BLACK = '#000000'
const WHITE = '#FFFFFF'
const GREY  = '#F5F5F7'

// --- bands ------------------------------------------------------------------
const HERO_H   = 1024
const INTRO_END = 2157
const RSCH_Y   = 2157, RSCH_H = 1935
const PROB_Y   = 4092, PROB_H = 1446
const SOL_Y    = 5538, SOL_H = 4592
const IMP_Y    = 10130

// --- intro ------------------------------------------------------------------
const IN_X = 507
const IN_Y = [1209, 1469, 1673, 1875]

// --- research ---------------------------------------------------------------
const RS_EYE = 2309, RS_HEAD = 2368
const RS_WIDE_X = 369, RS_WIDE_W = 1162, RS_WIDE_Y = 2643, RS_WIDE_H = 598
const RS_PHOTO_W = 380
const RS_TWO = [369, 978], RS_TWO_W = [566, 553], RS_TWO_Y = 3264, RS_TWO_H = 600

// --- problem ----------------------------------------------------------------
const PB_HEAD_X = 285, PB_HEAD = 4283
const PB_X = 255
const PB_Y = [4702.5, 5134.5, 5566.5, 5864]
// The tablet holds still while the four points scroll past it, so these are
// the pin's span rather than a position: it arrives with the headline and
// releases once the last point has gone by.
const PB_TABLET = { x: 1002, w: 700, h: 466 }
const PB_PIN_TOP = 4400, PB_PIN = 1600

// --- solution ---------------------------------------------------------------
const SL_HEAD_X = 258, SL_HEAD = 6293
const AD_TAB = { x: 392.5, y: 6640, w: 534, h: 347 }
const AD_TXT = { x: 1024, y: 6760 }
const DA_TAB = { x: 1056.5, y: 7178, w: 534, h: 346 }
const DA_TXT = { x: 402, y: 7240 }
const FD_HEAD = 7993
const FD_PHONE = { x: 480, y: 8128, w: 175, h: 348 }
const FD_TAB = { x: 1040, y: 8128, w: 534, h: 348 }
const WS_HEAD_X = 237, WS_HEAD = 8907
const WS_MAC = { x: 281, y: 9224, w: 660, h: 448 }
const WS_TXT = { x: 1163, y: 9329.5 }

const IMP_HEAD = 10361
const END_Y = 10700
const CENTRE = 950

export default function TimesMedia() {
  return (
    <Frame height={H}
           overlay={<>
             <PinnedHero h={HERO_H} pin={INTRO_END}
                         clip={HERO && HERO.video ? HERO.src : null}
                         poster="/figma/tm-mesh.webp" />
             <Pinned top={PB_PIN_TOP} pin={PB_PIN}
                     x={PB_TABLET.x} w={PB_TABLET.w} h={PB_TABLET.h}>
               {/* eslint-disable-next-line @next/next/no-img-element */}
               <img src="/figma/lh-tablet-white.png" alt=""
                    style={{ display: 'block', width: '100%', height: '100%' }} />
             </Pinned>
           </>}>
      <MotionDriver />

      {/* 0..2157 is the pinned hero showing through as it darkens */}
      <Band y={RSCH_Y} h={RSCH_H} fill={GREY} />
      <Band y={PROB_Y} h={PROB_H} fill={WHITE} />
      <Band y={SOL_Y}  h={SOL_H}  fill={BLACK} />
      <Band y={IMP_Y}  h={H - IMP_Y} fill={WHITE} />

      {/* ---- the opening lines, over the pinned hero ---- */}
      {C.intro.map((lines, i) => (
        <T key={i} x={IN_X} y={IN_Y[i]} s="tmIntro" lines={lines}
           rv="lines" block={`in${i}`} />
      ))}

      {/* ---- user research ---- */}
      <T x={CENTRE} y={RS_EYE} w={800} align="center" s="eyebrow"
         lines={C.research.eyebrow} rv="rise" block="rs" />
      <T x={CENTRE} y={RS_HEAD} w={1500} align="center" s="tmHead"
         lines={C.research.headline} rv="lines" block="rs" at={120} sv="drift" />

      <Rect x={RS_WIDE_X} y={RS_WIDE_Y} w={RS_WIDE_W} h={RS_WIDE_H} r={20} fill={WHITE}
            rv="card" block="rc" />
      <Plate x={RS_WIDE_X} y={RS_WIDE_Y} w={RS_PHOTO_W} h={RS_WIDE_H} r={20}
             clip={V('owner')} poster="/media/times-owner.webp"
             rv="card" block="rc" />
      <T x={RS_WIDE_X + RS_PHOTO_W + 44} y={RS_WIDE_Y + 52} s="tmQuote"
         lines={C.research.quote} rv="card" block="rc" />

      {[0, 1].map(i => (
        <Plate key={i} x={RS_TWO[i]} y={RS_TWO_Y} w={RS_TWO_W[i]} h={RS_TWO_H}
               fill={WHITE} clip={V(`voice${i + 1}`)} rv="card" block="rc2" at={i * 120} />
      ))}

      {/* ---- the four ways it broke. Items 1-2 sit on the white, 3-4 carry on
              over the black - the frame runs the list across the seam. ---- */}
      <T x={PB_HEAD_X} y={PB_HEAD} s="tmHead" lines={C.problem.headline}
         rv="lines" block="pb" />

      {C.problem.items.map((it, i) => (
        <T key={i} x={PB_X} y={PB_Y[i]} s={i < 2 ? 'tmBody' : 'tmBodyW'} lines={it.lines}
           lead={{ lines: it.lead, color: i < 2 ? '#1C1C1E' : '#FFFFFF', weight: 600 }}
           rv="rise" block={`pb${i}`} />
      ))}

      {/* ---- the solution ---- */}
      <T x={SL_HEAD_X} y={SL_HEAD} s="tmHeadW" lines={C.solution.headline}
         rv="lines" block="sl" sv="drift" />

      <Plate x={AD_TAB.x} y={AD_TAB.y} w={AD_TAB.w} h={AD_TAB.h} fill="#E9E9EB" r={30} bezel={10}
             clip={V('admin')} sv="tilt" />
      <T x={AD_TXT.x} y={AD_TXT.y} s="tmBodyW" lines={C.solution.admin.lines}
         lead={{ lines: C.solution.admin.lead, color: '#FFFFFF', weight: 600 }}
         rv="rise" block="ad" />

      <T x={DA_TXT.x} y={DA_TXT.y} s="tmBodyW" lines={C.solution.data}
         rv="rise" block="da" />
      <Plate x={DA_TAB.x} y={DA_TAB.y} w={DA_TAB.w} h={DA_TAB.h} fill="#E9E9EB" r={30} bezel={10}
             clip={V('analytics')} sv="tilt" />

      <T x={1048} y={FD_HEAD} w={1500} align="center" s="tmHeadW"
         lines={C.solution.fieldHead} rv="lines" block="fd" sv="drift" />
      <Plate x={FD_PHONE.x} y={FD_PHONE.y} w={FD_PHONE.w} h={FD_PHONE.h} r={26} bezel={8}
             fill="#0B0B0B" clip={V('field')} sv="tilt" />
      <Plate x={FD_TAB.x} y={FD_TAB.y} w={FD_TAB.w} h={FD_TAB.h} fill="#E9E9EB" r={30} bezel={10}
             clip={V('maintenance')} sv="tilt" />

      <T x={WS_HEAD_X} y={WS_HEAD} s="tmHeadW" lines={C.solution.siteHead}
         rv="lines" block="ws" />
      <Img x={WS_MAC.x} y={WS_MAC.y} w={WS_MAC.w} h={WS_MAC.h}
           src="/figma/tm-macbook-dark.png" alt="" sv="tilt" />
      <T x={WS_TXT.x} y={WS_TXT.y} s="tmBodyW" lines={C.solution.site}
         rv="rise" block="ws" at={200} />

      {/* ---- impact ---- */}
      <T x={CENTRE} y={IMP_HEAD} w={1500} align="center" s="tmImpact"
         lines={C.impact} rv="lines" block="im" sv="punch" />

      <T x={PB_X} y={END_Y} s="footLink" lines={C.end.next}
         as="a" href="/work/lighthouse" rv="lines" block="end" />
      <T x={PB_X} y={END_Y + 100} s="footLinkAlt" lines={C.end.contact}
         as="a" href="mailto:shah.manavd@northeastern.edu" rv="lines" block="end" at={140} />
    </Frame>
  )
}
