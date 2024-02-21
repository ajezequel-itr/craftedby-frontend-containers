<template>
    <div v-for="item in cart.items" :key="item.id" class="cart-item p-2 border-b border-gray-200">
      <div class="flex items-center space-x-2">
        <button @click="removeFromCart(item.id)" class="ml-auto btn btn-ghost btn-xs text-primary">X</button>
        <div class="flex-shrink-0">
          <img :src='"http://localhost:8000/images/products/" + item.image_path' alt="Product image" class="w-16 h-16 object-cover">
        </div>
        <div class="flex-grow">
          <p class="text-sm font-semibold">{{ item.name }}</p>
          <p class="text-xs">€{{ item.price }}</p>
        </div>
        <div class="flex items-center">
          <button @click="decreaseQuantity(item)" class="btn btn-ghost btn-xs">-</button>
          <span class="text-sm">{{ item.quantity }}</span>

          <button @click="increaseQuantity(item)" class="btn btn-ghost btn-xs">+</button>
        </div>
      </div>
    </div>
    <div class="mt-4 p-2 border-t border-gray-200">
      <p class="text-sm font-semibold">Total Price: €{{ cart.totalPrice }}</p>
    </div>
  <CTAButtonBase class="w-full mt-2" label="Valider panier" text="Valider panier" @click="goToCheckout" />

</template>

<script setup>
import { useCartStore } from '@/stores/cart.js';
import CTAButtonBase from '@/components/CTAButtonBase.vue'
import router from '@/router/index.js'

const cart = useCartStore();

function removeFromCart(id) {
  cart.removeFromCart(id);
}

function increaseQuantity(item) {
  cart.addToCart({ ...item, quantity: 1 });
}

function decreaseQuantity(item) {
  if (item.quantity > 1) {
    cart.updateQuantity(item.id, item.quantity - 1);
  } else {
    removeFromCart(item.id);
  }
}
function goToCheckout() {
  router.push('/checkout');
}

</script>

<style scoped>
img {
  max-width: 100%;
  height: auto;
}

.table {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
}

@media (min-width: 768px) {
  .table {
    display: table;
    width: 100%;
  }
}

@media (max-width: 640px) {
  .btn {
    padding: 0.375rem 0.75rem; /* Larger touch targets */
  }
  .btn-xs {
    padding: 0.25rem 0.5rem;
    font-size: 1rem;
  }
  .w-20.h-20 {
    width: 50px; /* Smaller images on mobile */
    height: 50px;
  }
}
</style>
