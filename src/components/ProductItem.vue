<template>
  <ul class="catalog__list">
    <li class="catalog__item" v-for="product in products" :key="product.id">
      <router-link class="catalog__pic" :to="{ name: 'product', params: { id: product.id } }">
        <img :src="product.image" :alt="product.title" />
      </router-link>
      <h3 class="catalog__title">
        <router-link :to="{ name: 'product', params: { id: product.id } }">
          {{ product.title }}
        </router-link>
      </h3>
      <span class="catalog__price"> {{ product.price | numberFormat }} ₽. </span>
      <ul class="colors colors--black">
        <li class="colors__item" v-for="color in product.colors" :key="color.code">
          <label class="colors__label">
            <input class="colors__radio sr-only" type="radio" />
            <span class="colors__value" :style="{ 'background-color': color.code }"></span>
          </label>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  data() {
    return {
      color: '#73B6EA',
    };
  },
  filters: {
    numberFormat,
  },
  props: ['products'],
};
</script>
