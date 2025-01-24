import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    rollupOptions: {
      input: 'index.html',
      output: {
        // This function categorizes chunks based on their file paths
        // to optimize the build output by grouping related modules together.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          
          }
          if (id.includes('src/components')) {
            return 'components';
          }
          if (id.includes('postcss') || id.includes('tailwind')) {
            return 'styles';
          }     
          if (id.includes('src/utils')) {
            return 'utils';
          }
          if (id.includes('src/pages')) {
            return 'pages';
          }
          
          
        }
      }
    }
  },

  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    fs: {
      strict: true,
      allow: ['..']
    }
  }
})