'use client'
import { motion } from 'framer-motion'
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

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
  }),
}

export default function Work() {
  return (
    <section id="work" style={{ background: '#000', padding: '80px 5% 100px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto 40px' }}>
        <p style={{ fontSize: 'clamp(38px,7vw,96px)', fontWeight: 600, letterSpacing: '-0.04em', color: '#fff', lineHeight: 1, marginBottom: 14 }}>
          Some of my work.
        </p>
        <p style={{
          fontSize: 'clamp(18px,2.2vw,28px)', fontWeight: 300,
          letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.35)', lineHeight: 1.3,
        }}>
          Blood, sweat, and tears were sacrificed.
        </p>
      </div>

      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.6fr 1fr',
        gridTemplateRows: 'auto auto',
        gap: 12,
      }}>
        <motion.div
          custom={0} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ gridRow: '1 / 3' }}
        >
          <BentoCard p={projects[0]} minHeight="520px" />
        </motion.div>

        {projects.slice(1).map((p, i) => (
          <motion.div
            key={p.id}
            custom={i + 1} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          >
            <BentoCard p={p} minHeight="248px" />
          </motion.div>
        ))}
      </div>
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
      {/* bg image zoom on hover */}
      <motion.div
        variants={{ hover: { scale: 1.05 } }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${p.image})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
        }}
      />

      {/* gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.05) 100%)',
      }} />

      {/* tags top left */}
      <div style={{ position: 'absolute', top: 18, left: 18, display: 'flex', gap: 6, zIndex: 2 }}>
        {p.tags.map(t => (
          <span key={t} style={{
            fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 20,
            background: 'rgba(0,0,0,0.5)', color: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(16px)', border: '0.5px solid rgba(255,255,255,0.25)',
            letterSpacing: '0.02em',
          }}>{t}</span>
        ))}
      </div>

      {/* bottom content */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '0 22px 24px', zIndex: 2,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 16,
      }}>
        <div>
          <p style={{
            fontSize: 10, textTransform: 'uppercase', letterSpacing: '.12em',
            color: 'rgba(255,255,255,0.3)', fontWeight: 500, marginBottom: 6,
          }}>{p.role}</p>
          <h3 style={{
            fontSize: 'clamp(22px,3vw,36px)', fontWeight: 500,
            color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 8,
          }}>{p.company}</h3>
          <p style={{ fontSize: 12, lineHeight: 1.65, color: 'rgba(255,255,255,0.4)', maxWidth: 340 }}>
            {p.sub}
          </p>
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
          >
            ↗
          </motion.div>
        </Link>
      </div>
    </motion.div>
  )
}