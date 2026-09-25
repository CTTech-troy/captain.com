import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { createContactHandler } from './server/contact.ts'


// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  build: { manifest: true },
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'contact-api',
      configureServer(server) {
        const handler = createContactHandler({ ...loadEnv(mode, process.cwd(), ''), ...process.env });
        server.middlewares.use('/api/contact', (req, res) => { void handler(req, res); });
      },
    },
  ],
}))
