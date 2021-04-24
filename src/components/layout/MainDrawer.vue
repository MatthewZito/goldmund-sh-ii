<script>
import MainFooter from './MainFooter.vue';

import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'MainDrawer',
  components: {
    MainFooter
  },
  data: () => ({
    navConfig: Object.freeze([
      { path: '/', label: 'Vestibule' },
      { path: '/info', label: 'Info' },
      { path: '/communications', label: 'Comms' }
    ]),
    routeLabel: 'pwd'
  }),
  computed: {
    ...mapGetters('config', [
      'isNavDrawerClosed'
    ])
  },
  watch: {
    '$route.name': {
      handler (to, from) {
        if (to !== from) {
          this.routeLabel = this.$route.meta.label;
        }
      }
    }
  },
  methods: {
    ...mapActions('config', [
      'toggleNavDrawer'
    ])
  }
};
</script>

<template>
  <div>
    <div class="navbar navbar-default visible-xs">
      <button
        aria-label="toggle menu"
        type="button"
        class="navbar-toggle collapsed"
        @click="toggleNavDrawer"
      >
        <span class="sr-only">
          Toggle navigation
        </span>
        <span
          v-for="idx of [0,1,2]"
          :key="idx"
          class="icon-bar"
        />
      </button>
      <a class="navbar-brand">
        ./goldmund.sh
      </a>
    </div>
    <div>
      <nav :class="`sidebar ${isNavDrawerClosed || 'open'}`">
        <div
          id="navbar-collapse"
          class="navbar-collapse"
        >
          <div class="site-header hidden-xs">
            <router-link
              to="/"
              class="site-brand"
            >
              <img
                class="img-responsive site-logo"
                alt="site logo"
                src="@/assets/images/main-logo.svg"
              />
              $ {{ routeLabel }}
            </router-link>
            <!-- TODO retain box-sizing, hide text -->
            <p
              v-if="$route.name === 'Landing'"
              style="color:#555;"
            >
              An archive of musings
            </p>
          </div>
          <ul class="nav">
            <li
              v-for="({ path, label: title }, idx) in navConfig"
              :key="idx"
            >
              <router-link :to="path">
                {{ title }}
              </router-link>
            </li>
          </ul>
          <MainFooter />
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.router-link-exact-active {
  font-weight: 700;
}
</style>
