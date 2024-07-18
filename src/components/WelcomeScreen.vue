<template>
  <div class="welcome-screen">
    <h1>Match Masters</h1>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
