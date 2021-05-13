<script setup>
import { not } from 'js-heuristics';

import {
  inject,
  defineProps,
  computed,
  onMounted
} from 'vue';

import Markdown from '@/components/fragments/Markdown.vue';

import { useAsync } from '@/hooks';
import { dateConv } from '@/utils';

/* Est */
const { blog } = inject('$api');


const {
  state: post,
  isLoading,
  execute
} = useAsync(() => blog.fetchPost({ slug: props.slug }));

/* Props */
const props = defineProps({
  slug: {
    type: String,
    required: true
  }
});

/* Computed */
const dateHeader = computed(() => dateConv(post.value.Created_at));

const dateFooter = computed(() => {
  if (not(post.value.Updated_at === post.value.Created_at)) {
    const dateF = dateConv(post.value.Updated_at);

    return `updated on ${dateF}`;
  }

  return false;
});

onMounted(execute);
</script>

<template lang="pug">
.main-container(v-if="!isLoading")
  BlogPostCard(
    :title="post.Title"
    :subtitle="post.Subtitle"
    :img-src="post.Img_src"
    :date="dateHeader"
    alt="blog header image"
  )
  .main-container__inner
    div
      Markdown(:mark-down="post.Body")
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
