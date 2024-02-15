<template>
  <div class="category-component">
    <h2 class="category-title">{{ title }}</h2>
    <div class="checkboxes">
      <label>
        <input type="checkbox" v-model="selectedCategories.vaisselle">
        Vaisselle
      </label>
      <label>
        <input type="checkbox" v-model="selectedCategories.ceramique">
        Céramique
      </label>
      <label>
        <input type="checkbox" v-model="selectedCategories.meubles">
        Meubles
      </label>
      <label>
        <input type="checkbox" v-model="selectedCategories.vetements">
        Vetements
      </label>
      <label>
        <input type="checkbox" v-model="selectedCategories.jouets">
        Jouets
      </label>
      <label>
        <input type="checkbox" v-model="selectedCategories.nourriture">
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
      selectedCategories: {
        vaisselle: false,
        ceramique: false,
        meubles: false,
        vetements: false,
        jouets: false,
        nourriture: false
      }
    };
  },
  computed: {
    apiURL() {
      const baseURL = "http://localhost:8000/api/categories/";
      const selected = Object.keys(this.selectedCategories).filter(
        category => this.selectedCategories[category]
      );
      const searchQuery = selected.join(",");
      return `${baseURL}?search=${searchQuery}`;
    }
  },
  watch: {
    selectedCategories: {
      deep: true,
      handler(newVal) {
        this.$emit('categoriesChanged', Object.keys(newVal).filter(key => newVal[key]));
      }
    }
  }
};
</script>

<style scoped>
.category-component {
  /* Component styles */
}

.category-title {
  /* Title styles */
}

.checkboxes {
  display: flex;
  flex-direction: column;
  gap: 10px; /* Adjust the gap as needed */
}
</style>
