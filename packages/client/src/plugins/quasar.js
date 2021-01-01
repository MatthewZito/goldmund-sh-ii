import Vue from 'vue';

import '@/styles/quasar.scss';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import { Quasar, Dark } from 'quasar';

Vue.use(Quasar, {
  config: {
  },
  plugins: {}
});

Dark.set(true);
