<template>
  <v-navigation-drawer
    v-click-outside="closeNavDrawer"
    app
    permanent
    disable-route-watcher
    disable-resize-watcher
    :mini-variant.sync="isNavDrawerOpen"
    class="blue4"
  >
    <v-list-item class="px-2">
      <v-btn
        :style="toggledIconPlacement"
        icon
        @click.stop="toggleNavDrawer"
      >
        <v-icon>{{ toggleNavDrawerIcon }}</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider />
    <MainDrawerItems :routes="topLevelRoutes" />
  </v-navigation-drawer>
</template>

<script>
/* Nav Sidebar */
import { generateRoutingTable, sidebarRoutesFilter } from '@/utils';
import routes from '@/router/routes';
import MainDrawerItems from './MainDrawerItems.vue';

import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('config');

export default {
  name: 'MainDrawer',
  components: {
    MainDrawerItems
  },
  computed: {
    ...mapGetters(['isNavDrawerClosed']),
    topLevelRoutes () {
      // will filter routes by meta.sidebar; will filter top level by meta.label (if no label, display child as top level item)
      return generateRoutingTable(sidebarRoutesFilter, routes);
    },
    toggleNavDrawerIcon () {
      return this.isNavDrawerClosed ? 'mdi-format-indent-increase' : 'mdi-format-indent-decrease';
    },
    toggledIconPlacement () {
      return this.isNavDrawerClosed ? '' : { position: 'absolute', right: '0' };
    },
    isNavDrawerOpen: {
      get () {
        return this.isNavDrawerClosed;
      },
      set () {
        // silence `warn` log - receives an event because the getter is conv to a computed on-mount (harmless)
        return; // eslint-disable-line no-useless-return
      }
    }
  },
  methods: {
    ...mapActions(['toggleNavDrawer', 'setNavDrawer']),
    closeNavDrawer () {
      this.setNavDrawer(false);
    }
  }
};
</script>
