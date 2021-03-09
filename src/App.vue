<script>

import MainFooter from '@/components/layout/MainFooter.vue';
import MainCacheWrapper from '@/components/layout/MainCacheWrapper.vue';
import MainToolbar from '@/components/layout/MainToolbar.vue';
import MainDrawer from '@/components/layout/MainDrawer.vue';

export default {
  name: 'App',
  components: {
    MainFooter,
    MainToolbar,
    MainCacheWrapper,
    MainDrawer
  },
  data: () => ({
    isLoading: false
  })
};
</script>

<template>
  <v-app>
    <v-main>
      <MainDrawer />
      <MainToolbar />
      <MainCacheWrapper />
      <MainFooter />
    </v-main>
  </v-app>
</template>

<style lang="scss">
  .v-application {
    background: var(--v-foreground-base) !important;
  }
</style>
