<template>
  <Transition name="fade" mode="out-in">
    <Board
      :current-cards="currentCards"
      v-if="gameStarted && !gameOver"
    ></Board>
    <GameSettings v-else @start-game="startGame">
      <div
        class="practice-settings"
        v-if="$store.state.gameMode === 'practice'"
      ></div>
      <div class="compete-settings" v-else></div>
    </GameSettings>
  </Transition>
</template>

<script>
import Scoreboard from "./Scoreboard.vue";
import Board from "./Board.vue";
import GameSettings from "./GameSettings.vue";

export default {
  components: {
    Scoreboard,
    Board,
    GameSettings,
  },
  data() {
    return {
      availableCards: ["cat", "dog", "cow", "turtle", "bird", "deer", "monkey"],
      currentCards: [],
      pairsAmount: 6,
      gameStarted: false,
      gameOver: false,
    };
  },
  methods: {
    shuffleCards() {
      this.currentCards = [];
      let remainingCards = [...this.availableCards];
      let shuffledCards = [];

      for (let i = this.pairsAmount; i > 0; i--) {
        let cardIndex = Math.floor(Math.random() * (0 - i + 1) + i);
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
      this.pairsAmount = 6;
      this.shuffleCards();
      this.$store.commit("setFirstCard", "");
      this.$store.commit("setSecondCard", "");
      this.$store.commit("stepReset");
      this.gameStarted = true;
      this.gameOver = false;
    },
    matchCards() {
      let first = this.$store.state.firstCard.split("-")[0];
      let second = this.$store.state.secondCard.split("-")[0];
      if (first === second) {
        this.$refs.cards
          .find((el) => el.cardName === this.$store.state.firstCard)
          .toggleVisiblity();

        this.$refs.cards
          .find((el) => el.cardName === this.$store.state.secondCard)
          .toggleVisiblity();
        this.$store.dispatch("addScore", 10);
        this.$store.commit("setFirstCard", "");
        this.$store.commit("setSecondCard", "");
        this.pairsAmount--;
      } else {
        this.$store.commit("setFirstCard", "");
        this.$store.commit("setSecondCard", "");
      }
      this.$refs.cards.forEach((el) => {
        el.flipAll();
      });
      if (this.pairsAmount <= 0) {
        this.$store.commit("roundIncrement");
        this.gameOver = true;
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
