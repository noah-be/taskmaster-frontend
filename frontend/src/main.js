import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { createVuetify } from "vuetify";
import "vuetify/styles";

import "./assets/scss/main.scss";

const vuetify = createVuetify();

createApp(App)
  .use(router)
  .use(vuetify)
  .mount("#app");
