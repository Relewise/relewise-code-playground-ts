// Dev-only console forwarding to the Vite dev server stdout for StackBlitz.
// Run only in a browser (StackBlitz executes in the browser even for preview builds).
if (typeof window !== 'undefined') {
  const levels = ['log', 'info', 'warn', 'error'] as const
  type Level = (typeof levels)[number]

  const sendToServer = (level: Level, args: unknown[]) => {
    const plainArgs = args.map((value) =>
      value instanceof Error ? { message: value.message, stack: value.stack } : value
    )

    let payload: string
    try {
      payload = JSON.stringify({ level, args: plainArgs })
    } catch {
      payload = JSON.stringify({ level, args: args.map(String) })
    }

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
