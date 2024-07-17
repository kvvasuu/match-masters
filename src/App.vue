<template>
  <Transition name="fade" mode="out-in">
    <div class="game-cont" v-if="gameStarted" :key="this.$store.state.round">
      <Card
        v-for="(card, index) in currentCards"
        :key="`${card}${index}`"
        ref="cards"
        :card-name="card"
        @check-cards="matchCards"
      ></Card>
    </div>
  </Transition>
  <button @click="startGame">Start game</button>
</template>

<script>
import Card from "./components/Card.vue";
export default {
  components: {
    Card,
  },
  data() {
    return {
      availableCards: ["cat", "dog", "cow", "turtle", "bird", "deer", "monkey"],
      currentCards: [],
      pairsAmount: 6,
      gameStarted: false,
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
      this.gameStarted = false;
      this.shuffleCards();
      this.$store.commit("setFirstCard", "");
      this.$store.commit("setSecondCard", "");
      this.$store.commit("stepReset");
      this.gameStarted = true;
    },
    matchCards() {
      let first = this.$store.state.firstCard.split("-")[0];
      let second = this.$store.state.secondCard.split("-")[0];
      if (first === second) {
        this.currentCards = this.currentCards.map((el) =>
          el.split("-")[0] === first.split("-")[0] ? "" : el
        );
        this.$store.commit("scoreIncrement");
        this.$store.commit("setFirstCard", "");
        this.$store.commit("setSecondCard", "");
      } else {
        this.$store.commit("setFirstCard", "");
        this.$store.commit("setSecondCard", "");
      }
      this.$refs.cards.forEach((el) => {
        el.flipAll();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.game-cont {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

button {
  margin: 2rem;
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
