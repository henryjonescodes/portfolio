import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Make Vite accessible on the local network
    port: 5173,      // Change the port if necessary
  },
  plugins: [
    react(), 
    svgr(), 
    visualizer({
      filename: './dist/stats.html',
      open: true,
    }),
    compression({ algorithm: 'brotliCompress' }),
  ],
  resolve: {
    alias: {
      '@three': path.resolve(__dirname, 'src/three.exports.ts'), // Update this line
      '@styles': path.resolve(__dirname, 'src/styles'),       // Adjust path to where the alias points
      '@assets': path.resolve(__dirname, 'src/assets'),       // Adjust path to where the alias points
      '@components': path.resolve(__dirname, 'src/components'), // Adjust path to where the alias points
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCase', // Optional: enable CSS modules with camelCase
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // Use the modern SASS compiler
      },
    },
  },
});
