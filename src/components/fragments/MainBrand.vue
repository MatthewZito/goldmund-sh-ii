<script setup>
import {
  ref,
  computed,
  watch
} from 'vue';

import { useRoute } from 'vue-router';

/* Est */
const route = useRoute();
const routeLabel = ref('pwd');

/* Computed */
const showDesc = computed(() => {
  if (route.name === 'Landing') return '';
  // return 'visibility:hidden;';
  return 'display:none;';
});

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
.site-header.hidden-mob
  router-link.site-brand(to="/")
    div.site-images
      img.img-responsive.site-image(
        src="@/assets/images/crescent.svg"
        alt="site logo"
      )
      img.img-responsive.site-image(
        src="@/assets/images/lisp.svg"
        alt="site logo"
      )
      img.img-responsive.site-image(
        src="@/assets/images/geo.svg"
        alt="site logo"
      )
    p.site-route-label $ {{ routeLabel }}
  p(:style="showDesc")
    | :: computing -> art -> cogitations
</template>

<style lang="scss" scoped>
.site-images {
  display:flex;
  justify-content: flex-start;
}
.site-header {
  margin-bottom: 30px;
  overflow: hidden;

  & > p {
    color: #555;
  }
}

.site-route-label {
  margin-top: 2.5rem;
}

.site-brand,
.site-image {
  margin-bottom: 6px;
  padding-right: 2.25rem;
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
  .site-images {
    display: none;
  }
}
</style>
