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
  <MainDrawer v-if="$route.name !== 'NotFound'" />
  <main id="main-collapse">
    <div class="hero-full-wrapper">
      <div class="grid" >
        <div class="gutter-sizer" />
        <div class="grid-sizer" />
        <MainCacheWrapper />
      </div>
    </div>
  </main>
</div>

</template>

<style lang="scss">
@import './styles/main.min.css';
</style>
