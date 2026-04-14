'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

const articles = [
  {
    number: '01', title: 'Good Design is Good Business',
    desc: "Why meaningful business outcomes depend on genuinely designing from the user's point of view.",
    tag: 'Business', read: '4 min', rotate: -4,
    top: '4%', left: '2%', color: '#FFFDE7',
    pinColor: '#FF5F57', size: 'large', tape: true, tapeRotate: -2,
    href: '/reflections/good',
  },
  {
    number: '02', title: 'Clarity with Controlled Velocity',
    desc: 'Going deep leads to clearer decisions than moving fast without direction.',
    tag: 'Process', read: '5 min', rotate: 3,
    top: '3%', left: '34%', color: '#F3E5F5',
    pinColor: '#4B6BFB', size: 'medium', tape: false, tapeRotate: 2,
    href: '/reflections/clarity',
  },
  {
    number: '03', title: 'Human Psychology and Designing',
    desc: 'How psychological principles influence products — and why ignoring them causes friction.',
    tag: 'Psychology', read: '6 min', rotate: -2,
    top: '3%', left: '65%', color: '#E8F5E9',
    pinColor: '#00D084', size: 'large', tape: true, tapeRotate: 3,
    href: '/reflections/human',
  },
  {
    number: '04', title: 'Feedback vs Noise',
    desc: 'Separating meaningful feedback from noise — and why it makes all the difference.',
    tag: 'Craft', read: '3 min', rotate: 5,
    top: '52%', left: '14%', color: '#FFF3E0',
    pinColor: '#FEBC2E', size: 'medium', tape: false, tapeRotate: -3,
    href: '/reflections/feedback',
  },
  {
    number: '05', title: 'Dots to Decisions — The Art of Research Synthesis',
    desc: "Turning a pile of user research into clear design decisions is the skill most designers skip. Here's how I do it.",
    tag: 'Research', read: '5 min', rotate: -3,
    top: '50%', left: '48%', color: '#E3F2FD',
    pinColor: '#FF5F57', size: 'large', tape: true, tapeRotate: 2,
    href: '/reflections/dots',
  },
]

function TornEdge({ color, flip }: { color: string; flip?: boolean }) {
  const points = Array.from({ length: 32 }, (_, i) => {
    const x = (i / 31) * 300
    const y = 4 + Math.sin(i * 2.3) * 4 + Math.sin(i * 5.1) * 2
    return `${x},${y}`
  }).join(' ')
  return (
    <svg viewBox="0 0 300 16" style={{ display: 'block', width: '100%', transform: flip ? 'rotate(180deg)' : 'none', marginBottom: flip ? '0' : '-1px', marginTop: flip ? '-1px' : '0' }} preserveAspectRatio="none">
      <polyline points={`0,0 ${points} 300,0`} fill={color} />
    </svg>
  )
}

function NoteCard({ a, i, hovered, setHovered }: { a: typeof articles[0]; i: number; hovered: number | null; setHovered: (n: number | null) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: a.rotate - 5 }}
      whileInView={{ opacity: 1, y: 0, rotate: a.rotate }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06, rotate: 0, y: -16, zIndex: 20, transition: { type: 'spring', stiffness: 280, damping: 22 } }}
      onMouseEnter={() => setHovered(i)}
      onMouseLeave={() => setHovered(null)}
      style={{
        cursor: 'pointer', width: a.size === 'large' ? 290 : 250,
        flexShrink: 0,
        filter: hovered !== null && hovered !== i ? 'brightness(0.88) saturate(0.7)' : 'brightness(1) saturate(1)',
        transition: 'filter 0.35s ease',
        position: 'relative',
      }}
    >
      {a.tape && (
        <div style={{ position: 'absolute', zIndex: 9, top: -10, left: '35%', width: 56, height: 18, background: 'rgba(200,180,120,0.35)', transform: `rotate(${a.tapeRotate}deg)`, boxShadow: '0 1px 4px rgba(0,0,0,0.08)', backdropFilter: 'blur(2px)', borderRadius: 2 }} />
      )}
      {!a.tape && (
        <div style={{ position: 'absolute', zIndex: 10, top: -10, left: '50%', transform: 'translateX(-50%)', width: 18, height: 18, borderRadius: '50%', background: a.pinColor, boxShadow: `0 3px 10px ${a.pinColor}60` }} />
      )}
      <div style={{ borderRadius: 1, overflow: 'hidden', background: a.color, boxShadow: hovered === i ? '0 24px 60px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.1)' : '0 4px 20px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)', transition: 'box-shadow 0.3s ease' }}>
        <TornEdge color={a.color} />
        <div style={{ padding: '14px 20px 18px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.25)', fontFamily: 'monospace', letterSpacing: '.1em' }}>{a.number}</span>
            <span style={{ fontSize: 9, color: 'rgba(0,0,0,0.45)', fontFamily: 'monospace', letterSpacing: '.1em', textTransform: 'uppercase', background: 'rgba(0,0,0,0.07)', padding: '2px 8px', borderRadius: 20 }}>{a.tag}</span>
          </div>
          <h3 style={{ fontWeight: 600, color: '#111', marginBottom: 8, lineHeight: 1.25, letterSpacing: '-0.3px', fontSize: a.size === 'large' ? 17 : 15 }}>{a.title}</h3>
          <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', lineHeight: 1.65, marginBottom: 16 }}>{a.desc}</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: 12 }}>
            <span style={{ fontSize: 10, color: 'rgba(0,0,0,0.3)', fontFamily: 'monospace' }}>{a.read}</span>
            <Link href={a.href}>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                style={{ background: '#0a0a0a', color: '#fff', border: 'none', borderRadius: 50, padding: '6px 16px', fontSize: 11, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                Read <span style={{ fontSize: 10 }}>→</span>
              </motion.button>
            </Link>
          </div>
        </div>
        <TornEdge color={a.color} flip />
      </div>
    </motion.div>
  )
}

