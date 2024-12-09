import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/dust/'
  ,server: {
    port: 4000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});