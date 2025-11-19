import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: [],
    entries: ['./src/**/*.{js,jsx,ts,tsx}'],
    holdUntilCrawlEnd: true,
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
    strictPort: true,
    // Disable the dev overlay to avoid duplicate custom-element registration from the overlay bundle
    hmr: {
      overlay: false,
    },
    // Enable file watching so external previews update correctly
    watch: {
      usePolling: true,
      interval: 100,
    },
    cors: {
      origin: '*',
      credentials: true,
    },
    allowedHosts: [
      '.modal.host',
      'localhost',
      '127.0.0.1',
    ],
  },
})
