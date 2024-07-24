<template>
  <div class="game-cont">
    <Highscores></Highscores>
    <button @click="tryAgain">
      <i class="fa-solid fa-repeat"></i>Try Again
    </button>
  </div>
</template>

<script>
import Highscores from "./Highscores.vue";

export default {
  components: {
    Highscores,
  },
  emits: ["startGame"],
  methods: {
    tryAgain() {
      this.$emit("startGame");
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
  flex-direction: column;
  padding: 2rem;
  margin: 0 0 0 0;
}

button {
  font-size: 1.4rem;
  background: #ffbf00;
  color: #808836;
  border: 0.3rem solid #808836;
  padding: 0.9rem 1.6rem;
  display: flex;
  align-items: center;
  margin: 2rem 0;
  cursor: pointer;
  border-radius: 3rem;
  font-weight: bold;
  transition: all 0.3s ease;
  user-select: none;
  box-shadow: 2px 2px 1px #4d5221;
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
