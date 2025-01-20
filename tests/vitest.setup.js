import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import de from '@/locales/de.json';

import { createVuetify } from 'vuetify';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';

global.vuetify = createVuetify();

global.i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    de
  }
});

global.API_BASE_URL = 'https://mockapi.com';

const useTaskStore = {
  state: () => ({
    tasks: [],
    currentTaskId: null
  }),
  actions: {
    fetchTasks: vi.fn(),
    toggleTaskCompletion: vi.fn(),
    addTask: vi.fn(),
    deleteTask: vi.fn(),
    updateTask: vi.fn(),
    openEditTaskBox: vi.fn(),
    closeEditDialog: vi.fn()
  }
};

global.describe = describe;
global.it = it;
global.expect = expect;
global.beforeEach = beforeEach;
global.afterEach = afterEach;

global.mount = mount;

global.mockPinia = createPinia();
setActivePinia(global.mockPinia);

global.mockPinia.use(() => {
  return { useTaskStore };
});
