import { isObject } from '@/utils';

const props = {
  tag: {
    type: String,
    default: 'div'
  },
  cols: {
    type: [
      Object,
      Number,
      String
    ],
    default: 2
  },
  gutter: {
    type: [
      Object,
      Number,
      String
    ],
    default: 0
  },
  css: {
    type: Boolean,
    default: true
  },
  columnTag: {
    type: String,
    default: 'div'
  },
  columnClass: {
    type: [
      String,
      Array,
      Object
    ],
    default: () => []
  },
  columnAttr: {
    type: Object,
    default: () => ({})
  }
};

const breakpointValue = (conf, windowWidth) => {
  const valueAsNum = parseInt(conf);

  if (valueAsNum > -1) return conf;
  else if (!isObject(conf)) return 0;

  let matchedBreakpoint = Infinity;
  let match = conf.default || 0;

  for (const k in conf) {
    const breakpoint = parseInt(k);
    const breakpointValRaw = conf[breakpoint];
    const breakpointVal = parseInt(breakpointValRaw);

    if (isNaN(breakpoint) || isNaN(breakpointVal)) continue;

    const isNewBreakpoint = windowWidth <= breakpoint && breakpoint < matchedBreakpoint;

    if (isNewBreakpoint) {
      matchedBreakpoint = breakpoint;
      match = breakpointValRaw;
    }
  }

  return match;
};

export default {
  props,

  data: () => ({
    displayColumns: 2,
    displayGutter: 0
  }),

  mounted () {
    this.$nextTick(this.recalc.bind(null));

    if (window) window.addEventListener('resize', this.recalc);
  },

  updated () {
    this.$nextTick(this.recalc.bind(null));
  },

  beforeDestroy () {
    if (window) window.removeEventListener('resize', this.recalc);
  },

  methods: {
    recalc () {
      const prevWindowWidth = this.windowWidth;

      this.windowWidth = (window ? window.innerWidth : null) || Infinity;

      if (prevWindowWidth === this.windowWidth) return;

      this.recalcColN(this.windowWidth);

      this.recalcGutterSize(this.windowWidth);
    },

    recalcGutterSize (windowWidth) {
      this.displayGutter = breakpointValue(this.gutter, windowWidth);
    },

    recalcColN (windowWidth) {
      let cols = breakpointValue(this.cols, windowWidth);

      cols = Math.max(1, Number(cols) || 0);

      this.displayColumns = cols;
    },

    getChildrenCols () {
      const columns = [];
      let childItems = this.$slots.default || [];

      if (
        childItems.length === 1 &&
          childItems[0].componentOptions &&
          childItems[0].componentOptions.tag === 'transition-group'
      ) childItems = childItems[0].componentOptions.children;

      for (let i = 0, visibleItemI = 0; i < childItems.length; i++, visibleItemI++) {
        if (!childItems[i].tag) {
          visibleItemI--;
          continue;
        }

        const columnIndex = visibleItemI % this.displayColumns;

        if (!columns[columnIndex]) columns[columnIndex] = [];

        columns[columnIndex].push(childItems[i]);
      }

      return columns;
    }
  },

  render (createElement) {
    const childrenCols = this.getChildrenCols();
    const isGutterSizeUnitless = parseInt(this.displayGutter) === this.displayGutter * 1;
    const gutterSizeWithUnit = isGutterSizeUnitless ? `${this.displayGutter}px` : this.displayGutter;

    const columnStyle = {
      boxSizing: 'border-box',
      backgroundClip: 'padding-box',
      width: `${100 / this.displayColumns}%`,
      border: '0 solid transparent',
      borderLeftWidth: gutterSizeWithUnit
    };

    const columns = childrenCols.map((children, index) => {
      return createElement(this.columnTag, {
        key: index + '-' + childrenCols.length,
        style: this.css ? columnStyle : null,
        class: this.columnClass,
        attrs: this.columnAttr
      }, children);
    });

    const containerStyle = {
      display: ['-webkit-box', '-ms-flexbox', 'flex'],
      marginLeft: `-${gutterSizeWithUnit}`
    };

    return createElement(
      this.tag,
      this.css ? { style: containerStyle } : null,
      columns
    );
  }
};
