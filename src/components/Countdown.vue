<template>
  <div class="countdown">
    {{ passTime }}
  </div>
</template>

<script>
export default {
  emits: ["startGame"],
  data() {
    return {
      timer: 3,
    };
  },
  computed: {
    passTime() {
      return this.timer;
    },
  },
  methods: {
    startCountdown() {
      const interval = setInterval(() => {
        this.timer--;
        console.log(this.timer);
      }, 2000);
      setTimeout(() => {
        clearInterval(interval);
        this.$emit("startGame");
        this.$store.dispatch("restartTimer");
      }, 6000);
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
  top: 50%;
  left: 50%;
  font-size: 3rem;
  font-family: SuperCorn;
  z-index: 10;
}
</style>
