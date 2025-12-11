import react from '@vitejs/plugin-react';
import { execSync } from 'child_process';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';
import svgr from 'vite-plugin-svgr';

/**
 * Vite plugin to automatically export SASS variables to TypeScript.
 * Runs on build start and watches for changes to _colors.scss during development.
 */
function sassExportPlugin() {
  return {
    name: 'sass-export',
    buildStart() {
      console.log('[sass-export] Exporting SASS variables...');
      try {
        execSync('node ./scripts/export-sass-variables.js', { stdio: 'inherit' });
      } catch (error) {
        console.error('[sass-export] Failed to export SASS variables:', error);
      }
    },
    handleHotUpdate({ file }: { file: string }) {
      if (file.endsWith('_colors.scss')) {
        console.log('[sass-export] SASS colors changed, re-exporting...');
        try {
          execSync('node ./scripts/export-sass-variables.js', { stdio: 'inherit' });
        } catch (error) {
          console.error('[sass-export] Failed to export SASS variables:', error);
        }
      }
    },
  };
}

export default defineConfig({
  server: {
    host: '0.0.0.0', // Make Vite accessible on the local network
    port: 5173,      // Change the port if necessary
  },
  plugins: [
    react(),
    svgr(),
    sassExportPlugin(), // Auto-export SASS variables on build and file changes
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
      '@data': path.resolve(__dirname, './src/data'),
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
