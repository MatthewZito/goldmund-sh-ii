<script setup>
import {
  ref,
  onMounted
} from 'vue';

import Masonry from 'masonry-layout';
import { notEmpty } from 'js-heuristics';

import routes from '@/router/routes/blog.routes';
import { resolveFrontmatter } from '@/utils';

/* Components */
import BlogPostThumbnail from '@/components/blog/BlogPostThumbnail.vue';
import FallbackThumbnail from '@/components/fallback/FallbackThumbnail.vue';
import ErrorBoundary from '@/components/layout/ErrorBoundary.vue';

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

<style lang="scss" scoped>
.grid {
  width: 100%;
  margin-top: -11px;

  &__item {
    margin-bottom: 1%;
    position: relative;
    display: block;
  }

  &__sizer {
    margin-bottom: 1%;
  }
}

.gutter-sizer {
  width: 1%;
}

@media (min-width:768px) {
  .grid {
    &__item,
    &__sizer {
      width: 49.5%;
    }
  }
}

@media (min-width:1200px) {
  .grid {
    &__item,
    &__sizer {
      width: 32.633%;
    }
  }
}

@media (max-width: 768px) and (min-width: 551px) {
  .hidden-xs {
    display: none !important;
  }
  .grid {
    margin: 0;

    &__item,
    &__sizer {
      width: 49.5%;
    }
  }
}
</style>
