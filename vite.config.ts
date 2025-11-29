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
    // handle all SVG files:
    // svgr({
    //   exportAsDefault: true,
    //   include: '**/*.svg',
    // });
    visualizer({
      filename: './dist/stats.html',
      open: true,
    }),
    compression({ algorithm: 'brotliCompress' }),
  ],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@context': path.resolve(__dirname, './src/context'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@config': path.resolve(__dirname, './src/config'),
      '$three': path.resolve(__dirname, './src/three-exports.ts'),
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
