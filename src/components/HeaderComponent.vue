<template>
  <div class="navbar bg-accent">
    <!-- Burger menu button -->
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
        </label>
        <div class="hidden lg:flex">
          <img alt="Vue logo" class="logo" src="@/assets/CB_logo.svg" width="43" height="43" />
          <a class="btn btn-ghost normal-case text-xl logo-text">CraftedBy</a></div>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <!-- Menu items -->
          <li><RouterLink to="/">Accueil</RouterLink></li>
          <li><Router-link to="/boutique">Boutique</Router-link></li>
          <li><RouterLink to="/about">A propos</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
        </ul>
      </div>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal p-0">
        <!-- Menu items for desktop -->
        <li><RouterLink to="/">Accueil</RouterLink></li>
        <li><Router-link to="/boutique">Boutique</Router-link></li>
        <li><RouterLink to="/about">A propos</RouterLink></li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>
      </ul>
    </div>

    <!-- Profile and Cart buttons -->
    <div class="navbar-end">
      <button class="btn btn-ghost btn-circle">
          <img src="../assets/icons/avatar.svg" alt="Avatar Icon">
      </button>
<!--      <RouterLink to="/cart">-->
<!--        <button class="btn btn-ghost btn-circle">-->
<!--          <img src="../assets/icons/shopping_cart.svg" alt="Cart Icon">-->
<!--        </button>-->
<!--      </RouterLink>-->
      <RouterLink to="/cart">
        <button class="btn btn-ghost btn-circle relative">
          <img src="../assets/icons/shopping_cart.svg" alt="Cart Icon">
          <!-- Conditionally rendered indicator -->
          <span v-if="itemCount > 0" class="indicator">
      {{ itemCount }}
    </span>
        </button>
      </RouterLink>


    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { computed } from 'vue'

const cart = useCartStore();
const itemCount = computed(() => cart.itemCount);

</script>

<style scoped>
@media (min-width: 1024px) {
  .navbar {
    min-height: 70px;
  }
  .navbar-start {
    margin-left: 10%;
  }
  .navbar-end {
    margin-right: 10%;
  }
}
.logo-text {
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
}

.indicator {
  position: absolute;
  top: -2px;
  right: -2px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75rem;
}
</style>
