<template>
  <div class="game-cont">
    <Highscores></Highscores>
  </div>
</template>

<script>
import Highscores from "./Highscores.vue";

export default {
  components: {
    Highscores,
  },
  methods: {
    goBack() {
      this.$store.commit("setGameState", false);
      this.$store.dispatch("resetState");
    },
  },
};
</script>

<style lang="scss" scoped>
.game-cont {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  margin: 0 0 0 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.back-btn {
  position: absolute;
  bottom: 2rem;
  left: 2rem;
}
</style>
