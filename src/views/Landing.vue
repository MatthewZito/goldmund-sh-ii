<script>
import MainMasonryGrid from '@/components/layout/MainMasonryGrid';

export default {
  name: 'Landing',
  components: {
    MainMasonryGrid
  },
  data: () => ({
    entries: null,
    skeletonEntries: generateSkel([])
  }),
  computed: {
    entriesExtant () {
      return !this.isLoading &&
        !!(this.entries && this.entries.length);
    }
  },
  mounted () {
    this.isLoading = true;
    this.fetchEntries();
    this.isLoading = false;
  },
  methods: {
    async fetchEntries () {
      return await this.$api.entries.fetchAll(({ ok, data }) => {
        if (ok) this.entries = data;
        // TODO error
      });
    }
  }
};

/* Local Helpers */
function generateSkel (arr) {
  for (let i = 0; i < 20; i++) {
    arr[i] = i % 3 === 0
      ? { width: '300px' }
      : { width: '320px' };
  }
  return arr;
}
</script>

<template>
  <v-layout column>
    <MainMasonryGrid
      class="pa-4"
      :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
      :gutter="{default: '30px', 700: '15px'}"
    >
      <template v-if="entriesExtant">
        <BaseCard
          v-for="({ title, subtitle, img_src, tags }, idx) in entries"
          :key="idx"
          :title="title"
          :subtitle="subtitle"
          :tags="tags"
          :img="img_src"
          color="secondary lighten-3"
      />
      </template>

      <template v-else>
        <BaseSkeleton
          v-for="({ width }, idx) in skeletonEntries"
          :key="idx"
          :config="['image', 'article']"
          :width="width"
        />
      </template>

    </MainMasonryGrid>
  </v-layout>
</template>
