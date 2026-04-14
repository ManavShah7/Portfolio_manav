'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Nav from '@/components/Nav'

// ─── Penalty logic ───────────────────────────────────────────────
// Player moves mouse → crosshair snaps to goal thirds (left / centre / right)
// On click-to-shoot, we record the aimed third.
// Keeper independently picks a third to dive toward (weighted: prefers sides).
// GOAL if keeper's third ≠ player's third. SAVED if same.
// Ball animates to exact crosshair position. Keeper dives to his third.
// ─────────────────────────────────────────────────────────────────

type Third = 'left' | 'center' | 'right'
type Phase = 'idle' | 'aiming' | 'shooting' | 'result'

const THIRD_X: Record<Third, number> = { left: 22, center: 50, right: 78 } // % across pitch

function getThird(pct: number): Third {
  if (pct < 38) return 'left'
  if (pct > 62) return 'right'
  return 'center'
}

function keeperThird(): Third {
  const r = Math.random()
  if (r < 0.42) return 'left'
  if (r < 0.84) return 'right'
  return 'center'
}

export default function AboutPage() {
  const [boxOpen, setBoxOpen] = useState(false)

  // penalty state
  const [phase, setPhase] = useState<Phase>('idle')
  const [aimPct, setAimPct] = useState(50) // raw mouse %
  const [shootThird, setShootThird] = useState<Third>('center')
  const [keepThird, setKeepThird] = useState<Third>('left')
  const [scored, setScored] = useState(false)
  const [score, setScore] = useState({ g: 0, s: 0 })
  const pitchRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (phase !== 'aiming') return
    const r = e.currentTarget.getBoundingClientRect()
    setAimPct(Math.max(5, Math.min(95, ((e.clientX - r.left) / r.width) * 100)))
  }

  const handleClick = () => {
    if (phase === 'idle') { setPhase('aiming'); return }
    if (phase !== 'aiming') return

    const pt = getThird(aimPct)
    const kt = keeperThird()
    const didScore = pt !== kt
    setShootThird(pt)
    setKeepThird(kt)
    setScored(didScore)
    setPhase('shooting')
    setScore(prev => ({ g: prev.g + (didScore ? 1 : 0), s: prev.s + 1 }))

    setTimeout(() => {
      setPhase('result')
      setTimeout(() => { setPhase('idle'); setAimPct(50) }, 2200)
    }, 600)
  }

  // ball target X based on shoot third, with slight vertical aim
  const ballTargetX = `${THIRD_X[shootThird] - 50}%`
  const keeperTargetX = keepThird === 'left' ? -62 : keepThird === 'right' ? 62 : 0

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff', fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}>

      {/* ── EXISTING NAVBAR — add Home link ── */}
      <div style={{ position: 'fixed', top: '20px', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 500, pointerEvents: 'none' }}>
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            background: '#fff', borderRadius: '50px', padding: '6px 8px',
            display: 'flex', alignItems: 'center', gap: '2px',
            border: '1px solid #e0e0e0', boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            pointerEvents: 'auto',
          }}
        >
          {[
            { label: 'Home', href: '/' },
            { label: 'Work', href: '/#work' },
            { label: 'Experience', href: '/#experience' },
            { label: 'Reflections', href: '/#reflections' },
          ].map((l) => (
            <a key={l.label} href={l.href}
              style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)', textDecoration: 'none', padding: '7px 18px', borderRadius: '40px', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#111'; e.currentTarget.style.background = 'rgba(0,0,0,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(0,0,0,0.5)'; e.currentTarget.style.background = 'transparent' }}
            >{l.label}</a>
          ))}
          <a href="/#contact"
            style={{ background: '#111', color: '#fff', fontWeight: 500, padding: '7px 20px', borderRadius: '40px', fontSize: '13px', textDecoration: 'none', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#333'}
            onMouseLeave={e => e.currentTarget.style.background = '#111'}
          >Let&apos;s Talk!</a>
        </motion.nav>
      </div>

      {/* ── HERO ── */}
      <div style={{ padding: '140px 6% 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -300, right: -200, width: 700, height: 700, background: 'radial-gradient(circle,rgba(124,58,237,.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -100, left: -100, width: 400, height: 400, background: 'radial-gradient(circle,rgba(56,100,220,.06) 0%,transparent 70%)', pointerEvents: 'none' }} />

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
          <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', marginBottom: 24, fontWeight: 500 }}>About</p>
          <h1 style={{ fontSize: 'clamp(52px,9vw,120px)', fontWeight: 600, letterSpacing: '-0.05em', lineHeight: 0.92, color: '#fff', margin: '0 0 36px' }}>
            Hi, I&apos;m Manav.
            <br />
            <span style={{ color: 'rgba(255,255,255,0.22)', fontWeight: 300, fontStyle: 'italic' }}>
              The person behind the pixels.
            </span>
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, maxWidth: 900, marginBottom: 48 }}>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.6)', lineHeight: 1.85, margin: 0 }}>
              Product Designer and MSIS student at Northeastern, Boston. I make technology feel less like technology — more like something built for actual humans.
            </p>
            <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.38)', lineHeight: 1.85, margin: 0 }}>
              When I&apos;m not designing, I&apos;m chasing side quests, on a football pitch, deep in a random YouTube rabbit hole, or staring at a Ford Raptor I can&apos;t afford yet.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 50, background: '#fff', color: '#111', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              Let&apos;s talk →
            </a>
            <a href="https://drive.google.com/file/d/197l8zAaKT5aITuIwkchxA6RplGA859eX/view?usp=sharing" target="_blank" rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 26px', borderRadius: 50, background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.75)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
              Resume ↗
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── CARDS ROW 1 ── */}
      <div style={{ padding: '0 6% 12px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12 }}>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0 }}
            style={{ borderRadius: 20, background: '#0d0d0d', border: '0.5px solid rgba(255,255,255,0.08)', padding: '28px 24px', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 32 }}>🗺️</span>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>Side Quests</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, margin: 0 }}>Always on some random adventure. If there&apos;s an interesting thing happening, I&apos;m going. Life&apos;s too short to sit still.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.08 }}
            style={{ borderRadius: 20, background: 'rgba(255,0,0,0.08)', border: '0.5px solid rgba(255,0,0,0.15)', padding: '28px 24px', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 32 }}>📺</span>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>YouTube &gt; Netflix</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, margin: 0 }}>Don&apos;t watch movies or shows. Give me the most random YouTube video at 2am and I&apos;m locked in. No context needed.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.16 }}
            data-cursor-color="#ffffff"
            style={{ borderRadius: 20, background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', padding: '28px 24px', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 32 }}>🥤</span>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>White Monster Energy</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, margin: 0 }}>Non-negotiable. The fuel behind every late night design session. God bless it.</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.24 }}
            data-cursor-color="#ffffff"
            style={{ borderRadius: 20, background: 'rgba(251,146,60,0.07)', border: '0.5px solid rgba(251,146,60,0.15)', padding: '28px 24px', minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 32 }}>🚗</span>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', marginBottom: 8 }}>Ford Raptor</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.65, margin: 0 }}>Can&apos;t afford it. Won&apos;t stop wanting it. One day.</p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ── BENTO ROW 2 ── */}
      <div style={{ padding: '0 6% 100px' }}>
        {/*
          Grid layout:
          col1 = pitch (spans rows 1+2, height 504px total)
          col2 row1 = mystery box (height 240px)
          col2 row2 = spotify (height 252px) ← 240 + 12 gap = 252
          col3 row1 = cr7 (240px)
          col3 row2 = boston (252px)
          Total bento height = 240 + 12 + 252 = 504px = pitch height ✓
        */}
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, paddingTop: 12 }}>

          {/* ── PENALTY SHOOTOUT ── */}
          <div
            ref={pitchRef}
            onClick={handleClick}
            onMouseMove={handleMouseMove}
            data-cursor-color="#ffffff"
            style={{
              gridColumn: 1, gridRow: '1 / 3',
              borderRadius: 20, overflow: 'hidden',
              height: 504, // 240 + 12 + 252
              position: 'relative', background: '#1a5c32',
              cursor: phase === 'aiming' ? 'crosshair' : 'pointer',
              userSelect: 'none',
            }}
          >
            {/* pitch SVG */}
            <svg width="100%" height="100%" viewBox="0 0 300 504" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
              {[0,1,2,3,4,5,6].map(i => <rect key={i} x={i*44} y="0" width="44" height="504" fill={i%2===0?'#1a5c32':'#1e6638'} />)}
              {/* outer border */}
              <rect x="18" y="18" width="264" height="468" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2"/>
              {/* penalty box */}
              <rect x="55" y="38" width="190" height="130" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2"/>
              {/* 6-yard box */}
              <rect x="95" y="38" width="110" height="55" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="2"/>
              {/* goal net */}
              <rect x="88" y="2" width="124" height="38" fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.65)" strokeWidth="2.5"/>
              {/* net verticals */}
              {[103,118,133,148,163,178,195].map(x => <line key={x} x1={x} y1="2" x2={x} y2="40" stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>)}
              {/* net horizontals */}
              {[10,20,30].map(y => <line key={y} x1="88" y1={y} x2="212" y2={y} stroke="rgba(255,255,255,0.18)" strokeWidth="1"/>)}
              {/* penalty spot */}
              <circle cx="150" cy="215" r="4" fill="rgba(255,255,255,0.9)"/>
              {/* penalty arc */}
              <path d="M 85 168 A 80 80 0 0 1 215 168" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5"/>
              {/* halfway */}
              <line x1="18" y1="340" x2="282" y2="340" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
              {/* centre circle */}
              <circle cx="150" cy="420" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
              <circle cx="150" cy="420" r="3" fill="rgba(255,255,255,0.45)"/>
              {/* bottom goal */}
              <rect x="88" y="464" width="124" height="38" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.25)" strokeWidth="2"/>

              {/* GOAL THIRDS — subtle highlight when aiming */}
              {phase === 'aiming' && (
                <>
                  <rect x="88" y="2" width="41" height="38"
                    fill={getThird(aimPct) === 'left' ? 'rgba(255,220,0,0.18)' : 'transparent'} />
                  <rect x="129" y="2" width="42" height="38"
                    fill={getThird(aimPct) === 'center' ? 'rgba(255,220,0,0.18)' : 'transparent'} />
                  <rect x="171" y="2" width="41" height="38"
                    fill={getThird(aimPct) === 'right' ? 'rgba(255,220,0,0.18)' : 'transparent'} />
                  {/* dividers */}
                  <line x1="129" y1="2" x2="129" y2="40" stroke="rgba(255,220,0,0.35)" strokeWidth="1" strokeDasharray="3,3"/>
                  <line x1="171" y1="2" x2="171" y2="40" stroke="rgba(255,220,0,0.35)" strokeWidth="1" strokeDasharray="3,3"/>
                </>
              )}
            </svg>

            {/* CROSSHAIR on goal — snaps to third */}
            <AnimatePresence>
              {phase === 'aiming' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 8 }}
                >
                  {/* crosshair tracks mouse smoothly but snaps gently to thirds */}
                  <motion.div
                    animate={{ left: `${aimPct}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                      position: 'absolute',
                      top: 10,
                      transform: 'translateX(-50%)',
                      width: 32, height: 32,
                      border: '2.5px solid rgba(255,220,0,1)',
                      borderRadius: '50%',
                      boxShadow: '0 0 16px rgba(255,220,0,0.6), inset 0 0 8px rgba(255,220,0,0.2)',
                    }}
                  />
                  {/* crosshair lines */}
                  <motion.div
                    animate={{ left: `${aimPct}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{
                      position: 'absolute', top: 42, height: '38%',
                      width: 1, background: 'linear-gradient(to bottom, rgba(255,220,0,0.5), transparent)',
                      transform: 'translateX(-50%)',
                    }}
                  />
                  {/* aim label */}
                  <div style={{
                    position: 'absolute', top: 46, left: '50%', transform: 'translateX(-50%)',
                    fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 500, whiteSpace: 'nowrap',
                    background: 'rgba(0,0,0,0.4)', padding: '3px 10px', borderRadius: 10, backdropFilter: 'blur(4px)',
                  }}>
                    Aiming {getThird(aimPct)} — click to shoot
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* KEEPER */}
            <motion.div
              animate={
                phase === 'shooting' || phase === 'result'
                  ? { x: keeperTargetX, scaleX: keepThird === 'right' ? -1 : 1 }
                  : { x: 0, scaleX: 1 }
              }
              transition={{ duration: 0.38, ease: [0.2, 0, 0.4, 1] }}
              style={{
                position: 'absolute', top: 6, left: '50%',
                marginLeft: -16, fontSize: 30, zIndex: 6,
                filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.5))',
              }}
            >🧤</motion.div>

            {/* BALL */}
            <motion.div
              key={score.s}
              animate={
                phase === 'shooting'
                  ? { x: ballTargetX, y: -280, scale: 0.38, rotate: 720 }
                  : phase === 'result'
                  ? { opacity: 0 }
                  : { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }
              }
              transition={
                phase === 'shooting'
                  ? { duration: 0.55, ease: [0.15, 0, 0.25, 1] }
                  : { duration: 0.2 }
              }
              style={{
                position: 'absolute', bottom: '54%', left: '50%',
                marginLeft: -18, fontSize: 36, zIndex: 10,
                filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.6))',
                originX: '50%', originY: '50%',
              }}
            >⚽</motion.div>

            {/* RESULT OVERLAY */}
            <AnimatePresence>
              {phase === 'result' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute', inset: 0, zIndex: 20,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', pointerEvents: 'none',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0.2, y: 30 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    style={{ fontSize: 72, marginBottom: 10 }}
                  >{scored ? '🎉' : '🧤'}</motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                    style={{ fontSize: 50, fontWeight: 900, letterSpacing: '-0.03em', textShadow: '0 0 40px rgba(255,255,255,0.4)' }}
                  >{scored ? 'GOAL!' : 'SAVED!'}</motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.28 }}
                    style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}
                  >{scored ? `You aimed ${shootThird}, keeper dove ${keepThird}` : `Both went ${shootThird} — keeper read it`}</motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* SCORE + HINT BAR */}
            <div style={{ position: 'absolute', bottom: 16, left: 0, right: 0, zIndex: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, pointerEvents: 'none' }}>
              {score.s > 0 && (
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', padding: '4px 16px', borderRadius: 20 }}>
                  {score.g} / {score.s} scored
                </div>
              )}
              {(phase === 'idle') && (
                <div style={{ fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.85)', background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', padding: '5px 16px', borderRadius: 20 }}>
                  ⚽ Click to step up to the spot
                </div>
              )}
            </div>
          </div>

          {/* ── MYSTERY BOX — taller so Spotify sits at the bottom ── */}
          <div
            onMouseEnter={() => setBoxOpen(true)}
            onMouseLeave={() => setBoxOpen(false)}
            style={{
              gridColumn: 2, gridRow: 1,
              background: '#111', borderRadius: 20,
              height: 240,
              position: 'relative',
              overflow: boxOpen ? 'visible' : 'hidden',
              zIndex: boxOpen ? 10 : 1,
              border: '0.5px solid rgba(255,255,255,0.08)',
            }}
          >
            <AnimatePresence>
              {!boxOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ position: 'absolute', top: 24, left: 0, right: 0, textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 500 }}>
                  Things that keep me sane
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {boxOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ position: 'absolute', bottom: '52%', left: 0, right: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 10, zIndex: 20, pointerEvents: 'none' }}>
                  {[
                    { src: '/about/box/1.png', rotate: -14, y: 0 },
                    { src: '/about/box/2.png', rotate: 2, y: -14 },
                    { src: '/about/box/3.png', rotate: 13, y: 0 },
                  ].map((item, i) => (
                    <motion.div key={i}
                      initial={{ y: 40, opacity: 0, rotate: item.rotate }}
                      animate={{ y: item.y, opacity: 1, rotate: item.rotate }}
                      exit={{ y: 40, opacity: 0 }}
                      transition={{ delay: i * 0.07, type: 'spring', stiffness: 200, damping: 18 }}
                      style={{ width: 88, height: 108, borderRadius: 10, flexShrink: 0, position: 'relative', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.5))' }}>
                      <Image src={item.src} alt="" fill style={{ objectFit: 'contain' }} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 18px 18px' }}>
              <div style={{ display: 'flex', gap: 3 }}>
                <motion.div animate={{ rotateX: boxOpen ? -45 : 0 }} transition={{ type: 'spring', stiffness: 120 }}
                  style={{ flex: 1, height: 22, background: '#b87828', borderRadius: '4px 0 0 0', transformOrigin: 'bottom' }} />
                <motion.div animate={{ rotateX: boxOpen ? -45 : 0 }} transition={{ type: 'spring', stiffness: 120 }}
                  style={{ flex: 1, height: 22, background: '#b87828', borderRadius: '0 4px 0 0', transformOrigin: 'bottom' }} />
              </div>
              <div style={{ background: '#d4922e', borderRadius: '0 0 12px 12px', position: 'relative', overflow: 'hidden', height: 118 }}>
                {[20,42,64,86,108,130,152,174,196,218,240,262].map(x => (
                  <div key={x} style={{ position: 'absolute', left: x, top: 0, bottom: 0, width: 1, background: 'rgba(0,0,0,0.05)' }} />
                ))}
                <div style={{ position: 'absolute', left: 0, right: 0, top: '36%', height: 28, background: '#5cb85c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#2a6b2a', letterSpacing: '.06em' }}>Manav&apos;s Stuff</span>
                </div>
              </div>
            </div>
          </div>

          {/* cr7 */}
          <div style={{ gridColumn: 3, gridRow: 1, borderRadius: 20, height: 240, position: 'relative', overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.08)' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#1a0a0a,#2a0a0a)', zIndex: 0 }} />
            <img src="/about/cr7.jpeg" alt="CR7"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', zIndex: 1 }}
              onError={e => { (e.target as HTMLImageElement).style.display = 'none' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.05) 60%)', zIndex: 2 }} />
            <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, zIndex: 3 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginBottom: 4 }}>Idol</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Cristiano Ronaldo</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>Work ethic. Mentality. The standard.</div>
            </div>
          </div>

          {/* spotify — height = 504 - 240 - 12 = 252px */}
          <iframe
            style={{ borderRadius: 12, gridColumn: 2, gridRow: 2, display: 'block', border: 'none' }}
            src="https://open.spotify.com/embed/playlist/2QgYbBLApHMh6jARy5HsY0?utm_source=generator&theme=0"
            width="100%"
            height="252"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />

          {/* boston — same height 252 */}
          <div style={{ gridColumn: 3, gridRow: 2, borderRadius: 20, height: 252, position: 'relative', overflow: 'hidden', border: '0.5px solid rgba(255,255,255,0.08)' }}>
            <img src="/about/boston.jpeg" alt="Boston" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0) 60%)' }} />
            <div style={{ position: 'absolute', bottom: 18, left: 20, right: 20 }}>
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', fontWeight: 500, marginBottom: 3 }}>Based in</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em' }}>Boston, MA</div>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}