<template>
  <div class="board">
    <Scoreboard v-if="!gameEnded"></Scoreboard>
    <Transition name="fade" mode="out-in">
      <Board
        :current-cards="currentCards"
        :pairs="pairsAmount"
        @next-round="nextRound"
        v-if="
          $store.state.gameStarted && currentCards.length != 0 && !gameEnded
        "
        :key="currentCards"
      ></Board>
      <GameResults v-else-if="gameEnded"></GameResults>
    </Transition>
    <button class="icon back-btn" @click="goBack" title="BACK">
      <i class="fa-solid fa-arrow-left"></i>
    </button>
  </div>
</template>

<script>
import Scoreboard from "./Scoreboard.vue";
import Board from "./Board.vue";
import GameSettings from "./GameSettings.vue";
import GameResults from "./GameResults.vue";
import axios from "axios";

export default {
  components: {
    Scoreboard,
    Board,
    GameSettings,
    GameResults,
  },
  data() {
    return {
      currentCards: [],
      pairsAmount: 0,
      round: 0,
      gameEnded: false,
      scoreKey: "",
      playerHighscore: 0,
    };
  },
  watch: {
    getTime(newVal) {
      if (newVal.minutes <= 0 && newVal.seconds <= 0) {
        this.endGame();
      }
    },
  },
  computed: {
    getTime() {
      return this.$store.getters.getTime;
    },
  },
  methods: {
    shuffleCards() {
      this.currentCards = [];
      let remainingCards = [...this.$store.getters.getCards];
      let shuffledCards = [];

      let availableCardsLength = remainingCards.length;

      for (let i = 0; i < this.pairsAmount; i++) {
        let cardIndex = Math.floor(Math.random() * (availableCardsLength - i));
        let card = remainingCards.splice(cardIndex, 1).join();
        shuffledCards.push(card);
      }

      shuffledCards = [...shuffledCards.flatMap((i) => [i, i])];

      let currentIndex = shuffledCards.length;

      while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [shuffledCards[currentIndex], shuffledCards[randomIndex]] = [
          shuffledCards[randomIndex],
          shuffledCards[currentIndex],
        ];
      }
      this.currentCards = shuffledCards.map(
        (el, index) => (el = `${el}-${index}`)
      );
    },
    startGame() {
      this.nextRound();
      this.$store.dispatch("restartTimer");
      this.$store.commit("stepReset");
      this.gameOver = false;
      this.$store.commit("setGameState", true);
    },
    nextRound() {
      this.round++;
      if (this.round !== 1) {
        this.$store.dispatch("addScore", 30);
      }
      this.setPairsAmount();
      this.shuffleCards();
      this.$store.commit("setFirstCard", "");
      this.$store.commit("setSecondCard", "");
      this.$store.dispatch("addTime");
    },
    async endGame() {
      await this.$store
        .dispatch("finalScore")
        .then((score) => {
          const instance = axios.create({
            baseURL: "https://match-masters-174d4-default-rtdb.firebaseio.com",
            headers: {
              "Content-Type": "application/json",
            },
          });
          this.isLoading = true;

          if (this.scoreKey !== undefined) {
            if (this.playerHighscore < score)
              instance
                .put(`/scores/${this.scoreKey}.json`, {
                  nickname: this.$store.state.nickname,
                  score: score,
                })
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
          } else {
            instance
              .post("/scores.json", {
                nickname: this.$store.state.nickname,
                score: this.$store.state.score,
              })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .finally(() => {
          console.log("supa");
          this.isLoading = false;
        });
    },
    goBack() {
      this.$store.commit("setGameState", false);
      this.$store.dispatch("resetState");
    },
    setPairsAmount() {
      switch (this.$store.state.difficulty) {
        case "1":
          this.pairsAmount = 6;
          break;
        case "2":
          this.pairsAmount = 8;
          break;
        case "3":
          this.pairsAmount = 10;
          break;
      }
    },
  },
  mounted() {
    this.startGame();
    this.$store.dispatch("getScores").then((response) => {
      this.scoreKey = Object.keys(response).find(
        (key) => response[key].nickname === this.$store.state.nickname
      );
      this.playerHighscore = response[scoreKey].score;
    });
  },
};
</script>

<style lang="scss" scoped>
.board {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.back-btn {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
}
</style>
