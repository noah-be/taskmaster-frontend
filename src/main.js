import { createApp, h, Fragment } from 'vue';
import App from './App.vue';
import router from './router';

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import de from './locales/de.json';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi'
  }
});

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    de
  }
});

let app = null;

if (process.env.NODE_ENV === 'development') {
  import('vue-axe').then(({ default: VueAxe, VueAxePopup }) => {
    app = createApp({
      render: () => h(Fragment, [h(App), h(VueAxePopup)])
    });

    app.use(VueAxe, {
      auto: true,
      config: {
        branding: { application: 'vue-axe' }
      },
      delay: 1000
    });

    app.use(router).use(vuetify).use(i18n).mount('#app');
  });
} else {
  app = createApp(App);
  app.use(router).use(vuetify).use(i18n).mount('#app');
}
