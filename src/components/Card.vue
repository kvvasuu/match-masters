<template>
  <div class="card-container" @click="flipCard">
    <div class="card" :class="{ flip: isFlipped }">
      <div class="card-face front">
        <img src="../assets/reverse.png" alt="" />
      </div>
      <div class="card-face back">
        <img src="../assets/animals/cat.webp" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cardName"],
  data() {
    return {
      isFlipped: false,
    };
  },
  methods: {
    flipCard() {
      console.log(this.cardName);
      this.isFlipped = !this.isFlipped;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container {
  height: 10rem;
  width: 10rem;
  perspective: 600px;
}
.card {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transform-style: preserve-3d;
  transform-origin: center right;
  transition: transform 1s;
  &.flip {
    transform: translateX(-100%) rotateY(-180deg);
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
