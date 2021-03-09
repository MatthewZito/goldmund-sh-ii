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
    class="px-3"
    :type="config.join(', ')"
  />
</template>
