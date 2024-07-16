<template>
  <div class="game-cont">
    <TransitionGroup name="cards">
      <Card
        v-for="(card, index) in currentCards"
        :card-name="card"
        :key="index"
        :class="card"
        @click-card="checkCard(card)"
        :step="passStep"
      ></Card>
    </TransitionGroup>
  </div>
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
      firstCard: "",
      secondCard: "",
      step: 0,
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
    },
    checkCard(card) {
      console.log(card);
      if (this.step === 0) {
        this.firstCard = card;
        this.step++;
      } else if (this.step === 1) {
        this.secondCard = card;
        this.step++;
      }

      if (this.firstCard === this.secondCard) {
        setTimeout(() => {
          this.currentCards.splice(this.currentCards.indexOf(card), 1);
          this.currentCards.splice(this.currentCards.indexOf(card), 1);
          this.firstCard = "";
          this.secondCard = "";
          this.step = 0;
        }, 1000);
      } else return;
    },
  },
  computed: {
    passStep() {
      return this.step;
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
.cards-move,
.cards-enter-active,
.cards-leave-active {
  transition: all 0.5s ease;
}
.cards-enter-from,
.cards-leave-to {
  opacity: 0;
}
.cards-leave-active {
  position: absolute;
}
</style>
