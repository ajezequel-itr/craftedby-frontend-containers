<template>
  <div class="price-filter-component open-sans-regular">
    <h2 class="price-title pb-2 font-bold">Prix</h2>
    <div class="inputs">
      <input type="number" placeholder="min." v-model.number="minPrice" @input="updatePriceFilter" class="price-input">
      <input type="number" placeholder="max." v-model.number="maxPrice" @input="updatePriceFilter" class="price-input">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      minPrice: null,
      maxPrice: null,
    };
  },
  methods: {
    updatePriceFilter() {
      this.$emit('priceChanged', { min: this.minPrice, max: this.maxPrice });
    },
  },
};
</script>

<style scoped>
.price-filter-component {
  font-size: 14px;
}

.price-title {
  font-size: 14px;
}

.inputs {
  display: flex;
  gap: 10px;
}

.price-input {
  font-family: 'Open Sans', sans-serif;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}
</style>
