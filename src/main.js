import "./assets/main.scss";

import { createApp, toHandlers } from "vue";
import App from "./App.vue";
import store from "./store";
import vueDebounce from "vue-debounce";

const app = createApp(App);
app.use(store);
app.directive("debounce", vueDebounce({ lock: true }));
app.mount("#app");
