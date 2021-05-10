<script setup>
import { onMounted } from 'vue';


import routes from '@/router/routes/blog.routes';
import { useMetadata, useMasonry } from '@/hooks';

/* Components */
import BlogPostThumbnail from '@/components/blog/BlogPostThumbnail.vue';
import FallbackThumbnail from '@/components/fallback/FallbackThumbnail.vue';
import ErrorBoundary from '@/components/fallback/ErrorBoundary.vue';

/* Data */
const { initMasonry } = useMasonry();
const { posts } = useMetadata(routes);

/* Init */
onMounted(initMasonry);
// TODO virtual scroll
</script>

<template lang="pug">
.grid
  .gutter-sizer
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
