<template>
  <v-footer app fixed inset class="primary">
    <span class="ml-2 white--text">
      {{ appAuthor }} &copy; {{ copyright }}
    </span>
  </v-footer>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('config');

export default {
  name: 'MainFooter',
  data: () => ({
    initialRelease: 2020
  }),
  computed: {
    ...mapState(['appAuthor']),
    copyright () {
      const currentYear = new Date().getFullYear();
      return currentYear > this.initialRelease
        ? `${this.initialRelease} - ${currentYear}` : this.initialRelease;
    }
  }
};
</script>
