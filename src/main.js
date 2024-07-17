import "./assets/main.scss";

import { createApp, toHandlers } from "vue";
import App from "./App.vue";
import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      firstCard: "",
      secondCard: "",
      step: 0,
    };
  },
  mutations: {
    setFirstCard(state, card) {
      state.firstCard = card;
    },
    setSecondCard(state, card) {
      state.secondCard = card;
    },
    stepIncrement(state) {
      state.step++;
    },
    stepReset(state) {
      state.step = 0;
    },
  },
});

const app = createApp(App);
app.use(store);
app.mount("#app");
