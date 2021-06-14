<template>
  <div v-if="loading || nodata" class="a-loading">
    <template v-if="loading">
      <AIcon name="circle" :spin="loading" />
      <span>Loading</span>
    </template>
    <template v-else>
      <AIcon name="exclamation" />
      <span>No Data</span>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ALoading',

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    nodata: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
.a-loading {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $space-xs;
  font-size: $font-size-sm;
  z-index: 5;
  background-color: var(--color-bg);
  min-width: 6rem;
}
</style>
