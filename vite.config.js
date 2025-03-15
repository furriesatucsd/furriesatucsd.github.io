/**
 * Vite configuration for asset bundling and optimization
 */
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
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
                main: path.resolve(__dirname, 'src/assets/scss/main.scss'),
                app: path.resolve(__dirname, 'src/assets/js/main.js')
            },
            output: {
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split('.').at(1);
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'img';
                    } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
                        extType = 'fonts';
                    }
                    return `${extType}/[name][extname]`;
                },
                entryFileNames: 'js/[name].js',
                chunkFileNames: 'js/[name].[hash].js',
                
                // Improve code splitting for better caching
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                // Inject global variables or mixins automatically
                additionalData: `@use "./_variables" as *;\n` 
            }
        },
        // Enable devtools for easier debugging
        devSourcemap: true
    },
    // Enable cache for faster rebuilds
    cacheDir: '.vite-cache'
});
