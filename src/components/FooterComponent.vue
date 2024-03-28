<template>
  <footer class="footer footer-center p-4 bg-black text-base-100 mt-20">
    <!-- Logo and Button - -->
    <div class="flex justify-between w-full max-w-6xl mx-auto hidden md:flex">
      <div class="flex flex-col items-start">
        <div class="flex flex-row">
          <img src="../assets/CB_logo.svg" alt="CRAFTEDBY Logo" class="mb-2">
          <p class="btn btn-ghost normal-case text-xl logo-text">CraftedBy</p>
        </div>
        <p>Lorem ipsum dolor sit amet conse bolli tetur conjo</p>

<!--        <RouterLink :to="newUserCheck" class="btn btn-ghost btn-circle">-->
        <RouterLink to="/new-business" class="btn btn-ghost btn-circle">
          <button class="btn btn-outline mt-2">DEVENIR VENDEUR ARTISAN →</button>
        </RouterLink>

      </div>
      <div class="grid grid-cols-2 gap-8 mt-8 hidden md:grid">
        <div>
          <h3 class="font-bold uppercase mb-4">A propos</h3>
          <ul>
            <li>Notre histoire</li>
            <li>Notre équipe</li>
            <li>Carrières</li>
          </ul>
        </div>
        <div>
          <h3 class="font-bold uppercase mb-4">Services</h3>
          <ul>
            <li>Personnalisation</li>
            <li>Support 24/7</li>
            <li>Livraison internationale</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- About and Services -->
    <div class="grid grid-cols-2 gap-8 mt-8 md:hidden">
      <div>
        <h3 class="font-bold uppercase mb-4">A propos</h3>
        <ul>
          <li>Notre histoire</li>
          <li>Notre équipe</li>
          <li>Carrières</li>
        </ul>
      </div>
      <div>
        <h3 class="font-bold uppercase mb-4">Services</h3>
        <ul>
          <li>Personnalisation</li>
          <li>Support 24/7</li>
          <li>Livraison internationale</li>
        </ul>
      </div>
    </div>

    <!-- Copyright Text - -->
    <p class="mt-8 md:mt-2">© 2024 CraftedBy Inc. Tous droits réservés.</p>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useUserStore } from '@/stores/user.js'

// const userStore = useUserStore();

// const newUserCheck = computed(() => {
//   return userStore.userObject ? '/new-business' : '/login';
// });

</script>

<style scoped>
img {
  max-width: 43px;
}

.footer ul {
  padding: 0;
  list-style-type: none;
}

.footer li {
  margin-bottom: 0.5rem;
}

.btn-outline {
  border: 1px solid #fff;
  color: #fff;
}

.btn-outline:hover {
  background-color: #1a1a1a;
}
.logo-text {
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.btn-outline {
  border: 1px solid white;
  border-radius: 0;
  font-family: 'open-sans-regular', sans-serif;
  font-size: 0.875rem;
}
</style>
