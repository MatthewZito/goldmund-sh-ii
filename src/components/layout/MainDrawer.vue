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
    ...mapGetters([
      'isNavDrawerClosed',
      'appName'
    ]),
    topLevelRoutes () {
      return generateRoutingTable(sidebarRoutesFilter, routes);
    },
    toggledIconPlacement () {
      return this.isNavDrawerClosed ? '' : { position: 'absolute', right: '0' };
    },
    isNavDrawerOpen: {
      get () {
        return this.isNavDrawerClosed;
      },
      set () {
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

<template>
  <v-navigation-drawer
    v-click-outside="closeNavDrawer"
    app
    permanent
    disable-route-watcher
    disable-resize-watcher
    :mini-variant.sync="isNavDrawerOpen"
    class="quaterenary"
  >
    <v-list-item class="px-2">
      <v-btn
        :style="toggledIconPlacement"
        icon
        @click.stop="toggleNavDrawer"
      >
        <img src="@/assets/main-logo.svg" />
      </v-btn>
    </v-list-item>

    <v-divider />
    <MainDrawerItems :routes="topLevelRoutes" />
  </v-navigation-drawer>
</template>
