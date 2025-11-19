import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.error('UI ErrorBoundary caught:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
    // full reload to clear any HMR overlay/internal state issues
    if (typeof window !== 'undefined') window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b1220] text-slate-200 flex items-center justify-center p-6">
          <div className="max-w-lg w-full rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-xl p-6 space-y-4">
            <h1 className="text-xl font-semibold">Something went wrong</h1>
            <p className="text-slate-400 text-sm">The page failed to load properly. This can happen in preview environments. Try reloading the page.</p>
            {this.state.error && (
              <pre className="text-xs text-red-300/90 bg-black/40 p-3 rounded overflow-auto max-h-48">{String(this.state.error)}</pre>
            )}
            <button onClick={this.handleRetry} className="px-4 py-2 rounded-lg bg-white text-slate-900 font-medium hover:opacity-90 transition">Reload</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
