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

<script>

import MainFooter from '@/components/layout/MainFooter.vue';
import MainCacheWrapper from '@/components/layout/MainCacheWrapper.vue';
import MainDrawer from '@/components/layout/MainDrawer.vue';
import MainToolbar from '@/components/layout/MainToolbar.vue';

export default {
  name: 'App',
  components: {
    MainFooter,
    MainDrawer,
    MainToolbar,
    MainCacheWrapper
  },
  data: () => ({
    isLoading: false
  }),
};
</script>

<style lang="scss">
 .v-application {
    font-family: 'Open Sans'; // fallback; Google-Sans will be loaded by default
    background: var(--v-blue6-base) !important;
  }
</style>
