<template>
<!--  <h2>Salut, {{ userStore.user.user.first_name }} </h2>-->

  <form @submit.prevent="login">
    <label>Email</label>
    <input type="email" v-model="email" />
    <label>Password</label>
    <input type="password" v-model="password" />
    <button type="submit">Login</button>
  </form>
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
      this.userStore.storeLoggedInUser(this.userStore.user.token, this.userStore.user.user);
    },
  },
};
</script>