<template>
  <div class="container">
    <div class="main-content grid grid-cols-1 md:grid-cols-5 gap-5">
      <!-- Mobile Filters Dropdown -->
      <div class="block md:hidden">
<!--      <CTAButtonBase class="mt-2" label="Filtres" text="FILTRER" @click="toggleFiltersDropdown" />-->
        <div class="flex flex-row mt-10 ml-8">
          <button @click="toggleFiltersDropdown">
          <img src="../assets/icons/filters.svg" alt="Filter Icon">
        </button>
          <p class="ml-2">FILTRER</p>
        </div>
        <div class="filters-dropdown" v-show="showFilters">
          <CategoryComponent @categoryChanged="fetchProductsByCategory" />
          <ColorFilterComponent @colorsChanged="fetchProductsByColor" />
          <PriceFilterComponent @priceChanged="fetchProductsByPrice" />
          <CTAButtonBase class="mt-4" @click="clearAllFilters" text="Réinitialiser les filtres" />
        </div>
        <p v-if="products.length > 1" class="mt-5 ml-8 text-sm">Trouvé {{ products.length }} produits</p>
        <p v-else-if="products.length === 1" class="mt-5 ml-8 text-sm">Trouvé {{ products.length }} produit</p>
      </div>
      <!-- Sidebar for desktop -->
      <div class="hidden md:block md:col-span-1">
      <p v-if="products.length > 1" class="mt-10 text-sm">Trouvé {{ products.length }} produits</p>
        <p v-else-if="products.length === 1" class="mt-10 text-sm">Trouvé {{ products.length }} produit</p>
        <div class="divider"></div>
        <CategoryComponent @categoryChanged="fetchProductsByCategory" />
        <div class="divider"></div>
        <ColorFilterComponent @colorsChanged="fetchProductsByColor" />
        <div class="divider"></div>
        <PriceFilterComponent @priceChanged="fetchProductsByPrice" />
        <div class="divider"></div>
        <CTAButtonBase @click="clearAllFilters" text="Réinitialiser les filtres" />
      </div>
      <!-- Product grid -->
      <div class="product-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:col-span-4 md:ml-16 md:mt-20 mr-5 ml-5" v-if="products && products.length">
      <div v-for="product in products" :key="product.id" class="card w-full">
          <router-link :to="`/products/${product.id}`">

          <figure><img src="/assiette.png" alt="Product image" class="object-cover w-full" ></figure>
<!--            put back to get img from backend:-->
<!--            <figure>-->
<!--              <img :src="getFullImagePath(product.image_path)" alt="Product image" class="object-cover w-full" />-->
<!--            </figure>-->

            <div class="card-body pl-2">
              <h2 class="card-title open-sans-semibold uppercase">{{ product.name }}</h2>
              <p class="price-text pb-3">€ {{ product.price }}</p>
              <p class="description line-clamp-2">{{ product.description }}</p>
            </div>
          </router-link>
          <div>
<!--            Show not available instead of add to cart if stock = 0 -->
            <CTAButtonBase v-if="product.stock > 0" @click="cartStore.addToCart(product)" text="AJOUTER AU PANIER" />
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

// State to toggle mobile filters dropdown
const showFilters = ref(false);

// Toggle mobile filters dropdown visibility
function toggleFiltersDropdown() {
  showFilters.value = !showFilters.value;
}

const cartStore = useCartStore();

const products = ref([]);
// Use a reactive object to maintain the state of all filters
const filters = reactive({
  category: '',
  color: '',
  priceRange: { min: null, max: null }
});

const fetchProducts = async () => {
  let endpoint = 'products/';

  // Filter out empty values from the filters object
  const filteredParams = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== '' && value !== null)
  );

  try {
    //Let Axios figure out key:value filters from filters object
    const response = await api.get(endpoint, {
      params: filteredParams
    });
    products.value = response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
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

const clearAllFilters = () => {
  filters.category = '';
  filters.color = '';
  filters.priceRange = { min: null, max: null };

  // Close the mobile filter dropdown after clearing
  showFilters.value = false;
  fetchProducts();
};

</script>

<style scoped>

.price-text, .description {
  font-size: 16px;
  color: #807F86;
}

.filters-dropdown {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #ccc;
}

.card-body {
  min-height: 200px;
}

</style>
