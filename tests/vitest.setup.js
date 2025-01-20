import { vi } from 'vitest';

import { createVuetify } from 'vuetify';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';

global.mockVuetify = createVuetify();

function createI18nMock() {
  return {
    global: {
      t: key => key
    }
  };
}

global.API_BASE_URL = 'https://mockapi.com';

global.describe = describe;
global.it = it;
global.expect = expect;
global.beforeEach = beforeEach;
global.afterEach = afterEach;

global.mount = mount;

global.mockI18n = createI18nMock();

global.mockPinia = createPinia();
setActivePinia(global.mockPinia);

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

global.mockPinia.use(() => {
  return { useTaskStore };
});
