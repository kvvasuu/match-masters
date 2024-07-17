<template>
  <div class="card" :class="{ flip: isFlipped }" @click="checkCard">
    <div class="card-face back">
      <img src="../assets/reverse.png" alt="" draggable="false" />
    </div>
    <div class="card-face front">
      <img :src="passCardSrc" alt="" draggable="false" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["cardName", "step"],
  emits: ["click-card"],
  data() {
    return {
      isFlipped: true,
    };
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped;
    },
    checkCard() {
      this.$emit("click-card", this.cardName);

      if (this.isFlipped) {
        this.flipCard();
      }
    },
  },
  computed: {
    passCardSrc() {
      return new URL(`../assets/animals/${this.cardName}.webp`, import.meta.url)
        .href;
    },
  },
};
</script>

<style lang="scss" scoped>
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
  }
  &:hover:not(.flip) {
    translate: 0 -0.2rem;
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
</style>
