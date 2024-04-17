<template>
  <transition name="fade" @after-enter="autoClose">
    <div v-if="visible" class="fixed inset-0 flex items-center justify-center">
      <div :class="notificationClasses">
        <span>{{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps({
  type: String,
  message: String,
  duration: { type: Number, default: 2000 }
});

const visible = ref(false);

const notificationClasses = computed(() => ({
  'rounded-lg': true,
  'p-4': true,
  'text-black': true,
  'text-center': true,
  'w-full': true,
  'max-w-md': true,
  'bg-success': props.type === 'success',
  'bg-error': props.type === 'error',
}));

function autoClose() {
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
}

watch(() => props.message, (newVal, oldVal) => {
  if (newVal !== oldVal && newVal !== '') {
    visible.value = true;
  }
});
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
