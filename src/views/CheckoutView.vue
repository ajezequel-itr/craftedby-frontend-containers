<!--<template>-->
<!--  <div>-->
<!--    <p v-if="cart.itemCount > 1" class="mt-5 text-lg">Panier ({{ cart.itemCount }} produits)</p>-->
<!--    <p v-else-if="cart.itemCount === 1" class="mt-5 text-lg">Panier ({{ cart.itemCount }} produit)</p>-->
<!--    <div class="overflow-x-auto">-->
<!--      <table class="table w-full table-compact sm:table-normal">-->
<!--        <thead>-->
<!--        <tr>-->
<!--          <th></th>-->
<!--          <th>Nom</th>-->
<!--          <th>Prix</th>-->
<!--          <th>Quantité</th>-->
<!--          <th>Total</th>-->
<!--          <th></th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--        <tbody>-->
<!--        <tr v-for="item in cart.items" :key="item.id">-->
<!--          <td><img :src='"http://localhost:8000/images/products/" + item.image_path' alt="Image du produit" class="w-20 h-20 object-cover"></td>-->
<!--          <td>{{ item.name }}</td>-->
<!--          <td>€{{ item.price }}</td>-->
<!--&lt;!&ndash;          <td>{{ item.quantity }}</td>&ndash;&gt;-->
<!--          <td>-->
<!--            <button @click="decreaseQuantity(item)" class="btn btn-ghost btn-xs">-</button>-->
<!--            {{ item.quantity }}-->
<!--            <button @click="increaseQuantity(item)" class="btn btn-ghost btn-xs">+</button>-->
<!--          </td>-->

<!--          <td>€{{ item.quantity * item.price }}</td>-->
<!--          <td></td>-->
<!--        </tr>-->
<!--        </tbody>-->
<!--      </table>-->
<!--      <UserInformationFieldComponent></UserInformationFieldComponent>-->
<!--    </div>-->
<!--    <div class="mt-4 p-4 border-t border-gray-200">-->
<!--      <p class="text-lg font-semibold">Prix total : €{{ cart.totalPrice }}</p>-->
<!--    </div>-->
<!--    <CTAButtonPrimary @click="submitOrder" text="COMMANDER"/>-->
<!--  </div>-->
<!--</template>-->

<template>
  <div> <!-- Increase the text size globally -->
    <p v-if="cart.itemCount > 1" class="mt-5 text-lg">Panier ({{ cart.itemCount }} produits)</p>
    <p v-else-if="cart.itemCount === 1" class="mt-5 text-lg">Panier ({{ cart.itemCount }} produit)</p>
    <div class="overflow-x-auto">
      <table class="table w-full table-compact sm:table-normal text-lg"> <!-- Increase the table text size -->
        <thead class="text-white bg-black">
        <tr>
          <th class="uppercase">Photo</th>
          <th class="uppercase">Nom</th>
          <th class="uppercase">Prix</th>
          <th class="uppercase">Quantité</th>
          <th class="uppercase">Total</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in cart.items" :key="item.id" class="align-middle">
          <td>
            <button @click="removeFromCart(item.id)" class="ml-auto btn btn-ghost btn-xs text-primary">X</button>
            <img :src='"http://localhost:8000/images/products/" + item.image_path' alt="Image du produit" class="w-20 h-20 object-cover">
          </td>
          <td class="uppercase">{{ item.name }}</td>
          <td>€{{ item.price }}</td>
          <td>
            <div class="flex items-center border-2 border-black"> <!-- Rectangle around quantity buttons -->
              <button @click="decreaseQuantity(item)" class="btn btn-ghost btn-xs">-</button>
              {{ item.quantity }}
              <button @click="increaseQuantity(item)" class="btn btn-ghost btn-xs">+</button>
            </div>
          </td>
          <td>€{{ item.quantity * item.price }}</td>
          <td></td>
        </tr>
        </tbody>
      </table>
      <UserInformationFieldComponent class="text-lg"></UserInformationFieldComponent> <!-- Increase text size -->
    </div>
    <div class="mt-5 center">
      <CTAButtonPrimary @click="submitOrder" text="COMMANDER"/>
    </div>

    <div class="price-box m-4 p-4 border bg-black text-white">
      <p class="text-lg m-5">Total panier</p>
      <p>€{{ cart.totalPrice }}</p>
      <CTAButtonPrimary @click="submitOrder" text="COMMANDER" class="mt-5 "/>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import OrderService from '@/services/OrderService';
import { useUserStore } from '@/stores/user.js';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'vue-router';
import UserInformationFieldComponent from '@/components/UserInformationFieldComponent.vue'
import CTAButtonPrimary from '@/components/CTAButtonPrimary.vue'

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
    await router.push('/boutique');
  } catch (error) {
    console.error('Error creating order:', error.message || 'Unknown error');
    alert('Failed to create order.');
  }
};
</script>

<style scoped>

/* Ensure all text uses Open Sans */
* {
  font-family: 'open-sans-regular', sans-serif;
}

/* Custom styling for the total price box */
.price-box {
  width: 500px; /* Adjust based on content */
}
</style>

