<script>
import { mapActions } from 'vuex';

import MainMasonryGrid from '@/components/layout/MainMasonryGrid';

/* Local Helpers */
function generateSkel (arr) {
  for (let i = 0; i < 20; i++) {
    arr[i] = { width: '320px' };
  }
  return arr;
}

export default {
  name: 'Blog',
  components: {
    MainMasonryGrid
  },
  data: () => ({
    articles: [],
    skeletonArticles: generateSkel([])
  }),
  computed: {
    articlesExtant () {
      return !this.isLoading &&
        !!(this.articles && this.articles.length);
    }
  },
  mounted () {
    this.isLoading = true;
    this.fetchArticles();
    this.isLoading = false;
  },
  methods: {
    ...mapActions('notifications', [
      'addNotification'
    ]),

    async fetchArticles () {
      await this.$api.articles.fetchAll(
        ({ ok, data, error }) => {
          if (!ok || !data.length) {
            this.addNotification({
              type: 'error',
              message: error
            });
          } else this.articles = data;
        });
    },
    launchArticle (slug) {
      this.$router.push({
        name: 'Article',
        params: { slug }
      });
    }
  }
};
</script>

<template>
  <v-container
    class="container--fluid"
    style="max-width: 1405px; position:relative"
  >
    <MainMasonryGrid
      class="pa-4"
      :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
      :gutter="{default: '30px', 700: '15px'}"
    >
      <template v-if="articlesExtant">
        <BaseCard
          v-for="({
            title,
            subtitle,
            imgSrc,
            tags,
            slug,
            content
          }, idx) in articles"
          :key="idx"
          :title="title"
          :subtitle="subtitle"
          :tags="tags"
          :img="imgSrc"
          color="accent1 lighten-2"
          @click="launchArticle(slug, content)"
      />
      </template>

      <template v-else>
        <BaseSkeleton
          v-for="({ width }, idx) in skeletonArticles"
          :key="idx"
          :config="['image', 'article']"
          :max-width="width"
          class="mb-4"
        />
      </template>

    </MainMasonryGrid>
  </v-container>
</template>
