import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Background: flat colors only, no gradients. Includes subtle moving grid and floating particles.
export default function Background() {
  const canvasRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const pulse = useTransform(scrollYProgress, [0, 1], [0.2, 1])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }))

    function resize() {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function drawGrid() {
      const spacing = 40
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.07)'
      ctx.lineWidth = 1
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath()
        ctx.moveTo(x + 0.5, 0)
        ctx.lineTo(x + 0.5, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath()
        ctx.moveTo(0, y + 0.5)
        ctx.lineTo(canvas.width, y + 0.5)
        ctx.stroke()
      }
    }

    function tick() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      drawGrid()
      // faint noise via tiny dots
      particles.forEach(p => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(82,255,193,' + (0.06 + Math.random() * 0.04) + ')'
        ctx.shadowColor = 'rgba(82,255,193,0.25)'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      })
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
      <motion.div
        style={{ opacity: pulse }}
        className="absolute inset-0"
      />
      {/* subtle noise overlay */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100%25\' height=\'100%25\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")'
      }} />
    </div>
  )
}
