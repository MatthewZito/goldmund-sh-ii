<script setup>
import {
  ref,
  onMounted,
  watch
} from 'vue';

import Masonry from 'masonry-layout';
import { notEmpty } from 'js-heuristics';

import routes from '@/router/routes/blog.routes';
import { resolveFrontmatter } from '@/utils';

/* Components */
import BlogPostThumbnail from '@/components/blog/BlogPostThumbnail.vue';
// import ErrorBoundary from '@/components/layout/ErrorBoundary.vue';

/* Data */
let posts = ref([
  ...resolveFrontmatter(routes)
]);

let masonryCharger = ref(null);

const hasError = ref(false);

const predicate = () => {
  if (notEmpty(posts.value)) return true;
  hasError.value = true;
  return false;
};

/* Methods */
function initMasonry () {
  masonryCharger.value.layout();
}

function genMasonry () {
  masonryCharger.value = new Masonry(
    document.querySelector('.grid'), {
      columnWidth: '.grid-sizer',
      itemSelector: '.grid-item',
      gutter: '.gutter-sizer'
    });
}

/* Watchers */
watch(
  predicate,
  initMasonry
);

/* Init */
onMounted(() => {
  if (predicate()) {
    genMasonry();
    initMasonry();
  }
});
// TODO virtual scroll
</script>

<template lang="pug">
.grid
  .gutter-sizer
    template(v-if="!hasError")
      BlogPostThumbnail(
        v-for="({ title, subtitle, imgSrc, slug }, idx) in posts"
        :key="idx"
        :title="title"
        :subtitle="subtitle"
        :img-src="imgSrc"
        :slug="slug"
      )
  .grid-sizer
</template>
