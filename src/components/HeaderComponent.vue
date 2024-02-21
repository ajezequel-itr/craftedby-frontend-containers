<template>
  <div class="navbar bg-accent">
    <!-- Burger menu button for mobile  -->
    <div class="navbar-start">
      <div class="dropdown">
        <button class="btn btn-ghost lg:hidden">
          <img src="../assets/icons/menu.svg" alt="Menu Icon">
        </button>
        <div class="hidden lg:flex">
          <img alt="Vue logo" class="logo" src="@/assets/CB_logo.svg" width="43" height="43" />
          <a class="btn btn-ghost normal-case text-xl logo-text">CraftedBy</a></div>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <!-- Menu items -->
          <li><RouterLink  to="/">Accueil</RouterLink></li>
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
<!--      <button class="btn btn-ghost btn-circle" >-->
<!--          <img src="../assets/icons/avatar.svg" alt="Avatar Icon">-->
<!--      </button>-->
      <RouterLink class="btn btn-ghost btn-circle" to="/profile"><img src="../assets/icons/avatar.svg" alt="Avatar Icon" ></RouterLink>

      <div>
        <button @click.stop="toggleCartDropdown" class="btn btn-ghost btn-circle relative">
          <img src="../assets/icons/shopping_cart.svg" alt="Cart Icon">
          <span v-if="itemCount > 0" class="indicator">{{ itemCount }}</span>
        </button>
        <div v-if="showCartDropdown" ref="dropdownRef" class="cart-dropdown">
          <CartContentComponent/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useCartStore } from '@/stores/cart';
import { computed, onMounted, onUnmounted, ref } from 'vue'
import CartContentComponent from '@/components/CartContentComponent.vue'
const itemCount = computed(() => useCartStore().items.length);
const showCartDropdown = ref(false);
const dropdownRef = ref(null);

function toggleCartDropdown() {
  showCartDropdown.value = !showCartDropdown.value;
}

// Click outside to close
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showCartDropdown.value = false;
  }
}
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

</script>


<style scoped>

.cart-dropdown {
  position: absolute;
  right: 0;
  z-index: 100;
  width: 300px;
  max-height: 400px;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 4px;
  overflow-y: auto;
}

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
