<script>

import MainFooter from '@/components/layout/MainFooter.vue';
import MainCacheWrapper from '@/components/layout/MainCacheWrapper.vue';
import MainToolbar from '@/components/layout/MainToolbar.vue';
import MainDrawer from '@/components/layout/MainDrawer.vue';
import NotificationDispatch from '@/components/layout/NotificationDispatch.vue';

export default {
  name: 'App',
  components: {
    MainFooter,
    MainToolbar,
    MainCacheWrapper,
    MainDrawer,
    NotificationDispatch
  },
  data: () => ({
    isLoading: false
  })
};
</script>

<template>
  <v-app>
    <v-main>
      <MainDrawer v-if="$route.name !== 'NotFound'" />
      <MainToolbar v-if="$route.name !== 'NotFound'" />
      <MainCacheWrapper />
      <MainFooter v-if="$route.name !== 'NotFound'" />
      <NotificationDispatch />
    </v-main>
  </v-app>
</template>

<style lang="scss">
  .v-application {
    background: var(--v-foreground-base) !important;
  }
</style>
