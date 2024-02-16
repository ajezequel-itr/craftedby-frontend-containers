<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <Header />
  <main class="center">
    <RouterView />
  </main>
  <FooterComponent />
</template>

<style scoped>
main {
  min-height: 100vh;
}
</style>
