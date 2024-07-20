<template>
  <div class="game-settings">
    <div class="title">
      <h1>{{ $store.state.gameMode }}</h1>
    </div>
    <div class="practice-settings" v-if="$store.state.gameMode === 'practice'">
      <div class="difficulty cont">
        <label for="difficulty">Difficulty:</label>
        <select
          name="difficulty"
          id="difficulty"
          @change="setDifficulty"
          v-model="difficulty"
        >
          <option value="1">Easy</option>
          <option value="2">Medium</option>
          <option value="3">Hard</option>
        </select>
      </div>
      <div class="category-cont-wrapper">
        <Transition name="fade" mode="out-in">
          <div class="category cont" v-if="difficulty === '1'">
            <label for="category">Category:</label>
            <select
              name="category"
              id="category"
              @change="setCategory"
              v-model="category"
            >
              <option
                v-for="category in $store.getters.getCategoriesList"
                :value="category"
              >
                {{ category }}
              </option>
            </select>
          </div>
        </Transition>
      </div>
    </div>
    <div class="compete-settings" v-else></div>
    <div class="buttons">
      <button class="icon" @click="goBack" title="BACK">
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <button @click="startGame">Start game</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      difficulty: this.$store.state.difficulty,
      category: this.$store.state.category,
    };
  },
  methods: {
    startGame() {
      this.$store.dispatch("setGameState", true);
    },
    goBack() {
      this.$store.dispatch("setGameMode", "");
      this.$store.dispatch("setGameState", false);
    },
    setDifficulty(value) {
      this.$store.dispatch("setDifficulty", value.target.value);
    },
    setCategory(value) {
      this.$store.dispatch("setCategory", value.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.game-settings {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.practice-settings {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
}

.cont {
  display: flex;
  align-items: center;
  justify-content: center;
}

.category-cont-wrapper {
  height: 3.4rem;
  margin: 1rem 0 0 0;
}

label {
  font-size: 2rem;
  font-weight: bold;
  user-select: none;
  text-transform: uppercase;
  font-family: SuperCorn;
  color: #ffbf00;
  letter-spacing: 2px;
  text-shadow: 2px 2px 1px #4d5221;
}

select {
  font-size: 1rem;
  background: #ffbf00;
  color: #808836;
  border: 0.3rem solid #808836;
  padding: 0.9rem 1.6rem;
  display: flex;
  align-items: center;
  margin: 0 2rem;
  width: 8rem;
  cursor: pointer;
  border-radius: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
  user-select: none;
  appearance: none;
  border: 0;
  outline: 0;
  text-transform: capitalize;
  box-shadow: 2px 2px 1px #4d5221;
  &::-ms-expand {
    display: none;
  }
  &:focus {
    outline: none;
  }
  option {
    color: inherit;
    font-weight: bold;
  }
}

.buttons {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 2rem 0 2rem 0;
}

h1 {
  font-size: 5rem;
  user-select: none;
  text-transform: uppercase;
  font-family: ChaseDreams;
  color: #ffbf00;
  letter-spacing: 2px;
  text-shadow: 3px 3px 1px #4d5221;
}

button {
  font-size: 1.4rem;
  background: #ffbf00;
  color: #808836;
  border: 0.3rem solid #808836;
  padding: 0.9rem 1.6rem;
  display: flex;
  align-items: center;
  margin: 0 0 0 2rem;
  cursor: pointer;
  border-radius: 3rem;
  font-weight: bold;
  transition: all 0.3s ease;
  user-select: none;
  box-shadow: 2px 2px 1px #4d5221;
  &.icon {
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 3rem;
    height: 3rem;
    margin: 0;
    padding: 0;
  }
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(0.95);
  }
  &:disabled {
    opacity: 0.8;
    cursor: not-allowed;
    transform: scale(1);
  }
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
