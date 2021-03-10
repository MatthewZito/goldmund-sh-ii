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
        ({ ok, data, error }) => {
          if (!ok || !objNotEmpty(data)) {
            this.addNotification({
              type: 'error',
              message: error
            });
          } else this.article = data;
        });
    }
  }
};
</script>

<template>
  <v-container
    class="py-12"
    :class="$style.code_block__container"
  >
    <v-row
      align="center"
      justify="center"
    >
        <v-card
          v-if="!isLoading"
          width="80%"
          align="center"
          tile
          flat
        >
          <code :class="$style.code_block">
            <div v-html="article.sanitized" />
            <div :class="$style.code_block__footer">
              {{ dateFooter }}
            </div>
          </code>
        </v-card>
    </v-row>
  </v-container>
</template>

<style lang="scss" module>
.code_block {
  padding: 10px;
  display: block;
  white-space: pre;
  height: 80vh;
}

.code_block__footer {
  position: absolute;
  bottom: 0;
  right: 0;
  padding-bottom: 10px;
}

.code_block__container {
  max-width:1205px;
}
</style>
