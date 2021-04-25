import { createStore } from 'vuex';

import api from './modules/api';
import config from './modules/config';
import notifications from './modules/notifications';


export default createStore({
  modules: {
    api,
    config,
    notifications
  },
  strict: process.env.NODE_ENV !== 'production'
});
