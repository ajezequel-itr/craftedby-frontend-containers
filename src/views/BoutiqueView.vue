<template>
  <div class="container">
    <div class="main-content grid grid-cols-1 md:grid-cols-5 gap-5 md:ml-24">
      <!-- Mobile Filters Dropdown -->
      <div class="block md:hidden">
        <!--      <CTAButtonBase class="mt-2" label="Filtres" text="FILTRER" @click="toggleFiltersDropdown" />-->
        <div class="flex flex-row mt-10 ml-8">
          <button @click="toggleFiltersDropdown">
            <img alt="Filter Icon" src="../assets/icons/filters.svg">
          </button>
          <p class="ml-2">FILTRER</p>
        </div>
        <div v-show="showFilters" class="filters-dropdown">
          <CategoryComponent @categoryChanged="fetchProductsByCategory" />
          <ColorFilterComponent @colorsChanged="fetchProductsByColor" />
          <PriceFilterComponent @priceChanged="fetchProductsByPrice" />
          <CTAButtonBase class="mt-4" text="Réinitialiser les filtres" @click="clearAllFilters" />
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
        <CTAButtonBase text="Réinitialiser les filtres" @click="clearAllFilters" />
      </div>
      <!-- Product grid -->
      <div
        v-if="products && products.length"
        class="product-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 md:col-span-4 md:ml-16 md:mt-20 mr-5 ml-5">
        <div v-for="product in products" :key="product.id" class="card max-w-72">
          <router-link :to="`/products/${product.id}`">

            <!--            <figure>-->
            <!--&lt;!&ndash;              <img src="@/assets/images/flat-lay-plates.webp" alt="Product image" class="object-cover h-64 w-52" />&ndash;&gt;-->
            <!--              <img src="/assiette.png" alt="Product image" class="object-cover h-80 w-72"/>-->
            <!--            </figure>-->

            <!--            put back to get img from backend:-->
            <figure>
              <img :src="getFullImagePath(product.image_path)" alt="Product image" class="object-cover h-80 w-72" />
            </figure>

            <div class="card-body pl-2 line-clamp-4">
              <h2 class="card-title open-sans-semibold uppercase text-lg pt-3">{{ product.name }}</h2>
              <p class="price-text">€ {{ product.price }}</p>
              <p class="description pt-5">{{ product.description }}</p>
            </div>
          </router-link>
          <div>
            <!--            Show not available instead of add to cart if stock = 0 -->
            <CTAButtonBase v-if="product.stock > 0" text="AJOUTER AU PANIER" @click="cartStore.addToCart(product)" />
            <CTAButtonBase v-else-if="product.stock <= 0" text="PLUS DISPONIBLE" />
          </div>
        </div>
      </div>
      <!--      If no products found by filters-->
      <div v-else class="text-balance center">
        <p>Nous n'avons pas de produits pour cette selection.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue'
import CTAButtonBase from '@/components/CTAButtonBase.vue'
import CategoryComponent from '@/components/CategoryComponent.vue'
import ColorFilterComponent from '@/components/ColorFilterComponent.vue'
import PriceFilterComponent from '@/components/PriceFilterComponent.vue'
import { useCartStore } from '@/stores/cart'
import api from '@/services/api'

// State to toggle mobile filters dropdown
const showFilters = ref(false)

// Toggle mobile filters dropdown visibility
function toggleFiltersDropdown() {
  showFilters.value = !showFilters.value
}

const cartStore = useCartStore()

const products = ref([])
// Use a reactive object to maintain the state of all filters
const filters = reactive({
  category: '',
  color: '',
  priceRange: { min: null, max: null }
})

const fetchProducts = async () => {
  let endpoint = 'products/'

  // Filter out empty values from the filters object
  const filteredParams = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value !== '' && value !== null)
  )

  try {
    //Let Axios figure out key:value filters from filters object
    const response = await api.get(endpoint, {
      params: filteredParams
    })
    products.value = response.data
  } catch (error) {
    console.error('Failed to fetch products:', error)
  }
}

// Updates the filter state and calls fetchProducts
const fetchProductsByPrice = (priceRange) => {
  // Spreads the min and max into the priceRange
  filters.priceRange = { ...priceRange }
  fetchProducts()
}

// Updates the filter state and calls fetchProducts
const fetchProductsByColor = (colors) => {
  // Default to empty if no color is selected
  filters.color = colors[0] || ''
  fetchProducts()
}

// Updates the filter state and calls fetchProducts
const fetchProductsByCategory = (category) => {
  filters.category = category
  fetchProducts()
}

onMounted(() => {
  fetchProducts()
})

function getFullImagePath(imagePath) {
  const apiBaseURL = 'http://192.168.1.70:8000/images/products/'
  return `${apiBaseURL}${imagePath}`
}

const clearAllFilters = () => {
  filters.category = ''
  filters.color = ''
  filters.priceRange = { min: null, max: null }

  // Close the mobile filter dropdown after clearing
  showFilters.value = false
  fetchProducts()
}
</script>

<style scoped>

.description {
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
  padding: 0;
}

</style>
