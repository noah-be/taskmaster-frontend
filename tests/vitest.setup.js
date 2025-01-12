import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import de from '@/locales/de.json';

import { createVuetify } from 'vuetify';

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
