import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    manifest: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': ['lucide-react'],
          'utils': ['axios', 'jspdf']
        }
      }
    }
  },

  server: {
    proxy: {
              '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false
              },
              '/api/quote': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false
              },
              '/api/contact': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false
              }
            }
          },
   
  optimizeDeps: {
    exclude: ['']
  }
})
     