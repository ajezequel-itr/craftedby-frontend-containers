<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
    <form @submit.prevent="login" class="mb-4">
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input id="email" type="email" v-model="email" class="custom-input" />

      <label for="password" class="block mt-2 text-sm font-medium text-gray-700">Password</label>
      <input id="password" type="password" v-model="password" class="custom-input mt-1" />

      <button type="submit" class="w-full mt-4 bg-primary text-white py-2 px-4 focus:outline-none focus:shadow-outline">Login</button>
    </form>
    <p class="center">OU</p>

    <router-link to="/register" class="block text-center mt-2">
      <button class="w-full btn bg-secondary">Créer un compte</button>
    </router-link>
  </div>
</template>

<script>
import { useUserStore } from "../stores/user";

export default {
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      await this.userStore.signIn(this.email, this.password);
      this.userStore.storeUser(this.userStore.user.token, this.userStore.user.user);
    },
  },
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