<template>
  <div class="card-container">
    <Transition name="fade">
      <div class="card-wrapper" v-if="isVisible">
        <div
          class="card"
          :class="{
            flip: isReversed,
            active: !$store.state.loading,
          }"
          @click="checkCard"
        >
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
  emits: ["checkCards"],
  data() {
    return {
      isReversed: true,
      isVisible: true,
    };
  },
  methods: {
    flipCard() {
      this.isReversed = !this.isReversed;
    },
    flipAll() {
      this.isReversed = true;
    },
    toggleVisiblity() {
      this.isVisible = false;
    },
    checkCard() {
      if (this.$store.state.loading) {
        return;
      }
      if (this.$store.state.step === 0 && this.$store.state.firstCard === "") {
        this.flipCard();
        this.$store.commit("setFirstCard", this.cardName);
        this.$store.commit("stepIncrement");
        this.$store.commit("movesIncrement");
      } else if (this.$store.state.step === 1) {
        if (this.$store.state.firstCard === this.cardName) {
          this.flipCard();
          this.$store.commit("setFirstCard", "");
          this.$store.commit("stepReset");
        } else {
          this.flipCard();
          this.$store.dispatch("setSecondCard", this.cardName).then(() => {
            this.$store.commit("stepReset");
            this.$emit("checkCards");
          });
        }
      }
    },
  },
  computed: {
    passCardSrc() {
      return new URL(
        `../assets/cards/${this.cardName.split("-")[0]}.webp`,
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
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 1s, translate 0.3s ease;
  &.flip {
    transform: translateX(-100%) rotateY(-180deg);
    &.active {
      cursor: pointer;
      &:hover {
        translate: 0 -0.2rem;
      }
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

@media only screen and (max-width: 1000px) {
  .card-container {
    height: 8rem;
    width: 8rem;
  }
}
@media only screen and (max-width: 680px) {
  .card-container {
    height: 6rem;
    width: 6rem;
  }
}
@media only screen and (max-width: 370px) {
  .card-container {
    height: 5rem;
    width: 5em;
  }
}
</style>
