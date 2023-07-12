import BaseFormFild from '@/components/BaseFormFild.vue';

export default {
  props: ['title', 'error', 'placeholder', 'value'],
  components: { BaseFormFild },
  computed: {
    dataValue: {
      get() {
        return this.value;
      },
      set(value) {
        return this.$emit('input', value);
      },
    },
  },
};
