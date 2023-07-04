<template>
  <section class="catalog">
    <ProductItem :products="products" />
  </section>
</template>
<script>
import ProductItem from './ProductItem.vue';

export default {
  components: { ProductItem },
  props: ['products'],
};
</script>
