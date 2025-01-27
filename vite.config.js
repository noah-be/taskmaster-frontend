import { sentryVitePlugin } from '@sentry/vite-plugin';
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    vueDevTools(),
    sentryVitePlugin({
      org: 'taskmaster',
      project: 'taskmaster-frontend',
      telemetry: false
    })
  ],

  optimizeDeps: {
    include: ['axe-core']
  },

  test: {
    globals: true,
    setupFiles: ['./tests/vitest.setup.js'],
    include: ['tests/**/*.{test,spec}.{js,vue}'],
    environment: 'jsdom',
    coverage: {
      include: ['src/**/*.{js,ts,vue}'],
      exclude: [
        'src/main.js',
        'src/plugins.js',
        'src/App.vue',
        'vite.config.js',
        'src/components/Header.vue',
        'src/components/Footer.vue',
        'src/views/AboutView.vue',
        'src/views/ContactView.vue',
        'src/**/*.stories.{js,ts,vue}'
      ],
      provider: 'istanbul',
      reporter: ['text', 'html'],
      reportsDirectory: './tests/unit/coverage'
    },
    server: {
      deps: {
        inline: ['vuetify']
      }
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  server: {
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3009',
        changeOrigin: true
      }
    }
  },

  build: {
    sourcemap: true
  }
});
