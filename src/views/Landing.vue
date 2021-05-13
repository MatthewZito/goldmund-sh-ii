<script setup>
import { ref, onMounted } from 'vue';

import {
  useMasonry,
  useActions,
  useGetters
} from '@/hooks';

/* Components */
import BlogPostThumbnail from '@/components/blog/BlogPostThumbnail.vue';
import FallbackThumbnail from '@/components/fallback/FallbackThumbnail.vue';
import ErrorBoundary from '@/components/fallback/ErrorBoundary.vue';

/* Est */
const { initMasonry } = useMasonry();

const { posts } =
  useGetters('blog', [
    'posts'
  ]);

const { fetchPosts } =
  useActions('blog', [
    'fetchPosts'
  ]);

/* Data */
const isLoading = ref(true);

/* Init */
onMounted(() => {
  fetchPosts()
    .then(initMasonry)
    .finally(() => isLoading.value = false);
});

// TODO virtual scroll
</script>

<template lang="pug">
.grid
  .gutter-sizer
    ErrorBoundary(
      v-for="({ Title, Img_src, Slug }, idx) in posts"
      :key="idx"
      :fallback="FallbackThumbnail"
    )
      BlogPostThumbnail(
        :title="Title"
        :img-src="Img_src"
        :slug="Slug"
      )
  .grid__sizer
</template>
