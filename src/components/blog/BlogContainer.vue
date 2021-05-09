<script setup>
import {
  defineProps,
  computed
} from 'vue';

import { notNullOrUndefined } from 'js-heuristics';

/* Props */
const props = defineProps({
  frontmatter: {
    type: Object,
    required: true
  }
});

const {
  title,
  subtitle,
  imgSrc,
  createdAt,
  updatedAt
} = props.frontmatter;

/* Computed */
const dateHeader = computed(() => {
  return dateConv(createdAt);
});

const dateFooter = computed(() => {
  if (notNullOrUndefined(updatedAt)) {
    const dateF = dateConv(updatedAt);

    return `updated on ${dateF}`;
  }

  return false;
});

/* Methods */
function dateConv (ts) {
  return new Date(ts).toDateString();
}

</script>

<template lang="pug">
.main-container
  BlogPostCard(
    :title="title"
    :subtitle="subtitle"
    :img-src="imgSrc"
    :date="dateHeader"
  )
  .main-container__inner
    div
      slot
      hr
      p(
        v-if="dateFooter"
        style="font-style:italic;color:#777;"
      )
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
}

@media screen and (max-width: $mobile-and-tablet) {
  .main-container {
    margin-left: -15px;
    margin-right: -15px;
    padding: 0;
    &__inner {
      padding: 0;
    }
  }
}
</style>
