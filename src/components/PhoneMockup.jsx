import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const neonMint = '#52FFC1'
const softBlue = '#4EA8FF'

function ScreenCycle() {
  // simple cycling between chat, diffs, preview
  const frames = [
    (
      <div className="p-3 text-xs text-slate-200">
        <div className="font-semibold mb-2 text-slate-100">Claude</div>
        <div className="space-y-2">
          <div className="bg-white/5 border border-white/10 p-2 rounded">Generating React Native component...</div>
          <div className="bg-white/5 border border-white/10 p-2 rounded">Streaming tokens: <span className="text-[#{neonMint}]">useState</span> <span className="text-[#{softBlue}]">useEffect</span> ...</div>
          <div className="bg-white/5 border border-white/10 p-2 rounded">Preview booting in Expo Snack</div>
        </div>
      </div>
    ),
    (
      <div className="p-3 text-[10px] font-mono text-slate-200">
        <div className="text-slate-400">diff App.tsx</div>
        <pre className="mt-1 whitespace-pre-wrap">
{`+ import React from 'react'\n+ export default function App() {\n+  return (\n+    <View><Text>Hello</Text></View>\n+  )\n+ }`}
        </pre>
      </div>
    ),
    (
      <div className="flex items-center justify-center h-full">
        <div className="w-24 h-24 rounded-xl bg-slate-900/60 border border-white/10 flex items-center justify-center text-slate-200">Expo Preview</div>
      </div>
    )
  ]
  const idx = useRef(0)
  const containerRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      idx.current = (idx.current + 1) % frames.length
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
        const wrapper = document.createElement('div')
        wrapper.className = 'w-full h-full'
        // Render static HTML snapshot for simplicity
        wrapper.appendChild(document.createElement('div'))
        containerRef.current.appendChild(wrapper)
      }
    }, 2200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden rounded-[22px]" />
  )
}

export default function PhoneMockup() {
  const { scrollYProgress } = useScroll()
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8])
  const shadow = useTransform(scrollYProgress, [0, 1], [0.2, 0.5])

  return (
    <motion.div style={{ rotate }} className="relative w-[280px] h-[560px]">
      <div className="absolute -inset-[10px] rounded-[36px] bg-black/0" />
      <motion.div
        style={{ boxShadow: shadow.to(v => `0 30px 60px rgba(78,168,255,${v})`) }}
        className="relative w-full h-full rounded-[32px] bg-slate-900/60 border border-white/10 backdrop-blur-xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-8 bg-black/40" />
        <div className="absolute inset-0 p-2">
          {/* rotating screen content */}
          <div className="w-full h-full rounded-2xl border border-white/10 bg-slate-900/60">
            <div className="p-2 text-[10px] text-slate-400 flex items-center gap-2 border-b border-white/10">
              <span className="w-2 h-2 rounded-full" style={{ background: neonMint }}></span>
              <span className="w-2 h-2 rounded-full" style={{ background: softBlue }}></span>
              <span>Vibe Coding</span>
            </div>
            <div className="h-[calc(100%-22px)]">
              {/* simplified dynamic content placeholder */}
              <div className="p-3 text-xs text-slate-200 space-y-2">
                <div className="bg-white/5 border border-white/10 p-2 rounded">AI chat generating code...</div>
                <div className="bg-white/5 border border-white/10 p-2 rounded">Token streaming...</div>
                <div className="bg-white/5 border border-white/10 p-2 rounded">Instant Expo preview</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
