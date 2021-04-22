<script>
import { mapActions } from 'vuex';

export default {
  name: 'Blog',
  data: () => ({
    articles: []
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
<div />
</template>
