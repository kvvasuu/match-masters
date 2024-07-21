<template>
  <Transition name="fade" mode="out-in">
    <WelcomeScreen v-if="!$store.state.gameMode"></WelcomeScreen>
    <GameSettings v-else-if="!$store.state.gameStarted"></GameSettings>
    <Game v-else-if="$store.state.gameStarted"></Game>
  </Transition>
</template>

<script>
import Game from "./components/Game.vue";
import GameSettings from "./components/GameSettings.vue";
import WelcomeScreen from "./components/WelcomeScreen.vue";

export default {
  components: {
    Game,
    WelcomeScreen,
    GameSettings,
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
