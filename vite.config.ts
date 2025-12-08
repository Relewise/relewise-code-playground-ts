import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'client-console-relay',
      configureServer(server) {
        server.middlewares.use('/__log', async (req, res) => {
          if (req.method !== 'POST') {
            res.statusCode = 405
            res.end()
            return
          }

          let body = ''
          for await (const chunk of req) {
            body += chunk
          }

          try {
            const { level = 'log', args = [] } = JSON.parse(body || '{}') as {
              level?: 'log' | 'info' | 'warn' | 'error'
              args?: unknown[]
            }

            const tag = '[client]'
            if (level === 'warn' || level === 'error') {
              ;(console[level] ?? console.log)(tag, ...args)
            } else {
              console.log(tag, ...args)
            }
          } catch (error) {
            console.warn('[client-console-relay] Failed to parse log payload', error)
          }

          res.statusCode = 204
          res.end()
        })
      },
    },
  ],
})
