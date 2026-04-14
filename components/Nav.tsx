'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Reflections', href: '#reflections' },
]

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* ── DESKTOP NAV ── */}
      <div style={{
        position: 'fixed', top: '20px', left: 0, right: 0,
        display: 'flex', justifyContent: 'center',
        zIndex: 500, pointerEvents: 'none',
      }}>
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            background: '#fff', borderRadius: '50px', padding: '6px 8px',
            display: 'flex', alignItems: 'center', gap: '2px',
            border: '1px solid #e0e0e0', boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            pointerEvents: 'auto',
          }}
        >
          {/* desktop links — hidden on mobile */}
          <div className="nav-desktop-links">
            {links.map((l) => (
              <a key={l.label} href={l.href}
                style={{ fontSize: '13px', color: 'rgba(0,0,0,0.5)', textDecoration: 'none', padding: '7px 18px', borderRadius: '40px', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#111'; e.currentTarget.style.background = 'rgba(0,0,0,0.04)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(0,0,0,0.5)'; e.currentTarget.style.background = 'transparent' }}
              >{l.label}</a>
            ))}
          </div>

          <a href="#contact"
            style={{ background: '#111', color: '#fff', fontWeight: 500, padding: '7px 20px', borderRadius: '40px', fontSize: '13px', textDecoration: 'none', transition: 'background 0.2s', whiteSpace: 'nowrap' }}
            onMouseEnter={e => e.currentTarget.style.background = '#333'}
            onMouseLeave={e => e.currentTarget.style.background = '#111'}
          >Let&apos;s Talk!</a>

          {/* hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '7px 12px', display: 'none', flexDirection: 'column', gap: 4, alignItems: 'center', justifyContent: 'center' }}
          >
            <span style={{ display: 'block', width: 18, height: 1.5, background: '#111', borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(4px)' : 'none' }} />
            <span style={{ display: 'block', width: 18, height: 1.5, background: '#111', borderRadius: 2, transition: 'all 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 18, height: 1.5, background: '#111', borderRadius: 2, transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-4px)' : 'none' }} />
          </button>
        </motion.nav>
      </div>

      {/* ── MOBILE DROPDOWN ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', top: 80, left: 16, right: 16,
              background: '#fff', borderRadius: 20, padding: '8px',
              border: '1px solid #e0e0e0', boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              zIndex: 499, display: 'flex', flexDirection: 'column', gap: 2,
            }}
          >
            {links.map(l => (
              <a key={l.label} href={l.href}
                onClick={() => setMenuOpen(false)}
                style={{ fontSize: 15, color: '#111', textDecoration: 'none', padding: '12px 16px', borderRadius: 12, transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >{l.label}</a>
            ))}
            <a href="#contact"
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 15, fontWeight: 600, color: '#fff', background: '#111', textDecoration: 'none', padding: '12px 16px', borderRadius: 12, marginTop: 4, textAlign: 'center' }}
            >Let&apos;s Talk!</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 640px) {
          .nav-desktop-links { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </>
  )
}