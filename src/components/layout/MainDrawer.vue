<script setup>
import { ref, watch } from 'vue';

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

/* Methods */
function setRouteLabel (to, from) {
  if (to !== from) {
    routeLabel.value = route.meta.label;
  }
}

/* Watchers */
watch(() => route.name, setRouteLabel);

</script>

<template lang="pug">
div
  .navigator
    nav.navigator__drawer
      .site-header.hidden-mob
        router-link.site-brand(to="/")
          img.img-responsive.site-logo(
            alt="site logo"
            src="@/assets/images/main-logo.svg"
          )
          | $ {{ routeLabel }}
        //- TODO retain box-sizing, hide text
        p(
          v-if="route.name === 'Landing'"
          style="color:#555;"
        )
          | :: computing -> art -> ramblings
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
.site-header {
  margin-bottom: 30px;
  overflow: hidden;
}

.site-brand,
.site-logo {
  margin-bottom: 6px;
}

.site-brand {
  color: #000;
  font-family: Cabin, Helvetica, Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  display: block;

  &:hover {
    text-decoration: none;
    color: $main-accent-active;
  }
}

@media (max-width: $mobile-and-tablet - 1) {
  .site-header,
  .site-logo {
    display: none;
  }

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
