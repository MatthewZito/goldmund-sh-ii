import { createStore } from 'vuex';

import config from './modules/config';
import notifications from './modules/notifications';


export default createStore({
  modules: {
    config,
    notifications
  },
  strict: process.env.NODE_ENV !== 'production'
});
