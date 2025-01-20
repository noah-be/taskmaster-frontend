import { vi } from 'vitest';

import { createVuetify } from 'vuetify';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { defineStore } from 'pinia';

function createPiniaMock() {
  const pinia = createPinia();
  setActivePinia(pinia);

  defineStore('task', {
    state: () => ({
      tasks: [{ _id: '1', title: 'Task 1', description: 'Do something important', dueDate: '2023-01-01', priority: 'High' }],
      currentTaskId: '1'
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
  })();

  return pinia;
}

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

global.API_BASE_URL = 'https://mockapi.com';

global.describe = describe;
global.it = it;
global.expect = expect;
global.beforeEach = beforeEach;
global.afterEach = afterEach;

const mockVuetify = createVuetify();
const mockPinia = createPiniaMock();
const mockI18n = createI18nMock();

global.mount = (component, options) =>
  mount(component, {
    global: { plugins: [mockVuetify, mockPinia], config: { globalProperties: { ...mockI18n.global.config.globalProperties } }, ...options }
  });
