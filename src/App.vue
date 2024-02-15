<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import CTAButtonPrimary from '@/components/CTAButtonPrimary.vue'
import CTAButtonAccent from '@/components/CTAButtonAccent.vue'
</script>

<template>
  <Header />
  <main class="center">
    <RouterView />
  </main>
  <Footer />
</template>

<style scoped>

</style>
