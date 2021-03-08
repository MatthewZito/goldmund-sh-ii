<template>
  <transition
    :name="rootTransition"
    mode="out-in"
  >
    <keep-alive :include="getCachedViews">
      <router-view :key="viewKey" />
    </keep-alive>
  </transition>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapGetters } = createNamespacedHelpers('config');

export default {
  name: 'MainCacheWrapper',
  data: () => ({
    rootTransition: 'fade-transform'
  }),
  computed: {
    ...mapGetters(['getCachedViews']),
    viewKey () {
      return this.$route.path;
    }
  },
  watch: {
    $route (to, from) {
      this.flagViewForCache();
    }
  },
  mounted () {
    this.flagViewForCache();
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
