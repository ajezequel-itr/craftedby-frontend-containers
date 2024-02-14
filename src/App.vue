<!--<script setup>-->
<!--import { RouterLink, RouterView } from 'vue-router'-->
<!--import HelloWorld from './components/HelloWorld.vue'-->
<!--</script>-->

<!--&lt;!&ndash;<template>&ndash;&gt;-->
<!--&lt;!&ndash;  <header>&ndash;&gt;-->
<!--&lt;!&ndash;    <img alt="Vue logo" class="logo" src="@/assets/CB_logo.svg" width="125" height="125" />&ndash;&gt;-->

<!--&lt;!&ndash;    <div class="wrapper">&ndash;&gt;-->
<!--&lt;!&ndash;      <HelloWorld msg="You did it!" />&ndash;&gt;-->

<!--&lt;!&ndash;      <nav>&ndash;&gt;-->
<!--&lt;!&ndash;        <RouterLink to="/">Home</RouterLink>&ndash;&gt;-->
<!--&lt;!&ndash;        <RouterLink to="/about">About</RouterLink>&ndash;&gt;-->
<!--&lt;!&ndash;      </nav>&ndash;&gt;-->
<!--&lt;!&ndash;      <button class="btn">Hello World</button>&ndash;&gt;-->
<!--&lt;!&ndash;    </div>&ndash;&gt;-->
<!--&lt;!&ndash;  </header>&ndash;&gt;-->

<!--&lt;!&ndash;  <RouterView />&ndash;&gt;-->
<!--&lt;!&ndash;</template>&ndash;&gt;-->






<!--<style scoped>-->
<!--header {-->
<!--  line-height: 1.5;-->
<!--  max-height: 100vh;-->
<!--}-->

<!--.logo {-->
<!--  display: block;-->
<!--  margin: 0 auto 2rem;-->
<!--}-->

<!--nav {-->
<!--  width: 100%;-->
<!--  font-size: 12px;-->
<!--  text-align: center;-->
<!--  margin-top: 2rem;-->
<!--}-->

<!--nav a.router-link-exact-active {-->
<!--  color: var(&#45;&#45;color-text);-->
<!--}-->

<!--nav a.router-link-exact-active:hover {-->
<!--  background-color: transparent;-->
<!--}-->

<!--nav a {-->
<!--  display: inline-block;-->
<!--  padding: 0 1rem;-->
<!--  border-left: 1px solid var(&#45;&#45;color-border);-->
<!--}-->

<!--nav a:first-of-type {-->
<!--  border: 0;-->
<!--}-->

<!--@media (min-width: 1024px) {-->
<!--  header {-->
<!--    display: flex;-->
<!--    place-items: center;-->
<!--    padding-right: calc(var(&#45;&#45;section-gap) / 2);-->
<!--  }-->

<!--  .logo {-->
<!--    margin: 0 2rem 0 0;-->
<!--  }-->

<!--  header .wrapper {-->
<!--    display: flex;-->
<!--    place-items: flex-start;-->
<!--    flex-wrap: wrap;-->
<!--  }-->

<!--  nav {-->
<!--    text-align: left;-->
<!--    margin-left: -1rem;-->
<!--    font-size: 1rem;-->

<!--    padding: 1rem 0;-->
<!--    margin-top: 1rem;-->
<!--  }-->
<!--}-->
<!--</style>-->

<template>
  <div>
    <h1>Product List</h1>
    <div v-if="products.length">
      <div v-for="product in products" :key="product.id" class="product">
        <h2>{{ product.name }}</h2>
        <img :src="product.image_path" alt="Product Image" class="product-image">
        <p>Price: {{ product.price }}</p>
        <p>Material: {{ product.material }}</p>
        <p>Color: {{ product.color }}</p>
        <p>Stock: {{ product.stock }}</p>
        <div>
          <h3>Categories</h3>
          <ul>
            <li v-for="category in product.categories" :key="category.id">{{ category.name }}</li>
          </ul>
        </div>
        <div>
          <h3>Business</h3>
          <p>Name: {{ product.business.name }}</p>
          <p>Website: {{ product.business.website }}</p>
        </div>
        <div>
          <h3>Reviews</h3>
          <ul>
            <li v-for="review in product.review" :key="review.id">{{ review.comment }} - {{ review.rating }} stars</li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No products found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const products = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/products/');
    products.value = response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }
});
</script>

<style>
.product {
  border: 1px solid #eee;
  padding: 20px;
  margin-bottom: 20px;
}

.product-image {
  max-width: 100px;
  max-height: 100px;
}
</style>
