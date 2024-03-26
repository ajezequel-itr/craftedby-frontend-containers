<template>
  <div class="navbar sticky top-0 z-50 bg-accent md:min-h-[50px]">
    <!-- Burger menu button for mobile screens only -->
    <div class="navbar-start" style="margin-left: 5%;">
      <div class="dropdown">
        <button @click="toggleMenuDropdown" class="btn btn-ghost md:hidden">
          <img src="../assets/icons/menu.svg" alt="Menu Icon">
        </button>
        <div class="hidden md:flex">
          <img alt="Vue logo" class="h-10 w-10" src="@/assets/CB_logo.svg" />
          <a class="btn btn-ghost normal-case text-xl logo-text">CraftedBy</a>
        </div>
        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 md:hidden">
          <!-- Menu items -->
          <li><RouterLink to="/">Accueil</RouterLink></li>
          <li><Router-link to="/boutique">Boutique</Router-link></li>
          <li><RouterLink to="/about">A propos</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
        </ul>
      </div>
    </div>

    <div class="navbar-center hidden md:flex">
      <ul class="menu menu-horizontal p-0">
        <!-- Menu items for desktop -->
        <li><RouterLink to="/">Accueil</RouterLink></li>
        <li><Router-link to="/boutique">Boutique</Router-link></li>
        <li><RouterLink to="/about">A propos</RouterLink></li>
        <li><RouterLink to="/contact">Contact</RouterLink></li>
      </ul>
    </div>

    <!-- Profile and Cart buttons -->
    <div class="navbar-end" style="margin-right: 5%;">
      <RouterLink :to="newUserCheck" class="btn btn-ghost btn-circle">
        <img src="../assets/icons/avatar.svg" alt="Icon profile">
      </RouterLink>
      <div class="relative">
        <button @click.stop="toggleCartDropdown" class="btn btn-ghost btn-circle">
          <img src="../assets/icons/shopping_cart.svg" alt="Cart Icon">
          <span v-if="itemCount > 0" class="indicator bg-red-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs absolute top-1.5 right-1.5">{{ itemCount }}</span>
        </button>
        <div v-if="showCartDropdown" ref="dropdownRef" class="cart-dropdown absolute right-0 z-50 w-72 max-h-96 bg-white shadow-md overflow-y-auto">
          <CartContentComponent/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart';
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref, watch } from 'vue'
import CartContentComponent from '@/components/CartContentComponent.vue'

const itemCount = computed(() => useCartStore().items.length);
const showCartDropdown = ref(false);
const dropdownRef = ref(null);

const showMenuDropdown = ref(false);
const menuDropdownRef = ref(null);

const userStore = useUserStore();

const newUserCheck = computed(() => {
  return userStore.userObject ? '/profile' : '/login';
});

function toggleMenuDropdown() {
  showMenuDropdown.value = !showMenuDropdown.value;
}
  // Click outside menu to close
  function handleClickOutsideMenu(event) {
    if (menuDropdownRef.value && !menuDropdownRef.value.contains(event.target)) {
      showMenuDropdown.value = false;
    }
}

const route = useRoute();

watch(route, () => {
  showMenuDropdown.value = false;
  showCartDropdown.value = false;
});

  function toggleCartDropdown() {
    showCartDropdown.value = !showCartDropdown.value;
  }
// Click outside cart to close
function handleClickOutside(event) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    showCartDropdown.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  document.addEventListener('click', handleClickOutsideMenu);
});

</script>