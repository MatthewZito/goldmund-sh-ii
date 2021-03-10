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
    toggledIconStyle () {
      return [this.$style.drawer_icon, (!this.isNavDrawerClosed && this.$style.drawer_icon__open)];
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
    width="300"
  >
    <v-list-item class="px-2">
      <v-btn
        :class="toggledIconStyle"
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

<style module>
  .drawer_icon__open {
    position: absolute;
    right: 0;
    padding-right: 25px;
  }
  .drawer_icon {
    padding-left: 5px;
  }
</style>
