<template>
  <div class="container">
    <p v-if="cart.itemCount > 1" class="mt-5 text-lg">Panier ({{ cart.itemCount }} produits)</p>
    <p v-else-if="cart.itemCount === 1" class="mt-5 text-lg">Panier ({{ cart.itemCount }} produit)</p>
    <div class="overflow-x-auto mt-5">
      <table class="table w-full table-compact sm:table-normal">
      <thead class="text-white bg-black">
        <tr>
          <th><img src="../assets/icons/trash.svg" alt="Delete Icon" ></th>
          <th class="uppercase">Photo</th>
          <th class="uppercase">Produit</th>
          <th class="uppercase">Prix</th>
          <th class="uppercase">Quantité</th>
          <th class="uppercase">Total</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in cart.items" :key="item.id" class="align-middle">
          <td><button @click="cart.removeFromCart(item.id)" class="btn btn-ghost btn-sm text-primary mr-2 open-sans-regular">X</button></td>
          <td class="flex items-center">
            <img :src="'http://localhost:8000/images/products/' + item.image_path" alt="Image du produit" class="w-20 h-20 object-cover">
          </td>
          <td class="uppercase">{{ item.name }}</td>
          <td>€{{ item.price }}</td>
          <td>
            <div class="inline-block p-1 pl-2 pr-2 items-center border border-black">
              <button @click="cart.decreaseQuantity(item.id)" class="btn btn-ghost btn-xs">-</button>
              {{ item.quantity }}
              <button @click="cart.increaseQuantity(item.id)" class="btn btn-ghost btn-xs">+</button>
            </div>
          </td>
          <td class="text-secondary">€{{ item.quantity * item.price }}</td>
          <td></td>
        </tr>
        </tbody>
      </table>
      <UserInformationFieldComponent class="text-lg"></UserInformationFieldComponent>
    </div>

    <div class="price-box m-4 p-4 border bg-black text-white w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
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
    alert(`Merci pour votre commande! Numero de commande: ${response.order.order_number}`);
    cart.clearCart();
    await router.push('/profil');
  } catch (error) {
    console.error('Error creating order:', error.message || 'Unknown error');
    alert('Failed to create order.');
  }
};
</script>

<style scoped>
@media (max-width: 640px) {
  .price-box {
    width: 100%;
  }
}

.container {
  max-width: 50%;
}

/* Ensure all text uses Open Sans */
* {
  font-family: 'open-sans-regular', sans-serif;
}

.price-box {
  width: 400px;
}

.btn {
  border-width: 0;
}
</style>
