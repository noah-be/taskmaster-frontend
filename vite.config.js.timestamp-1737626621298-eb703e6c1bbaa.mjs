// vite.config.js
import { sentryVitePlugin } from "file:///home/user/Documents/Github/taskmaster-frontend/node_modules/@sentry/vite-plugin/dist/esm/index.mjs";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///home/user/Documents/Github/taskmaster-frontend/node_modules/vite/dist/node/index.js";
import vue from "file:///home/user/Documents/Github/taskmaster-frontend/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vuetify from "file:///home/user/Documents/Github/taskmaster-frontend/node_modules/vite-plugin-vuetify/dist/index.mjs";
import vueDevTools from "file:///home/user/Documents/Github/taskmaster-frontend/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///home/user/Documents/Github/taskmaster-frontend/vite.config.js";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    vueDevTools(),
    sentryVitePlugin({
      org: "taskmaster",
      project: "taskmaster-frontend",
      telemetry: false
    })
  ],
  optimizeDeps: {
    include: ["axe-core"]
  },
  test: {
    globals: true,
    setupFiles: ["./tests/vitest.setup.js"],
    include: ["tests/**/*.{test,spec}.{js,vue}"],
    environment: "jsdom",
    coverage: {
      include: ["src/**/*.{js,ts,vue}"],
      exclude: [
        "src/main.js",
        "src/plugins.js",
        "src/App.vue",
        "vite.config.js",
        "src/components/Header.vue",
        "src/components/Footer.vue",
        "src/views/AboutView.vue",
        "src/views/ContactView.vue",
        "src/**/*.stories.{js,ts,vue}"
      ],
      provider: "istanbul",
      reporter: ["text", "html"],
      reportsDirectory: "./tests/unit/coverage"
    },
    server: {
      deps: {
        inline: ["vuetify"]
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler"
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3009",
        changeOrigin: true
      }
    }
  },
  build: {
    sourcemap: true
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS91c2VyL0RvY3VtZW50cy9HaXRodWIvdGFza21hc3Rlci1mcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvdXNlci9Eb2N1bWVudHMvR2l0aHViL3Rhc2ttYXN0ZXItZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvdXNlci9Eb2N1bWVudHMvR2l0aHViL3Rhc2ttYXN0ZXItZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBzZW50cnlWaXRlUGx1Z2luIH0gZnJvbSAnQHNlbnRyeS92aXRlLXBsdWdpbic7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCc7XG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnO1xuaW1wb3J0IHZ1ZXRpZnkgZnJvbSAndml0ZS1wbHVnaW4tdnVldGlmeSc7XG5pbXBvcnQgdnVlRGV2VG9vbHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWRldnRvb2xzJztcblxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVldGlmeSh7IGF1dG9JbXBvcnQ6IHRydWUgfSksXG4gICAgdnVlRGV2VG9vbHMoKSxcbiAgICBzZW50cnlWaXRlUGx1Z2luKHtcbiAgICAgIG9yZzogJ3Rhc2ttYXN0ZXInLFxuICAgICAgcHJvamVjdDogJ3Rhc2ttYXN0ZXItZnJvbnRlbmQnLFxuICAgICAgdGVsZW1ldHJ5OiBmYWxzZVxuICAgIH0pXG4gIF0sXG5cbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogWydheGUtY29yZSddXG4gIH0sXG5cbiAgdGVzdDoge1xuICAgIGdsb2JhbHM6IHRydWUsXG4gICAgc2V0dXBGaWxlczogWycuL3Rlc3RzL3ZpdGVzdC5zZXR1cC5qcyddLFxuICAgIGluY2x1ZGU6IFsndGVzdHMvKiovKi57dGVzdCxzcGVjfS57anMsdnVlfSddLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIGNvdmVyYWdlOiB7XG4gICAgICBpbmNsdWRlOiBbJ3NyYy8qKi8qLntqcyx0cyx2dWV9J10sXG4gICAgICBleGNsdWRlOiBbXG4gICAgICAgICdzcmMvbWFpbi5qcycsXG4gICAgICAgICdzcmMvcGx1Z2lucy5qcycsXG4gICAgICAgICdzcmMvQXBwLnZ1ZScsXG4gICAgICAgICd2aXRlLmNvbmZpZy5qcycsXG4gICAgICAgICdzcmMvY29tcG9uZW50cy9IZWFkZXIudnVlJyxcbiAgICAgICAgJ3NyYy9jb21wb25lbnRzL0Zvb3Rlci52dWUnLFxuICAgICAgICAnc3JjL3ZpZXdzL0Fib3V0Vmlldy52dWUnLFxuICAgICAgICAnc3JjL3ZpZXdzL0NvbnRhY3RWaWV3LnZ1ZScsXG4gICAgICAgICdzcmMvKiovKi5zdG9yaWVzLntqcyx0cyx2dWV9J1xuICAgICAgXSxcbiAgICAgIHByb3ZpZGVyOiAnaXN0YW5idWwnLFxuICAgICAgcmVwb3J0ZXI6IFsndGV4dCcsICdodG1sJ10sXG4gICAgICByZXBvcnRzRGlyZWN0b3J5OiAnLi90ZXN0cy91bml0L2NvdmVyYWdlJ1xuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBkZXBzOiB7XG4gICAgICAgIGlubGluZTogWyd2dWV0aWZ5J11cbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgc2Nzczoge1xuICAgICAgICBhcGk6ICdtb2Rlcm4tY29tcGlsZXInXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICB9XG4gIH0sXG5cbiAgc2VydmVyOiB7XG4gICAgcHJveHk6IHtcbiAgICAgICcvYXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDknLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgYnVpbGQ6IHtcbiAgICBzb3VyY2VtYXA6IHRydWVcbiAgfVxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStULFNBQVMsd0JBQXdCO0FBQ2hXLFNBQVMsZUFBZSxXQUFXO0FBRW5DLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sU0FBUztBQUNoQixPQUFPLGFBQWE7QUFDcEIsT0FBTyxpQkFBaUI7QUFOOEssSUFBTSwyQ0FBMkM7QUFTdlAsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osUUFBUSxFQUFFLFlBQVksS0FBSyxDQUFDO0FBQUEsSUFDNUIsWUFBWTtBQUFBLElBQ1osaUJBQWlCO0FBQUEsTUFDZixLQUFLO0FBQUEsTUFDTCxTQUFTO0FBQUEsTUFDVCxXQUFXO0FBQUEsSUFDYixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLFVBQVU7QUFBQSxFQUN0QjtBQUFBLEVBRUEsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLElBQ1QsWUFBWSxDQUFDLHlCQUF5QjtBQUFBLElBQ3RDLFNBQVMsQ0FBQyxpQ0FBaUM7QUFBQSxJQUMzQyxhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsTUFDUixTQUFTLENBQUMsc0JBQXNCO0FBQUEsTUFDaEMsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFVBQVU7QUFBQSxNQUNWLFVBQVUsQ0FBQyxRQUFRLE1BQU07QUFBQSxNQUN6QixrQkFBa0I7QUFBQSxJQUNwQjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBQ0osUUFBUSxDQUFDLFNBQVM7QUFBQSxNQUNwQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixLQUFLO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLE9BQU87QUFBQSxJQUNMLFdBQVc7QUFBQSxFQUNiO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
