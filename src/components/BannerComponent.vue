<template>
  <div class="relative md:flex md:items-center md:justify-center">
    <!-- carousel photos -->
    <div class="carousel w-full hidden md:flex">
      <div v-show="currentSlide === 1" class="carousel-item relative w-full">
        <img src="@/assets/images/flat-lay-plates.webp" alt="Flat lay plates" class="w-full slide-photo">
      </div>
      <div v-show="currentSlide === 2" class="carousel-item relative w-full">
        <img src="@/assets/images/tools-pottery-table.webp" alt="Pottery tools" class="w-full slide-photo">
      </div>
      <div v-show="currentSlide === 3" class="carousel-item relative w-full">
        <img src="@/assets/images/carpenter-working-with-wood.webp" alt="Carpenter wood working" class="w-full slide-photo">
      </div>
    </div>
    <!-- logo overlay box -->
    <div class="overlay md:absolute inset-0 mx-auto bg-secondary md:max-w-96 md:bg-opacity-80 md:ml-64">
      <div class="flex flex-col items-center justify-evenly content-center h-full min-h-96">
        <div>
          <img alt="Vue logo" class="h-44" src="@/assets/CB_logo.svg" />
        </div>
        <h3 class="text-xl text-center text-balance text-white">Faites place à l'originalité dans votre quotidien!</h3>
        <router-link to="/boutique">
          <CTAButtonPrimary text="BOUTIQUE" class="border-none" />
        </router-link>
      </div>
    </div>
  </div>
</template>


<style>
.slide-photo {
  max-height: 500px;
  object-fit: cover;
}

</style>

<script setup>
import CTAButtonPrimary from '@/components/CTAButtonPrimary.vue';
import { onMounted, ref } from 'vue';

const totalSlides = 3;
const currentSlide = ref(1);

onMounted(() => {
  setInterval(() => {
    currentSlide.value = currentSlide.value % totalSlides + 1;
  }, 30000);
});
</script>