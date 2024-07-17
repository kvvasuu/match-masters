import "./assets/main.scss";

import { createApp, toHandlers } from "vue";
import App from "./App.vue";
import { createStore } from "vuex";
import { useStopwatch } from "vue-timer-hook";

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
      stopwatch: useStopwatch(false),
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
    roundIncrement(state) {
      state.round++;
    },
    movesIncrement(state) {
      state.moves++;
    },
    scoreIncrement(state) {
      state.score++;
    },
    stepReset(state) {
      state.step = 0;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
    pauseTimer(state) {
      state.stopwatch.pause();
    },
    startTimer(state) {
      state.stopwatch.start();
    },
  },
  getters: {
    getTime(state) {
      if (state.stopwatch.isRunning) {
        let minutes = "";
        let seconds = "";
        state.stopwatch.minutes < 10
          ? (minutes = "0" + state.stopwatch.minutes)
          : (minutes = state.stopwatch.minutes);

        state.stopwatch.seconds < 10
          ? (seconds = "0" + state.stopwatch.seconds)
          : (seconds = state.stopwatch.seconds);

        return `${minutes}:${seconds}`;
      } else return `${state.stopwatch.minutes}:${state.stopwatch.seconds}`;
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
    addScore(context, amount) {
      let temp = context.state.score + amount;
      let interval = setInterval(() => {
        if (context.state.score < temp) {
          context.commit("scoreIncrement");
        } else if (context.state.score >= amount) {
          clearInterval(interval);
        }
      }, 50);
    },
    pauseTimer(context) {
      context.commit("pauseTimer");
    },
    startTimer(context) {
      context.commit("startTimer");
    },
  },
});

const app = createApp(App);
app.use(store);
app.mount("#app");
