import Vue from 'vue';
import Vuex from 'vuex';

/* Modules */
import settings from './modules/settings';
import auth from './modules/auth';
import http from './modules/http';

Vue.use(Vuex);

const rootState = new Vuex.Store({
  modules: {
    settings,
    auth,
    http
  },
  strict: process.env.NODE_ENV !== 'production'
});

export default rootState;
