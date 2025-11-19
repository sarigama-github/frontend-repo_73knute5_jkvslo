import { useEffect, useRef } from 'react'

// Dark coding-focused backdrop with grid + animated gradient blobs
export default function CodingBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let t = 0
    let raf
    function tick() {
      t += 0.005
      const x = Math.sin(t) * 10
      const y = Math.cos(t * 0.8) * 10
      el.style.setProperty('--blob1-x', `${50 + x}%`)
      el.style.setProperty('--blob1-y', `${30 + y}%`)
      el.style.setProperty('--blob2-x', `${60 - y}%`)
      el.style.setProperty('--blob2-y', `${70 - x}%`)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 -z-10 bg-[#0b1220]">
      {/* moving subtle blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute size-[44rem] rounded-full blur-3xl opacity-[0.15]" style={{ left: 'var(--blob1-x)', top: 'var(--blob1-y)', background: 'radial-gradient(circle, #4EA8FF, transparent 60%)', transform: 'translate(-50%, -50%)' }} />
        <div className="absolute size-[44rem] rounded-full blur-3xl opacity-[0.12]" style={{ left: 'var(--blob2-x)', top: 'var(--blob2-y)', background: 'radial-gradient(circle, #52FFC1, transparent 60%)', transform: 'translate(-50%, -50%)' }} />
      </div>

      {/* faint grid */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `linear-gradient(rgba(148,163,184,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.15) 1px, transparent 1px)` ,
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 0 0'
      }} />
    </div>
  )
}
