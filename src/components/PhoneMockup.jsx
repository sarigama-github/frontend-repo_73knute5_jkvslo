import { motion, useScroll, useTransform } from 'framer-motion'

const neonMint = '#52FFC1'
const softBlue = '#4EA8FF'

export default function PhoneMockup() {
  const { scrollYProgress } = useScroll()
  // Create a string-based shadow directly to avoid .to mapping issues
  const shadow = useTransform(
    scrollYProgress,
    [0, 1],
    [
      '0 30px 60px rgba(78,168,255,0.20)',
      '0 30px 60px rgba(78,168,255,0.50)'
    ]
  )
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 8])

  return (
    <motion.div style={{ rotate }} className="relative w-[280px] h-[560px]">
      <div className="absolute -inset-[10px] rounded-[36px] bg-black/0" />
      <motion.div
        style={{ boxShadow: shadow }}
        className="relative w-full h-full rounded-[32px] bg-slate-900/60 border border-white/10 backdrop-blur-xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-8 bg-black/40" />
        <div className="absolute inset-0 p-2">
          <div className="w-full h-full rounded-2xl border border-white/10 bg-slate-900/60">
            <div className="p-2 text-[10px] text-slate-400 flex items-center gap-2 border-b border-white/10">
              <span className="w-2 h-2 rounded-full" style={{ background: neonMint }}></span>
              <span className="w-2 h-2 rounded-full" style={{ background: softBlue }}></span>
              <span>Vibe Coding</span>
            </div>
            <div className="h-[calc(100%-22px)]">
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
