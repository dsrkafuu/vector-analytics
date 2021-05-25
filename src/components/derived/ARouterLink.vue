<template>
  <router-link v-slot="{ href, navigate, isActive }" :to="to" custom>
    <AButton
      :type="type"
      :href="href"
      :class="['a-router', { 'a-router-active': isActive }]"
      @click="navigate"
    >
      <slot></slot>
    </AButton>
  </router-link>
</template>

<script>
export default {
  name: 'ARouterLink',

  props: {
    to: { type: [String, Object], default: '/' },
    type: { type: String, default: '' },
  },
};
</script>

<style lang="scss">
.a-router-active {
  color: var(--color-primary);
}
</style>
