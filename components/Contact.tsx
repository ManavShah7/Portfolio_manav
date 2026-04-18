'use client'
import { motion } from 'framer-motion'

const links = [
  { label: 'Resume', sub: 'View & Download', href: 'https://drive.google.com/file/d/1Zqh1U4HExDMz846TUmVHTJaqOEX13Ja6/view?usp=sharing' },
  { label: 'Email', sub: 'shah.manavd@northeastern.edu', href: 'mailto:shah.manavd@northeastern.edu' },
  { label: 'Contact', sub: '(617) 749-8140', href: 'tel:+16177498140' },
  { label: 'LinkedIn', sub: "Let's connect!", href: 'https://linkedin.com/in/manavshah177' },
]

export default function Contact() {
  return (
    <section id="contact" style={{ background: '#0a0a0a', padding: '80px 6% 64px', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>

        <p style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.14em', color: '#a78bfa', fontWeight: 500, marginBottom: 24 }}>
          Let&apos;s Connect
        </p>

        <motion.p
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{ fontSize: 'clamp(18px,3vw,42px)', fontWeight: 500, letterSpacing: '-0.03em', lineHeight: 1.2, color: '#fff', marginBottom: 48, maxWidth: 900 }}
        >
          I design products that help people{' '}
          <span style={{ color: '#555' }}>simplify complex</span>{' '}
          experiences. If you think we might be a good fit, lets connect.
        </motion.p>

        <div style={{ borderTop: '1px solid #1c1c1c', marginBottom: 40 }} />

        {/* 4 col on desktop, 2 col on mobile */}
        <div className="contact-grid">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{ textDecoration: 'none' }}
              className="contact-link-item"
            >
              <div className="contact-label" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', fontSize: 18, fontWeight: 700, marginBottom: 6, transition: 'color 0.2s' }}>
                {l.label}
                <span style={{ fontSize: 15, fontWeight: 400, opacity: 0.5 }}>›</span>
              </div>
              <div style={{ fontSize: 13, color: '#555' }}>{l.sub}</div>
            </motion.a>
          ))}
        </div>

        <div style={{ marginTop: 56, textAlign: 'center' }}>
          <span style={{ fontSize: 12, color: '#2a2a2a' }}>God Bless the White Monster Energy.</span>
        </div>

      </div>

      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        .contact-link-item:hover .contact-label {
          color: #a78bfa !important;
        }
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 28px !important;
          }
        }
        @media (max-width: 400px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}