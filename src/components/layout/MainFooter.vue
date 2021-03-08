<template>
  <v-footer app fixed inset class="integrity">
    <span class="ml-2 white--text">
      {{ author }} &copy; {{ copyright }}
    </span>
  </v-footer>
</template>

<script>
export default {
  name: 'MainFooter',
  data: () => ({
    initialRelease: 2020
  }),
  computed: {
    copyright () {
      const currentYear = new Date().getFullYear();
      return currentYear > this.initialRelease
        ? `${this.initialRelease} - ${currentYear}` : this.initialRelease;
    }
  }
};
</script>
