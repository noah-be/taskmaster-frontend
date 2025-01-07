import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import de from './locales/de.json';

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import * as Sentry from '@sentry/vue';

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

function configureSentry(app, router) {
  Sentry.init({
    app,
    dsn: 'https://e53a5ae2fedd71811ea4f5ecfe512b65@st.noah-frank.de/2',
    integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost', 'https://tm.noah-frank.de'],
    replaysSessionSampleRate: 1.0, // change to 0.1 in production
    replaysOnErrorSampleRate: 1.0
  });
}

export function registerPlugins(app, router) {
  configureSentry(app, router);
  app.use(vuetify);
  app.use(i18n);
}
