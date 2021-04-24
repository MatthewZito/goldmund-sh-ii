<script>
import { not, isArray } from 'js-heuristics';

import BlogPostCard from '@/components/blog/BlogPostCard.vue';

export default {
  name: 'Landing',
  components: {
    BlogPostCard
  },
  data: () => ({
    posts: []
  }),
  mounted () {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts () {
      const { ok, data } = await this.$api.blog.fetchAll();

      // if (!ok || not(isArray((data))))
      // else

      this.posts = data;
    }
  }
};
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
