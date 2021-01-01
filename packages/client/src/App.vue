<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="drawerOpen = !drawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>
          {{ getAppMetadata.title }}
        </q-toolbar-title>

        <div>v{{ getAppMetadata.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerOpen"
      show-if-above
      bordered
    >

    </q-drawer>

    <q-page-container>
    </q-page-container>
  </q-layout>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers('settings');

export default {
  name: 'LayoutDefault',
  data: () => ({
    drawerOpen: false
  }),
  computed: {
    ...mapGetters(['getAppMetadata'])
  },
  created () {
    this.$storage.setItem('test', {
      a: 1,
      b: {
        a: 1
      }
    });
    console.log(this.$storage.getItem('test'), this.getAppMetadata); // eslint-disable-line no-console
  }
};
</script>
