'use client'
import { motion } from 'framer-motion'

const links = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Reflections', href: '#reflections' },
]

export default function Nav() {
  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 500,
        pointerEvents: 'none',
      }}
    >
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          background: '#fff',
          borderRadius: '50px',
          padding: '6px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          pointerEvents: 'auto',
        }}
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            style={{
              fontSize: '13px',
              color: 'rgba(0,0,0,0.5)',
              textDecoration: 'none',
              padding: '7px 18px',
              borderRadius: '40px',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#111'
              e.currentTarget.style.background = 'rgba(0,0,0,0.04)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(0,0,0,0.5)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {l.label}
          </a>
        ))}
        <a
          href="#contact"
          style={{
            background: '#111',
            color: '#fff',
            fontWeight: 500,
            padding: '7px 20px',
            borderRadius: '40px',
            fontSize: '13px',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#333'}
          onMouseLeave={e => e.currentTarget.style.background = '#111'}
        >
          Let&apos;s Talk!
        </a>
      </motion.nav>
    </div>
  )
}