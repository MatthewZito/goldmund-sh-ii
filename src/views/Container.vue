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
.row(style="max-width:1150px;")
  BlogPostCard(
    :title="title"
    :subtitle="subtitle"
    :img-src="imgSrc"
    :date="dateHeader"
  )
  .main-container
    .container-section__spacer
      slot
      hr
      p(
        v-if="dateFooter"
        style="font-style:italic;color:#777;"
      )
        | {{ dateFooter }}
</template>

<style scoped>
.main-container {
  position: relative;
  min-height: 1px;
  padding-left: 15px;
  padding-right: 15px;
  float: left;
  width: 100%;
}
</style>
