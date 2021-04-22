<script>
import { mapActions } from 'vuex';

import { objNotEmpty } from '@/utils';

export default {
  name: 'Article',
  data: () => ({
    article: [],
    isLoading: false
  }),
  computed: {
    dateFooter () {
      const { updatedAt, createdAt } = this.article;

      const amendment = createdAt !== updatedAt
        ? ` (updated on ${new Date(updatedAt).toDateString()})`
        : '';

      return new Date(createdAt).toDateString() + amendment;
    }
  },
  mounted () {
    this.isLoading = true;
    this.fetchArticle();
    this.isLoading = false;
  },
  methods: {
    ...mapActions('notifications', [
      'addNotification'
    ]),

    async fetchArticle () {
      await this.$api.articles.fetchOne(
        this.$route.params.slug,
        ({ ok, data, error: message }) => {
          if (!ok || !objNotEmpty(data)) {
            this.addNotification({
              type: 'error',
              message
            });
          } else this.article = data;
        });
    }
  }
};
</script>

<template>
<div />
</template>

<style lang="scss" module>
</style>
