<template>
  <div class="game-cont" :style="{ width: `${setGameWidth}rem` }">
    <Card
      v-for="(card, index) in currentCards"
      :key="`${card}${index}`"
      ref="cards"
      :card-name="card"
      @check-cards="matchCards"
    ></Card>
  </div>
</template>

<script>
import Card from "./Card.vue";

export default {
  components: {
    Card,
  },
  props: ["currentCards", "pairs"],
  emits: ["goBack", "nextRound"],
  data() {
    return {
      pairsAmount: this.pairs,
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
        this.$emit("nextRound");
      }
    },
  },
  computed: {
    setGameWidth() {
      switch (this.$store.state.difficulty) {
        case "1":
          return 46;
        case "2":
          return 46;
        case "3":
          return 58;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
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

.game-cont {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 2rem;
  margin: 4rem 0 0 0;
  border-radius: 2rem;
  background-color: #ffffff60;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media only screen and (max-width: 1000px), (max-height: 880px) {
  .game-cont {
    width: 35rem !important;
    gap: 1rem;
    padding: 1rem;
    border-radius: 1.4rem;
  }
}

@media only screen and (max-width: 600px) {
  .game-cont {
    width: 27rem !important;
    gap: 1rem;
    padding: 0.8rem;
    border-radius: 1rem;
  }
}

@media only screen and (max-height: 550px) {
  .game-cont {
    width: 29rem !important;
    gap: 1rem;
    padding: 0.8rem;
    border-radius: 1rem;
  }
}

@media only screen and (max-width: 370px) {
  .game-cont {
    width: 23rem !important;
    gap: 1rem;
    padding: 0.8rem;
    border-radius: 1rem;
  }
}
</style>
