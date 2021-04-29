<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useHead } from '@vueuse/head';

/* Components */
import MainCacheWrapper from '@/components/layout/MainCacheWrapper.vue';
import MainDrawer from '@/components/layout/MainDrawer.vue';

/* Est */
const route = useRoute();

useHead({
  title: 'goldmund.sh',
  meta: [
    {
      name: `description`,
      content: computed(() => route.meta.desc),
    }
  ]
});

</script>

<template lang="pug">
<!-- /* eslint-disable */ -->
div
  MainDrawer
  main
    MainCacheWrapper
</template>

<style lang="scss">
@import './styles/index.css';

.row {
  margin-left: -15px;
  margin-right: -15px;
}

.row:after,
.row:before {
  content: " ";
  display: table;
}

.row:after {
  clear: both;
}

.btn:focus,
.btn:focus:active {
  outline: none;
}

.container-section__spacer {
  margin-bottom: 30px;
}

</style>

