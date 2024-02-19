<template>
  <div class="container">
    <div class="main-content">
      <!-- Sidebar -->
      <div class="sidebar">
        <p v-if="products.length > 1" class="mt-10 text-sm">Trouvé {{ products.length }} produits</p>
        <p v-else-if="products.length === 1" class="mt-10 text-sm">Trouvé {{ products.length }} produit</p>
        <div class="divider"></div>
        <CategoryComponent @categoryChanged="fetchProductsByCategory" />
        <div class="divider"></div>
        <ColorFilterComponent @colorsChanged="fetchProductsByColor" />
        <div class="divider"></div>
        <PriceFilterComponent @priceChanged="fetchProductsByPrice" />
      </div>
      <!-- Product Grid -->
      <div class="product-grid mt-20" v-if="products && products.length">
        <div v-for="product in products" :key="product.id" class="card card-compact max-w-64 m-2">
          <router-link :to="`/products/${product.id}`">
<!--          <figure><img src="/assiette.png" alt="Product image" class="object-cover h-80 w-full" /></figure>-->
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
<!--            Show not avaivble instead of add to cart if stock = 0-->
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
import { onMounted, ref, reactive } from 'vue';
import CTAButtonBase from '@/components/CTAButtonBase.vue';
import CategoryComponent from '@/components/CategoryComponent.vue';
import ColorFilterComponent from '@/components/ColorFilterComponent.vue';
import PriceFilterComponent from '@/components/PriceFilterComponent.vue';
import { useCartStore } from '@/stores/cart';
import api from '@/services/api';

const cartStore = useCartStore();
const products = ref([]);
// Use a reactive object to maintain the state of all filters
const filters = reactive({
  category: '',
  color: '',
  priceRange: { min: null, max: null }
});

function addToCart(productToAdd) {
  cartStore.addToCart(productToAdd);
}
//Add filters if set to query
const fetchProducts = async () => {
  let endpoint = `products/?`;
  if (filters.category) {
    endpoint += `category=${filters.category}&`;
  }
  if (filters.color) {
    endpoint += `color=${filters.color}&`;
  }
  if (filters.priceRange.min !== null) {
    endpoint += `minPrice=${filters.priceRange.min}&`;
  }
  if (filters.priceRange.max !== null) {
    endpoint += `maxPrice=${filters.priceRange.max}&`;
  }

  try {
    const response = await api.get(endpoint);
    products.value = response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
};

// Updates the filter state and calls fetchProducts
const fetchProductsByPrice = (priceRange) => {
  // Spreads the min and max into the priceRange
  filters.priceRange = { ...priceRange };
  fetchProducts();
};

// Updates the filter state and calls fetchProducts
const fetchProductsByColor = (colors) => {
  // Default to empty if no color is selected
  filters.color = colors[0] || '';
  fetchProducts();
};

// Updates the filter state and calls fetchProducts
const fetchProductsByCategory = (category) => {
  filters.category = category;
  fetchProducts();
};

onMounted(() => {
  fetchProducts();
});

function getFullImagePath(imagePath) {
  const apiBaseURL = 'http://localhost:8000/images/products/';
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
