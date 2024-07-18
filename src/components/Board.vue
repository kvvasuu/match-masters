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
    <div class="game-cont" v-else>
      <button @click="startGame">Next round!</button>
    </div>
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
}
.game-cont {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  width: 46rem;
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
