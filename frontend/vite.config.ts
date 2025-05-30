import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy /api requests to your backend server
      '/api': {
        target: 'http://localhost:8000', // Change this to your Laravel backend URL
        changeOrigin: true,
        secure: false,
      },
    },
  },
});