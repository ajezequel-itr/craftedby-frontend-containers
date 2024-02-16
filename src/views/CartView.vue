<template>
  <div>
    <h2 class="text-2xl font-bold my-4">Cart</h2>
    <div class="overflow-x-auto">
      <table class="table w-full">
        <!-- Table head -->
        <thead>
        <tr>
          <th></th>
          <th>Photo</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <!-- Table body -->
        <tr v-for="item in cart.items" :key="item.id">
          <td><button @click="removeFromCart(item.id)" class="btn btn-ghost btn-xs">X</button></td>
          <td><img :src='"http://localhost:8000/images/products/" + item.image_path' alt="Product image" class="w-20 h-20 object-cover"></td>
          <td>{{ item.name }}</td>
          <td>€{{ item.price }}</td>
          <td>
            <button @click="decreaseQuantity(item)" class="btn btn-ghost btn-xs">-</button>
            {{ item.quantity }}
            <button @click="increaseQuantity(item)" class="btn btn-ghost btn-xs">+</button>
          </td>
          <td>€{{ item.quantity * item.price }}</td>
          <td></td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4 p-4 border-t border-gray-200">
      <p class="text-lg font-semibold">Total Price: €{{ cart.totalPrice }}</p>
    </div>
    <button @click="clearCart" class="btn mt-4">Clear Cart</button>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart';
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

function clearCart() {
  cart.clearCart();
}
</script>

