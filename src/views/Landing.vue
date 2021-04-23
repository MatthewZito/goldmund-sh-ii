<script>
import Masonry from 'masonry-layout';
import { not, isArray } from 'js-heuristics';

import BlogPostThumbnail from '@/components/BlogPostThumbnail.vue';

export default {
  name: 'Landing',
  components: {
    BlogPostThumbnail
  },
  data: () => ({
    posts: []
  }),
  mounted () {
    this.fetchPosts()
      .then(() => {
        new Masonry(document.querySelector('.grid'), {
          columnWidth: '.grid-sizer',
          itemSelector: '.grid-item',
          gutter: '.gutter-sizer'
        }).layout();
      });
  },
  methods: {
    async fetchPosts () {
      const { ok, data } = await this.$api.blog.fetchAll();

      if (!ok || not(isArray((data)))) console.warn('handle err');
      else this.posts = data;
    }
  }
};
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
