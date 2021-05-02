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
      columnWidth: '.grid__sizer',
      itemSelector: '.grid__item',
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
  // console.log('MOUNT');
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

/* Mobile + Tablet Viewports */
@media (max-width: 550px) {
  .grid {
    &__item {
      margin: 1rem;
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
