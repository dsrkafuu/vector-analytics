<template>
  <div :class="classes">
    <input
      v-bind="$attrs"
      :value="modelValue"
      :type="domType"
      autocomplete="on"
      autofocus="off"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { toRefs, ref, computed } from 'vue';

export default {
  compatConfig: {
    MODE: 3,
  },

  name: 'AInput',

  props: {
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
    validator: {
      type: Function,
      default: () => true,
    },
  },

  emits: ['update:modelValue'],

  setup(props, ctx) {
    const { modelValue, type, validator } = toRefs(props);

    // whether input focused
    const focused = ref(false);

    // whether input value valid
    const valid = computed(() => validator.value(modelValue.value));

    // input type
    const domType = computed(() => (type.value === 'password' ? 'password' : null));

    // custom listeners
    const listeners = {
      input: (evt) => {
        ctx.emit('update:modelValue', evt.target.value);
      },
      focus: () => (focused.value = true),
      blur: () => (focused.value = false),
    };

    // component class
    const classes = computed(() => [
      'a-input',
      {
        'a-input-error': !valid.value,
        'a-input-password': type.value === 'password',
        'a-input-focus': focused.value,
      },
    ]);

    return {
      domType,
      listeners,
      classes,
    };
  },
};
</script>

<style lang="scss">
.a-input {
  display: inline-block;
  padding: $space-xs $space-xs * 1.75;
  background-color: var(--color-wrapper);
  border-radius: $radius;
  height: $input-height;
  position: relative;

  input {
    width: $input-min-width;
    outline: none;
    border: none;
    height: $input-inner-height;
    line-height: $input-inner-height;
    font-size: $font-size-sm;
    background: transparent;
    color: var(--color-font);
  }

  &-focus {
    background-color: var(--color-hover);
  }

  &-error {
    background-color: var(--color-error) !important;
  }
}
</style>
