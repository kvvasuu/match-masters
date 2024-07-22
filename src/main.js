import "./assets/main.scss";

import { createApp, toHandlers } from "vue";
import App from "./App.vue";
import store from "./store";
import axios from "axios";

const app = createApp(App);
app.use(store);
app.use(axios);
app.mount("#app");
