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
      round: 1,
      loading: false,
      moves: 0,
      score: 0,
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
    movesIncrement(state) {
      state.moves++;
      console.log(state.moves);
    },
    scoreIncrement(state) {
      state.score += 10;
      console.log(state.score);
    },
    stepReset(state) {
      state.step = 0;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
  },
  actions: {
    setSecondCard(context, card) {
      return new Promise((resolve, reject) => {
        context.commit("setLoading");
        setTimeout(() => {
          context.commit("setSecondCard", card);
          context.commit("setLoading");
          resolve();
        }, 1000);
      });
    },
  },
});

const app = createApp(App);
app.use(store);
app.mount("#app");
