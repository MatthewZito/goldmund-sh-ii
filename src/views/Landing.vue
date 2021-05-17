<script setup>
import { not } from 'js-heuristics';
import { useQuery, useResult } from '@vue/apollo-composable';

import {
  inject,
  ref,
  watch,
  computed,
  onMounted,
  onErrorCaptured
} from 'vue';

import {
  useMasonry,
  useActions
} from '@/hooks';

import { GET_POSTS } from '@/services/apollo';

/* Components */
import BlogPostThumbnail from '@/components/blog/BlogPostThumbnail.vue';
import Loader from '@/components/fragments/Loader.vue';
import ErrorBoundary from '@/components/fallback/ErrorBoundary.vue';
import BlogThumbnailFallback from '@/components/fallback/BlogThumbnailFallback.vue';

/* Est */
const { event } = inject('$api');
const { initMasonry } = useMasonry();

const enabled = ref(false);
const { result, loading, error } = useQuery(GET_POSTS,
  null, () => ({
    // disable until mount - the `grid` selector must be extant
    enabled: enabled.value
  })
);

const { addNotification } =
  useActions('notifications', [
    'addNotification'
  ]);

/* Data */
const posts = useResult(result, []);

/* Computed */
const initialized = computed(() => {
  return enabled.value
    && not(loading.value)
    && !!posts.value.length;
});

/* Observed */
watch(() => initialized.value, initMasonry);
event.logEvent({
        category: 'graphql_exception',
        info: 'the query \'GetPosts\' failed'
      });
watch(() => error.value, () => {
  addNotification({
    type: 'error',
    message: 'Something went wrong while fetching blog data :/'
  })
    .finally(() => {
      event.logEvent({
        category: 'graphql_exception',
        info: 'the query \'GetPosts\' failed'
      });
    });
});

/* A Priori */
onMounted(() => {
  enabled.value = true;
});

onErrorCaptured((err, vm, info) => {
  event.logEvent({
    category: 'runtime_exception',
    info: `${err.toString()} ${vm} ${info}`
  });

  return false;
});
// TODO virtual scroll
// TODO error fallback
// TODO ID, cache response
</script>

<template lang="pug">
Loader(v-if="loading || !enabled")
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
