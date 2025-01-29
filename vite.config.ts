import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    rollupOptions: {
      // Add your rollup options here
    input: 'src/main.tsx',
    output: {
      dir: 'dist',
      format: 'es',
      sourcemap: true
    },
    external: ['react', 'react-dom'],
    plugins: []
    }
  },
    server: {
      proxy: {
        '/api': 'http://localhost:5000' // Proxy API requests
      }
    }
  })
      