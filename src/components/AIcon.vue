<template>
  <svg
    :class="['a-icon', { 'a-spin': spin }]"
    aria-hidden="true"
    :width="realSize"
    :height="realSize"
  >
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script>
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
  name: 'AIcon',

  props: {
    color: {
      type: String,
      default: 'currentColor',
    },
    name: {
      type: String,
    },
    size: {
      type: String,
    },
    spin: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    symbolId() {
      return `#icon-${this.name}`;
    },
    realSize() {
      return sizeMap[this.name] || '1.25rem';
    },
  },
};
</script>
