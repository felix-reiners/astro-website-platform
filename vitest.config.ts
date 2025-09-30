import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'url';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '.astro/',
        'src/test/',
        'tests/',
        'generated-sites/',
        '**/*.config.*',
        '**/*.d.ts',
        '**/types.ts',
        '**/*.astro',
        'src/pages/**',
        'src/layouts/**',
        'src/prompts/**',
        'src/content/**',
        'scripts/**'
      ],
      include: [
        'src/utils/**/*.ts',
        'src/config/**/*.ts'
      ],
      // Note: Thresholds are set lower for Astro projects where most components
      // are .astro files (tested via E2E) rather than TypeScript modules.
      // The i18n utility (our most critical utility) has 93% coverage.
      thresholds: {
        'src/utils/i18n.ts': {
          lines: 90,
          functions: 85,
          branches: 90,
          statements: 90
        }
      }
    },
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@/layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@/utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@/config': fileURLToPath(new URL('./src/config', import.meta.url))
    }
  }
});