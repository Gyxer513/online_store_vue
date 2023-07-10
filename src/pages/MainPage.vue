<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info"> {{ countProducts }} товара </span>
    </div>
    <div class="content__catalog">
      <ProductFilter
        :price-from.sync="filterPriceForm"
        :price-to.sync="filterPriceTo"
        :category-id.sync="filterCategoryId"
        :item-color.sync="itemColor"
      />
      <section class="catalog">
        <div v-if="productsLoading">Загрузка товаров...</div>
        <div v-if="productsLoadingFaled">Произошла ошибка
          <button @click.prevent = 'loadProducts'>
            Перезагрузить страницу
          </button>
          </div>
        <ProductList :products="products" />
        <BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage" />
      </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/ProductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';
import BASE_URL from '@/data/utils';

export default {
  components: {
    ProductList,
    BasePagination,
    ProductFilter,
  },
  data() {
    return {
      filterPriceForm: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      itemColor: '',

      page: 1,
      productsPerPage: 6,
      productsData: null,
      productsLoading: false,
      productdLoadingFaled: false,
    };
  },
  computed: {
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
          colors: product.colors,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios
          .get(`${BASE_URL}/api/products`, {
            params: {
              page: this.page,
              limit: this.productsPerPage,
              categoryId: this.filterCategoryId,
              minPrice: this.filterPriceForm,
              maxPrice: this.filterPriceTo,
              colorId: this.itemColor,
            },
          })
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => { this.productdLoadingFaled = true; })
          .then(() => {
            this.productsLoading = false;
          });
      }, 0);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceForm() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    itemColor() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
