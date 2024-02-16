<template>
  <div class="about">
    <h1>Welcome, {{ userStore.user }}</h1>
    <h2>This is an about page</h2>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
import { useUserStore } from "../stores/user";
export default {
  setup() {
    const userStore = useUserStore;
    return { userStore };
  },
};
</script>