'use client'
import { motion } from 'framer-motion'

const items = [
  'Product Design', 'UX Research', 'Design Systems', 'AI Products',
  'Prototyping', 'User Interviews', 'Interaction Design', 'Figma',
  'Next.js', 'OpenAI API',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="border-t border-b border-[#e8e8e8] py-[13px] overflow-hidden bg-white relative z-[2]">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        className="flex whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-7 text-[13px] text-[#aaa] shrink-0">
            {item}
            <span className="w-1 h-1 rounded-full bg-[#ddd]" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}