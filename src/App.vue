<script>
import MainCacheWrapper from '@/components/layout/MainCacheWrapper.vue';
import MainDrawer from '@/components/layout/MainDrawer.vue';

export default {
  name: 'App',
  components: {
    MainCacheWrapper,
    MainDrawer
  },
  data: () => ({
    isLoading: false
  })
};
</script>

<template>
<div>
  <MainDrawer />
  <main id="main-collapse">
    <MainCacheWrapper />
  </main>
</div>

</template>

<style lang="scss">
@import './styles/main.min.css';
</style>
