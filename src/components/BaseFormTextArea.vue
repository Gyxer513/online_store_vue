<template>
  <BaseFormFild :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      v-model="dataValue"
      :type="type"
      name="name"
      :placeholder="placeholder"
    ></textarea>
  </BaseFormFild>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: ['type'],
  mixins: [formFieldMixin],
};
</script>
