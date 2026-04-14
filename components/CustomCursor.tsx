'use client'
import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })
  const raf = useRef<number>()

  const [hidden, setHidden] = useState(true)
  const [linkHovered, setLinkHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [color, setColor] = useState('#111')

  const ALWAYS_DARK = ['hero', 'principle', 'work']

  const getBgColor = (x: number, y: number): string => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null
    let node: HTMLElement | null = el

    // 1. predefined section IDs → white cursor
    while (node && node !== document.body) {
      if (node.id && ALWAYS_DARK.includes(node.id)) return '#ffffff'
      node = node.parentElement
    }

    // 2. data-cursor-color attribute override (walks up DOM)
    node = el
    while (node && node !== document.body) {
      if (node.dataset?.cursorColor) return node.dataset.cursorColor
      node = node.parentElement
    }

    // 3. luminance fallback
    node = el
    while (node && node !== document.body) {
      const bg = window.getComputedStyle(node).backgroundColor
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        const m = bg.match(/\d+/g)
        if (m) {
          const [r, g, b] = m.map(Number)
          return 0.299 * r + 0.587 * g + 0.114 * b < 128 ? '#ffffff' : '#111111'
        }
      }
      node = node.parentElement
    }
    return '#111111'
  }

  useEffect(() => {
    const style = document.createElement('style')
    style.innerHTML = '* { cursor: none !important; }'
    document.head.appendChild(style)

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      setHidden(false)
      setColor(getBgColor(e.clientX, e.clientY))
    }

    const onLeave = () => setHidden(true)
    const onEnter = () => setHidden(false)
    const onDown = () => setClicked(true)
    const onUp = () => setClicked(false)

    const attachLinkListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', () => setLinkHovered(true))
        el.addEventListener('mouseleave', () => setLinkHovered(false))
      })
    }
    attachLinkListeners()
    const observer = new MutationObserver(attachLinkListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup', onUp)

    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.18
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.18
      const scale = linkHovered ? 1.5 : clicked ? 0.75 : 1
      if (dotRef.current)
        dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`
      if (ringRef.current)
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) scale(${scale})`
      raf.current = requestAnimationFrame(animate)
    }
    raf.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup', onUp)
      observer.disconnect()
      style.remove()
      if (raf.current) cancelAnimationFrame(raf.current)
    }
  }, [linkHovered, clicked])

  const ringSize = linkHovered ? 52 : 38
  const dotSize = clicked ? 5 : 8

  return (
    <>
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: dotSize, height: dotSize, borderRadius: '50%',
        background: color,
        marginLeft: -(dotSize / 2), marginTop: -(dotSize / 2),
        pointerEvents: 'none', zIndex: 100000,
        opacity: hidden ? 0 : 1,
        transition: 'background 150ms ease, opacity 200ms ease, width 150ms ease, height 150ms ease, margin 150ms ease',
        willChange: 'transform',
      }} />
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0,
        width: ringSize, height: ringSize, borderRadius: '50%',
        border: `1.5px solid ${color}`,
        background: 'transparent',
        marginLeft: -(ringSize / 2), marginTop: -(ringSize / 2),
        pointerEvents: 'none', zIndex: 99999,
        opacity: hidden ? 0 : 0.85,
        transition: 'border-color 150ms ease, opacity 200ms ease, width 200ms ease, height 200ms ease, margin 200ms ease',
        willChange: 'transform',
      }} />
    </>
  )
}