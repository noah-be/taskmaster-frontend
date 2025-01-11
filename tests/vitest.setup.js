import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import de from '@/locales/de.json';

global.i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    de
  }
});

globalThis.API_BASE_URL = 'https://mockapi.com';
