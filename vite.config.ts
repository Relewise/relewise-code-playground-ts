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
          try {
            const parsed = JSON.parse(body)
            const args = Array.isArray(parsed?.args) ? parsed.args : [parsed]

            if (args.length === 1) {
              console.log(args[0])
            } else {
              console.log(...args)
            }
          } catch {
            console.log(body || '<empty>')
          }

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
