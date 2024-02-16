<template>
  <div class="container">
    <div class="main-content">
      <!-- Sidebar -->
      <div class="sidebar">
        <p class="mt-10 text-sm">Trouvé {{ products.length }} produits</p>
        <div class="divider"></div>
        <CategoryComponent @categoryChanged="fetchProducts" />
        <div class="divider"></div>
        <ColorFilterComponent/>
      </div>
      <!-- Product Grid -->
      <div class="product-grid mt-20" v-if="products && products.length">
        <div v-for="product in products" :key="product.id" class="card card-compact max-w-64 m-2">
          <router-link :to="`/products/${product.id}`">
<!--          <figure><img src="/assiette.png" alt="Product image" class="object-cover h-80 w-full" /></figure>-->
<!--            <figure><img src="{{product.image_path}}" alt="Product image" class="object-cover h-80 w-full" /></figure>-->
            <figure>
              <img :src="getFullImagePath(product.image_path)" alt="Product image" class="object-cover h-80 w-full" />
            </figure>

            <div class="card-body">
              <h2 class="card-title open-sans-semibold uppercase">{{ product.name }}</h2>
              <p class="price-text pb-3">€ {{ product.price }}</p>
              <p class="description">Lorem ipsum dolor sit amet conse bolli tetur conjo</p>
            </div>
          </router-link>
          <div class="center pt-8">
            <CTAButtonBase v-if="product.stock > 0" @click="addToCart(product)" text="AJOUTER AU PANIER" />
            <CTAButtonBase v-else-if="product.stock <= 0" text="PLUS DISPONIBLE" />
          </div>
        </div>
      </div>
<!--      If no products found by filters-->
      <div v-else class="center">
        <p>Nous n'avons pas de produits pour cette selection.</p>
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
// Use pinia cart store
import { useCartStore } from '@/stores/cart';

const cartStore = useCartStore();
// const selectedProduct = ref({});

function addToCart(productToAdd) {
  cartStore.addToCart(productToAdd);
}

const products = ref([]);

const fetchProducts = async (category = '') => {
  let url = `${import.meta.env.VITE_API_ENDPOINT}/products/`;

  // Append the selected category to the URL as a query parameter if it's not empty
  if (category) {
    url += `?category=${category}`;
  }

  try {
    const response = await axios.get(url);
    products.value = response.data;
  } catch (error) {
    console.error("Failed to fetch products based on the category:", error);
  }
};
// Initial fetch with no categories selected
onMounted(() => {
  // Fetch all products
  fetchProducts();
});

function getFullImagePath(imagePath) {
  const apiBaseURL = 'http://localhost:8000/images/products/';
  // const apiBaseURL = `${import.meta.env.VITE_API_ENDPOINT}/images/products/`;
  return `${apiBaseURL}${imagePath}`;
}
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

@media (min-width: 1024px) {
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
}

.price-text, .description {
  font-size: 16px;
  color: #807F86;
}

.card-body {
  padding-left: 0;
}
</style>
