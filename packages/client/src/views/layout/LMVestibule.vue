<template>
   <q-page-container>
     <transition name="base-apparate" mode="out-in">
      <keep-alive :include="getCachedViews" >
        <router-view :key="viewKey" />
      </keep-alive>
     </transition>
    </q-page-container>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('settings');

export default {
  name: 'LMVestibule',
  computed: {
    ...mapGetters(['getCachedViews']),
    viewKey () {
      return this.$route.path;
    }
  },
  watch: {
    $route () {
      this.flagViewForCache();
    }
  },
  methods: {
    ...mapActions(['addViewToCache']),
    flagViewForCache () {
      const { name } = this.$route;
      if (name) this.addViewToCache(this.$route);
    }
  }
};
</script>
