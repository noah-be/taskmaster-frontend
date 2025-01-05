import { createApp, h, Fragment } from 'vue';
import App from './App.vue';
import router from './router';
import { i18n } from './i18n';

import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi'
  }
});

const app = createApp(App);
app.use(router).use(vuetify).use(i18n).mount('#app');
