import "./assets/main.scss";

import { createApp, toHandlers } from "vue";
import App from "./App.vue";
import { createStore } from "vuex";
import { useTimer } from "vue-timer-hook";

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
      stopwatch: useTimer(),
      nickname: "",
      difficulty: 1, //1 - easy, 2 - medium, 3 - hard
      gameMode: "", // practice or compete
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
    resetMoves(state) {
      state.moves = 0;
    },
    scoreIncrement(state) {
      state.score++;
    },
    resetScore(state) {
      state.score = 0;
    },
    stepReset(state) {
      state.step = 0;
    },
    setLoading(state) {
      state.loading = !state.loading;
    },
    setNickname(state, payload) {
      state.nickname = payload;
    },
    restartTimer(state) {
      const time = new Date();
      time.setSeconds(time.getSeconds() + 30);
      state.stopwatch.restart(time);
    },
    setGameMode(state, payload) {
      state.gameMode = payload;
    },
    setDifficulty(state, payload) {
      state.difficulty = payload;
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
    setNickname(context, payload) {
      context.commit("setNickname", payload);
    },
    restartTimer(context) {
      context.commit("restartTimer");
    },
    setGameMode(context, payload) {
      context.commit("setGameMode", payload);
    },
    setDifficulty(context, payload) {
      context.commit("setDifficulty", payload);
    },
    resetState(context) {
      context.commit("stepReset");
      context.commit("restartTimer");
      context.commit("setNickname", "");
      context.commit("setFirstCard", "");
      context.commit("setSecondCard", "");
      context.commit("resetScore");
      context.commit("resetMoves");
    },
  },
});

const app = createApp(App);
app.use(store);
app.mount("#app");
