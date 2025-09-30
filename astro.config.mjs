// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'url';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@/layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
        '@/utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
        '@/config': fileURLToPath(new URL('./src/config', import.meta.url))
      }
    },
    build: {
      // Optimize build output
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: undefined
        }
      }
    }
  },

  // Remove React integration - not using any React components
  integrations: [],

  // Build optimizations
  build: {
    inlineStylesheets: 'auto'
  }
});