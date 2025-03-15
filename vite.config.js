/**
 * Vite configuration for asset bundling and optimization
 */
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  // Serve static files from the root directory
  publicDir: 'dist',

  build: {
    // Output directory for assets
    outDir: 'dist/assets',
    assetsDir: '',
    emptyOutDir: false, // Don't empty the output directory since Eleventy puts files there

    // Enable asset minification
    minify: 'terser',

    // Improve CSS optimization
    cssMinify: true,
    cssCodeSplit: true,

    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/assets/js/main.js'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: '[name].[ext]',
      },
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        additionalData: '',
      },
    },
  },
  // Enable cache for faster rebuilds
  cacheDir: '.vite-cache',
  // Add alias for src directory
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // Configure server to serve static files from dist
  server: {
    static: {
      directory: path.join(__dirname, 'dist'),
      publicPath: '/',
    },
  },
});
