<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';

/* Components */
import MainCacheWrapper from '@/components/layout/MainCacheWrapper.vue';
import MainDrawer from '@/components/layout/MainDrawer.vue';
import NotificationDispatch from '@/components/notification/Dispatch.vue';

/* Est */
const route = useRoute();

useHead({
  title: 'goldmund.sh',
  meta: [
    {
      name: `description`,
      content: computed(() => route.meta.desc),
    }
  ]
});
</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
div
  NotificationDispatch(namespace="notifications")
  MainDrawer
  main
    MainCacheWrapper
</template>

<style lang="scss">
// must exist for injection of root stylesheet
</style>

