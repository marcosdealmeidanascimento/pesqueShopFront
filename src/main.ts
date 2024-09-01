import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import PrimeVue from "primevue/config";
import "primevue/resources/themes/lara-light-amber/theme.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import ToastService from "primevue/toastservice";
import ConfirmationService from 'primevue/confirmationservice';
import Ripple from 'primevue/ripple';
import primevueconfig from "./primevueconfig";

const app = createApp(App);

app.use(PrimeVue, { ripple: true });
app.use(ToastService);
app.use(ConfirmationService);
app.use(createPinia());
app.use(router);
app.directive('ripple', Ripple);

Object.keys(primevueconfig.components).forEach((name) => {
  app.component(name, primevueconfig.components[name]);
});

app.mount("#app");
