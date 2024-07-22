<template>
  <div class="highscores">
    <div class="title">Top Players</div>
    <ul>
      <li
        v-for="(score, index) in topScoresList"
        v-if="scoresList.length !== 0"
        :class="{ you: $store.state.nickname === score.nickname }"
      >
        <div class="position">{{ index + 1 }}</div>
        <div class="nickname">{{ score.nickname }}</div>
        <div class="score">{{ score.score }}</div>
      </li>
      <li v-else style="justify-content: center">No data</li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["scoresAmount"],
  data() {
    return {
      isLoading: false,
      scoresList: [],
    };
  },
  computed: {
    topScoresList() {
      return this.scoresList
        .sort((a, b) => b.score - a.score)
        .slice(0, this.scoresAmount);
    },
  },
  methods: {
    getScores() {
      fetch("https://match-masters-174d4-default-rtdb.firebaseio.com/scores/");
      /* axios
        .get("https://match-masters-174d4-default-rtdb.firebaseio.com/scores/")
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        }); */
    },
  },

  mounted() {
    this.getScores();
  },
};
</script>

<style lang="scss" scoped>
.highscores {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  background-color: #ffbf00;
  border: 0.34rem solid #808836;
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
    border-bottom: 0.34rem solid #808836;
    width: 100%;
    box-sizing: border-box;
  }
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
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
