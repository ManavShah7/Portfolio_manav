import Frame from '@/components/Frame'
import Carousel from '@/components/Carousel'
import SectionRail from '@/components/SectionRail'
import MotionDriver from '@/components/MotionDriver'
import { T, Rect, Img, Shot, Cover, Band, MediaBand, Scrim, Seam, Icon, BrandIcon } from '@/components/Nodes'
import { slots } from '@/lib/clips'
import S from '@/lib/styles'
import { PEAK as G, PAD_LG, PAD_SM, PARA_GAP, CARD_GAP, META_GAP, META_VAL, FOOT_GAP, under }
  from '@/lib/grid'

import { Fragment } from 'react'
import * as C from '@/lib/peak-copy'

const H = 14866
const SCRIM = true


// drop a clip or a still at public/media/peak-<name>.* - see lib/clips.js
const V = slots('peak')

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

// Peak's frames draw the next card peeking past the right edge of the 1900
// frame, so its tracks run to the edge rather than stopping on the measure.
const TRACK_W   = 1900 - G.L
const CARD_STEP = G.W + G.GUT
const FEAT_W    = 539                 // the narrow feature cards
const FEAT_STEP = FEAT_W + G.GUT
const PAD_XS    = 49                  // padding inside a FEAT_W card
const PADDLE_X  = G.R - 206

// the four quotes printed on the research card, inside its own padding
const QSTEP = (G.W - 2 * PAD_LG - 3 * G.GUT) / 4 + G.GUT
const QCOL  = i => G.L + PAD_LG + i * QSTEP

// the two columns printed on the social card, inside its padding
const SOC = G.inset(PAD_SM)

// --- vertical anchors, each derived from the block above it --------------
const OV_HEAD = 1003.5
const OV_P1   = under(OV_HEAD, S.headline, C.overview.headline.length)
const OV_P2   = under(OV_P1, S.body, C.overview.p1.length, PARA_GAP)
const OV_META = under(OV_P2, S.body, C.overview.p2.length, META_GAP)

const PB_HEAD = 1826.5
const PB_BODY = under(PB_HEAD, S.headline, C.problem.headline.length)

const PC2_Y  = 2712
const PC2_HD = PC2_Y + 69
const PC2_BD = under(PC2_HD, S.cardHead, 2, CARD_GAP)

const RS_CARD_HD = 3994
const RS_CARD_BD = under(RS_CARD_HD, S.cardHead, C.research.cardHead.length, CARD_GAP)

const SOL_HEAD  = 6393.5
const LIFT_HEAD = 7740.5
const LIFT_BODY = under(LIFT_HEAD, S.headlineW, C.solution.liftHead.length)
const CAT_HEAD  = 8907.5

const CAP_Y  = 11091.5
const CAP_BD = CAP_Y + 44.5

const AD_LH   = 59.5
const AD_HEAD = 11770.5
const AD_BODY = under(AD_HEAD, { lh: AD_LH }, C.adapts.headline.length)

