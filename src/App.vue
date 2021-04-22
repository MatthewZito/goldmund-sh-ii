<script>
import MainCacheWrapper from '@/components/layout/MainCacheWrapper.vue';
import MainToolbar from '@/components/layout/MainToolbar.vue';
import MainDrawer from '@/components/layout/MainDrawer.vue';

export default {
  name: 'App',
  components: {
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
  <q-layout view="lHh Lpr lFf">
    <MainDrawer v-if="$route.name !== 'NotFound'" />
    <MainToolbar v-if="$route.name !== 'NotFound'" />
    <MainCacheWrapper />
  </q-layout>
</template>

<style lang="scss">
</style>
