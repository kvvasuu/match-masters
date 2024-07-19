import "./assets/main.scss";

import { createApp, toHandlers } from "vue";
import App from "./App.vue";
import store from "./store";

const app = createApp(App);
app.use(store);
app.mount("#app");
