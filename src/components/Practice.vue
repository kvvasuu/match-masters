<template>
  <div class="board">
    <Scoreboard></Scoreboard>
    <div class="game-cont" v-if="!roundOver">
      <Card
        v-for="(card, index) in currentCards"
        :key="`${card}${index}`"
        ref="cards"
        :card-name="card"
        @check-cards="matchCards"
      ></Card>
    </div>
    <button class="icon back-btn" @click="goBack" title="BACK">
      <i class="fa-solid fa-arrow-left"></i>
    </button>
  </div>
</template>

<script>
import Card from "./Card.vue";
import Scoreboard from "./Scoreboard.vue";

export default {
  components: {
    Card,
    Scoreboard,
  },
  props: ["currentCards"],
  data() {
    return {
      pairsAmount: 6,
      roundOver: false,
    };
  },
  methods: {
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
    goBack() {
      this.$store.dispatch("setGameMode", "");
      this.$store.dispatch("resetState");
    },
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

button {
  font-size: 1.4rem;
  background: #ffbf00;
  color: #808836;
  border: 0.3rem solid #808836;
  padding: 0.9rem 1.6rem;
  display: flex;
  align-items: center;
  margin: 0 0 0 2rem;
  cursor: pointer;
  border-radius: 3rem;
  font-weight: bold;
  transition: all 0.3s ease;
  user-select: none;
  &.icon {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    margin: 0;
    padding: 0;
  }
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 0.2rem #808836;
  }
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    transform: scale(1);
  }
}

.back-btn {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
}

.game-cont {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  width: 46rem;
  padding: 2rem;
  border-radius: 2rem;
  background-color: #ffffff60;
  backdrop-filter: blur(5px);
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
