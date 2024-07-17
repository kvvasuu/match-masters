<template>
  <Transition name="fade">
    <div class="game-cont" v-if="gameStarted">
      <Card
        v-for="(card, index) in currentCards"
        :key="`${card}${index}`"
        :card-name="`${card}-${index}`"
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
      this.currentCards = shuffledCards;
    },
    startGame() {
      this.shuffleCards();
      this.gameStarted = true;
    },
    /* checkCard(card) {
      if (this.$store.state.step === 0) {
        this.firstCard = card;
        this.$store.commit("stepIncrement");
      } else if (this.$store.state.step === 1) {
        this.secondCard = card;
        if (
          this.firstCard[0] === this.secondCard[0] &&
          this.firstCard[1] !== this.secondCard[1]
        ) {
          setTimeout(() => {
            let temp = this.currentCards.map((el) =>
              el === card[0] ? "" : el
            );
            this.currentCards = temp;
            this.firstCard = "";
            this.secondCard = "";
          }, 1500);
        }
        this.$store.commit("stepReset");
      }
    }, */
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
