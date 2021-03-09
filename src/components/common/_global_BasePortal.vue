<script>
function injectStylesheet (src, target) {
  Array.from(src.styleSheets).forEach(conf => {
    if (conf.cssRules) {
      const newStyleEl = src.createElement('style');

      Array.from(conf.cssRules).forEach(cssRule => {
        newStyleEl.appendChild(src.createTextNode(cssRule.cssText));
      });

      target.head.appendChild(newStyleEl);
    } else if (conf.href) {
      const newLinkEl = src.createElement('link');

      newLinkEl.rel = 'stylesheet';
      newLinkEl.href = conf.href;
      target.head.appendChild(newLinkEl);
    }
  });
}
export default {
  name: 'BasePortal',
  model: {
    prop: 'open',
    event: 'close'
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    ref: null
  }),
  watch: {
    open (next) {
      if (next) {
        this.openPortal();
      } else {
        this.closePortal();
      }
    }
  },
  mounted () {
    if (this.open) this.openPortal();
  },
  beforeDestroy () {
    if (this.windowRef) this.closePortal();
  },
  methods: {
    openPortal () {
      this.ref = window.open('', '', 'width=600,height=400,left=200,top=200');
      this.ref.document.body.appendChild(this.$el);
      injectStylesheet(window.document, this.ref.document);
      this.ref.addEventListener('beforeunload', this.closePortal);
    },
    closePortal () {
      if (this.ref) {
        this.ref.close();
        this.ref = null;
        this.$emit('close');
      }
    }
  }
};
</script>

<template>
  <div v-if="open">
    <slot />
  </div>
</template>
