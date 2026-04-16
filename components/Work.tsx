'use client'
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion'
import { useRef, useState } from 'react'
import Link from 'next/link'

const projects = [
  {
    id: 'lighthouse',
    company: 'Lighthouse AI',
    role: 'Product Design Intern',
    tags: ['Product Design', 'AI'],
    sub: 'Led Playbook from research to shipped. 40% more downloads.',
    href: '/work/lighthouse',
    image: '/work/1.jpg',
    fallbackBg: '#0a0a12',
  },
  {
    id: 'gowork',
    company: 'GoWork',
    role: 'Founding Designer & Builder',
    tags: ['0→1', 'Built & Shipped'],
    sub: 'Designed and built solo. AI resume scoring + Chrome extension.',
    href: '/work/gowork',
    image: '/work/2.jpg',
    fallbackBg: '#0a0f1a',
  },
  {
    id: 'liveasy',
    company: 'Liveasy',
    role: 'UI Design Intern',
    tags: ['UI Design', 'B2B'],
    sub: '20% lift in CTR after homepage redesign.',
    href: '/work/liveasy',
    image: '/work/3.jpg',
    fallbackBg: '#080e12',
  },
]

const visuals = [
  { src: '/work/more/1.jpg', label: 'Ford F-150 Raptor' },
  { src: '/work/more/2.jpg', label: 'Ford F-150 Raptor (02)' },
  { src: '/work/more/3.jpg', label: 'Meridian' },
  { src: '/work/more/4.jpg', label: 'Meridian (02)' },
  { src: '/work/more/5.jpg', label: 'Portugal National Team' },
  { src: '/work/more/6.jpg', label: "Decorus" },
  { src: '/work/more/7.jpg', label: 'Cafe Rosette' },
  
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

// ── Auto-scrolling strip ──────────────────────────────────────────────────
function ScrollStrip() {
  const x = useMotionValue(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const speed = 2

  const items = [...visuals, ...visuals]

  useAnimationFrame(() => {
    if (paused) return
    const container = containerRef.current
    if (!container) return
    const halfWidth = container.scrollWidth / 2
    const next = x.get() - speed
    x.set(next <= -halfWidth ? 0 : next)
  })

  return (
    <div
      style={{ overflow: 'hidden', width: '100%', cursor: 'default' }}
      onMouseLeave={() => { setPaused(false); setHoveredIdx(null) }}
    >
      <motion.div
        ref={containerRef}
        style={{ x, display: 'flex', gap: 12, width: 'max-content', alignItems: 'center' }}
      >
        {items.map((v, i) => {
          const isHovered = hoveredIdx === i
          return (
            <motion.div
              key={i}
              onMouseEnter={() => { setPaused(true); setHoveredIdx(i) }}
              animate={{
                width: isHovered ? 400 : 340,
                height: isHovered ? 260 : 220,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                borderRadius: 14,
                overflow: 'hidden',
                flexShrink: 0,
                background: '#111',
                border: `0.5px solid ${isHovered ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)'}`,
                cursor: 'pointer',
              }}
            >
              <img
                src={v.src}
                alt={v.label}
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: isHovered
                  ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%)'
                  : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)',
                transition: 'background 0.3s ease',
              }} />
              <motion.p
                animate={{ opacity: isHovered ? 1 : 0.6, y: isHovered ? 0 : 4 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: 'absolute', bottom: 14, left: 16,
                  fontSize: isHovered ? 13 : 11,
                  fontWeight: isHovered ? 600 : 500,
                  color: '#fff',
                  letterSpacing: '.04em', margin: 0,
                  fontFamily: "-apple-system,'SF Pro Display',sans-serif",
                }}
              >{v.label}</motion.p>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default function Work() {
  return (
    <section id="work" style={{ background: '#000', padding: '80px 0 100px' }}>
      {/* ── Header ── */}
      <div style={{ maxWidth: 1100, margin: '0 auto 40px', padding: '0 5%' }}>
        <p style={{ fontSize: 'clamp(38px,7vw,96px)', fontWeight: 600, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1, marginBottom: 14 }}>
          Some of my work.
        </p>
        <p style={{ fontSize: 'clamp(14px,2vw,24px)', fontWeight: 300, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.35)', lineHeight: 1.3 }}>
          Blood, sweat, and tears were sacrificed.
        </p>
      </div>

      {/* ── Bento grid ── */}
      <div className="work-grid" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 5%' }}>
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="work-card-large"
        >
          <BentoCard p={projects[0]} minHeight="520px" />
        </motion.div>

        {projects.slice(1).map((p, i) => (
          <motion.div
            key={p.id}
            custom={i + 1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
            className="work-card-small"
          >
            <BentoCard p={p} minHeight="280px" />
          </motion.div>
        ))}
      </div>

      {/* ── More work strip ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        style={{ maxWidth: 1100, margin: '56px auto 0', padding: '0 5%' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.14em', color: 'rgba(255,255,255,0.25)', fontWeight: 600, margin: 0 }}>
            More work
          </p>
          <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' }} />
        </div>
      </motion.div>

      {/* Full-bleed strip — no side padding so it runs edge to edge */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ paddingLeft: '5%' }}
      >
        <ScrollStrip />
      </motion.div>

      <style>{`
        .work-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr;
          grid-template-rows: auto auto;
          gap: 12px;
        }
        .work-card-large { grid-row: 1 / 3; }

        @media (max-width: 768px) {
          .work-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .work-card-large { grid-row: auto !important; }
        }
      `}</style>
    </section>
  )
}

function BentoCard({ p, minHeight }: { p: typeof projects[0]; minHeight: string }) {
  return (
    <motion.div
      whileHover="hover"
      style={{
        position: 'relative', height: '100%', minHeight,
        borderRadius: 20, overflow: 'hidden',
        backgroundColor: p.fallbackBg,
        border: '0.5px solid rgba(255,255,255,0.07)',
        cursor: 'pointer',
      }}
    >
      <motion.div
        variants={{ hover: { scale: 1.05 } }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${p.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}
      />

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.05) 100%)',
      }} />

      <div style={{ position: 'absolute', top: 18, left: 18, display: 'flex', gap: 6, zIndex: 2, flexWrap: 'wrap' }}>
        {p.tags.map(t => (
          <span key={t} style={{
            fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20,
            background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(16px)', border: '0.5px solid rgba(255,255,255,0.25)',
            letterSpacing: '0.02em',
          }}>{t}</span>
        ))}
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 22px 24px', zIndex: 2,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16,
      }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.12em', color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginBottom: 6 }}>{p.role}</p>
          <h3 style={{ fontSize: 'clamp(18px,2.5vw,32px)', fontWeight: 500, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 8 }}>{p.company}</h3>
          <p style={{ fontSize: 12, lineHeight: 1.65, color: 'rgba(255,255,255,0.4)', maxWidth: 280 }}>{p.sub}</p>
        </div>

        <Link href={p.href} style={{ textDecoration: 'none', flexShrink: 0 }}>
          <motion.div
            variants={{ hover: { background: 'rgba(255,255,255,0.18)', scale: 1.05 } }}
            transition={{ duration: 0.2 }}
            style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'rgba(255,255,255,0.08)',
              border: '0.5px solid rgba(255,255,255,0.15)',
              backdropFilter: 'blur(12px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 16, color: 'rgba(255,255,255,0.8)',
            }}
          >↗</motion.div>
        </Link>
      </div>
    </motion.div>
  )
}