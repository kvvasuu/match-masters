import { createStore } from "vuex";
import { useTimer } from "vue-timer-hook";

const store = createStore({
  state() {
    return {
      gameStarted: false,
      firstCard: "",
      secondCard: "",
      step: 0,
      round: 1,
      loading: false,
      moves: 0,
      score: 0,
      stopwatch: useTimer(),
      nickname: "",
      difficulty: "1", //1 - easy, 2 - medium, 3 - hard
      gameMode: "", // practice or compete
      category: "animals", // "animals" is default
      availableCards: {
        animals: [
          "bee",
          "dolphin",
          "elephant",
          "frog",
          "hog",
          "snail",
          "tiger",
          "cat",
          "dog",
          "cow",
          "turtle",
          "bird",
          "deer",
          "monkey",
        ],
        food: [
          "apple",
          "carrot",
          "pear",
          "banana",
          "coconut",
          "pineapple",
          "watermelon",
          "cherry",
          "pumpkin",
          "pepper",
          "cabbage",
          "tomato",
          "corn",
          "onion",
        ],
        /* space: [], */
      },
    };
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
    getCategoriesList(state) {
      return Object.keys(state.availableCards);
    },
    getCards(state) {
      switch (state.difficulty) {
        case "1":
          return state.availableCards[state.category];
        case "2":
          let keys = Object.keys(state.availableCards);
          return state.availableCards[keys[(keys.length * Math.random()) << 0]];
        case "3":
          return [].concat(...Object.values(state.availableCards));
      }
    },
  },
  mutations: {
    setGameState(state, payload) {
      state.gameStarted = payload;
    },
    setFirstCard(state, payload) {
      state.firstCard = payload;
    },
    setSecondCard(state, payload) {
      state.secondCard = payload;
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
    setCategory(state, payload) {
      state.category = payload;
    },
  },
  actions: {
    setGameState(context, payload) {
      context.commit("setGameState", payload);
    },
    setSecondCard(context, payload) {
      return new Promise((resolve, reject) => {
        context.commit("setLoading");
        setTimeout(() => {
          context.commit("setSecondCard", payload);
          context.commit("setLoading");
          resolve();
        }, 1000);
      });
    },
    addScore(context, payload) {
      let temp = context.state.score + payload;
      let interval = setInterval(() => {
        if (context.state.score < temp) {
          context.commit("scoreIncrement");
        } else if (context.state.score >= payload) {
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
    setCategory(context, payload) {
      context.commit("setCategory", payload);
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

export default store;
