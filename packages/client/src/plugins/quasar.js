import Vue from 'vue';

import '@/styles/quasar.scss';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import {
  Quasar,
  Dark,
  Notify,
  Loading
} from 'quasar';

Notify.setDefaults({
  actions: [{ icon: 'close', color: 'white' }]
});

Vue.use(Quasar, {
  config: {},
  plugins: [
    Notify,
    Loading
  ]
});

Dark.set(true);
