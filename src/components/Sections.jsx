import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const neonMint = '#52FFC1'
const softBlue = '#4EA8FF'

function SectionContainer({ id, children }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id={id} ref={ref} className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="container mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  )
}

export function PromiseSection() {
  return (
    <SectionContainer id="promise">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">The Promise</h2>
      <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
        Build real apps without touching a laptop. Vibe2store turns your ideas into complete mobile apps using Claude Sonnet 4.5 and a lightning-fast preview engine powered by Expo Snack. All from your phone. All in real time.
      </p>
    </SectionContainer>
  )
}

export function HowItWorks() {
  const steps = [
    { title: 'Describe your idea', hint: 'Natural language, no templates', anim: 'line' },
    { title: 'Watch code generate live', hint: 'Every file, every component', anim: 'pulse' },
    { title: 'Instant preview', hint: 'Expo Snack loads instantly', anim: 'slide' },
    { title: 'Build & publish', hint: 'EAS Build + Submit', anim: 'cards' }
  ]

  return (
    <SectionContainer id="workflow">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">How It Works</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map((s, i) => (
          <motion.div key={i} whileHover={{ scale: 1.02 }} className="rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 shadow-sm">
            <div className="h-1 w-16 rounded-full" style={{ background: i % 2 ? softBlue : neonMint }} />
            <h3 className="mt-4 font-semibold text-slate-900 dark:text-white">{s.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">{s.hint}</p>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  )
}

export function FeatureGrid() {
  const features = [
    'AI-Generated Code',
    'In-App Code Preview',
    'Real-Time SSE Streaming',
    'Multi-Project Workspace',
    'No Setup Required',
    'App Store Ready'
  ]
  return (
    <SectionContainer id="features">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Feature Grid</h2>
      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div key={f} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
            className="rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 shadow-sm hover:shadow-md hover:border-slate-300/80 dark:hover:border-white/20">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 dark:text-white">{f}</h3>
              <span className="w-2 h-2 rounded-full" style={{ background: i % 2 ? softBlue : neonMint }} />
            </div>
            <div className="mt-4 h-24 rounded-xl bg-slate-900/40 border border-white/10" />
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  )
}

export function SocialProof() {
  const quotes = [
    '“Finally coding feels creative again.”',
    '“I built my MVP in one afternoon.”',
    '“The instant preview is magic.”'
  ]
  return (
    <SectionContainer id="social">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Trusted By</h2>
      <p className="mt-2 text-slate-600 dark:text-slate-300">Indie developers • Startup founders • Students and first-time coders</p>
      <div className="mt-8 grid md:grid-cols-3 gap-5">
        {quotes.map((q, i) => (
          <motion.blockquote key={i} className="rounded-2xl p-5 border border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-sm" whileHover={{ scale: 1.01 }}>
            <p className="text-slate-800 dark:text-slate-200">{q}</p>
          </motion.blockquote>
        ))}
      </div>
    </SectionContainer>
  )
}

export function Pricing() {
  const tiers = [
    { name: 'Free', desc: '10 runs per month. Basic previews. Limited history.', price: '$0' },
    { name: 'Pro', desc: 'Unlimited runs, priority queue, faster previews, detailed diffs.', price: '$29' },
    { name: 'Enterprise', desc: 'Custom SSO, priority support, isolated environments.', price: 'Contact' }
  ]
  return (
    <SectionContainer id="pricing">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Pricing</h2>
      <div className="mt-8 grid md:grid-cols-3 gap-5">
        {tiers.map((t, i) => (
          <motion.div key={t.name} whileHover={{ scale: 1.02 }} className="rounded-2xl border border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-slate-900 dark:text-white">{t.name}</h3>
              <span className="text-slate-600 dark:text-slate-300">{t.price}</span>
            </div>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{t.desc}</p>
            <a href="#start" className="mt-6 inline-block px-4 py-2 rounded-lg border border-slate-300/60 dark:border-white/10 hover:bg-white/50 dark:hover:bg-white/10 transition">Choose</a>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  )
}

export function FinalCTA() {
  return (
    <SectionContainer id="start">
      <div className="rounded-3xl p-10 border border-slate-200/60 dark:border-white/10 bg-white/60 dark:bg-white/5 text-center shadow-sm">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Ready to build your app?</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">Start generating mobile apps in seconds.</p>
        <a href="#start" className="mt-6 inline-block px-6 py-3 rounded-xl font-semibold text-slate-900" style={{ background: neonMint }}>Generate My App</a>
      </div>
    </SectionContainer>
  )
}
