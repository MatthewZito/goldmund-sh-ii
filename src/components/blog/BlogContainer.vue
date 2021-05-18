<script setup>
import { not } from 'js-heuristics';

import {
  inject,
  defineProps,
  ref,
  computed,
  onMounted,
  onErrorCaptured
} from 'vue';

import { useAsync } from '@/hooks';
import { dateConv } from '@/utils';

/* Components */
import BlogPostCard from '@/components/blog/BlogPostCard.vue';
import Markdown from '@/components/fragments/Markdown.vue';
import Loader from '@/components/fragments/Loader.vue';
import BlogContainerFallback from '@/components/fallback/BlogContainerFallback.vue';
import ErrorBoundary from '@/components/fallback/ErrorBoundary.vue';

/* Est */
const { blog, event } = inject('$api');

const {
  state: post,
  error,
  isLoading,
  execute
} = useAsync(
  blog.fetchPost.bind(null, { slug: props.slug }),
  { isGql: true }
);

/* Data */
const hasError = ref(false);

/* Props */
const props = defineProps({
  slug: {
    type: String,
    required: true
  }
});

/* Computed */
const dateHeader = computed(() => dateConv(post.value.createdAt));

const dateFooter = computed(() => {
  if (not(post.value.updatedAt === post.value.createdAt)) {
    const dateF = dateConv(post.value.updatedAt);

    return `updated on ${dateF}`;
  }

  return false;
});

/* A Priori */
onMounted(() => {
  execute();

  if (error.value) {
    hasError.value = true;

    event.logEvent({
      category: 'http_error',
      info: error.value
    });
  }
});

onErrorCaptured((err, vm, info) => {
  hasError.value = true;

  event.logEvent({
    category: 'runtime_exception',
    info: `${err.toString()} ${vm} ${info}`
  });

  return false;
});
</script>

<template lang="pug">
BlogContainerFallback(v-if="hasError")
Loader(v-else-if="isLoading")
.main-container(v-else)
  ErrorBoundary(
    :fallback="BlogContainerFallback"
  )
    BlogPostCard(
      :title="post.title"
      :subtitle="post.subtitle"
      :img-src="post.imgSrc"
      :date="dateHeader"
      alt="blog header image"
    )
    .main-container__inner
      div
        Markdown(:mark-down="post.body")
        hr
        p.main-container__footer(v-if="dateFooter")
          | {{ dateFooter }}
</template>

<style lang="scss" scoped>
.main-container {
  margin: auto;
  margin-top: 4.2rem;
  max-width:1150px;
  &__inner {
    position: relative;
    min-height: 1px;
    float: left;
    width: 100%;
  }

  &__footer {
    font-style: italic;
    color: #777;
  }
}

@media screen and (max-width: $mobile-and-tablet) {
  .main-container {
    margin-left: -15px;
    margin-right: -15px;
    padding: 1rem;

    &__inner {
      padding: 0;
    }

    &__footer {
      font-size: .8em;
    }
  }
}
</style>
