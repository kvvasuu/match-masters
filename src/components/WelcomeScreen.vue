<template>
  <div class="welcome-screen">
    <div class="logo">
      <img src="../../logo.png" alt="Match Masters" />
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

.logo {
  img {
    height: 100%;
    width: 100%;
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
