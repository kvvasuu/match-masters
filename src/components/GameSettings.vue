<template>
  <h1>{{ gameMode }}</h1>
  <slot></slot>
  <button @click="startGame">Start game</button>
</template>

<script>
export default {
  props: ["gameMode"],
  emits: ["startGame"],
  methods: {
    startGame() {
      this.$emit("startGame");
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
