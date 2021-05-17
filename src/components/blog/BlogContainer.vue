<script setup>
import { not } from 'js-heuristics';

import { useQuery, useResult } from '@vue/apollo-composable';

import {
  defineProps,
  ref,
  computed,
  onErrorCaptured,
  watch,
  inject
} from 'vue';

import { GET_POST } from '@/services/apollo';
import { dateConv } from '@/utils';

/* Components */
import BlogPostCard from '@/components/blog/BlogPostCard.vue';
import Markdown from '@/components/fragments/Markdown.vue';
import Loader from '@/components/fragments/Loader.vue';
import BlogContainerFallback from '@/components/fallback/BlogContainerFallback.vue';
import ErrorBoundary from '@/components/fallback/ErrorBoundary.vue';

/* Est */
const { event } = inject('$api');
const { result, loading, error } = useQuery(
  GET_POST,
  props
);

/* Data */
const hasError = ref(false);
const post = useResult(result, [], data => data.post);


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

watch(() => error.value, () => {
  hasError.value = true;
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
Loader(v-else-if="loading")
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
