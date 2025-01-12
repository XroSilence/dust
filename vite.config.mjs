import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      treeshake: true,
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
   
                      
              }
            }
          }
  }
});