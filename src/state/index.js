import Vue from 'vue';
import Vuex from 'vuex';

import api from './modules/api';
import config from './modules/config';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api,
    config
  },
  strict: process.env.NODE_ENV !== 'production'
});
