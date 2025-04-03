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
          "react-vendors": ["react", "react-dom", "react-router-dom"],
          "framer-motion": ["framer-motion"],
          "google-auth": ["@react-oauth/google"],
          "tone": ["tone"],
          "sweetalert2": ["sweetalert2"],
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'], // Optional but recommended
    css: true, // If you're using CSS in your tests
    include: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
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
