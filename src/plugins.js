import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import de from './locales/de.json';

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    de
  }
});

export const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi'
  }
});

export function registerPlugins(app) {
  app.use(vuetify);
  app.use(i18n);
}
