<template>
  <div class="game-settings">
    <div class="title">
      <h1>{{ $store.state.gameMode }}</h1>
    </div>
    <slot></slot>
    <div class="buttons">
      <button class="icon" @click="startGame" title="BACK">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <button @click="startGame">Start game</button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ["startGame"],
  methods: {
    startGame() {
      this.$emit("startGame");
    },
  },
};
</script>

<style lang="scss" scoped>
.game-settings {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.buttons {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 2rem 0 2rem 0;
}

h1 {
  font-size: 5rem;
  user-select: none;
  text-transform: uppercase;
  font-family: Plarjoek;
  color: #ffbf00;
  letter-spacing: 2px;
  text-shadow: 2px 2px 0 #808836;
}

button {
  font-size: 1.4rem;
  background: #ffbf00;
  color: #808836;
  border: 0.3rem solid #808836;
  padding: 0.9rem 1.6rem;
  display: flex;
  align-items: center;
  margin: 0 4rem 0 2rem;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
