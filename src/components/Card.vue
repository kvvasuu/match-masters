<template>
  <div class="card-container">
    <Transition name="fade">
      <div class="card-wrapper" v-if="cardName !== ''">
        <div class="card" :class="{ flip: isReversed }" @click="checkCard">
          <div class="card-face back">
            <img src="../assets/reverse.png" alt="" draggable="false" />
          </div>
          <div class="card-face front">
            <img :src="passCardSrc" alt="" draggable="false" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
export default {
  props: ["cardName"],
  emits: ["click-card"],
  data() {
    return {
      isReversed: true,
    };
  },
  methods: {
    flipCard() {
      this.isReversed = !this.isReversed;
    },
    checkCard() {
      if (
        this.$store.state.step === 0 &&
        this.$store.state.firstCardCard === ""
      ) {
        this.$store.commit("setFirstCard", this.cardName);
        this.$store.commit("stepIncrement");
        this.flipCard();
      } else if (this.$store.state.step === 1) {
        if (this.$store.state.firstCard === this.cardName) {
          this.flipCard();
          this.$store.commit("setFirstCard", "");
          this.$store.commit("stepReset");
        } else if (this.$store.state.secondCard === this.cardName) {
          this.flipCard();
          this.$store.commit("setSecondCard", "");
        } else {
          this.$store.commit("setSecondCard", this.cardName);
          this.$store.commit("stepReset");
          this.flipCard();
        }
      }
    },
  },
  computed: {
    passCardSrc() {
      return new URL(
        `../assets/animals/${this.cardName.split("-")[0]}.webp`,
        import.meta.url
      ).href;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  height: 10rem;
  width: 10rem;
  perspective: 600px;
  user-select: none;
}
.card {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 1s, translate 0.3s ease;
  &.flip {
    transform: translateX(-100%) rotateY(-180deg);
    &:hover {
      translate: 0 -0.2rem;
    }
  }
}
.card-face {
  position: absolute;
  backface-visibility: hidden;
  &.back {
    transform: rotateY(180deg);
  }
}

img {
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0.2rem 0.1rem 0.3rem rgba(0, 0, 0, 0.4);
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
