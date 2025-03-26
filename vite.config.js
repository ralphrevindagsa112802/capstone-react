import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  optimizeDeps: {
    include: ["framer-motion", "@react-oauth/google"], 
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendors": ["react", "react-dom"],
          "framer-motion": ["framer-motion"],
          "google-auth": ["@react-oauth/google"],
        },
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://yappari-coffee-bar.shop',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
