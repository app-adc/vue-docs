import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    base: '/BcDocs/', // เปลี่ยน repository-name เป็นชื่อ repository ของคุณ

    server: {
        port: 3000,
        watch: {
            usePolling: true,
        },
    },

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    // Enable deps optimization
    optimizeDeps: {
        include: ['vue', 'vue-router', '@vueuse/core'],
        exclude: ['core-js'],
    },

    // Enable caching
    cacheDir: '.vite',

    build: {
        // Option 1: Use esbuild (faster)
        minify: 'esbuild',
        target: 'esnext',
        outDir: 'dist', // โฟลเดอร์ output หลัง build

        /* // Option 2: Use Terser (more configurable)
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    */

        // Split chunks for better caching
        rollupOptions: {
            input: '/index.html',

            output: {
                manualChunks: {
                    vendor: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
                },
            },
        },

        // Disable source map for production
        sourcemap: false,

        // Reduce build time
        commonjsOptions: {
            transformMixedEsModules: true,
        },

        // Enable build optimization
        cssCodeSplit: true,
        chunkSizeWarningLimit: 500,
    },

    // esbuild options for better optimization
    esbuild: {
        treeShaking: true,
        minifyIdentifiers: true,
        minifySyntax: true,
        minifyWhitespace: true,
        legalComments: 'none',
        platform: 'browser',
    },
})
