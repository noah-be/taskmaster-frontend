import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { registerPlugins } from './plugins';

window.API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const app = createApp(App);
registerPlugins(app);
app.use(router).mount('#app');
