/* eslint-disable jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
<template>
  <div class="content__catalog">
    <aside class="filter">
      <h2 class="filter__title">Фильтры</h2>

      <form class="filter__form form" action="#" method="get" @submit.prevent="submit">
        <fieldset class="form__block">
          <legend class="form__legend">Цена</legend>
          <label class="form__label form__label--price">
            <input class="form__input" type="text" name="min-price" v-model.number="currentPriceForm" />
            <span class="form__value">От</span>
          </label>
          <label class="form__label form__label--price">
            <input class="form__input" type="text" name="max-price" v-model.number="currentPriceTo" />
            <span class="form__value">До</span>
          </label>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Категория</legend>
          <label class="form__label form__label--select">
            <select class="form__select" type="text" name="category" v-model.number="currentCategoryId">
              <option value="0">Все категории</option>
              <option :value="category.id" v-for="category in categories" :key="category.id">
                {{ category.name }}
              </option>
            </select>
          </label>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Цвет</legend>
          <ul class="colors">
            <li class="colors__item" v-for="color in colors" :key="color">
              <label class="colors__label">
                <input class="colors__radio sr-only" type="radio" name="color" :value=color v-model="currentItemColor" />
                <span class="colors__value" :style="{'background-color': color}"> </span>
              </label>
            </li>
          </ul>
        </fieldset>

        <fieldset class="form__block">
          <legend class="form__legend">Объемб в ГБ</legend>
          <ul class="check-list">
            <li class="check-list__item">
              <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="volume" value="8" />
                <span class="check-list__desc">
                  8
                  <span>(313)</span>
                </span>
              </label>
            </li>
            <li class="check-list__item">
              <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="volume" value="16" />
                <span class="check-list__desc">
                  16
                  <span>(461)</span>
                </span>
              </label>
            </li>
            <li class="check-list__item">
              <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="volume" value="32" />
                <span class="check-list__desc">
                  32
                  <span>(313)</span>
                </span>
              </label>
            </li>
            <li class="check-list__item">
              <label class="check-list__label">
                <input class="check-list__check sr-only" type="checkbox" name="volume" value="64" />
                <span class="check-list__desc">
                  64
                  <span>(313)</span>
                </span>
              </label>
            </li>
            <li class="check-list__item">
              <label class="check-list__label">
                <input
                  class="check-list__check sr-only"
                  type="checkbox"
                  name="volume"
                  value="128"
                />
                <span class="check-list__desc">
                  128
                  <span>(313)</span>
                </span>
              </label>
            </li>
            <li class="check-list__item">
              <label class="check-list__label">
                <input
                  class="check-list__check sr-only"
                  type="checkbox"
                  name="volume"
                  value="264"
                />
                <span class="check-list__desc">
                  264
                  <span>(313)</span>
                </span>
              </label>
            </li>
          </ul>
        </fieldset>

        <button class="filter__submit button button--primery" type="submit">Применить</button>
        <button class="filter__reset button button--second" type="button" @click.prevent="reset">Сбросить</button>
      </form>
    </aside>
  </div>
</template>

<script>
import categories from '@/data/categories';
import colors from '@/data/colors';

export default {
  data() {
    return {
      currentPriceForm: 0,
      currentPriceTo: 0,
      currentCategoryId: 0,
      currentItemColor: '',
    };
  },
  props: ['categoryId', 'priceFrom', 'priceTo', 'itemColor'],
  computed: {

    categories() {
      return categories;
    },
    colors() {
      return colors;
    },
  },
  watch: {
    priceFrom(value) {
      this.currentPriceForm = value;
    },
    priceTo(value) {
      this.currentPriceTo = value;
    },
    categoryId(value) {
      this.currentCategoryId = value;
    },
    itemColor(value) {
      this.currentItemColor = value;
    },
  },
  methods: {
    submit() {
      this.$emit('update:priceFrom', this.currentPriceForm);
      this.$emit('update:priceTo', this.currentPriceTo);
      this.$emit('update:categoryId', this.currentCategoryId);
      this.$emit('update:itemColor', this.currentItemColor);
    },
    reset() {
      this.$emit('update:priceFrom', 0);
      this.$emit('update:priceTo', 0);
      this.$emit('update:categiryId', 0);
      this.$emit('update:itemColor', '');
    },
  },
};
</script>
