<template>
  <div class="countdown">
    <Transition name="bounce" mode="out-in">
      <div class="number" :key="passTime">{{ passTime }}</div>
    </Transition>
  </div>
</template>

<script>
export default {
  emits: ["startGame"],
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    passTime() {
      return this.timer;
    },
  },
  methods: {
    startCountdown() {
      this.timer = 3;
      const interval = setInterval(() => {
        this.timer--;
        console.log(this.timer);
      }, 1000);
      setTimeout(() => {
        this.$store.dispatch("restartTimer");
        this.$emit("startGame");
        clearInterval(interval);
      }, 3000);
    },
  },
  mounted() {
    this.startCountdown();
  },
};
</script>

<style lang="scss" scoped>
.countdown {
  position: absolute;
  top: calc(50% - 4rem);
  left: calc(50% - 4rem);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 8rem;
  .number {
    font-size: 8rem;
    text-align: center;
    font-family: SuperCorn;
    z-index: 10;
    user-select: none;
    color: #ffbf00;
    -webkit-text-stroke: 4px #808836;
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  transition: 0.1s ease;
}

.bounce-leave-to,
.bounce-enter-from {
  opacity: 0;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
