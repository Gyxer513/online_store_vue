<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img
        :src="item.product.product.image.file.url"
        width="120"
        height="120"
        alt="item.product.name"
      />
    </div>
    <h3 class="product__title">{{ item.product.product.title }}</h3>
    <span class="product__code"> {{ item.product.product.id }} </span>

    <div class="product__counter form__counter">
      <button type="button" aria-label="Убрать один товар" @click="decrement">
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-minus"></use>
        </svg>
      </button>

      <input type="text" v-model.number="amount" name="count" />

      <button
        type="button"
        aria-label="Добавить один товар"
        @click="increment"
      >
        <svg width="10" height="10" fill="currentColor">
          <use xlink:href="#icon-plus"></use>
        </svg>
      </button>
    </div>

    <b class="product__price"> {{ (item.amount * item.product.price) | numberFormat }} ₽</b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>

<script>
import numberFormat from '@/helpers/numberFormat';
import { mapActions } from 'vuex';

export default {
  filters: {
    numberFormat,
  },
  props: ['item'],
  computed: {
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        return this.$store.dispatch('updateCartProductAmount', {
          productId: this.item.productId,
          amount: value,
        });
      },
    },
  },
  methods: {
    ...mapActions(['deleteCartProduct']),
    increment() {
      this.$emit('update:amount', (this.amount += 1));
    },
    decrement() {
      this.$emit('update:amount', (this.amount -= 1));
    },
    deleteProduct() {
      this.deleteCartProduct(
        this.item.productId,
      ).catch((error) => console.warn(error.message));
    },
  },
};
</script>
