import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import de from './locales/de.json';

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import * as Sentry from '@sentry/vue';

import { createPinia } from 'pinia';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    de
  }
});

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi'
  }
});

function configureSentry(app, router) {
  Sentry.init({
    app,
    dsn: import.meta.env.SENTRY_DSN,
    environment: import.meta.env.VITE_SENTRY_ENVIRONMENT,
    integrations: [Sentry.browserTracingIntegration({ router }), Sentry.replayIntegration()],
    tracesSampleRate: parseFloat(import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE || '1.0'),
    tracePropagationTargets: import.meta.env.VITE_SENTRY_TRACE_PROPAGATION_TARGETS.split(','),
    replaysSessionSampleRate: parseFloat(import.meta.env.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE || '1.0'),
    replaysOnErrorSampleRate: parseFloat(import.meta.env.VITE_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE || '1.0')
  });
}

export function registerPlugins(app, router) {
  configureSentry(app, router);
  app.use(vuetify);
  app.use(i18n);
  app.use(createPinia());
}
