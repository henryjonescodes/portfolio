import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'), // Adjust path to where the alias points
      '@assets': path.resolve(__dirname, 'src/assets'), // Adjust path to where the alias points
      '@components': path.resolve(__dirname, 'src/components'), // Adjust path to where the alias points
    },
  },
})
