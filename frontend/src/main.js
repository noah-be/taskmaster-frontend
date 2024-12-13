import { createApp, h, Fragment } from 'vue';
import App from './App.vue';
import router from './router';

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import axe from 'axe-core';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi'
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

    app.use(router).use(vuetify).mount('#app');
  });
} else {
  app = createApp(App);
  app.use(router).use(vuetify).mount('#app');
}
