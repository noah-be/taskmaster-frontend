import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify({ autoImport: true }), vueDevTools()],
  optimizeDeps: {
    include: ['axe-core']
  },
  test: {
    globals: true,
    setupFiles: ['./tests/vitest.setup.js'],
    include: ['tests/**/*.{test,spec}.{js,vue}'],
    coverage: {
      exclude: ['src/main.js', 'src/App.vue', 'vite.config.js', 'src/components/Header.vue', 'src/components/Footer.vue'],
      provider: 'v8',
      reporter: ['text', 'html'],
      reportsDirectory: './coverage'
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
    proxy: {
      '/api': {
        target: 'http://localhost:3009',
        changeOrigin: true
      }
    }
  }
});
