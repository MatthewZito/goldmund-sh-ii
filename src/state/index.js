import Vue from 'vue';
import Vuex from 'vuex';

import api from './modules/api';
import config from './modules/config';
import notifications from './modules/notifications';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api,
    config,
    notifications
  },
  strict: process.env.NODE_ENV !== 'production'
});
