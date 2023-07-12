<template>
  <BaseFormFild :title="title" :error="error">
    <input
      class="form__input"
      v-model="dataValue"
      type="text"
      name="type"
      :placeholder="placeholder"
    />
  </BaseFormFild>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  props: ['type'],
  mixins: [formFieldMixin],
};
</script>
