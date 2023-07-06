import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      {
        productId: 1,
        amount: 0,
      },
    ],
  },
  mutations: {
    addProductToCart(state, { productId, amount }) {
      const cartItem = state.cartProducts.find((item) => item.productId === productId);
      if (cartItem) {
        cartItem.amount += amount;
      } else {
        state.cartProducts.push({
          productId,
          amount,
        });
      }
    },
  },
});
