<template>
  <v-tooltip bottom right :disabled="!disabled">
    <template v-slot:activator="{on}">
      <!-- activator must listen to div because a disabled button won't bind activator -->
      <div
        class="d-inline-block"
        v-on="on"
      >
        <v-btn
          :text="type === 'default'"
          :color="color"
          :outlined="outlined"
          :class="classes"
          style="background:white;"
          :disabled="disabled"
          elevation="1"
          large
          v-bind="$attrs"
          v-on="$listeners"
        >
          <slot />
        </v-btn>
      </div>
    </template>
    <span v-if="disabled">
      {{ reason }}
    </span>
  </v-tooltip>
</template>

<script>
const marginOrPadding = new RegExp(/^[m,p][a,x,y,r,l,t,b]-\d$/);
const hasProp = (key) => marginOrPadding.test(key);

export default {
  name: 'BaseButton',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'default',
      required: false
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    reason: {
      type: String,
      default: 'This action is disabled',
      required: false
    }
  },
  computed: {
    color () {
      if (this.type === 'cancel') return 'exception';
      if (this.type === 'action') return 'tertiary';
      return 'quadrenary';
    },
    textColor () {
      return this.type === 'action' ? 'black--text' : this.type === 'submit' ? 'white--text' : '';
    },
    placement () {
      return Object.keys(this.$attrs)
        .filter(hasProp)
        .join(' ');
    },
    classes () {
      return `${this.textColor} ${this.placement}`;
    },
    outlined () {
      return !['cancel', 'action', 'submit'].includes(this.type);
    }
  }
};
</script>
