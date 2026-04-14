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
    <svg
      viewBox="0 0 300 16"
      style={{
        display: 'block', width: '100%',
        transform: flip ? 'rotate(180deg)' : 'none',
        marginBottom: flip ? '0' : '-1px',
        marginTop: flip ? '-1px' : '0',
      }}
      preserveAspectRatio="none"
    >
      <polyline points={`0,0 ${points} 300,0`} fill={color} />
    </svg>
  )
}

export default function Reflections() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section id="reflections" className="bg-white min-h-screen relative overflow-hidden py-24 pb-36">
      <div className="absolute inset-0 subtle-grid pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 relative z-[2] px-12"
      >
        <div className="text-[11px] text-black/25 tracking-[.15em] uppercase font-mono mb-3">
          Design Reflections
        </div>
        <h2 className="text-[clamp(32px,5vw,60px)] font-medium tracking-[-0.04em] text-[#0a0a0a] leading-none">
          Notes from the<br />
          <span className="italic text-black/[0.22] font-normal">design journey.</span>
        </h2>
      </motion.div>

      <div className="relative max-w-[1100px] mx-auto h-[820px] px-10">
        {articles.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, rotate: a.rotate - 5 }}
            whileInView={{ opacity: 1, y: 0, rotate: a.rotate }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.06, rotate: 0, y: -16, zIndex: 20, transition: { type: 'spring', stiffness: 280, damping: 22 } }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className="absolute cursor-pointer"
            style={{
              top: a.top, left: a.left,
              width: a.size === 'large' ? 290 : 250,
              zIndex: hovered === i ? 20 : i + 1,
              filter: hovered !== null && hovered !== i
                ? 'brightness(0.88) saturate(0.7)'
                : 'brightness(1) saturate(1)',
              transition: 'filter 0.35s ease',
            }}
          >
            {a.tape && (
              <div
                className="absolute z-[9] rounded-[2px]"
                style={{
                  top: -10, left: '35%',
                  width: 56, height: 18,
                  background: 'rgba(200,180,120,0.35)',
                  transform: `rotate(${a.tapeRotate}deg)`,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  backdropFilter: 'blur(2px)',
                }}
              />
            )}

            {!a.tape && (
              <div
                className="absolute z-[10] rounded-full"
                style={{
                  top: -10, left: '50%',
                  transform: 'translateX(-50%)',
                  width: 18, height: 18,
                  background: a.pinColor,
                  boxShadow: `0 3px 10px ${a.pinColor}60`,
                }}
              />
            )}

            <div
              className="rounded-[1px] overflow-hidden"
              style={{
                background: a.color,
                boxShadow: hovered === i
                  ? '0 24px 60px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.1)'
                  : '0 4px 20px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)',
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <TornEdge color={a.color} />

              <div className="px-5 pt-3.5 pb-[18px]">
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-[10px] text-black/25 font-mono tracking-[.1em]">{a.number}</span>
                  <span className="text-[9px] text-black/45 font-mono tracking-[.1em] uppercase bg-black/[0.07] px-2 py-0.5 rounded-full">{a.tag}</span>
                </div>

                <h3
                  className="font-semibold text-[#111] mb-2 leading-[1.25] tracking-[-0.3px]"
                  style={{ fontSize: a.size === 'large' ? 17 : 15 }}
                >
                  {a.title}
                </h3>

                <p className="text-[12px] text-black/45 leading-[1.65] mb-4">{a.desc}</p>

                <div className="flex justify-between items-center border-t border-black/[0.07] pt-3">
                  <span className="text-[10px] text-black/30 font-mono">{a.read}</span>
                  <Link href={a.href}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.97 }}
                      className="bg-[#0a0a0a] text-white border-none rounded-full px-4 py-1.5 text-[11px] font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      Read <span className="text-[10px]">→</span>
                    </motion.button>
                  </Link>
                </div>
              </div>

              <TornEdge color={a.color} flip />
            </div>
          </motion.div>
        ))}

        <svg className="absolute bottom-[5%] right-[4%] opacity-[0.08] pointer-events-none" width="120" height="40" viewBox="0 0 120 40">
          <path d="M0,20 Q30,5 60,20 Q90,35 120,20" stroke="#0a0a0a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <text x="10" y="36" fontSize="9" fill="#0a0a0a" fontFamily="monospace" letterSpacing="2">notes / 2025</text>
        </svg>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false }}
        transition={{ delay: 0.5 }}
        className="text-center mt-12 text-[12px] text-black/20 font-mono tracking-[.08em]"
      >
        more thoughts coming soon
      </motion.p>
    </section>
  )
}