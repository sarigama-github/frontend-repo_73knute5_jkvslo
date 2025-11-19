import Background from './components/Background'
import Hero from './components/Hero'
import { PromiseSection, HowItWorks, FeatureGrid, SocialProof, Pricing, FinalCTA } from './components/Sections'
import { useEffect, useState } from 'react'

const neonMint = '#52FFC1'
const softBlue = '#4EA8FF'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <Background />

      {/* Sticky header with hide/reveal */}
      <header className={`sticky top-0 z-50 transition-all ${scrolled ? 'backdrop-blur-lg bg-white/70 dark:bg-slate-900/40 border-b border-slate-200/60 dark:border-white/10' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ background: neonMint }} />
            <span className="font-semibold tracking-tight">Vibe2store</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#promise" className="hover:opacity-80">Promise</a>
            <a href="#workflow" className="hover:opacity-80">How it works</a>
            <a href="#features" className="hover:opacity-80">Features</a>
            <a href="#pricing" className="hover:opacity-80">Pricing</a>
            <a href="#start" className="px-3 py-2 rounded-lg font-semibold text-slate-900" style={{ background: neonMint }}>Start</a>
          </nav>
        </div>
      </header>

      <main>
        <Hero />
        <PromiseSection />
        <HowItWorks />
        <FeatureGrid />
        <SocialProof />
        <Pricing />
        <FinalCTA />
      </main>

      <footer className="py-10">
        <div className="container mx-auto px-6 text-sm text-slate-500">
          © {new Date().getFullYear()} Vibe2store. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
