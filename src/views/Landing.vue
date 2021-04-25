<script setup>
import { inject, ref, onMounted } from 'vue';
import { not, isArray } from 'js-heuristics';
import BlogPostCard from '@/components/blog/BlogPostCard.vue';

/* Est */
const api = inject('$api');

/* Data */
let posts = ref([]);

/* Methods */
async function fetchPosts () {
  const { ok, data } = await api.blog.fetchAll();
  posts.value = data;
}

/* Init */
onMounted(() => {
  fetchPosts();
});
</script>

<template>
  <div class="row">
    <div class="main-container">
      <div class="container-section__spacer container__preview">
        <BlogPostCard
          v-for="({ title, subtitle, imgSrc, slug }, idx) in posts"
          :key="idx"
          :title="title"
          :subtitle="subtitle"
          :img-src="imgSrc"
          :slug="slug"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container__preview {
  padding-right: 4em;

  @media screen and (max-width: 1000px) {
    padding: 0 1em;
  }

  @media screen and (max-width: 600px) {
    padding: 0;
  }
}
</style>
