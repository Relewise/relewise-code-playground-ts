// Dev-only console forwarding to the Vite dev server stdout for StackBlitz.
if (import.meta.env.DEV && typeof window !== 'undefined') {
  const levels = ['log', 'info', 'warn', 'error'] as const
  type Level = (typeof levels)[number]

  const sendToServer = (level: Level, args: unknown[]) => {
    const payload = JSON.stringify({
      level,
      time: new Date().toISOString(),
      args: args.map((value) => {
        if (value instanceof Error) return { message: value.message, stack: value.stack }
        try {
          return typeof value === 'string' ? value : JSON.stringify(value)
        } catch {
          return String(value)
        }
      }),
    })

    const blob = new Blob([payload], { type: 'application/json' })
    const url = '/__log'
    const sent = navigator.sendBeacon?.(url, blob)

    if (!sent) {
      void fetch(url, {
        method: 'POST',
        body: payload,
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
      }).catch(() => {
        /* ignore */
      })
    }
  }

  levels.forEach((level) => {
    const original = console[level].bind(console)
    console[level] = (...args: unknown[]) => {
      original(...args)
      try {
        sendToServer(level, args)
      } catch {
        // Keep normal console behavior even if forwarding fails.
      }
    }
  })
}
