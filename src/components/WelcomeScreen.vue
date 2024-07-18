<template>
  <div class="welcome-screen">
    <div class="logo">
      <img src="../../logo.png" alt="Match Masters" draggable="false" />
    </div>
    <div class="buttons">
      <button
        id="practice"
        value="practice"
        @click="setGameMode($event.target.value)"
      >
        Practice
      </button>
      <button
        id="compete"
        value="compete"
        @click="setGameMode($event.target.value)"
        disabled
      >
        Compete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    setGameMode(mode) {
      this.$store.dispatch("setGameMode", mode);
    },
  },
};
</script>

<style lang="scss" scoped>
.welcome-screen {
  width: 80%;
}

.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10rem 0 4rem 0;
}

.logo {
  img {
    height: 100%;
    width: 100%;
  }
}

button {
  font-size: 1.4rem;
  background: #ffbf00;
  color: #808836;
  border: 0.3rem solid #808836;
  padding: 0.9rem 1.6rem;
  display: flex;
  align-items: center;
  margin: 0 2rem;
  cursor: pointer;
  border-radius: 3rem;
  font-weight: bold;
  transition: all 0.3s ease;
  user-select: none;

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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
