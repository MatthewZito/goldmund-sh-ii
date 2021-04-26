<script setup>
import { inject, ref, onMounted, watch } from 'vue';

import Masonry from 'masonry-layout';
import { not, isArray } from 'js-heuristics';

/* Components */
import BlogPostThumbnail from '@/components/blog/BlogPostThumbnail.vue';

/* Est */
const api = inject('$api');

/* Data */
let posts = ref([]);
let masonryCharger = ref(null);

/* Methods */
async function fetchPosts () {
  const { ok, data } = await api.blog.fetchAll();
  posts.value = data;
}

function initMasonry () {
  masonryCharger.value.layout();
}

/* Watchers */
watch(() => posts, initMasonry);

/* Init */
onMounted(() => {
  fetchPosts()
    .then(() => {
      masonryCharger.value = new Masonry(document.querySelector('.grid'), {
        columnWidth: '.grid-sizer',
        itemSelector: '.grid-item',
        gutter: '.gutter-sizer'
      });
    })
    .finally(initMasonry);
});
</script>
<template>
  <div class="grid">
    <div class="gutter-sizer" />
      <BlogPostThumbnail
        v-for="({ title, subtitle, imgSrc, slug }, idx) in posts"
        :key="idx"
        :title="title"
        :subtitle="subtitle"
        :img-src="imgSrc"
        :slug="slug"
      />
    <div class="grid-sizer" />
  </div>
</template>
