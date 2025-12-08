import { defineConfig, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'

function devLogMiddleware() {
  return {
    name: 'dev-client-log-forwarder',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/__log', (req, res) => {
        let body = ''

        req.on('data', (chunk) => {
          body += chunk
        })

        req.on('end', () => {
          console.log(body)
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
