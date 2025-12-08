import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Mirror browser console output to the Vite dev server so it shows in the StackBlitz terminal.
const startClientConsoleRelay = () => {
  if (typeof window === 'undefined') return

  const original = { ...window.console }
  const levels: Array<keyof Console> = ['log', 'info', 'warn', 'error']

  const serialize = (value: unknown) => {
    if (typeof value === 'string') return value
    try {
      return JSON.parse(JSON.stringify(value))
    } catch {
      return String(value)
    }
  }

  const send = (payload: string) => {
    const blob = new Blob([payload], { type: 'application/json' })
    if (!navigator.sendBeacon('/__log', blob)) {
      void fetch('/__log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
      })
    }
  }

  levels.forEach((level) => {
    const originalFn = (original[level] ?? original.log) as (...args: unknown[]) => void
    window.console[level] = (...args: unknown[]) => {
      originalFn(...args)
      try {
        send(
          JSON.stringify({
            level,
            args: args.map(serialize),
            ts: Date.now(),
          }),
        )
      } catch (error) {
        original.error('console relay failed', error)
      }
    }
  })
}

startClientConsoleRelay()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
