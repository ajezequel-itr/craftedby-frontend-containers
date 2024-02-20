<template>
  <div v-if="loading" class="flex justify-center items-center h-screen loading loading-infinity loading-lg">
    Loading...
  </div>
  <div v-else-if="error" class="text-red-500 text-center mt-4">
    {{ error }}
  </div>
  <div v-else-if="product" class="container mx-auto p-4">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="product-image">
<!--        <img :src="product.image_path" alt="Product image" class="w-full h-auto rounded-lg shadow-md"/>-->
        <figure><img src="/assiette.png" alt="Product image" class="h-auto rounded-lg shadow-md" ></figure>

      </div>
      <div class="product-content">
        <h1 class="text-3xl font-bold mb-3 uppercase">{{ product.name }}</h1>
        <div class="product-meta mb-4">
          <div class="badge badge-secondary badge-outline price">{{ product.price }}€</div>
          <div class="badge badge-info badge-outline">Material: {{ product.material }}</div>
          <div class="badge badge-accent badge-outline">Color: {{ product.color }}</div>
          <div class="badge" :class="product.stock > 0 ? 'badge-success' : 'badge-error'">
            {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}
          </div>
        </div>
        <div class="product-description mb-4">
          <h2 class="text-2xl font-bold mb-2">Description</h2>
          <p class="description">Lorem ipsum dolor sit amet conse bolli tetur conjo</p>
          <p>{{ product.description }}</p>
        </div>
        <div class="pt-8">
          <!--            Show not available instead of add to cart if stock = 0-->
          <CTAButtonBase v-if="product.stock > 0" @click="addToCart(product)" text="AJOUTER AU PANIER" />
          <CTAButtonBase v-else-if="product.stock <= 0" text="PLUS DISPONIBLE" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import CTAButtonBase from '@/components/CTAButtonBase.vue'
import { useCartStore } from '@/stores/cart.js'

const route = useRoute();
const product = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await api.get(`products/${route.params.id}`);
    product.value = response.data.product;
  } catch (err) {
    console.error("Failed to fetch product details:", err);
    error.value = "Failed to load product details.";
  } finally {
    loading.value = false;
  }
});

const cartStore = useCartStore();
function addToCart(productToAdd) {
  cartStore.addToCart(productToAdd);
}
</script>

<style scoped>

.price-text, .description {
  font-size: 16px;
  color: #807F86;
}
</style>
