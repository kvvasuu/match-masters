<template>
  <div class="scoreboard">
    <div class="container score">{{ $store.state.score }}</div>
    <div
      class="container timer"
      @click="$store.dispatch('restartTimer')"
      v-if="$store.state.gameMode != 'practice'"
    >
      {{ getTime }}
    </div>
    <div class="container moves">{{ $store.state.moves }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    getTime() {
      return `${this.$store.getters.getTime.minutes}:${this.$store.getters.getTime.seconds}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.scoreboard {
  position: absolute;
  top: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #ffbf00;
  border-bottom: 0.34rem solid #808836;
  font-family: SuperCorn;
  color: #4d5221;
}

.container {
  height: 100%;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2rem;
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
