<template>
  <Transition name="fade">
    <div class="game-cont" v-if="gameStarted">
      <div
        v-for="(card, index) in currentCards"
        class="card-container"
        :key="card + index"
      >
        <Transition name="fade">
          <Card
            v-if="card !== ''"
            :card-name="card"
            @click-card="checkCard(card)"
            :step="step"
          ></Card>
        </Transition>
      </div>
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
      firstCard: "",
      secondCard: "",
      step: 0,
      gameStarted: false,
    };
  },
  methods: {
    shuffleCards() {
      return new Promise((resolve, reject) => {
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
        resolve();
      });
    },
    async startGame() {
      await this.shuffleCards().then(() => {
        this.gameStarted = true;
      });
    },
    checkCard(card) {
      console.log(card);
      if (this.step === 0) {
        this.firstCard = card;
        this.step++;
      } else if (this.step === 1) {
        this.secondCard = card;
        this.step = 0;
      }

      if (this.firstCard === this.secondCard) {
        setTimeout(() => {
          let temp = this.currentCards.map((el) => (el === card ? "" : el));
          this.currentCards = temp;
          console.log(this.currentCards);
          this.firstCard = "";
          this.secondCard = "";
          this.step = 0;
        }, 1000);
      } else return;
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
.card-container {
  height: 10rem;
  width: 10rem;
  perspective: 600px;
  user-select: none;
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
