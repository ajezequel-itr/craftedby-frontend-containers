<template>
  <div>
    <h2 class="text-2xl font-bold my-4">Commande</h2>
    <div class="overflow-x-auto">
      <table class="table w-full table-compact sm:table-normal">
        <thead>
        <tr>
          <th></th>
          <th>Nom</th>
          <th>Prix</th>
          <th>Quantité</th>
          <th>Total</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in cart.items" :key="item.id">
          <td><img :src='"http://localhost:8000/images/products/" + item.image_path' alt="Image du produit" class="w-20 h-20 object-cover"></td>
          <td>{{ item.name }}</td>
          <td>€{{ item.price }}</td>
<!--          <td>{{ item.quantity }}</td>-->
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
      <UserInformationFieldComponent></UserInformationFieldComponent>
    </div>
    <div class="mt-4 p-4 border-t border-gray-200">
      <p class="text-lg font-semibold">Prix total : €{{ cart.totalPrice }}</p>
    </div>
<!--    <router-link class="btn btn-primary mt-4" to="/order">Passer la commande</router-link>-->
<!--    <button class="btn btn-secondary">Commander</button>-->
    <button @click="submitOrder" class="btn btn-primary">Commander</button>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import OrderService from '@/services/OrderService';
import { useUserStore } from '@/stores/user.js';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';
import UserInformationFieldComponent from '@/components/UserInformationFieldComponent.vue'

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

const user = useUserStore();
const cart = useCartStore();
const router = useRouter();

const email = ref('');
const address = ref('');
const first_name = ref('');
const last_name = ref('');

const submitOrder = async () => {
  const taxRate = 0.20;
  const totalWithoutTax = cart.totalPrice / (1 + taxRate);
  const taxAmount = cart.totalPrice - totalWithoutTax;

  const orderData = {
    user: {
      id: user.userObject.id,
      first_name: first_name.value,
      last_name: last_name.value,
      email: email.value,
      address: address.value,
    },
    items: cart.items.map(item => ({
      id: item.id,
      quantity: item.quantity
    })),
    // order_number: "1", -> auto generated now in back
    payment_status: 0,
    user_id: user.userObject.id,
    total_without_tax: totalWithoutTax.toFixed(2),
    tax_amount: taxAmount.toFixed(2),
    total_tax_included: cart.totalPrice.toFixed(2),
  };

  try {
    const response = await OrderService.createOrder(orderData);
    alert(`Order created successfully! Order Number: ${response.order.order_number}`);
    // Clear cart and redirect
    cart.clearCart();
    await router.push('/boutique'); // Redirect to catalogue
  } catch (error) {
    console.error('Error creating order:', error.message || 'Unknown error');
    alert('Failed to create order.');
  }
};
</script>
