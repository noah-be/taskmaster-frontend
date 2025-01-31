import { createVuetify } from 'vuetify';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

function createI18nMock() {
  return {
    global: {
      config: {
        globalProperties: {
          $t: vi.fn(key => key)
        }
      }
    }
  };
}

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    t: vi.fn(key => key)
  })
}));

global.API_BASE_URL = 'https://mockapi.com';

global.describe = describe;
global.it = it;
global.expect = expect;
global.vi = vi;
global.beforeEach = beforeEach;
global.afterEach = afterEach;

const mockVuetify = createVuetify();
const mockI18n = createI18nMock();

global.mount = (component, options) =>
  mount(component, {
    global: { plugins: [mockVuetify], config: { globalProperties: { ...mockI18n.global.config.globalProperties } }, ...options }
  });

global.mount = (component, options = {}) => {
  const defaultPlugins = [mockVuetify, createTestingPinia()];

  const extraPlugins = options.global?.plugins || [];

  return mount(component, {
    global: {
      plugins: [...defaultPlugins, ...extraPlugins],
      config: {
        globalProperties: { ...mockI18n.global.config.globalProperties }
      },
      ...options.global
    },
    ...options
  });
};
