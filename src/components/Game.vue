<template>
  <Transition name="fade" mode="out-in">
    <Practice
      :current-cards="currentCards"
      @go-back="
        game0ver = true;
        gameStarted = false;
      "
      @next-round="startGame"
      v-if="gameStarted && !gameOver"
    ></Practice>
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
          <div class="category cont" v-if="difficulty === '1'">
            <label for="category">Category:</label>
            <select
              name="category"
              id="category"
              @change="setCategory"
              v-model="category"
            >
              <option
                v-for="category in $store.getters.getCategoriesList"
                :value="category"
              >
                {{ category }}
              </option>
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
      gameStarted: false,
      gameOver: false,
      difficulty: this.$store.state.difficulty,
      category: this.$store.state.category,
    };
  },
  methods: {
    shuffleCards() {
      this.currentCards = [];
      let remainingCards = [...this.$store.getters.getCards];
      let shuffledCards = [];

      console.log(remainingCards);
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
      this.gameStarted = true;
      this.gameOver = false;
    },
    setDifficulty(value) {
      this.$store.dispatch("setDifficulty", value.target.value);
    },
    setCategory(value) {
      this.$store.dispatch("setCategory", value.target.value);
      console.log(this.$store.state.category);
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
