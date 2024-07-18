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
      >
        <div class="difficulty cont">
          <label for="difficulty">Difficulty:</label>
          <select
            name="difficulty"
            id="difficulty"
            @change="setDifficulty"
            v-model="difficulty"
          >
            <option value="1">Easy</option>
            <option value="2">Medium</option>
            <option value="3">Hard</option>
          </select>
        </div>
        <Transition name="fade" mode="out-in">
          <div class="category cont" v-if="difficulty == 1">
            <label for="category">Category:</label>
            <select name="category" id="category">
              <option value="animals">Animals</option>
            </select>
          </div>
        </Transition>
      </div>
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
      difficulty: 1,
      category: "animals",
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
    setDifficulty(value) {
      this.$store.dispatch("setDifficulty", value);
    },
  },
};
</script>

<style lang="scss" scoped>
.cont {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1rem 0 0 0;
}

label {
  font-size: 1.4rem;
  font-weight: bold;
  color: rgb(22, 22, 22);
}

select {
  font-size: 1rem;
  background: #ffbf00;
  color: #808836;
  border: 0.3rem solid #808836;
  padding: 0.9rem 1.6rem;
  display: flex;
  align-items: center;
  margin: 0 2rem;
  cursor: pointer;
  border-radius: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  user-select: none;
  appearance: none;
  border: 0;
  outline: 0;
  &::-ms-expand {
    display: none;
  }
  &:focus {
    outline: none;
  }
  option {
    color: inherit;
    font-weight: bold;
    &:hover {
      background-color: #ffd863;
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
