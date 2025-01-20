import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import de from '@/locales/de.json';

import { createVuetify } from 'vuetify';

import { defineStore } from 'pinia';

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

global.taskStoreMock = defineStore('task', {
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
});