export default function Peak() {
  return (
    <Frame height={H} overlay={<SectionRail />}>
      <MotionDriver />

      {/* ---- bands ---- */}
      <Cover y={0} h={832} clip={V('hero')} poster="/figma/cs-purple-photo.webp" />
      <Band y={832}   h={2662} fill="#FFFFFF" />
      <Band y={3494}  h={1374} fill={CORAL} />
      <Band y={4868}  h={1163} fill="#FFFFFF" />
      <Band y={6031}  h={4120} fill="#101010" />
      <MediaBand y={10151} h={1395} clip={V('purple')}
                 fill="url(/figma/cs-purple-photo.webp) center/1900px 1395px no-repeat" />
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
      <T x={G.L} y={OV_HEAD} s="headline" lines={C.overview.headline} rv="lines" block="ov" />
      <T x={G.L} y={OV_P1}   s="body"     lines={C.overview.p1} rv="rise" block="ov" at={240} />
      <T x={G.L} y={OV_P2}   s="body"     lines={C.overview.p2} rv="rise" block="ov" at={330} />

      {C.overview.meta.map((m, i) => (
        <Fragment key={m.label}>
          <T x={G.col(i, 3)} y={OV_META} s="metaLabel" lines={m.label}
             rv="rise" block="ov" at={420 + i * 50} />
          <T x={G.col(i, 3)} y={OV_META + META_VAL} s="metaValue" lines={m.values}
             rv="rise" block="ov" at={420 + i * 50} />
        </Fragment>
      ))}

      {/* ---- problem ---- */}
      <T x={G.C} y={PB_HEAD} w={1300} align="center" s="headline" lines={C.problem.headline} rv="lines" block="pb" />
      <T x={G.C} y={PB_BODY} w={1300} align="center" s="body"     lines={C.problem.body} rv="rise" block="pb" at={280} />

      <Rect x={G.L} y={2094} w={G.W} h={599} fill="#F5F5F7" rv="card" block="pc1" />
      {/* The same paragraph is printed above this card and again on it. Checked
          against the export: the frame really does draw it twice, so it is
          reproduced. Manav's call whether to cut one. */}
      <T x={G.C} y={2215} w={1000} align="center" s="body" lines={C.problem.body} rv="card" block="pc1" />
      {[0, 1, 2].map(i => (
        <Img key={i} x={G.C - 66.5 + (i - 1) * 200} y={2378} w={133} h={267}
             src="/figma/cs-phone-light-a.png" alt="" rv="card" block="pc1" />
      ))}

      {C.problem.cards.map((card, i) => (
        <Fragment key={i}>
          <Rect x={G.col(i, 2)} y={PC2_Y} w={G.colW(2)} h={709} fill="#F5F5F7"
                rv="card" block="pc2" at={i * 130} />
          <T x={G.col(i, 2) + PAD_SM} y={PC2_HD} s="cardHead" lines={card.head}
             rv="card" block="pc2" at={i * 130} />
          <T x={G.col(i, 2) + PAD_SM} y={PC2_BD} s="cardBody" lines={card.body}
             rv="card" block="pc2" at={i * 130} />
          {/* not in the Figma: an icon apiece in the empty lower half of each card */}
          <Icon x={G.col(i, 2) + PAD_SM} y={3173} size={112} stroke={7.5}
                name={['form', 'missed'][i]} rv="card" block="pc2" at={i * 130} />
        </Fragment>
      ))}

      {/* ---- research ---- */}
      <T x={G.C} y={3725.5} w={1300} align="center" s="headlineW" lines={C.research.headline} rv="lines" block="rs" />
      <Rect x={G.L} y={3920} w={G.W} h={886} fill="#FFFFFF" rv="card" block="rsc" />
      {C.research.cardHead.map((l, i) => (
        <T key={i} x={G.C} y={RS_CARD_HD + i * S.cardHead.lh} w={1100} align="center"
           s="cardHead" lines={[l]} rv="card" block="rsc" />
      ))}
      <T x={G.C} y={RS_CARD_BD} w={1100} align="center" s="cardBody" lines={C.research.cardBody} rv="card" block="rsc" />
      {C.research.quotes.map((q, i) => (
        <Fragment key={i}>
          <T x={QCOL(i)} y={4311.5} s="quoteBody" lines={q} rv="card" block="rsc" />
          <T x={QCOL(i)} y={4648}   s="quoteName" lines={C.research.name} rv="card" block="rsc" />
          <T x={QCOL(i)} y={4674.5} s="quoteRole" lines={C.research.role} rv="card" block="rsc" />
        </Fragment>
      ))}

      {/* ---- where smart-tracking stops ---- */}
      <T x={G.L} y={4979.5} s="headline" lines={C.ceiling.headline} rv="lines" block="ce" />
      {/* Peak's frames draw the next card peeking past the right edge, so unlike
          the other three these tracks run to the edge of the frame rather than
          stopping on the content measure. */}
      <Carousel x={G.L} y={5114} w={TRACK_W} h={755} inner={G.W + CARD_STEP} step={CARD_STEP}
                paddleY={5906.5} paddleX={PADDLE_X}>
        <Rect x={0} y={0} w={G.W} h={755} fill="#F5F5F7" rv="card" block="ce" at={240} />
        <T x={PAD_LG} y={97} s="cardHead" lines={C.ceiling.cardHead} rv="card" block="ce" at={240} />
        {[0, 1, 2].map(i => (
          <Img key={i} x={G.W / 2 - 74 + (i - 1) * 234} y={343} w={148} h={301}
               src="/figma/cs-phone-light-b.png" alt="" rv="card" block="ce" at={240} />
        ))}
        <Rect x={CARD_STEP} y={0} w={G.W} h={755} fill="#FEFEFE" />
      </Carousel>

      {/* ---- solution (black) ---- */}
      {C.solution.headline.map((l, i) => (
        <T key={i} x={G.C} y={SOL_HEAD + i * S.headlineLime.lh} w={1300} align="center"
           s="headlineLime" color={i === 0 ? '#FFFFFF' : undefined} lines={[l]}
           rv="lines" block="sol" at={i * 110} sv="drift" />
      ))}

      <Rect x={G.L} y={6775} w={G.W} h={755} fill="#C7D13D" rv="card" block="lime" />
      <T x={G.C} y={6872} w={1100} align="center" s="cardHead" color="#010101" lines={C.solution.limeHead} rv="card" block="lime" />
      {[0, 1, 2].map(i => (
        <Img key={i} x={G.C - 63 + (i - 1) * 248.5} y={7062} w={126} h={233}
             src="/figma/cs-phone-lime.png" alt="" rv="card" block="lime" />
      ))}

      {C.solution.liftHead.map((l, i) => (
        <T key={i} x={G.C} y={LIFT_HEAD + i * S.headlineW.lh} w={1300} align="center"
           s="headlineW" lines={[l]} rv="lines" block="lift" at={i * 110} />
      ))}
      <T x={G.C} y={LIFT_BODY} w={1300} align="center" s="bodyW" lines={C.solution.liftBody} rv="rise" block="lift" at={330} />
      {/* scroll-driven rather than triggered - see data-sv in globals.css */}
      {[0, 1].map(i => (
        <Shot key={i} x={G.colC(i, 2) - 135} y={8128} w={270} h={549}
              src="/figma/cs-phone-dark-big.png" clip={V(['lift-left', 'lift-right'][i])}
              alt="" sv="tilt" />
      ))}

      {C.solution.catalogHead.map((l, i) => (
        <T key={i} x={G.L} y={CAT_HEAD + i * S.headlineW.lh} s="headlineW" lines={[l]}
           rv="lines" block="cat" at={i * 110} />
      ))}

      <Carousel x={G.L} y={9095} w={TRACK_W} h={739} inner={FEAT_W + 2 * FEAT_STEP} step={FEAT_STEP}
                paddleY={9952.5} paddleX={PADDLE_X} depth>
        {[0, 1, 2].map(i => {
          const left = i * FEAT_STEP
          const at = 300 + i * 120
          return (
            <Fragment key={i}>
              <Rect x={left} y={0} w={FEAT_W} h={739} fill="#000000" rv="card" block="cat" at={at} data-depth={i} />
              <Img x={left + (FEAT_W - 170) / 2} y={65} w={170} h={345} src="/figma/cs-phone-darkcard.png" alt="" rv="card" block="cat" at={at} data-depth={i} />
              <T x={left + PAD_XS} y={558} s="featTitle" lines={C.solution.cards[i].title} rv="card" block="cat" at={at} data-depth={i} />
              <T x={left + PAD_XS} y={598} s="featBody"  lines={C.solution.cardBody} rv="card" block="cat" at={at} data-depth={i} />
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
      <T x={G.L} y={10395.5} s="headlineW" lines={C.social.headline} rv="lines" block="soc" />
      <Rect x={G.L} y={10584} w={G.W} h={755} fill="#FFFFFF" rv="card" block="soc" at={260} />
      {C.social.cols.map((col, i) => (
        <Fragment key={i}>
          <Shot x={SOC.colC(i, 2) - 89} y={10669} w={178} h={361} src="/figma/cs-phone-white.png"
                clip={V(['social-left', 'social-right'][i])} alt="" rv="card" block="soc" at={260} />
          {/* the box IS the column, so a centred caption cannot overrun the card */}
          <T x={SOC.colC(i, 2)} y={CAP_Y} w={SOC.colW(2)} align="center" s="caption"
             lines={col.caption} rv="card" block="soc" at={260} />
          <T x={SOC.colC(i, 2)} y={CAP_BD} w={SOC.colW(2)} align="center" s="captionBody"
             lines={C.social.colBody} rv="card" block="soc" at={260} />
        </Fragment>
      ))}

      {/* ---- adapts (purple gradient) ---- */}
      <T x={G.C} y={AD_HEAD} w={1300} align="center" lines={C.adapts.headline}
         s={{ size: 50, weight: 700, lh: AD_LH, color: '#FFFFFF' }} rv="lines" block="ad" sv="drift" />
      <T x={G.C} y={AD_BODY}   w={1300} align="center" s="bodyW"     lines={C.adapts.body} rv="rise" block="ad" at={340} />

      {/* ---- what it connects to (not in the Figma; Manav's ask) ---- */}
      <T x={G.C} y={12232} w={900} align="center" s="bodyW" lines="Connects with what you already use"
         rv="rise" block="int" />
      {INTEGRATIONS.map((it, i) => {
        const cx = G.C - (INTEGRATIONS.length - 1) * 150 + i * 300
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
      <T x={G.L} y={13111.5} lines={C.whatsNext.headline}
         s={{ size: 50, weight: 700, lh: 60, color: '#1C1C1E' }} rv="lines" block="wn" />
      <Carousel x={G.L} y={13379} w={TRACK_W} h={378} inner={FEAT_W + 2 * FEAT_STEP} step={FEAT_STEP}
                paddleY={13801.5} paddleX={PADDLE_X}>
        {[0, 1, 2].map(i => {
          const left = i * FEAT_STEP
          const at = 340 + i * 120
          return (
            <Fragment key={i}>
              <Rect x={left} y={0} w={FEAT_W} h={378} fill="#F5F5F7" rv="card" block="wn" at={at} />
              <T x={left + PAD_XS} y={182} s="nextTitle" lines={C.whatsNext.cards[i].title} rv="card" block="wn" at={at} />
              <T x={left + PAD_XS} y={233} s="nextBody"  lines={C.whatsNext.cards[i].body} rv="card" block="wn" at={at} />
            </Fragment>
          )
        })}
      </Carousel>

      {/* ---- end of the case study ----
          Nothing is drawn in this band in the Figma; this is Manav's ask. */}
      <T x={G.L} y={14330} s="footLink" lines="View next project"
         as="a" href="/work/times-media" rv="lines" block="end" />
      <T x={G.L} y={14330 + FOOT_GAP} s="footLinkAlt" lines="Contact"
         as="a" href="mailto:shah.manavd@northeastern.edu" rv="lines" block="end" at={140} />
      <T x={G.C} y={14806} w={900} align="center" s="egg" className="egg"
         lines="god bless the white monster" rv="rise" block="end" at={520} />
    </Frame>
  )
}