export default function Reflections() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="reflections" style={{ background: '#fff', minHeight: 'auto', position: 'relative', overflow: 'hidden', padding: '96px 0 144px' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 80, position: 'relative', zIndex: 2, padding: '0 5%' }}
      >
        <div style={{ fontSize: 11, color: 'rgba(0,0,0,0.25)', letterSpacing: '.15em', textTransform: 'uppercase', fontFamily: 'monospace', marginBottom: 12 }}>
          Design Reflections
        </div>
        <h2 style={{ fontSize: 'clamp(32px,5vw,60px)', fontWeight: 500, letterSpacing: '-0.04em', color: '#0a0a0a', lineHeight: 1 }}>
          Notes from the<br />
          <span style={{ fontStyle: 'italic', color: 'rgba(0,0,0,0.22)', fontWeight: 400 }}>design journey.</span>
        </h2>
      </motion.div>

      {/* DESKTOP: absolute positioned scatter */}
      <div className="reflections-desktop" style={{ position: 'relative', maxWidth: 1100, margin: '0 auto', height: 820, padding: '0 40px' }}>
        {articles.map((a, i) => (
          <div key={i} style={{ position: 'absolute', top: a.top, left: a.left, zIndex: hovered === i ? 20 : i + 1 }}>
            <NoteCard a={a} i={i} hovered={hovered} setHovered={setHovered} />
          </div>
        ))}
        <svg style={{ position: 'absolute', bottom: '5%', right: '4%', opacity: 0.08, pointerEvents: 'none' }} width="120" height="40" viewBox="0 0 120 40">
          <path d="M0,20 Q30,5 60,20 Q90,35 120,20" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <text x="10" y="36" fontSize="9" fill="#0a0a0a" fontFamily="monospace" letterSpacing="2">notes / 2025</text>
        </svg>
      </div>

      {/* MOBILE: horizontal scroll row */}
      <div className="reflections-mobile" style={{ display: 'none', overflowX: 'auto', padding: '20px 5% 40px', gap: 20, WebkitOverflowScrolling: 'touch' }}>
        {articles.map((a, i) => (
          <div key={i} style={{ flexShrink: 0, width: 240 }}>
            <NoteCard a={{ ...a, rotate: 0 }} i={i} hovered={hovered} setHovered={setHovered} />
          </div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false }} transition={{ delay: 0.5 }}
        style={{ textAlign: 'center', marginTop: 48, fontSize: 12, color: 'rgba(0,0,0,0.2)', fontFamily: 'monospace', letterSpacing: '.08em' }}
      >
        more thoughts coming soon
      </motion.p>

      <style>{`
        .reflections-mobile { display: none; }
        @media (max-width: 768px) {
          .reflections-desktop { display: none !important; }
          .reflections-mobile { display: flex !important; }
        }
      `}</style>
    </section>
  )
}