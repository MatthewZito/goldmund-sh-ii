<script setup>
import {
  ref,
  onMounted,
  inject,
  onErrorCaptured
} from 'vue';

import { ERROR_CAT } from '@/services/api/models';
import {
  useMasonry,
  useActions,
  useGetters
} from '@/hooks';

/* Components */
import BlogPostThumbnail from '@/components/blog/BlogPostThumbnail.vue';
import Loader from '@/components/fragments/Loader.vue';
import ErrorBoundary from '@/components/fallback/ErrorBoundary.vue';
import BlogThumbnailFallback from '@/components/fallback/BlogThumbnailFallback.vue';

/* Est */
const { initMasonry } = useMasonry();
const { event } = inject('$api');

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
    .then(() => isLoading.value = false)
    .then(initMasonry)
    .finally(() => isLoading.value = false);
});

onErrorCaptured((err, vm, info) => {
  event.logError({
    category: ERROR_CAT.RUNTIME,
    info: `${err.toString()} ${vm} ${info}`
  });

  return false;
});
// TODO virtual scroll
// TODO error fallback
</script>

<template lang="pug">
Loader(v-if="isLoading")
.grid(v-else)
  .gutter-sizer
    ErrorBoundary(
      v-for="({ title, imgSrc, slug }, idx) in posts"
      :key="idx"
      :fallback="BlogThumbnailFallback"
    )
      BlogPostThumbnail(
        :title="title"
        :img-src="imgSrc"
        :slug="slug"
      )
  .grid__sizer
</template>
