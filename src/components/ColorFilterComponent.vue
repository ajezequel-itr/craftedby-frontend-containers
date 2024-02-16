<template>
  <div class="color-filter-component">
    <h2 class="color-title pb-2">{{ title }}</h2>
    <div class="colors ml-5">
      <div v-for="(isSelected, color) in selectedColors" :key="color" class="color-box" :style="{ backgroundColor: color }" @click="toggleColor(color)">
        <div v-if="isSelected" class="color-selected-indicator"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Couleurs:",
      selectedColors: {
        red: false,
        blue: false,
        green: false,
        yellow: false,
        black: false,
        white: false,
      }
    };
  },
  methods: {
    toggleColor(color) {
      this.selectedColors[color] = !this.selectedColors[color];
      this.emitColors();
    },
    emitColors() {
      const selected = Object.keys(this.selectedColors).filter(
        color => this.selectedColors[color]
      );
      this.$emit('colorsChanged', selected);
    }
  }
};
</script>

<style scoped>
.color-filter-component {
  /* Component styles */
}

.color-title {
  /* Title styles */
}

.colors {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.color-box {
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: relative;
  border: 1px solid;
}

.color-selected-indicator {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 2px solid black;
}
</style>
