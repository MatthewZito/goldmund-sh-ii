<script>
import { mapActions } from 'vuex';

import { objNotEmpty } from '@/utils';

import MainMasonryGrid from '@/components/layout/MainMasonryGrid';

export default {
  name: 'Blog',
  components: {
    MainMasonryGrid
  },
  data: () => ({
    articles: null,
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
    ...mapActions('notifications', ['addNotification']),
    async fetchArticles () {
      await this.$api.articles.fetchAll(this.resolveFetchArticles);
    },
    launchArticle (slug) {
      this.$router.push({ path: `/blog/${slug}` });
    },

    resolveFetchArticles ({ ok, data }) {
      if (!ok || objNotEmpty(data)) {
        this.addNotification({
          type: 'error',
          message: 'An error occurred while processing your request'
        });
        return;
      }
      this.articles = data;
    }
  }
};

/* Local Helpers */
function generateSkel (arr) {
  for (let i = 0; i < 20; i++) {
    arr[i] = { width: '320px' };
  }
  return arr;
}
</script>

<template>
  <v-container
    class="container--fluid"
    style="max-width: 1205px; position:relative"
  >
    <MainMasonryGrid
      class="pa-4"
      :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
      :gutter="{default: '30px', 700: '15px'}"
    >
      <template v-if="articlesExtant">
        <BaseCard
          v-for="({ title, subtitle, imgSrc, tags, slug }, idx) in articles"
          :key="idx"
          :title="title"
          :subtitle="subtitle"
          :tags="tags"
          :img="imgSrc"
          color="accent1 lighten-2"
          @click="launchArticle(slug)"
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
