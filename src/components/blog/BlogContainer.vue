<script setup>
import {
  inject,
  defineProps,
  ref,
  computed,
  onMounted,
  onErrorCaptured
} from 'vue';
import { useHead } from '@vueuse/head';

import { not } from 'js-heuristics';

import { defaultTags } from '@/data/tags.json';
import { ERROR_CAT } from '@/services/api/models';
import { useAsync } from '@/hooks';
import { dateConv } from '@/utils';

/* Components */
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

useHead({
  title: 'goldmund.sh',
  meta: [
    {
      name: `description`,
      content: computed(
        () => {
          const tags = post.value.tags?.join(', ');
          const content = tags.length ? tags : defaultTags;
          return 'A blog post about ' + content;
        }
      )
    }
  ]
});

/* A Priori */
onMounted(() => {
  execute();

  if (error.value) {
    hasError.value = true;

    event.logError({
      category: ERROR_CAT.HTTP,
      info: error.value
    });
  }
});

onErrorCaptured((err, vm, info) => {
  hasError.value = true;

  event.logError({
    category: ERROR_CAT.RUNTIME,
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
    .main-container__inner
      div
        Markdown(:mark-down="post.body")
        hr
        p.main-container__footer(v-if="dateFooter")
          | {{ dateFooter }}
</template>

<style lang="scss" scoped>
.main-container {
  max-width: 1150px;
  margin: auto;

  &__inner {
    position: relative;
    width: 100%;
    min-height: 1px;
    float: left;
  }

  &__footer {
    color: #777;
    font-style: italic;
  }
}

@media screen and (max-width: $mobile-and-tablet) {
  .main-container {
    padding: 1rem;
    margin-right: -15px;
    margin-left: -15px;

    &__inner {
      padding: 0;
    }

    &__footer {
      font-size: 0.8em;
    }
  }
}

@media screen and (min-width: $mobile-and-tablet) {
  .main-container {
    margin-top: 5.5rem;
  }
}
</style>
