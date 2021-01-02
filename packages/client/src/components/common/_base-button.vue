<template>
  <q-btn
    :color="color"
    :text-color="textColor"
    :ripple="{ center: true }"
    size="large"
    push
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </q-btn>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    type: {
      type: String,
      default: 'standard'
    }
  },
  computed: {
    color () {
      switch(this.type) {
        case 'abort': return 'negative';
        case 'action': return 'positive';
        case 'standard': return 'secondary';
        default: return 'secondary';
      }
    },
    textColor () {
      return 'black';
    }
  }
};
</script>
