'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const experiences = [
  {
    id: 'gowork',
    role: 'Founding Designer & Builder',
    company: 'GoWork',
    period: 'Ongoing',
    desc: 'Built a job hunting platform solo — 15 interviews, 40-person survey, 10 usability tests before writing a line of code. AI resume scoring, application tracking, Chrome extension.',
    tags: ['0→1 Product', 'AI & OpenAI', 'Next.js', 'Full-cycle Design'],
    bg: '#e8365d',
    ghost: 'GW',
    live: true,
  },
  {
    id: 'lighthouse',
    role: 'Product Design Intern',
    company: 'Lighthouse AI',
    period: 'Feb – Jul 2025',
    desc: 'Led Playbook from zero to shipped. 50 surveys, 20 interviews, 100+ Reddit threads. Designed the full AI coaching experience. 40% more downloads post-launch.',
    tags: ['Product Design', 'AI', 'User Research'],
    bg: '#16a34a',
    ghost: 'LH',
    live: false,
  },
  {
    id: 'brackets',
    role: 'Product Design Intern',
    company: 'Brackets',
    period: 'Nov 2024 – Feb 2025',
    desc: 'Designed core product flows end-to-end. Worked with founders to shape product direction. Shipped mobile-first flows from scratch.',
    tags: ['Product Design', 'Mobile', 'Visual Identity'],
    bg: '#7c3aed',
    ghost: 'BR',
    live: false,
  },
  {
    id: 'liveasy',
    role: 'UI Design Intern',
    company: 'Nexus Info — Liveasy',
    period: 'Jul – Aug 2024',
    desc: 'Redesigned a logistics TMS homepage where credibility is a usability requirement. 20% lift in CTR.',
    tags: ['UI Design', 'B2B', 'Conversion'],
    bg: '#1d4ed8',
    ghost: 'NE',
    live: false,
  },
]

export default function Experience() {
  const [activeId, setActiveId] = useState('gowork')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const active = experiences.find(e => e.id === activeId)!
  const others = experiences.filter(e => e.id !== activeId)

  return (
    <section id="experience" style={{ background: '#f0f0ee', padding: '100px 5%' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>

        {/* header */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 'clamp(38px,7vw,88px)', fontWeight: 600, letterSpacing: '-0.04em', color: '#0a0a0a', lineHeight: 1, marginBottom: 10 }}>
            Experience
          </p>
          <p style={{
            fontSize: 'clamp(16px,2vw,22px)', fontWeight: 300,
            color: 'rgba(0,0,0,0.3)', letterSpacing: '-0.02em',
          }}>
            Little steps. One problem at a time.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: 40, alignItems: 'start' }}>

          {/* LEFT col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* featured card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 14, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.97 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'relative', overflow: 'hidden',
                  borderRadius: 18, padding: '28px 28px 24px',
                  background: active.bg,
                  minHeight: 200,
                  display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                }}
              >
                <span style={{
                  position: 'absolute', right: -10, bottom: -18,
                  fontSize: 130, fontWeight: 900, lineHeight: 1,
                  color: 'rgba(255,255,255,0.08)',
                  letterSpacing: '-0.06em',
                  pointerEvents: 'none', userSelect: 'none',
                }}>
                  {active.ghost}
                </span>

                <div>
                  {active.live && (
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      background: 'rgba(255,255,255,0.18)',
                      borderRadius: 50, padding: '3px 10px',
                      fontSize: 11, fontWeight: 500, color: '#fff',
                      marginBottom: 16,
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: '50%',
                        background: '#4ade80', boxShadow: '0 0 5px #4ade80',
                        animation: 'pulse 2s infinite',
                      }} />
                      Live & Ongoing
                    </div>
                  )}
                  <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 3, lineHeight: 1.25 }}>
                    {active.role}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>
                    @ {active.company}
                  </div>
                </div>

                <div style={{
                  display: 'inline-flex',
                  background: 'rgba(255,255,255,0.18)',
                  borderRadius: 50, padding: '5px 14px',
                  fontSize: 12, fontWeight: 600, color: '#fff',
                  alignSelf: 'flex-start', marginTop: 24,
                }}>
                  {active.period}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* small cards row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {others.map(e => {
                const isHovered = hoveredId === e.id
                return (
                  <motion.button
                    key={e.id}
                    onClick={() => setActiveId(e.id)}
                    onMouseEnter={() => setHoveredId(e.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    animate={{
                      background: isHovered ? e.bg : '#e2e2e0',
                      y: isHovered ? -4 : 0,
                      scale: isHovered ? 1.03 : 1,
                    }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      border: 'none', borderRadius: 14,
                      padding: '16px 14px',
                      display: 'flex', flexDirection: 'column', gap: 20,
                      cursor: 'pointer', textAlign: 'left',
                      position: 'relative', overflow: 'hidden',
                      minHeight: 100,
                    }}
                  >
                    {/* icon area */}
                    <div style={{
                      width: 28, height: 28, borderRadius: 8,
                      background: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 10, fontWeight: 800,
                      color: isHovered ? '#fff' : 'rgba(0,0,0,0.3)',
                      letterSpacing: '-0.02em',
                      transition: 'all 0.2s ease',
                    }}>
                      {e.ghost}
                    </div>
                    <div>
                      <div style={{
                        fontSize: 13, fontWeight: 600, lineHeight: 1.3, marginBottom: 2,
                        color: isHovered ? '#fff' : '#1a1a1a',
                        transition: 'color 0.2s ease',
                      }}>
                        {e.role.split(' ').slice(0, 2).join(' ')}
                      </div>
                      <div style={{
                        fontSize: 11,
                        color: isHovered ? 'rgba(255,255,255,0.65)' : 'rgba(0,0,0,0.38)',
                        transition: 'color 0.2s ease',
                      }}>
                        @ {e.company}
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>

          {/* RIGHT col */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{ paddingTop: 4 }}
            >
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', marginBottom: 20 }}>
                {active.desc}
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', marginBottom: 24 }}>
                {active.live ? 'Still going. Still building.' : `Worked here ${active.period}.`}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
                {active.tags.map(t => (
                  <span key={t} style={{
                    fontSize: 12, padding: '5px 14px', borderRadius: 50,
                    background: active.bg, color: '#fff', fontWeight: 500,
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
      `}</style>
    </section>
  )
}