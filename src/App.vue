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

import HttpClient from 'http-factory';
const client = new HttpClient().setBaseUrl('https://jsonplaceholder.typicode.com')

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
  mounted () {
    client.get({ url: 'todos/1' }, ({ data }) => console.log(data));
  }
};
</script>

<style lang="scss">
 .v-application {
    font-family: 'Open Sans'; // fallback; Google-Sans will be loaded by default
    background: var(--v-blue6-base) !important;
  }
</style>
