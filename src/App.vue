<template>
  <Transition name="fade" mode="out-in">
    <WelcomeScreen v-if="!$store.state.gameMode"></WelcomeScreen>
    <GameSettings v-else-if="!$store.state.gameStarted"></GameSettings>
    <component
      :is="$store.state.gameMode"
      v-else-if="$store.state.gameStarted"
    ></component>
  </Transition>
</template>

<script>
import Compete from "./components/Compete.vue";
import Practice from "./components/Practice.vue";
import GameSettings from "./components/GameSettings.vue";
import WelcomeScreen from "./components/WelcomeScreen.vue";

export default {
  components: {
    Compete,
    Practice,
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
