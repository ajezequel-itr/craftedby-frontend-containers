<template>
  <div class="form-control">
<!--    <input type="text" placeholder="Chercher produit" class="input input-bordered text-ellipsis overflow-hidden w-24 max-h-8 md:w-auto" />-->
    <input type="text" placeholder="Chercher produit" v-model="searchInput" @input="updateSearchKeyword" class="input input-bordered text-ellipsis text-sm overflow-hidden w-24 max-h-8 md:w-auto">
  </div>
</template>

<script setup>
import {ref, defineEmits} from 'vue';

const searchInput = ref(null);
// eslint-disable-next-line vue/valid-define-emits
const emit = defineEmits();

const updateSearchKeyword = () => {
  emit('searchByKeyword', searchInput);
};
</script>