import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import PhoneMockup from './PhoneMockup'

const neonMint = '#52FFC1'
const softBlue = '#4EA8FF'

const codeLines = [
  "npx create-expo-app",
  "Adding React Native components...",
  "Streaming tokens…",
  "Booting preview on Snack",
  "Ready in 3, 2, 1…"
]

export default function Hero() {
  const [display, setDisplay] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const typingRef = useRef(null)

  useEffect(() => {
    const tick = () => {
      const current = codeLines[lineIdx]
      if (charIdx < current.length) {
        setDisplay(prev => prev + current[charIdx])
        setCharIdx(charIdx + 1)
        typingRef.current = setTimeout(tick, 40)
      } else {
        typingRef.current = setTimeout(() => {
          setDisplay('')
          setCharIdx(0)
          setLineIdx((lineIdx + 1) % codeLines.length)
        }, 900)
      }
    }
    typingRef.current = setTimeout(tick, 600)
    return () => clearTimeout(typingRef.current)
  }, [charIdx, lineIdx])

  return (
    <section className="relative pt-28 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="flex-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
              Build Mobile Apps With AI. Right From Your Phone.
            </h1>
            <p className="mt-5 text-slate-600 dark:text-slate-300 text-lg max-w-xl">
              Describe what you want. Watch Claude generate real React Native code. Preview instantly. Build and publish to the stores in minutes.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <a href="#start" className="group inline-flex items-center px-5 py-3 rounded-xl text-slate-900 bg-[var(--neon-mint)] font-semibold shadow-[0_0_0_0_rgba(82,255,193,0.5)] hover:shadow-[0_0_20px_4px_rgba(82,255,193,0.35)] transition shadow-md"
                 style={{ ['--neon-mint']: neonMint }}>
                <span className="group-hover:scale-[1.02] transition-transform">Start Generating</span>
              </a>
              <a href="#demo" className="inline-flex items-center px-5 py-3 rounded-xl border border-slate-300/50 dark:border-white/10 text-slate-800 dark:text-slate-100 hover:bg-white/40 dark:hover:bg-white/5 transition">
                See Live Demo
              </a>
            </div>

            <div className="mt-8 bg-white/50 dark:bg-white/5 border border-slate-300/50 dark:border-white/10 rounded-xl p-3 font-mono text-sm text-slate-700 dark:text-slate-200 shadow-inner">
              <span className="text-slate-400">$</span> {display}
              <span className="animate-pulse">▌</span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  )
}
