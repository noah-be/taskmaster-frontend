import { createVuetify } from 'vuetify';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';

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
global.t = vi.fn(key => key);

const mockVuetify = createVuetify();
const mockI18n = createI18nMock();

global.mount = (component, options) =>
  mount(component, {
    global: { plugins: [mockVuetify], config: { globalProperties: { ...mockI18n.global.config.globalProperties } }, ...options }
  });
