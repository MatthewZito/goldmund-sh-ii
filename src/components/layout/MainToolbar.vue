<template>
  <v-app-bar
    app
    class="primary"
    height="50"
  >
    <v-toolbar-title class="headline text-uppercase white--text">
      <div>
        <span>
          {{ appName}}
        </span>
        &nbsp;
      </div>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex';

/* App Header */
export default {
  name: 'MainToolbar',
  computed: {
    ...mapGetters('config', [
      'appName'
    ])
  }
};
</script>
