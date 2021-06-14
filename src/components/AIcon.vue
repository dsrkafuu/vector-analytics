<template>
  <svg
    v-if="validIcon"
    :class="['a-icon', { 'a-spin': spin }]"
    aria-hidden="true"
    :width="iconSize"
    :height="iconSize"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script>
import { computed, toRefs } from 'vue';

// icon default size map
const sizeMap = {
  adjust: '1.125em',
  check: '1.25em',
  'chevron-down': '1.125em',
  'chevron-up': '1.125em',
  circle: '1.125em',
  code: '1.25em',
  edit: '1.25em',
  exclamation: '1.125em',
  plus: '1.25em',
  'sign-out': '1.125em',
  times: '1.35em',
  trash: '1.125em',
};

export default {
  // [vue 3 migration finished]
  compatConfig: { MODE: 3 },

  name: 'AIcon',

  props: {
    color: {
      type: String,
      default: 'currentColor',
    },
    name: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    spin: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { name, size } = toRefs(props);

    const validIcon = computed(() => name.value && sizeMap[name.value]);

    const symbolId = computed(() => `#icon-${name.value}`);

    const iconSize = computed(() => (size.value ? size.value : sizeMap[name.value]));

    return {
      validIcon,
      symbolId,
      iconSize,
    };
  },
};
</script>
