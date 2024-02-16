<template>
  <div class="container">
    <div class="main-content">
      <!-- Sidebar -->
      <div class="sidebar">
        <p class="mb-10 mt-10">Produits trouvé: {{ products.length }}</p>
        <CategoryComponent @categoriesChanged="fetchProducts" />
        <ColorFilterComponent/>
      </div>
      <!-- Product Grid -->
      <div class="product-grid" v-if="products && products.length">
        <div v-for="product in products" :key="product.id" class="card card-compact max-w-64 m-2">
          <router-link :to="`/products/${product.id}`">
          <figure><img src="/assiette.png" alt="Product image" class="object-cover h-80 w-full" /></figure>
            <div class="card-body">
              <h2 class="card-title open-sans-semibold uppercase">{{ product.name }}</h2>
              <p class="price-text pb-3">€ {{ product.price }}</p>
              <p class="description">Lorem ipsum dolor sit amet conse bolli tetur conjo</p>
            </div>
          </router-link>
          <div class="center pt-8">
<!--            <CTAButtonBase text="AJOUTER AU PANIER" />-->
            <CTAButtonBase @click="addToCart" text="AJOUTER AU PANIER" />
          </div>
        </div>
      </div>
      <div v-else>
        <p class="center">Nous n'avons pas de produits pour cette selection.</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import CTAButtonBase from '@/components/CTAButtonBase.vue'
import CategoryComponent from '@/components/CategoryComponent.vue'
import ColorFilterComponent from '@/components/ColorFilterComponent.vue'
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();

const product = { /* your product data */ };

function addToCart() {
  cartStore.addToCart(product);
}

const products = ref([]);

const fetchProducts = async (categories = []) => {
  let url = `${import.meta.env.VITE_API_ENDPOINT}/products/`;

  // If there are any categories selected, append them to the URL as query parameters
  if (categories.length > 0) {
    // Constructing query parameters for categories
    const categoryParams = categories.map(category => `category=${category}`).join('&');
    url += `?${categoryParams}`;
  }

  try {
    const response = await axios.get(url);
    products.value = response.data;
  } catch (error) {
    console.error("Failed to fetch products based on categories:", error);
  }
};

// Initial fetch with no categories selected
onMounted(() => {
  // Fetch all products initially
  fetchProducts();
});
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 3fr; /* Sidebar and Main content */
  gap: 20px;
}

.sidebar {
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr); /* Default to 1 column for mobile */
  gap: 20px;
}

@media (min-width: 1024px) { /* Adjust breakpoint as needed */
  .product-grid {
    grid-template-columns: repeat(3, 1fr); /* 3 columns for desktop */
  }
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr; /* Stack on smaller screens */
  }
  .sidebar {
    display: none; /* Hide sidebar on small screens */
  }
  /* Adjustments for mobile dropdown can be added here if implemented */
}

.price-text, .description {
  font-size: 16px;
  color: #807F86;
}

.card-body {
  padding-left: 0;
}
</style>
