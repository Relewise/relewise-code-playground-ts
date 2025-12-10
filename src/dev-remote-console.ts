// Dev-only console forwarding to the Vite dev server stdout for StackBlitz.
// Run only in a browser (StackBlitz executes in the browser even for preview builds).
if (typeof window !== 'undefined') {
  const levels = ['log', 'info', 'warn', 'error'] as const
  type Level = (typeof levels)[number]

  const sendToServer = (level: Level, args: unknown[]) => {
    const payload = JSON.stringify({ level, args })
    navigator.sendBeacon?.('/__log', payload)
  }

  levels.forEach((level) => {
    const original = console[level].bind(console)
    console[level] = (...args: unknown[]) => {
      original(...args)
      sendToServer(level, args)
    }
  })
}
