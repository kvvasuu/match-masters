<template>
  <Scoreboard></Scoreboard>
  <Transition name="fade" mode="out-in">
    <Practice
      :current-cards="currentCards"
      @go-back="
        game0ver = true;
        gameStarted = false;
      "
      :pairs="pairsAmount"
      @next-round="startGame"
      v-if="gameStarted && !gameOver"
      :key="currentCards"
    ></Practice>
  </Transition>
  <button class="icon back-btn" @click="goBack" title="BACK">
    <i class="fa-solid fa-arrow-left"></i>
  </button>
</template>

<script>
import Scoreboard from "./Scoreboard.vue";
import Practice from "./Practice.vue";
import GameSettings from "./GameSettings.vue";

export default {
  components: {
    Scoreboard,
    Practice,
    GameSettings,
  },
  data() {
    return {
      currentCards: [],
      pairsAmount: 0,
      gameOver: false,
    };
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
      this.$store.dispatch("restartTimer");
      this.setPairsAmount();
      this.shuffleCards();
      this.$store.commit("setFirstCard", "");
      this.$store.commit("setSecondCard", "");
      this.$store.commit("stepReset");
      this.gameOver = false;
      this.$store.commit("setGameState", true);
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
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
