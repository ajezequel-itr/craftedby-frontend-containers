<template>
  <div class="category-component open-sans-regular">
    <h2 class="category-title pb-2 font-bold ">{{ title }}</h2>
    <div class="radios">
      <label>
        <input type="radio" name="category" value="" v-model="selectedCategory ">
        Tout afficher
      </label>
      <label>
        <input type="radio" name="category" value="vaisselle" v-model="selectedCategory ">
        Vaisselle
      </label>
      <label>
        <input type="radio" name="category" value="ceramique" v-model="selectedCategory">
        Céramique
      </label>
      <label>
        <input type="radio" name="category" value="meubles" v-model="selectedCategory">
        Meubles
      </label>
      <label>
        <input type="radio" name="category" value="vetements" v-model="selectedCategory">
        Vetements
      </label>
      <label>
        <input type="radio" name="category" value="jouets" v-model="selectedCategory">
        Jouets
      </label>
      <label>
        <input type="radio" name="category" value="nourriture" v-model="selectedCategory">
        Nourriture
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Catégorie",
      selectedCategory: ''
    };
  },
  computed: {
    apiURL() {
      const baseURL = "http://localhost:8000/api/categories/";
      // Use selectedCategory as the search query
      return this.selectedCategory ? `${baseURL}?search=${this.selectedCategory}` : baseURL;
    }
  },
  watch: {
    selectedCategory(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.$emit('categoryChanged', newVal);
      }
    }
  }
};
</script>


<style scoped>
.category-component {
  font-size: 14px;
}

.category-title {
  font-size: 14px;
}

.radios {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
