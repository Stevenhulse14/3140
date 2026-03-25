import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Bind on all interfaces so LAN / tunnel tools (ngrok, etc.) can connect.
    host: '0.0.0.0',
    // Vite 6+ host check: allow tunnel subdomains without listing each URL.
    // Leading dot = suffix match (.ngrok-free.dev, .ngrok.io).
    allowedHosts: ['.ngrok-free.dev', '.ngrok.io'],
    // Dev-only proxy: browser calls /api/... → Express on port 4000 (no CORS hassle).
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true,
      },
    },
  },
})
