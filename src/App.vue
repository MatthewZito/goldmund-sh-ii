<script>

import MainFooter from '@/components/layout/MainFooter.vue';
import MainCacheWrapper from '@/components/layout/MainCacheWrapper.vue';
import MainToolbar from '@/components/layout/MainToolbar.vue';

export default {
  name: 'App',
  components: {
    MainFooter,
    MainToolbar,
    MainCacheWrapper
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
