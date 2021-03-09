<script>
export default {
  name: 'BaseSkeleton',
  props: {
    config: {
      type: Array,
      required: true
    }
  }
};
</script>

<template>
  <v-skeleton-loader
    :loading="true"
    :type="config.join(', ')"
    v-bind="$attrs"
  />
</template>
