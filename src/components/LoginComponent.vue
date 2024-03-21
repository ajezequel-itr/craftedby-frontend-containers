<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
    <form @submit.prevent="login" class="mb-4">

      <label class="input input-bordered flex items-center gap-2 mt-4">
        <input type="email" v-model="email" class="grow" placeholder="Email" />
      </label>

      <label class="input input-bordered flex items-center gap-2 mt-4">
        <input type="password" v-model="password" class="grow" placeholder="Mot de passe" />
      </label>

      <button type="submit" class="w-full mt-4 bg-primary text-white py-2 px-4 focus:outline-none focus:shadow-outline">Login</button>
    </form>
    <p class="center">OU</p>

    <router-link to="/register" class="block text-center mt-2">
      <button class="w-full btn bg-secondary rounded-none">Créer un compte</button>
    </router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from "../stores/user";
import router from '@/router/index.js';

const userStore = useUserStore();
const email = ref("");
const password = ref("");

const login = async () => {
  await userStore.signIn(email.value, password.value);
  // userStore.storeUser(userStore.user.token, userStore.user.user);
  await router.push('/boutique');
};
</script>

<style>
.custom-input {
  border: 1px solid black;
  border-radius: 0;
  font-family: 'open-sans-regular', sans-serif;
  font-size: 0.875rem;
}

</style>