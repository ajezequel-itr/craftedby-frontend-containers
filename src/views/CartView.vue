<template>
  <div>
    <h2>Cart</h2>
    <div v-for="item in cart.items" :key="item.id">
      <p>{{ item.name }} - {{ item.quantity }} x {{ item.price }}</p>
      <button @click="removeFromCart(item.id)">Remove</button>
    </div>
    <p>Total Items: {{ cart.itemCount }}</p>
    <p>Total Price: €{{ cart.totalPrice }}</p>
    <button @click="clearCart">Clear Cart</button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
const cart = useCartStore();

function removeFromCart(id) {
  cart.removeFromCart(id);
}

function clearCart() {
  cart.clearCart();
}
</script>
