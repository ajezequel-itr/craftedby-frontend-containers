<template>
  <div class="product-detail">
    <div class="p-4">
      <div class="product-image">
        <img :src="product.image_path" alt="Product image" class="w-full" />
      </div>
      <div class="product-content">
        <h1 class="text-3xl font-bold mb-3">{{ product.name }}</h1>
        <div class="product-meta">
          <span class="text-lg">{{ product.price }}</span>
          <span class="text-md">Material: {{ product.material }}</span>
          <span class="text-md">Color: {{ product.color }}</span>
          <span class="text-md">Stock: {{ product.stock > 0 ? 'In Stock' : 'Out of Stock' }}</span>
        </div>
        <div class="product-description">
          <h2 class="text-2xl font-bold mb-2">Description</h2>
          <p>{{ product.description }}</p>
        </div>
        <!-- Add more product details here -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const product = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:8000/api/products/${route.params.id}`);

    product.value = response.data;
  } catch (err) {
    console.error("Failed to fetch product details:", err);
    error.value = "Failed to load product details.";
  } finally {
    loading.value = false;
  }
});


// onMounted(async () => {
//   try {
//     const response = await axios.get(`http://localhost:8000/api/products/${route.params.id}`);
//     product.value = response.data;
//   } catch (error) {
//     console.error("Failed to fetch product details:", error);
//   }
// });
</script>

<style scoped>
/* Add styles for your product detail page here */
.product-detail {
  /* Your style here */
}

.product-image img {
  /* Your style here, e.g., max-width, border, etc. */
}

.product-content {
  /* Your style here */
}

.product-meta {
  /* Your style here */
}

.product-description {
  /* Your style here */
}
</style>
