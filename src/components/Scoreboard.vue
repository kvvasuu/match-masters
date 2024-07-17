<template>
  <div class="scoreboard">
    <div class="container score">{{ $store.state.score }}</div>
    <div class="container timer">
      {{ $store.getters.getTime }}
    </div>
    <div class="container moves">{{ $store.state.moves }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      isReversed: true,
    };
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
  background-color: antiquewhite;
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
