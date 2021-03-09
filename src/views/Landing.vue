<script>
import MainMasonryGrid from '@/components/layout/MainMasonryGrid';

export default {
  name: 'Landing',
  components: {
    MainMasonryGrid
  },
  data: () => ({
    items: [
      {},{},{}
    ]
  })
};
</script>

<template>
  <v-layout column>
    <MainMasonryGrid
      class="pa-4"
      :cols="{default: 4, 1000: 3, 700: 2, 400: 1}"
      :gutter="{default: '30px', 700: '15px'}"
    >
      <BaseCard
        v-for="(item, index) in items"
        :key="index"
        title="hello world"
        subtitle="worlddd"
        img="https://cdn.vuetifyjs.com/images/cards/cooking.png"
     />

    </MainMasonryGrid>
  </v-layout>
</template>
