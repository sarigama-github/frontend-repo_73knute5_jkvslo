import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const neonMint = '#52FFC1'
const softBlue = '#4EA8FF'

const snippet = `import { Text, View, Pressable } from 'react-native'
import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, backgroundColor: '#0b1220' }}>
      <Text style={{ color: '#e2e8f0', fontSize: 20 }}>Hello, Vibe2store 👋</Text>
      <Pressable onPress={() => setCount(c => c + 1)}
        style={{ paddingHorizontal: 16, paddingVertical: 10, borderRadius: 12, backgroundColor: '#1f2937' }}>
        <Text style={{ color: '#52FFC1' }}>Tap me ({'${count}'})</Text>
      </Pressable>
    </View>
  )
}`

function Syntax({ code }) {
  // naive syntax highlighter using spans and regex
  const tokens = code
    .replace(/(&)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
  const lines = tokens.split('\n')

  const colorize = (line) => {
    return line
      .replace(/(import|from|export default|return|const|useState|function|View|Text|Pressable)/g, '<span class="text-sky-300">$1</span>')
      .replace(/(\{|\}|\(|\)|<|>|\[|\]|,)/g, '<span class="text-slate-500">$1</span>')
      .replace(/('[^']*'|"[^"]*")/g, '<span class="text-emerald-300">$1</span>')
      .replace(/(\d+)/g, '<span class="text-purple-300">$1</span>')
  }

  return (
    <pre className="font-mono text-[12px] leading-relaxed text-slate-300">
      {lines.map((l, i) => (
        <div key={i} className="tabular-nums">
          <span className="select-none text-slate-600 mr-3">{String(i + 1).padStart(2, '0')}</span>
          <span dangerouslySetInnerHTML={{ __html: colorize(l) }} />
        </div>
      ))}
    </pre>
  )
}

export default function CodeShowcase() {
  const [cursorPos, setCursorPos] = useState({ line: 0 })
  const [playing, setPlaying] = useState(true)
  const lines = snippet.split('\n')

  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setCursorPos((p) => ({ line: (p.line + 1) % lines.length }))
    }, 700)
    return () => clearInterval(id)
  }, [playing, lines.length])

  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.06)]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: neonMint }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: softBlue }} />
          <span className="text-xs text-slate-400">App.tsx</span>
        </div>
        <button onClick={() => setPlaying(p => !p)} className="text-xs text-slate-400 hover:text-slate-200 transition">
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>

      <div className="relative p-4">
        <Syntax code={snippet} />
        <AnimatePresence>
          <motion.div
            key={cursorPos.line}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.12 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute left-0 right-0 h-[18px] rounded"
            style={{ top: 16 + cursorPos.line * 22, background: softBlue }}
          />
        </AnimatePresence>
      </div>
    </div>
  )
}
