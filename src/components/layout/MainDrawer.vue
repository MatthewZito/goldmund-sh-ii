<script setup>
/* Components */
import MainFooter from './MainFooter.vue';
import MainBrand from './fragments/MainBrand.vue';

/* Data */
const navConfig = [
  { path: '/', label: 'Vestibule' },
  { path: '/info', label: 'Info' },
  { path: '/communications', label: 'Comm' }
];

</script>

<template lang="pug">
.navigator
  nav.navigator__drawer
    MainBrand
    ul.navigator-main
      li(
        v-for="({ path, label: title }, idx) in navConfig"
        :key="idx"
      )
        router-link(:to="path")
          | {{ title }}
    MainFooter
</template>

<style lang="scss" scoped>
.router-link-exact-active {
  font-weight: 700;
}

@media (max-width: $mobile-and-tablet - 1) {
  .router-link-exact-active,
  .router-link-exact-active:focus,
  .router-link-exact-active:hover,
  .router-link-exact-active:active {
    // TODO a/b this
    border-bottom: 4px $main-accent-color solid;
    border-bottom: 4px solid;
    border-image: linear-gradient(to right, $main-secondary-color, $main-accent-color) 1;
  }
}
</style>
