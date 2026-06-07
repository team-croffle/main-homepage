import ui from '@nuxt/ui/vue-plugin';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import App from '@/App.vue';
import router from '@/router';
import { i18n } from '@/i18n';
import '@/styles/index.css';

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(ui);

app.mount('#app');
