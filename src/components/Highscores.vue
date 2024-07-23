<template>
  <div class="highscores">
    <div class="title">Top Players</div>
    <Transition name="fade" mode="out-in">
      <ul>
        <div v-if="isLoading">Loading</div>
        <li
          v-for="(score, index) in topScoresList"
          v-else
          :class="{ you: $store.state.nickname === score.nickname }"
        >
          <div class="position">{{ index + 1 }}</div>
          <div class="nickname">{{ score.nickname }}</div>
          <div class="score">{{ score.score }}</div>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script>
export default {
  props: ["scoresAmount"],
  data() {
    return {
      isLoading: true,
    };
  },
  computed: {
    topScoresList() {
      return this.$store.state.scoresList
        .sort((a, b) => b.score - a.score)
        .slice(0, this.scoresAmount ? this.scoresAmount : 200);
    },
  },
  methods: {
    async getScores() {
      this.isLoading = true;
      await this.$store.dispatch("getScores").then(() => {
        this.isLoading = false;
      });
    },
  },
  mounted() {
    this.getScores();
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #ffbf00;
$secondary-color: #808836;

.highscores {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: $primary-color;
  border: 0.34rem solid $secondary-color;
  border-radius: 1rem;
  width: 17rem;
  margin: 0 0 2rem 0;
  .title {
    text-align: center;
    font-size: 2rem;
    user-select: none;
    text-transform: uppercase;
    font-family: ChaseDreams;
    color: #4d5221;
    letter-spacing: 2px;
    padding: 1rem 1.6rem 0.4rem 1.6rem;
    border-bottom: 0.34rem solid $secondary-color;
    width: 100%;
    box-sizing: border-box;
  }
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 10rem;
  max-height: 15.7rem;
  margin: 0.3rem 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: $primary-color;
    border-radius: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: $secondary-color;
    border-radius: 5px;
    border: 1px solid $primary-color;
  }
}

li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  text-transform: uppercase;
  color: #4d5221;
  font-weight: bold;
  &.you {
    color: rgb(211, 46, 46);
  }
}

.position {
  width: 10%;
  text-align: left;
  &::after {
    content: ".";
  }
}

.nickname {
  width: 50%;
  text-align: left;
}

.score {
  width: 20%;
  text-align: right;
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
