<template>
  <q-header elevated class="glossy">
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        @click="toggleDrawer"
        aria-label="Menu"
        icon="menu"
      />

      <q-toolbar-title>
        {{ getAppMetadata.title }}
      </q-toolbar-title>

      <div>v{{ getAppMetadata.version }}</div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('settings');

export default {
  name: 'LMToolbar',
  computed: {
    ...mapGetters(['getAppMetadata'])
  },
  methods: {
    ...mapActions(['toggleDrawer'])
  }
};
</script>
