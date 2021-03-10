<script>
export default {
  name: 'Notification',
  props: {
    value: {
      type: Boolean,
      default: null
    },
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    toggleDisplay: {
      get () {
        return this.value;
      },
      set (value) {
        this.$emit('close', value);
      }
    }
  }
};
</script>

<template>
  <v-snackbar
    v-model="toggleDisplay"
    :color="color"
    :timeout="-1"
  >
    <v-row dense align="center">
      <v-col>
        <slot>
          Placeholder Message
        </slot>
      </v-col>
      <v-col cols="auto">
        <v-btn
          text
          class="ml-2"
          @click="toggleDisplay = false"
        >
          Dismiss
        </v-btn>
      </v-col>
    </v-row>
  </v-snackbar>
</template>
