<template>
  <ul class="catalog__list">
    <li class="catalog__item" v-for="(product) in products" :key="product.id">
      <a class="catalog__pic" href="#">
        <img :src="product.image" :alt="product.title" />
      </a>
      <h3 class="catalog__title">
        <a href="#">
          {{ product.title }}
        </a>
      </h3>
      <span class="catalog__price"> {{ product.price }} ₽. </span>
      <ul class="colors colors--black">
        <li class="colors__item">
          <label class="colors__label">
            <input
              class="colors__radio sr-only"
              type="radio"
              value="#73B6EA"
              v-model:="color"
            />
            <span class="colors__value" style="background-color: #73b6ea"> </span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label">
            <input
              class="colors__radio sr-only"
              type="radio"
              value="#FFBE15"
              v-model:="color"
            />
            <span class="colors__value" style="background-color: #ffbe15"> </span>
          </label>
        </li>
        <li class="colors__item">
          <label class="colors__label">
            <input
              class="colors__radio sr-only"
              type="radio"
              value="#939393"
              v-model:="color" />
            <span class="colors__value" style="background-color: #939393"> </span
          ></label>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      color: '#73b6ea',
    };
  },
  props: ['products'],
};
</script>
