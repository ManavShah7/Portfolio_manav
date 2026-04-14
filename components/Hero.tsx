'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const WORDS = ['Products', 'Humans', 'Systems', 'The Future']
const PARA = "Hi, I'm Manav — a Product Designer and MSIS student at Northeastern, Boston. I craft experiences that make technology feel less like technology and more like something built for actual humans. When I'm not designing, I'm either on a soccer field, in the gym, or staring at a Ford Raptor I can't afford yet."
const PARA_WORDS = PARA.split(' ')

function spawnCtaStars(el: HTMLElement) {
  const spawn = () => {
    if (!el.matches(':hover')) return
    const s = document.createElement('div')
    s.className = 'cta-star'
    s.style.left = Math.random() * 100 + '%'
    s.style.bottom = '0'
    const dur = 0.7 + Math.random() * 0.5
    s.style.animationDuration = dur + 's'
    el.appendChild(s)
    setTimeout(() => s.remove(), dur * 1000)
    setTimeout(spawn, 120)
  }
  spawn()
}

function clearCtaStars(el: HTMLElement) {
  el.querySelectorAll('.cta-star').forEach(s => s.remove())
}

export default function HeroAndAbout() {
  const [wordIdx, setWordIdx] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setWordIdx(i => (i + 1) % WORDS.length), 2800)
    return () => clearInterval(id)
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  const heroScale   = useTransform(scrollYProgress, [0, 0.55], [1, 0.82])
  const heroOpacity = useTransform(scrollYProgress, [0.25, 0.55], [1, 0])
  // On mobile, about panel slides up less aggressively
  const aboutY      = useTransform(scrollYProgress, [0.3, 0.72], ['100%', '0%'])
  const springAboutY = useSpring(aboutY, { stiffness: 60, damping: 22 })
  const rawReveal   = useTransform(scrollYProgress, [0.5, 0.88], [0, PARA_WORDS.length])

  const [revealCount, setRevealCount] = useState(0)
  useEffect(() => rawReveal.on('change', v => setRevealCount(v)), [rawReveal])

  return (
    <div id="hero" ref={containerRef} style={{ height: isMobile ? '250vh' : '300vh' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* ── HERO ── */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          scale: heroScale, opacity: heroOpacity,
          transformOrigin: 'center center',
        }}>
          <video autoPlay muted loop playsInline style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', objectFit: 'cover',
          }}>
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.18) 55%, rgba(0,0,0,0.08) 100%)',
          }} />

          {/* name top-left */}
          <div style={{
            position: 'absolute', top: 32, left: '5%', zIndex: 10,
            display: 'flex', flexDirection: 'column',
            userSelect: 'none', lineHeight: 1,
          }}>
            <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase' }}>Manav</span>
            <span style={{ fontSize: 15, fontWeight: 400, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginTop: 5 }}>Shah</span>
          </div>

          {/* headline */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: isMobile ? '0 5% 40px' : '0 5% 52px' }}>
            <h1 style={{
              fontSize: isMobile ? 'clamp(42px,12vw,72px)' : 'clamp(56px,9vw,130px)',
              fontWeight: 300, letterSpacing: '-0.03em', lineHeight: 0.95,
              color: '#fff', margin: 0,
            }}>
              Designing
              <br />
              <span style={{ color: 'rgba(255,255,255,0.35)', fontWeight: 300 }}>for </span>
              <span style={{ position: 'relative', display: 'inline-block', minWidth: '5ch' }}>
                {WORDS.map((w, i) => (
                  <motion.span key={w}
                    animate={{
                      opacity: i === wordIdx ? 1 : 0,
                      rotateX: i === wordIdx ? 0 : i < wordIdx ? 45 : -45,
                      y: i === wordIdx ? 0 : i < wordIdx ? -20 : 20,
                    }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: i === 0 ? 'relative' : 'absolute',
                      left: 0, top: 0,
                      whiteSpace: 'nowrap', fontWeight: 500,
                      display: 'inline-block',
                      transformOrigin: 'center center',
                      backfaceVisibility: 'hidden',
                    }}
                  >{w}</motion.span>
                ))}
              </span>
            </h1>

            {/* tagline — hidden on mobile to avoid overlap */}
            {!isMobile && (
              <p style={{
                position: 'absolute', right: '5%', bottom: 58,
                fontSize: 13, color: 'rgba(255,255,255,0.38)', margin: 0,
              }}>
                Making technology feel less like technology.
              </p>
            )}
          </div>
        </motion.div>

        {/* ── ABOUT PANEL ── */}
        <motion.div style={{
          position: 'absolute', inset: 0, zIndex: 10,
          y: springAboutY,
          background: '#000',
          borderRadius: '20px 20px 0 0',
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center', justifyContent: 'center',
          padding: isMobile ? '40px 6% 40px' : '0 5%',
          gap: isMobile ? '28px' : '4%',
          overflow: isMobile ? 'auto' : 'hidden',
        }}>

          {/* photos — hidden on mobile */}
          {!isMobile && (
            <div style={{ position: 'relative', width: 185, height: 430, flexShrink: 0 }}>
              <img src="/about/1.jpg" alt="" style={{ position: 'absolute', top: 0, left: 0, width: 150, height: 200, objectFit: 'cover', borderRadius: 14, transform: 'rotate(-7deg)', border: '0.5px solid rgba(255,255,255,0.1)' }} />
              <img src="/about/2.jpg" alt="" style={{ position: 'absolute', bottom: 0, left: 18, width: 150, height: 200, objectFit: 'cover', borderRadius: 14, transform: 'rotate(4deg)', border: '0.5px solid rgba(255,255,255,0.1)' }} />
            </div>
          )}

          {/* center */}
          <div style={{ textAlign: 'center', maxWidth: isMobile ? '100%' : 560 }}>

            {/* mobile: show 2 photos in a row instead */}
            {isMobile && (
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 28 }}>
                <img src="/about/1.jpg" alt="" style={{ width: '42%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 14, transform: 'rotate(-4deg)', border: '0.5px solid rgba(255,255,255,0.1)' }} />
                <img src="/about/3.jpg" alt="" style={{ width: '42%', aspectRatio: '3/4', objectFit: 'cover', borderRadius: 14, transform: 'rotate(4deg)', marginTop: 20, border: '0.5px solid rgba(255,255,255,0.1)' }} />
              </div>
            )}

            <p style={{ fontSize: isMobile ? 'clamp(16px,4.5vw,22px)' : 'clamp(18px,2.2vw,28px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.45, marginBottom: 28 }}>
              {PARA_WORDS.map((w, i) => (
                <motion.span key={i}
                  animate={{ color: revealCount >= i + 1 ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.13)' }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  style={{ display: 'inline-block', marginRight: '0.26em' }}
                >{w}</motion.span>
              ))}
            </p>

            <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.08)', margin: '18px 0' }} />

            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginBottom: 20 }}>
              Currently designing{' '}
              <a href="/work/gowork" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'underline' }}>GoWork</a>
            </p>

            <div
              className="cta-wrap"
              style={{
                position: 'relative', display: 'inline-block',
                borderRadius: 50, overflow: 'hidden',
                background: 'rgba(255,255,255,0.07)',
                border: '0.5px solid rgba(255,255,255,0.18)',
                transition: 'background 0.3s ease, border-color 0.3s ease',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.background = '#fff'
                el.style.borderColor = '#fff'
                const link = el.querySelector('a') as HTMLElement
                if (link) link.style.color = '#000'
                spawnCtaStars(el)
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.background = 'rgba(255,255,255,0.07)'
                el.style.borderColor = 'rgba(255,255,255,0.18)'
                const link = el.querySelector('a') as HTMLElement
                if (link) link.style.color = 'rgba(255,255,255,0.8)'
                clearCtaStars(el)
              }}
            >
              <a href="#contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 24px', borderRadius: 50,
                color: 'rgba(255,255,255,0.8)',
                fontSize: 13, fontWeight: 500,
                textDecoration: 'none', position: 'relative', zIndex: 1,
                transition: 'color 0.3s ease',
              }}>Let&apos;s talk →</a>
            </div>
          </div>

          {/* photos right — hidden on mobile */}
          {!isMobile && (
            <div style={{ position: 'relative', width: 185, height: 430, flexShrink: 0 }}>
              <img src="/about/3.jpg" alt="" style={{ position: 'absolute', top: 0, right: 0, width: 150, height: 200, objectFit: 'cover', borderRadius: 14, transform: 'rotate(6deg)', border: '0.5px solid rgba(255,255,255,0.1)' }} />
              <img src="/about/4.jpg" alt="" style={{ position: 'absolute', bottom: 0, right: 18, width: 150, height: 200, objectFit: 'cover', borderRadius: 14, transform: 'rotate(-5deg)', border: '0.5px solid rgba(255,255,255,0.1)' }} />
            </div>
          )}
        </motion.div>

      </div>

      <style>{`
        @keyframes ctaStar {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          20%  { opacity: 0.45; }
          100% { transform: translateY(-40px) scale(0.3); opacity: 0; }
        }
        .cta-star {
          position: absolute;
          width: 2px; height: 2px; border-radius: 50%;
          background: #000; pointer-events: none;
          animation: ctaStar linear forwards;
        }
      `}</style>
    </div>
  )
}