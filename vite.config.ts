import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

function devLogMiddleware(): Plugin {
  return {
    name: 'dev-client-log-forwarder',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/__log', (req, res) => {
        let body = ''

        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', () => {
          // Keep the payload simple; just dump what the client sent.
          const message = body || '<empty>'
          // eslint-disable-next-line no-console
          console.log(`[client-log] ${message}`)

          res.statusCode = 204
          res.end()
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), devLogMiddleware()],
})
