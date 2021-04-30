<script setup>
import { ref, computed, watch } from 'vue';

import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

/* Components */
import MainFooter from './MainFooter.vue';

/* Est */
const route = useRoute();
const store = useStore();

/* Data */
const navConfig = [
  { path: '/', label: 'Vestibule' },
  { path: '/info', label: 'Info' },
  { path: '/communications', label: 'Comm' }
];

const routeLabel = ref('pwd');

/* Computed */
const isNavDrawerClosed = computed(() => store.getters['config/isNavDrawerClosed']);

/* Methods */
const toggleNavDrawer = _ => store.dispatch('config/toggleNavDrawer');

function setRouteLabel () {
  return function (to, from) {
    if (to !== from) {
      routeLabel.value = route.meta.label;
    }
  };
}

/* Watchers */
watch(() => route.name, setRouteLabel);

</script>

<template lang="pug">
div
  .navbar.navbar-default.visible-xs
    button.navbar-toggle.collapsed(
      aria-label="toggle menu"
      type="button"
      @click="toggleNavDrawer"
    )
      span.sr-only Toggle navigation
      span.icon-bar(
        v-for="idx of [0,1,2]"
        :key="idx"
      )
    a.navbar-brand ./goldmund.sh
  div
    nav(:class="`sidebar ${isNavDrawerClosed || 'open'}`")
      #navbar-collapse.navbar-collapse
        .site-header.hidden-xs
          router-link.site-brand(to="/")
            img.img-responsive.site-logo(alt="site logo" src="@/assets/images/main-logo.svg")
            | $ {{ routeLabel }}
          //- TODO retain box-sizing, hide text
          p(
            v-if="route.name === 'Landing'"
            style="color:#555;"
          )
            | An archive of musings
        ul.nav
          li(
            v-for="({ path, label: title }, idx) in navConfig"
            :key="idx"
          )
            router-link(:to="path")
              | {{ title }}
        MainFooter
</template>

<style scoped>
.router-link-exact-active {
  font-weight: 700;
}
</style>
