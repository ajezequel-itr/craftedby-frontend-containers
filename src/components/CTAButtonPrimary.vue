<template>
  <button class="btn bg-primary btn-wide rounded-none text-white open-sans-semibold hover:bg-primary">
    {{ text }}
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  text: {
    type: String,
  },
});
</script>

<style scoped>
/* Component-specific styles */
</style>
