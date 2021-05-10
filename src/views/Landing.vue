<script setup>
import {
  ref,
  onMounted
} from 'vue';

import Masonry from 'masonry-layout';
import { notEmpty } from 'js-heuristics';

import routes from '@/router/routes/blog.routes';
import { useMetadata } from '@/hooks';

/* Components */
import BlogPostThumbnail from '@/components/blog/BlogPostThumbnail.vue';
import FallbackThumbnail from '@/components/fallback/FallbackThumbnail.vue';
import ErrorBoundary from '@/components/fallback/ErrorBoundary.vue';

/* Data */
const { posts } = useMetadata(routes);

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
      columnWidth: '.grid__sizer',
      itemSelector: '.grid__item',
      gutter: '.gutter-sizer'
    });
}

/* Init */
onMounted(() => {
  genMasonry();
  initMasonry();

  setTimeout(() => {
    initMasonry();
  }, 1000);
});

// TODO virtual scroll
</script>

<template lang="pug">
.grid
  .gutter-sizer
    template(v-if="!hasError")
      ErrorBoundary(
        v-for="({ title, imgSrc, slug }, idx) in posts"
        :key="idx"
        :fallback="FallbackThumbnail"
      )
        BlogPostThumbnail(
          :title="title"
          :img-src="imgSrc"
          :slug="slug"
        )
  .grid__sizer
</template>
