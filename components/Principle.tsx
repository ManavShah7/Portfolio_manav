'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Analyze',
    desc: 'Uncovering users, business goals, constraints, and pain points via research, workshops, and problem exploration.',
    accent: 'rgba(120,80,255,0.15)',
  },
  {
    num: '02',
    title: 'Simplify',
    desc: 'Synthesizing insights using clustering, journey mapping, and reframing problems into clear, actionable opportunities.',
    accent: 'rgba(56,100,220,0.15)',
  },
  {
    num: '03',
    title: 'Structure',
    desc: 'Structuring information, defining flows, and designing wireframes through rapid iteration, validation, and feedback.',
    accent: 'rgba(20,140,120,0.15)',
  },
  {
    num: '04',
    title: 'Chaos to Clarity',
    desc: 'Refining designs with testing, feedback, and collaboration to deliver intuitive, scalable, production-ready solutions.',
    accent: 'rgba(244,114,182,0.12)',
  },
]

export default function Process() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 0.4], [30, 0])
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  return (
    <section ref={ref} style={{ background: '#000', padding: '100px 5% 100px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* header */}
        <motion.div style={{ y: textY, opacity: textOpacity, marginBottom: 52 }}>
          <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginBottom: 12 }}>
            My Design Process
          </p>
          <h2 style={{ fontSize: 'clamp(38px,6vw,72px)', fontWeight: 600, letterSpacing: '-0.04em', lineHeight: 1, color: '#fff' }}>
            How I Work.
          </h2>
        </motion.div>

        {/* cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, alignItems: 'stretch' }}>
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              style={{
                position: 'relative', borderRadius: 20, overflow: 'hidden',
                padding: '28px 24px 28px',
                background: '#0d0d0d',
                border: '0.5px solid rgba(255,255,255,0.08)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                minHeight: 360,
                cursor: 'default',
                transition: 'border-color 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            >
              {/* accent glow */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
                background: `radial-gradient(ellipse at center bottom, ${s.accent} 0%, transparent 70%)`,
                pointerEvents: 'none',
              }} />

              {/* top — number */}
              <div style={{
                fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.25)',
                letterSpacing: '0.1em',
              }}>
                {s.num}
              </div>

              {/* bottom — title + desc */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{
                  fontSize: 'clamp(22px,2.5vw,32px)', fontWeight: 600,
                  color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1,
                  marginBottom: 14,
                }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.72 }}>
                  {s.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}