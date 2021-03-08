import Vue from 'vue';
import Vuetify from 'vuetify/lib';

import light from '@/styles/colors.js';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light
    },
    options: {
      customProperties: true
    }
  },
  icons: {
    iconfont: 'mdi'
  }
});
