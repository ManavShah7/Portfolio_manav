'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function AboutPage() {
  const [boxOpen, setBoxOpen] = useState(false)
  const [goal, setGoal] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const [onPitch, setOnPitch] = useState(false)
  const fieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 3500)
    return () => clearTimeout(t)
  }, [])

  const checkGoal = (x: number, y: number) => {
    if (!fieldRef.current) return
    const rect = fieldRef.current.getBoundingClientRect()
    const relX = x - rect.left
    const relY = y - rect.top
    const inX = relX >= rect.width * 0.33 && relX <= rect.width * 0.67
    if (inX && (relY < rect.height * 0.08 || relY > rect.height * 0.92)) {
      setGoal(true)
      setTimeout(() => setGoal(false), 2500)
    }
  }

  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>

      {/* back button */}
      <a
        href="/"
        style={{
          position: 'fixed', top: 24, left: 24, zIndex: 600,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          textDecoration: 'none', color: '#fff', fontSize: 16,
          width: 40, height: 40, borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(8px)',
          border: '0.5px solid rgba(255,255,255,0.18)',
          transition: 'background .2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      >←</a>

      {/* ── HERO — full width text, no photo ── */}
      <div style={{
        padding: '160px 5% 100px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -200, right: -100, width: 600, height: 600, background: 'radial-gradient(circle,rgba(124,58,237,.1) 0%,transparent 70%)', pointerEvents: 'none' }} />
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: 900 }}
        >
          <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
            About
          </p>
          <h1 style={{ fontSize: 'clamp(52px,9vw,120px)', fontWeight: 600, letterSpacing: '-0.05em', lineHeight: 0.95, color: '#fff', marginBottom: 32 }}>
            Hi, I&apos;m Manav.
            <br />
            <span style={{ color: 'rgba(255,255,255,0.25)', fontWeight: 300, fontStyle: 'italic' }}>
              The person behind the pixels.
            </span>
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)', lineHeight: 1.85, maxWidth: 560, marginBottom: 36 }}>
            Product Designer and MSIS student at Northeastern, Boston. I make technology feel less like technology and more like something built for actual humans.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="/#contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 50, background: '#fff', color: '#111', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
              Let&apos;s talk →
            </a>
            <a href="/resume.pdf" target="_blank" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 50, background: 'rgba(255,255,255,0.07)', border: '0.5px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: 500, textDecoration: 'none' }}>
              Resume ↗
            </a>
          </div>
        </motion.div>
      </div>

      {/* ── BENTO ── */}
      <div style={{ padding: '20px 5% 100px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, alignItems: 'start' }}>

          {/* soccer field */}
          <div
            ref={fieldRef}
            onMouseEnter={() => setOnPitch(true)}
            onMouseLeave={() => { setOnPitch(false); setIsDragging(false) }}
            style={{
              gridColumn: 1, gridRow: '1 / 3',
              borderRadius: 20, overflow: 'hidden',
              height: 500, position: 'relative',
              background: '#2d8a4e',
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 300 500" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
              {[0,1,2,3,4,5,6].map(i => <rect key={i} x={i*44} y="0" width="44" height="500" fill={i%2===0?'#2d8a4e':'#278545'} />)}
              <rect x="20" y="20" width="260" height="460" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
              <line x1="20" y1="250" x2="280" y2="250" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
              <circle cx="150" cy="250" r="50" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
              <circle cx="150" cy="250" r="3" fill="rgba(255,255,255,0.9)"/>
              <rect x="80" y="20" width="140" height="70" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
              <rect x="110" y="20" width="80" height="30" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
              <rect x="80" y="410" width="140" height="70" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
              <rect x="110" y="450" width="80" height="30" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2"/>
              <line x1="100" y1="14" x2="100" y2="0" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <line x1="200" y1="14" x2="200" y2="0" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <line x1="100" y1="1.5" x2="200" y2="1.5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              {[110,125,140,155,170,185].map(x => <line key={x} x1={x} y1="2" x2={x} y2="14" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>)}
              {[5,9].map(y => <line key={y} x1="100" y1={y} x2="200" y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>)}
              <line x1="100" y1="486" x2="100" y2="500" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <line x1="200" y1="486" x2="200" y2="500" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <line x1="100" y1="498.5" x2="200" y2="498.5" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              {[110,125,140,155,170,185].map(x => <line key={x} x1={x} y1="486" x2={x} y2="498" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>)}
              {[490,494].map(y => <line key={y} x1="100" y1={y} x2="200" y2={y} stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>)}
            </svg>

            <AnimatePresence>
              {(showHint || onPitch) && !isDragging && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  style={{ position: 'absolute', bottom: 20, left: 0, right: 0, textAlign: 'center', zIndex: 10, pointerEvents: 'none' }}>
                  <span style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 11, fontWeight: 500, padding: '5px 14px', borderRadius: 20 }}>
                    drag the ball into the goal ⚽
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {goal && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  style={{ position: 'absolute', inset: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(3px)', pointerEvents: 'none' }}>
                  <div style={{ textAlign: 'center' }}>
                    <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: [0, 1.4, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }} style={{ fontSize: 72, marginBottom: 12 }}>🎉</motion.div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                      style={{ fontSize: 52, fontWeight: 900, color: '#fff', letterSpacing: '-0.03em', textShadow: '0 0 30px rgba(255,255,255,0.5)' }}>
                      GOAL!
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              drag dragConstraints={fieldRef} dragElastic={0.05} whileDrag={{ scale: 1.15 }}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(_, info) => { setIsDragging(false); setShowHint(false); checkGoal(info.point.x, info.point.y) }}
              style={{ position: 'absolute', top: '44%', left: '44%', fontSize: 36, zIndex: 5, filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.4))', userSelect: 'none', cursor: isDragging ? 'grabbing' : 'grab' }}
            >⚽</motion.div>
          </div>

          {/* mystery box */}
          <div
            onMouseEnter={() => setBoxOpen(true)}
            onMouseLeave={() => setBoxOpen(false)}
            style={{
              gridColumn: 2, gridRow: 1,
              background: '#111', borderRadius: 20, height: 240,
              position: 'relative', overflow: boxOpen ? 'visible' : 'hidden',
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
                  {[{ src: '/about/box/1.png', rotate: -14, y: 0 },{ src: '/about/box/2.png', rotate: 2, y: -14 },{ src: '/about/box/3.png', rotate: 13, y: 0 }].map((item, i) => (
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

          {/* photo */}
          <div style={{
            gridColumn: 3, gridRow: 1,
            borderRadius: 20, overflow: 'hidden',
            height: 240, background: '#1a1a1a', position: 'relative',
            border: '0.5px solid rgba(255,255,255,0.08)',
          }}>
            <Image src="/about/photo.jpg" alt="Manav" fill style={{ objectFit: 'cover' }} />
          </div>

          {/* spotify — travis scott artist */}
          <div style={{
            gridColumn: 2, gridRow: 2,
            borderRadius: 20, overflow: 'hidden',
            height: 152, background: '#121212',
            border: '0.5px solid rgba(255,255,255,0.06)',
          }}>
            <iframe
              src="https://open.spotify.com/embed/artist/0Y5tJX1MQlPlqiwlOH1tJY?utm_source=generator&theme=0"
              width="100%" height="152"
              style={{ border: 'none', display: 'block' }}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          {/* photo 2 */}
          <div style={{
            gridColumn: 3, gridRow: 2,
            borderRadius: 20, overflow: 'hidden',
            height: 152, background: '#1a1a1a', position: 'relative',
            border: '0.5px solid rgba(255,255,255,0.08)',
          }}>
            <Image src="/about/photo2.jpg" alt="Manav" fill style={{ objectFit: 'cover' }} />
          </div>

        </div>
      </div>

    </div>
  )
}