'use client'
import { motion } from 'framer-motion'

const links = [
  { label: 'Resume', sub: 'View & Download', href: '/resume.pdf' },
  { label: 'Email', sub: 'shah.manavd@northeastern.edu', href: 'mailto:shah.manavd@northeastern.edu' },
  { label: 'Contact', sub: '(617) 749-8140', href: 'tel:+16177498140' },
  { label: 'LinkedIn', sub: "Let's connect!", href: 'https://linkedin.com/in/manavshah177' },
]

export default function Contact() {
  return (
    <section id="contact" className="bg-[#0a0a0a] px-[6%] pt-20 pb-16 relative z-[2]">
      <div className="max-w-[1300px] mx-auto">

        {/* label */}
        <p className="text-[11px] uppercase tracking-[.14em] text-[#a78bfa] font-medium mb-6">
          Let&apos;s Connect
        </p>

        {/* flowing headline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-[clamp(22px,3vw,42px)] font-medium tracking-[-0.03em] leading-[1.2] text-white mb-12"
          style={{ maxWidth: 900 }}
        >
          I design products that help people{' '}
          <span className="text-[#555]">simplify complex</span>{' '}
          experiences. If you think we might be a good fit, lets connect.
        </motion.p>

        {/* divider */}
        <div className="border-t border-[#1c1c1c] mb-10" />

        {/* 4 col links */}
        <div className="grid grid-cols-4 gap-8">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="no-underline group"
            >
              <div className="flex items-center gap-1.5 text-white text-[18px] font-bold mb-1.5 group-hover:text-[#a78bfa] transition-colors duration-200">
                {l.label}
                <span className="text-[15px] font-normal opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 inline-block">›</span>
              </div>
              <div className="text-[13px] text-[#555] group-hover:text-[#888] transition-colors duration-200">{l.sub}</div>
            </motion.a>
          ))}
        </div>

        {/* bottom */}
        <div className="mt-14 text-center">
          <span className="text-[12px] text-[#2a2a2a]">God Bless the White Monster Energy.</span>
        </div>

      </div>
    </section>
  )
}