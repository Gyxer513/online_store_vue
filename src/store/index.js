import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import BASE_URL from '@/data/utils';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductsData: [],
    orderInfo: null,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cartProducts = [];
      state.cartProductsData = [];
    },
    updateCartProductAmount(state, { productId, amount }) {
      const cartItem = state.cartProducts.find((item) => item.productId === productId);
      if (cartItem) {
        cartItem.amount = amount;
      }
    },
    deleteCartProduct(state, productId) {
      state.cartProducts = state.cartProducts.filter((item) => item.productId !== productId);
    },
    updateUserAccessKey(state, key) {
      state.userAccessKey = key;
    },
    updateCartProductsData(state, items) {
      state.cartProductsData = items;
    },
    syncCartProducts(state) {
      state.cartProducts = state.cartProductsData.map((item) => ({
        productId: item.product.id,
        amount: item.quantity,
      }));
    },
  },
  getters: {
    cartDetailProducts(state) {
      return state.cartProducts.map((item) => {
        const product = state.cartProductsData.find((p) => p.product.id === item.productId);
        return {
          ...item,
          product,
        };
      });
    },
    cartTotalPrice(state, getters) {
      return getters.cartDetailProducts.reduce(
        (acc, item) => item.product.price * item.amount + acc,
        0,
      );
    },
    cartTotalAmount(state, getters) {
      return getters.cartDetailProducts.reduce((acc, item) => item.amount + acc, 0);
    },
    getOrderInfo(state) {
      return state.orderInfo;
    },
  },
  actions: {
    loadCart(context) {
      return axios
        .get(`${BASE_URL}/api/baskets`, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
        .then((response) => {
          if (!context.state.userAccessKey) {
            localStorage.setItem('userAccessKey', response.data.user.accessKey);
            context.commit('updateUserAccessKey', response.data.user.accessKey);
          }
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        })
        .catch((error) => console.warn(error.message));
    },
    addProductToCart(context, { productId, amount }) {
      return axios
        .post(
          `${BASE_URL}/api/baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: { userAccessKey: context.state.userAccessKey },
          },
        )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
        });
    },
    updateCartProductAmount(context, { productId, amount }) {
      context.commit('updateCartProductAmount', { productId, amount });
      return axios
        .put(
          `${BASE_URL}/api/baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: { userAccessKey: context.state.userAccessKey },
          },
        )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
        }).catch(() => {
          context.commit('syncCartProducts');
        });
    },
    deleteCartProduct(context, productId) {
      context.commit('deleteCartProduct', productId);
      return axios
        .delete(
          `${BASE_URL}/api/baskets/products`,
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
            data: {
              productId,
            },
          },
        );
    },
  },
});
