<template>
  <div>
    <div class="p-4">
      <h1 class="text-3xl font-bold mb-5">Product List</h1>
      <div v-if="products && products.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="product in products" :key="product.id" class="card card-compact bg-base-100 shadow-xl">
          <router-link :to="`/products/${product.id}`">
              <figure><img :src="product.image_path" alt="Product image" class="object-cover h-48 w-full" /></figure>
          <div class="card-body">
            <h2 class="card-title">{{ product.name }}</h2>
            <p>Price: {{ product.price }}</p>
            <p>Material: {{ product.material }}</p>
            <p>Color: {{ product.color }}</p>
            <p>Stock: {{ product.stock }}</p>
            <div>
              <h3>Categories</h3>
              <ul>
                <li v-for="category in product.categories" :key="category.id">{{ category.name }}</li>
              </ul>
            </div>
            <div>
              <h3>Business</h3>
              <p>Name: {{ product.business.name }}</p>
              <p>Website: <a :href="`http://${product.business.website}`" target="_blank">{{ product.business.website }}</a></p>
            </div>
          </div>
          </router-link>
          <div class="center"><CTAButtonPrimary text="AJOUTER AU PANIER" />
          </div>
        </div>
      </div>
      <div v-else>
        <p>No products found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import CTAButtonPrimary from '@/components/CTAButtonPrimary.vue'

const products = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/products/`);
    products.value = response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
});
</script>

<style scoped>
/* Additional styles if needed */
</style>

