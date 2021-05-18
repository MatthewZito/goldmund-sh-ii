<script setup>
import {
  ref,
  computed,
  watch
} from 'vue';
import { useRoute } from 'vue-router';

/* Components */
import Svg from '@/components/fragments/Svg.vue';

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
      Svg.site-image(name="crescent")
      Svg.site-image(name="lisp")
      Svg.site-image(name="geo")
    p.site-route-label $ {{ routeLabel }}
  p(:style="showDesc")
    | :: computing -> art -> cogitations
</template>

<style lang="scss" scoped>
.site-images {
  display: flex;
  justify-content: flex-start;
}

.site-header {
  overflow: hidden;
  margin-bottom: 30px;

  & > p {
    color: #555;
  }
}

.site-route-label {
  margin-top: 2.5rem;
}

.site-brand,
.site-image {
  padding-right: 1.25rem;
  margin-bottom: 6px;
}

.site-brand {
  display: block;
  color: #000;
  font-family: Cabin, Helvetica, Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: 700;

  &:hover {
    color: $main-accent-active;
    text-decoration: none;
  }
}

@media (max-width: $mobile-and-tablet - 1) {
  .site-header,
  .site-images {
    display: none;
  }
}
</style>
