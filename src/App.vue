<template>
  <main>
    <MainPage v-if="currentPage === 'main'" />
    <ProductPage v-if="currentPage === 'product'" />
  </main>
</template>

<script>
import MainPage from './pages/MainPage.vue';
import ProductPage from './pages/ProductPage.vue';

export default {
  data() {
    return {
      currentPage: 'main',
    };
  },
  components: {
    MainPage,
    ProductPage,
  },
};
</script>
